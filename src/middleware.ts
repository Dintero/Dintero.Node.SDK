import type { Middleware } from "openapi-fetch";
import type { ClientOptions } from "./types";

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

export const fetchAccessToken = async (config: Required<ClientOptions>) => {
    const accountId = extractAccountId(config.audience);
    const url = `${config.core.baseUrl}/v1/accounts/${accountId}/auth/token`;

    const authToken = Buffer.from(
        `${config.clientId}:${config.clientSecret}`,
    ).toString("base64");

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${authToken}`,
        },
        body: JSON.stringify({
            grant_type: "client_credentials",
            audience: config.audience,
        }),
    });

    const responseText = await response.text();

    if (response.status !== 200) {
        throw new Error(
            `Failed to fetch access token: ${response.statusText}. Details: ${responseText}`,
        );
    }

    const json = JSON.parse(responseText);

    return {
        accessToken: json.access_token,
        expiresIn: json.expires_in,
    };
};

export const createAuthMiddleware = (
    config: Required<ClientOptions>,
): Middleware => {
    let accessToken: string | undefined = undefined;
    let tokenExpiry = 0;
    return {
        async onRequest({ request }) {
            if (request.headers.get("Authorization")) {
                return request;
            }

            const currentTime = Math.floor(Date.now() / 1000);

            if (!accessToken || tokenExpiry < currentTime) {
                const tokenData = await fetchAccessToken(config);
                accessToken = tokenData.accessToken;
                tokenExpiry = currentTime + Math.floor(tokenData.expiresIn / 2);
            }

            request.headers.set("Authorization", `Bearer ${accessToken}`);
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
