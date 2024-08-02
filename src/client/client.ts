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

const fetchWithAuthenticate = (
    config: ClientConfig,
    cache: Cache,
): typeof fetch => {
    const fetcher = config.fetch ?? fetch;

    return async (input: RequestInfo | URL, init?: RequestInit) => {
        const authSDK = new AuthSDK(
            config.endpoint ?? "",
            config.clientId,
            config.clientSecret,
            config.audience,
        );

        let token = cache.get(TOKEN_CACHE_KEY);

        if (!token || (tokenExpiration && Date.now() > tokenExpiration)) {
            try {
                token = await authSDK.getEnsureToken();
                cache.set(TOKEN_CACHE_KEY, token);
                const expiry = await authSDK.getTokenExpiry();
                tokenExpiration = Date.now() + (expiry ?? 0);
            } catch (error) {
                console.error("[Client] Failed to obtain access token", error);
                throw new Error("Failed to obtain access token");
            }
        }

        const headers = new Headers(init?.headers || {});
        headers.set("Authorization", `Bearer ${token}`);
        if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
        }

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
    const cache = new Cache();
    const client = createClient<CheckoutPaths>({
        baseUrl: baseUrl.toString(),
        fetch: fetchWithAuthenticate(config, cache),
    });
    return client;
};

export default createCheckoutClient;
