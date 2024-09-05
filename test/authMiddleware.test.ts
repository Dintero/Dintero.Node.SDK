import authMiddleware, {
    fetchAccessToken,
} from "../src/middleware/authMiddleware";
import type { MiddlewareCallbackParams } from "openapi-fetch";

// Mock environment variables
process.env.OID = "test-account-id";
process.env.CLIENT_ID = "test-client-id";
process.env.CLIENT_SECRET = "test-client-secret";

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

    const tokenData = await fetchAccessToken();
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
    } as any;

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

    await authMiddleware.onRequest?.(mockParams);

    expect(mockRequest.headers.get("Authorization")).toBe(
        "Bearer mock-access-token",
    );
});
