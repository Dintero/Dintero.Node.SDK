import { AuthSDK } from "../middleware/authToken";
import Cache from "../middleware/cache";
import createClient from "openapi-fetch";
import type { paths } from "src/types/payments/generated";

type ClientConfig = {
    oid: string;
    audience: string;
    clientId: string;
    clientSecret: string;
    endpoint?: string;
    fetch?: typeof fetch;
};

export type CheckoutPaths = Pick<
    paths,
    | "/sessions-profile"
    | "/accounts/{oid}/auth/token"
    | "/sessions/{session_id}"
    | "/sessions/{session_id}/cancel"
    | "/transactions/{id}/capture"
    | "/transactions/{id}/authorization"
    | "/transactions/{id}/refund"
    | "/transactions/{id}/void"
    | "/transactions/{id}"
    | "/transactions"
>;

const TOKEN_CACHE_KEY = "dintero_access_token";
let tokenExpiration: number | null = null;

const fetchWithAuthenticate = (config: ClientConfig): typeof fetch => {
    const fetcher = config.fetch ?? fetch;

    return async (input: RequestInfo | URL, init?: RequestInit) => {
        console.log("[Client] Fetching with:", { input, init });

        const authSDK = new AuthSDK(
            config.endpoint ?? "",
            config.clientId,
            config.clientSecret,
            config.audience,
        );

        let token = Cache.get(TOKEN_CACHE_KEY);

        console.log("[Client] Cached Token:", token);

        if (!token || (tokenExpiration && Date.now() > tokenExpiration)) {
            try {
                token = await authSDK.getEnsureToken();
                Cache.set(TOKEN_CACHE_KEY, token);
                const expiry = await authSDK.getTokenExpiry();
                tokenExpiration = Date.now() + (expiry ?? 0);
                console.log(
                    `[Client] New token cached with expiry at ${new Date(tokenExpiration).toISOString()}`,
                );
            } catch (error) {
                console.error("[Client] Failed to obtain access token", error);
                throw new Error("Failed to obtain access token");
            }
        }

        const headers: HeadersInit = {
            ...(init?.headers instanceof Headers
                ? Object.fromEntries(init.headers.entries())
                : init?.headers ?? {}),
            Authorization: `Bearer ${token}`,
        };

        const initWithAuthorization: RequestInit = {
            ...init,
            headers: new Headers(headers),
        };

        const newRequest =
            typeof input === "string" || input instanceof URL
                ? new Request(input.toString(), initWithAuthorization)
                : new Request(input.url, {
                      ...initWithAuthorization,
                      method: input.method,
                      body: input.body,
                      // @ts-expect-error https://github.com/node-fetch/node-fetch/issues/1769
                      duplex: "half",
                  });

        return fetcher(newRequest);
    };
};

const createCheckoutClient = (config: ClientConfig) => {
    const baseUrl = new URL(config.endpoint ?? "https://checkout.dintero.com");
    const client = createClient<CheckoutPaths>({
        baseUrl: baseUrl.toString(),
        fetch: fetchWithAuthenticate(config),
    });
    return client;
};

export default createCheckoutClient;
