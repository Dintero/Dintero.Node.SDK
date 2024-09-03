import { request, type Dispatcher } from "undici";

interface TokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

export class AuthSDK {
    private apiUrl: string;
    private oid: string;
    private clientId: string;
    private clientSecret: string;
    private token: string | null = null;
    private tokenExpiry: number | null = null;

    constructor(
        apiUrl: string,
        oid: string,
        clientId: string,
        clientSecret: string,
    ) {
        this.apiUrl = apiUrl;
        this.oid = oid;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public getToken(): string | null {
        return this.token;
    }

    public getTokenExpiry(): number | null {
        return this.tokenExpiry;
    }

    private async fetchToken(): Promise<void> {
        try {
            const { statusCode, body } = await request(
                `${this.apiUrl}/v1/accounts/${this.oid}/auth/token`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        client_id: this.clientId,
                        client_secret: this.clientSecret,
                    }),
                },
            );

            if (statusCode !== 200) {
                const responseText = await body.text();
                console.log(
                    `[AuthSDK] Request failed with status code ${statusCode}: ${responseText}`,
                );
                throw new Error(
                    `Request failed with status code ${statusCode}`,
                );
            }

            const responseText = await body.text();
            const responseData: TokenResponse = JSON.parse(responseText);

            if (!responseData.access_token || !responseData.expires_in) {
                throw new Error("Invalid response format");
            }

            this.token = responseData.access_token;
            this.tokenExpiry = Date.now() + responseData.expires_in * 1000;
            console.log(
                `[AuthSDK] Fetched new token: ${this.token} with expiry at ${new Date(this.tokenExpiry).toISOString()}`,
            );
        } catch (error) {
            console.error("[AuthSDK] Failed to fetch token", error);
            throw new Error("An unexpected error occurred");
        }
    }

    private async ensureToken(): Promise<void> {
        const bufferTime = 5 * 60 * 1000;
        if (
            !this.token ||
            !this.tokenExpiry ||
            Date.now() >= this.tokenExpiry - bufferTime
        ) {
            console.log("[AuthSDK] Fetching new token");
            await this.fetchToken();
        } else {
            console.log("[AuthSDK] Using existing token");
        }
    }

    public async getEnsureToken(): Promise<string | null> {
        await this.ensureToken();
        return this.getToken();
    }

    public async request(
        endpoint: string,
        options: Omit<Dispatcher.RequestOptions, "origin" | "path"> & {
            headers?: Record<string, string>;
        },
    ): Promise<Dispatcher.ResponseData> {
        await this.ensureToken();

        const headers = {
            ...options.headers,
            Authorization: `Bearer ${this.token}`,
        };

        return await request(`${this.apiUrl}${endpoint}`, {
            ...options,
            headers,
        });
    }
}
