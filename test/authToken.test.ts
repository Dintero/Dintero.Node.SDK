import { request } from "undici";
import type { Dispatcher } from "undici";
import { AuthSDK } from "../src/middleware/authToken";

jest.mock("undici", () => ({
    request: jest.fn(),
    Dispatcher: {
        ResponseData: jest.fn(),
    },
}));

const mockedRequest = request as jest.MockedFunction<typeof request>;

describe("AuthSDK", () => {
    const apiUrl = "https://api.example.com";
    const oid = "test_oid";
    const clientId = "test_client_id";
    const clientSecret = "test_client_secret";
    let authSDK: AuthSDK;

    beforeEach(() => {
        authSDK = new AuthSDK(apiUrl, oid, clientId, clientSecret);
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
        jest.spyOn(console, "log").mockImplementation(() => {});
    });

    it("Should fetch a new token successfully when making a request", async () => {
        const mockToken = "test_token";
        const mockExpiry = 3600;

        mockedRequest.mockResolvedValueOnce({
            statusCode: 200,
            body: {
                text: async () =>
                    JSON.stringify({
                        access_token: mockToken,
                        expires_in: mockExpiry,
                        refresh_token: "new_refresh_token",
                    }),
            },
        } as unknown as Dispatcher.ResponseData);

        mockedRequest.mockResolvedValueOnce({
            statusCode: 200,
            body: {
                text: async () => "success",
            },
        } as unknown as Dispatcher.ResponseData);

        const now = Date.now();
        jest.spyOn(Date, "now").mockImplementation(() => now);

        const response = await authSDK.request("/test-endpoint", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        expect(response).toBeDefined();
        expect(mockedRequest).toHaveBeenCalledTimes(2);

        expect(mockedRequest).toHaveBeenCalledWith(
            expect.stringContaining("/test-endpoint"),
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: `Bearer ${mockToken}`,
                }),
            }),
        );
    });

    it("Should use the existing token if still valid when making a request", async () => {
        const mockToken = "test_token";
        const mockExpiry = Date.now() + 3600 * 1000;

        const now = Date.now();
        jest.spyOn(Date, "now").mockImplementation(() => now);

        authSDK["token"] = mockToken;
        authSDK["tokenExpiry"] = mockExpiry;

        mockedRequest.mockResolvedValueOnce({
            statusCode: 200,
            body: {
                text: async () => "success",
            },
        } as unknown as Dispatcher.ResponseData);

        const response = await authSDK.request("/test-endpoint", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        expect(response).toBeDefined();
        expect(mockedRequest).toHaveBeenCalledTimes(1);
        expect(mockedRequest).toHaveBeenCalledWith(
            expect.stringContaining("/test-endpoint"),
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: `Bearer ${mockToken}`,
                }),
            }),
        );
    });

    it("Should handle token fetch failure when making a request", async () => {
        mockedRequest.mockResolvedValueOnce({
            statusCode: 500,
            body: {
                text: async () =>
                    JSON.stringify({ error: "Internal Server Error" }),
            },
        } as unknown as Dispatcher.ResponseData);

        await expect(
            authSDK.request("/test-endpoint", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        ).rejects.toThrow("An unexpected error occurred");

        expect(mockedRequest).toHaveBeenCalledTimes(1);
    });
});
