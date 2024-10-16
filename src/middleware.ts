import type { Client, Middleware } from "openapi-fetch";
import type { CorePaths } from "./types";
import type { ClientOptions, TokenCache } from "./types";

export const extractAccountId = (audience: string): string => {
    if (!audience || !audience.includes("://")) {
        throw new Error(
            "Account ID could not be extracted from the audience URL.",
        );
    }

    const audienceUrl = new URL(audience);
    const pathParts = audienceUrl.pathname.split("/").filter(Boolean);

    const accountId =
        audienceUrl.username || (pathParts.length >= 3 ? pathParts[2] : null);

    if (!accountId) {
        throw new Error(
            "Account ID could not be extracted from the audience URL.",
        );
    }

    return accountId;
};

export const accessToken = async (
    config: Required<ClientOptions>,
    client: Client<CorePaths>,
) => {
    const bearerToken = Buffer.from(
        `${config.clientId}:${config.clientSecret}`,
    ).toString("base64");
    return await client.POST("/accounts/{oid}/auth/token", {
        params: { path: { oid: extractAccountId(config.audience) } },
        headers: {
            Authorization: `Basic ${bearerToken}`,
        },
        body: {
            grant_type: "client_credentials",
            audience: config.audience,
        },
    });
};

export const defaultTokenCache = (): TokenCache => {
    let cached:
        | { accessToken: string; expiresIn: number; aud: string }
        | undefined = undefined;
    return {
        set: (aud, accessToken, expiresIn) => {
            cached = {
                aud,
                accessToken,
                expiresIn:
                    Math.floor(Date.now() / 1000) + Math.floor(expiresIn / 2),
            };
            return Promise.resolve(cached);
        },
        get: (aud) => {
            if (
                cached?.aud === aud &&
                Math.floor(Date.now() / 1000) < cached.expiresIn
            ) {
                return Promise.resolve({ accessToken: cached.accessToken });
            }
            return Promise.resolve(undefined);
        },
    };
};

export const createAuthMiddleware = (
    options: Required<ClientOptions>,
    client: Client<CorePaths>,
): Middleware => {
    return {
        async onRequest({ request }) {
            if (request.headers.get("Authorization")) {
                return undefined;
            }

            let auth = await options.tokenCache.get(options.audience);

            if (!auth) {
                const result = await accessToken(options, client);
                if (result.error || !result.data) {
                    throw new Error(
                        `Failed to fetch access token: ${result.response.status}`,
                    );
                }

                auth = await options.tokenCache.set(
                    options.audience,
                    result.data.access_token,
                    result.data.expires_in,
                );
            }

            request.headers.set("Authorization", `Bearer ${auth.accessToken}`);
            return request;
        },
    };
};

export const createVersionPrefixMiddleware = (): Middleware => ({
    async onRequest({ request, schemaPath }) {
        if (schemaPath.startsWith("/v")) {
            return request;
        }
        const url = new URL(request.url);
        url.pathname = `/v1${url.pathname ?? "/"}`;
        return new Request(url.toString(), request);
    },
});
