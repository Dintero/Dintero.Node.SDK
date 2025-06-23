import type { Client, Middleware } from "openapi-fetch";
import type { ClientOptions, CorePaths } from "./types";

const pkg = require("../package.json");

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
    const credentials = Buffer.from(
        `${config.clientId}:${config.clientSecret}`,
    ).toString("base64");
    return await client.POST("/accounts/{oid}/auth/token", {
        params: { path: { oid: extractAccountId(config.audience) } },
        headers: {
            Authorization: `Basic ${credentials}`,
        },
        body: {
            grant_type: "client_credentials",
            audience: config.audience,
        },
    });
};

export const createAuthMiddleware = (
    config: Required<ClientOptions>,
    client: Client<CorePaths>,
): Middleware => {
    let auth: { access_token: string; expires_in: number } | undefined;
    let authExpires = 0;
    return {
        async onRequest({ request }) {
            if (request.headers.get("Authorization")) {
                return undefined;
            }

            const now = Math.floor(Date.now() / 1000);

            if (!auth?.access_token || authExpires < now) {
                const result = await accessToken(config, client);
                if (result.error || !result.data) {
                    throw new Error(
                        `Failed to fetch access token: ${result.response.status}`,
                    );
                }
                auth = result.data;
                authExpires = now + Math.floor(auth.expires_in / 2);
            }

            request.headers.set("Authorization", `Bearer ${auth.access_token}`);
            return request;
        },
    };
};

export const createDefaultHeadersMiddleware = (): Middleware => ({
    onRequest({ request }) {
        if (!request.headers.get("User-Agent")) {
            request.headers.set(
                "User-Agent",
                `Dintero.Node.SDK/${pkg.version} (+https://github.com/Dintero/Dintero.Node.SDK)`,
            );
        }
    },
});

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
