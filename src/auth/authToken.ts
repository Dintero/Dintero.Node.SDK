import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export class AuthSDK {
    private apiUrl: string;
    private oid: string;
    private clientId: string;
    private clientSecret: string;
    private token: string | null;
    private tokenExpiry: number | null;
    private refreshToken: string | null;

    constructor() {
        this.apiUrl = process.env.API_URL || "";
        this.oid = process.env.OID || "";
        this.clientId = process.env.CLIENT_ID || "";
        this.clientSecret = process.env.CLIENT_SECRET || "";
        this.token = null;
        this.tokenExpiry = null;
        this.refreshToken = null;
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public setTokenExpiry(expiry: number): void {
        this.tokenExpiry = expiry;
    }

    public setRefreshToken(refreshToken: string): void {
        this.refreshToken = refreshToken;
    }

    public getToken(): string | null {
        return this.token;
    }

    public getTokenExpiry(): number | null {
        return this.tokenExpiry;
    }

    public getRefreshToken(): string | null {
        return this.refreshToken;
    }

    private async fetchToken(): Promise<string> {
        try {
            const response = await axios.post(
                `${this.apiUrl}/v1/accounts/${this.oid}/auth/token`,
                {
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                },
            );

            this.token = response.data.access_token;
            this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
            if (this.token) {
                return this.token;
            }
            throw new Error("Failed to fetch token");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const statusCode = error.response?.status || 500;
                const message =
                    error.response?.data?.error ||
                    `Request failed with status code ${statusCode}`;
                console.error("Authentication failed", message);
                throw new Error(message);
            }
            console.error("Authentication failed", error);
            throw new Error("An unexpected error occurred");
        }
    }

    private async refreshTokenIfNeeded(): Promise<void> {
        if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
            return;
        }
        if (!this.refreshToken) {
            throw new Error("No refresh token available");
        }
        try {
            const response = await axios.post(
                `${this.apiUrl}/v1/accounts/${this.oid}/auth/token/refresh`,
                {
                    grant_type: "refresh_token",
                    refresh_token: this.refreshToken,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                },
            );

            this.token = response.data.access_token;
            this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
            this.refreshToken =
                response.data.refresh_token || this.refreshToken;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const statusCode = error.response?.status || 500;
                const message =
                    error.response?.data?.error ||
                    `Request failed with status code: ${statusCode}`;
                console.error("Token refresh failed:", message);
                throw new Error(message);
            }
            console.error("Token refresh failed:", error);
            throw new Error("An unexpected error occurred");
        }
    }

    public async authenticate(): Promise<string> {
        if (
            !this.token ||
            !this.tokenExpiry ||
            Date.now() >= this.tokenExpiry
        ) {
            if (this.refreshToken) {
                await this.refreshTokenIfNeeded();
            } else {
                return this.fetchToken();
            }
        }

        if (!this.token) {
            throw new Error("Unable to authenticate");
        }

        return this.token;
    }
}
