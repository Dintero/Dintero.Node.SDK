import { AuthSDK } from "../middleware/authToken";
import type { Middleware } from "openapi-fetch";
import type { ClientConfig, Token } from "../dintero";
import type Cache from "./cache";

const TOKEN_CACHE_KEY = "dintero_access_token";

type AuthMiddlewareContext = {
    request: Request;
    next: () => Promise<Response>;
};

export const createAuthMiddleware = (
    config: ClientConfig,
    cache: Cache,
): Middleware => {
    return async ({ request, next }: AuthMiddlewareContext) => {
        const authSDK = new AuthSDK(
            config.endpoint ?? "",
            config.oid,
            config.clientId,
            config.clientSecret,
        );

        let token: Token | null = cache.get(TOKEN_CACHE_KEY);
        const now = Date.now();

        if (!token || now > token.expiresAt) {
            const tokenValue = await authSDK.getEnsureToken();
            const expiry = authSDK.getTokenExpiry();

            token = {
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                value: tokenValue!,
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                expiresAt: expiry!,
            };

            cache.set(TOKEN_CACHE_KEY, token);
        }

        request.headers.set("Authorization", `Bearer ${token.value}`);

        return next();
    };
};
