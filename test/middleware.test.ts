import type { MiddlewareCallbackParams } from "openapi-fetch";
import {
    createAuthMiddleware,
    fetchAccessToken,
} from "../src/client/middleware";

const config = {
    clientId: "CLIENTID",
    clientSecret: "CLIENTSECRET",
    audience: "https://T12345678@test.dintero.com/v1/accounts/T12345678",
    core: { baseUrl: "https://api.dintero.test" },
    checkout: { baseUrl: "https://checkout.dintero.test" },
};

const mockFetch = (response: Response) =>
    jest.spyOn(global, "fetch").mockResolvedValue(response);

beforeEach(() => {
    // Reset fetch mock to default behavior before each test
    mockFetch({
        status: 200,
        statusText: "OK",
        text: async () => JSON.stringify({}),
    } as Response);
});

afterEach(() => {
    jest.restoreAllMocks(); // Restore original fetch implementation
});

test("fetchAccessToken should fetch and return a new access token", async () => {
    const mockResponse = {
        status: 200,
        statusText: "OK",
        text: async () =>
            JSON.stringify({
                access_token: "mock-access-token",
                expires_in: 3600,
            }),
    } as Response;

    mockFetch(mockResponse);

    const tokenData = await fetchAccessToken(config);
    expect(tokenData.accessToken).toBe("mock-access-token");
    expect(tokenData.expiresIn).toBe(3600);
});

test("middleware should set Authorization header", async () => {
    const mockResponse = {
        status: 200,
        text: async () =>
            JSON.stringify({
                access_token: "mock-access-token",
                expires_in: 3600,
            }),
    } as Response;

    mockFetch(mockResponse);

    const mockRequest = {
        headers: new Map<string, string>(),
    } as unknown as Request;

    const mockParams: MiddlewareCallbackParams = {
        request: mockRequest,
        id: "test-id",
        options: {
            baseUrl: "https://api.example.com",
            parseAs: "json",
            querySerializer: () => "",
            bodySerializer: () => "",
            fetch: global.fetch as unknown as typeof fetch,
        },
        schemaPath: "",
        params: {},
    };

    const authMiddleware = createAuthMiddleware(config);

    await authMiddleware.onRequest?.(mockParams);

    expect(mockRequest.headers.get("Authorization")).toBe(
        "Bearer mock-access-token",
    );
});
