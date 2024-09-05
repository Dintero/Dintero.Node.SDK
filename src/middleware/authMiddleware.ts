// authMiddleware.ts
import type { Middleware } from "openapi-fetch";
import "dotenv/config";

const ACCOUNT_ID = process.env.OID;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

let accessToken: string | undefined = undefined;
let tokenExpiry: number | undefined = undefined;

export async function fetchAccessToken() {
    const url = `https://api.dintero.com/v1/accounts/${ACCOUNT_ID}/auth/token`;
    const authToken = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
        "base64",
    );

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Basic ${authToken}`,
            },
            body: JSON.stringify({
                grant_type: "client_credentials",
                audience: `https://api.dintero.com/v1/accounts/${ACCOUNT_ID}`,
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
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw error;
    }
}

const authMiddleware: Middleware = {
    async onRequest({ request }) {
        const currentTime = Math.floor(Date.now() / 1000);

        if (!accessToken || (tokenExpiry && currentTime >= tokenExpiry)) {
            try {
                const tokenData = await fetchAccessToken();
                accessToken = tokenData.accessToken;
                tokenExpiry = currentTime + tokenData.expiresIn;
            } catch (error) {
                console.error("Error fetching access token:", error);
                throw error;
            }
        }

        request.headers.set("Authorization", `Bearer ${accessToken}`);
        return request;
    },
};
export default authMiddleware;
