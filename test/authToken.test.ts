import { AuthSDK } from "../src/auth/authToken";
import axios from "axios";
import MockAdapter = require("axios-mock-adapter");
import * as dotenv from "dotenv";

dotenv.config();

describe("AuthSDK", () => {
    let mock: MockAdapter;
    let authSDK: AuthSDK;
    let originalConsoleError: (message?: any, ...optionalParams: any[]) => void;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        authSDK = new AuthSDK();
        originalConsoleError = console.error;
        console.error = jest.fn();
    });

    afterEach(() => {
        mock.restore();
        console.error = originalConsoleError;
    });

    it("Should authenticate and fetch a token successfully", async () => {
        const mockToken = "test_token";
        const mockExpiry = 3600;
        const url = `${process.env.API_URL}/v1/accounts/${process.env.OID}/auth/token`;

        mock.onPost(url).reply(200, {
            access_token: mockToken,
            expires_in: mockExpiry,
        });

        const token = await authSDK.authenticate();

        expect(token).toBe(mockToken);
        expect(authSDK.getToken()).toBe(mockToken);
        expect(authSDK.getTokenExpiry()).toBeGreaterThan(Date.now());
    });

    it("Should handle authentication failure", async () => {
        const url = `${process.env.API_URL}/v1/accounts/${process.env.OID}/auth/token`;

        mock.onPost(url).reply(500, { error: "Internal Server Error" });

        authSDK.setRefreshToken("");

        await expect(authSDK.authenticate()).rejects.toThrow(
            "Internal Server Error",
        );
    });

    it("Should use existing token if it is still valid", async () => {
        const mockToken = "test_token";
        const mockExpiry = 3600;

        authSDK.setToken(mockToken);
        authSDK.setTokenExpiry(Date.now() + mockExpiry * 1000);

        const token = await authSDK.authenticate();

        expect(token).toBe(mockToken);
        expect(authSDK.getToken()).toBe(mockToken);
    });

    it("Should refresh token if it is expired", async () => {
        const newToken = "new_test_token";
        const mockExpiry = 3600;
        const refreshUrl = `${process.env.API_URL}/v1/accounts/${process.env.OID}/auth/token/refresh`;

        authSDK.setToken("expired_token");
        authSDK.setTokenExpiry(Date.now() - 1000);
        authSDK.setRefreshToken("existing_refresh_token");

        mock.onPost(refreshUrl).reply(200, {
            access_token: newToken,
            expires_in: mockExpiry,
            refresh_token: "new_refresh_token",
        });

        const token = await authSDK.authenticate();

        expect(token).toBe(newToken);
        expect(authSDK.getToken()).toBe(newToken);
        expect(authSDK.getTokenExpiry()).toBeGreaterThan(Date.now());
        expect(authSDK.getRefreshToken()).toBe("new_refresh_token");
    });

    it("Should handle token fetch error gracefully", async () => {
        const url = `${process.env.API_URL}/v1/accounts/${process.env.OID}/auth/token`;

        mock.onPost(url).reply(400, { error: "Bad Request" });

        authSDK.setRefreshToken("");

        await expect(authSDK.authenticate()).rejects.toThrow("Bad Request");
    });

    it("Should handle token refresh error gracefully", async () => {
        const refreshUrl = `${process.env.API_URL}/v1/accounts/${process.env.OID}/auth/token/refresh`;

        mock.onPost(refreshUrl).reply(400, { error: "Refresh Token Error" });

        authSDK.setToken("expired_token");
        authSDK.setTokenExpiry(Date.now() - 1000);
        authSDK.setRefreshToken("existing_refresh_token");

        await expect(authSDK.authenticate()).rejects.toThrow(
            "Refresh Token Error",
        );
    });
});
