import type { BodyType, MiddlewareCallbackParams } from "openapi-fetch";
import {
    createAuthMiddleware,
    createVersionPrefixMiddleware,
    extractAccountId,
    fetchAccessToken,
} from "../src/client/middleware";

const config = {
    accountId: "ACCOUNTID",
    clientId: "CLIENTID",
    clientSecret: "CLIENTSECRET",
    audience: "https://T12345678@test.dintero.com/v1/accounts/T12345678",
    core: { baseUrl: "https://api.dintero.test" },
    checkout: { baseUrl: "https://checkout.dintero.test" },
};

const mockFetch = (response: Response) =>
    jest.spyOn(global, "fetch").mockResolvedValue(response);

afterEach(() => {
    jest.restoreAllMocks();
});

describe(fetchAccessToken.name, () => {
    test("should fetch and return a new access token", async () => {
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
});

describe(createAuthMiddleware.name, () => {
    test("should set Authorization header", async () => {
        const mockResponse = {
            status: 200,
            text: async () =>
                JSON.stringify({
                    access_token: "mock-access-token",
                    expires_in: 3600,
                }),
        } as Response;

        mockFetch(mockResponse);

        const request = new Request(
            "https://api.dintero.test/v1/accounts/T12345678/settlements",
        );

        const mockParams: MiddlewareCallbackParams = {
            request: request,
            id: "test-id",
            options: {
                baseUrl: "https://api.example.com",
                parseAs: "json",
                querySerializer: jest.fn(),
                bodySerializer: jest.fn(),
                fetch: jest.fn(),
            },
            schemaPath: "/accounts/{aid}/settlements",
            params: {},
        };

        const authMiddleware = createAuthMiddleware(config);

        await authMiddleware.onRequest?.(mockParams);

        expect(request.headers.get("Authorization")).toBe(
            "Bearer mock-access-token",
        );
    });
});

describe(createVersionPrefixMiddleware.name, () => {
    test("should prefix the request URL path with /v1 if schemaPath does not start with /v", async () => {
        const middleware = createVersionPrefixMiddleware();
        const request = new Request("https://api.example.com/test");

        const mockParams = {
            request,
            schemaPath: "/test",
            id: "test-id",
            options: {
                baseUrl: "https://api.example.com",
                parseAs: "json" as keyof BodyType<unknown>,
                querySerializer: jest.fn(),
                bodySerializer: jest.fn(),
                fetch: jest.fn(),
            },
            params: {},
        };

        if (middleware.onRequest) {
            const modifiedRequest = await middleware.onRequest(mockParams);
            expect(modifiedRequest).toBeDefined();
            if (modifiedRequest) {
                expect(modifiedRequest.url).toBe(
                    "https://api.example.com/v1/test",
                );
            }
        } else {
            fail("onRequest function is not defined in the middleware.");
        }
    });

    test("should not modify the request URL if schemaPath starts with /v", async () => {
        const middleware = createVersionPrefixMiddleware();
        const request = new Request("https://api.example.com/v1/test");

        const mockParams = {
            request,
            schemaPath: "/v1/test",
            id: "test-id",
            options: {
                baseUrl: "https://api.example.com/v",
                parseAs: "json" as keyof BodyType<unknown>,
                querySerializer: jest.fn(),
                bodySerializer: jest.fn(),
                fetch: jest.fn(),
            },
            params: {},
        };

        if (middleware.onRequest) {
            const modifiedRequest = await middleware.onRequest(mockParams);
            expect(modifiedRequest).toBeDefined();
            if (modifiedRequest) {
                expect(modifiedRequest.url).toBe(
                    "https://api.example.com/v1/test",
                );
            }
        } else {
            fail("onRequest function is not defined in the middleware.");
        }
    });
});

describe("extractAccountId", () => {
    test("should extract account ID from the URL with username", () => {
        const url = "https://T12345678@test.dintero.com/v1/accounts/T12345678";
        const accountId = extractAccountId(url);
        expect(accountId).toBe("T12345678");
    });

    test("should extract account ID from the URL path when username is absent", () => {
        const url = "https://test.dintero.com/v1/accounts/T12345678";
        const accountId = extractAccountId(url);
        expect(accountId).toBe("T12345678");
    });

    test("should throw an error if account ID cannot be extracted", () => {
        const url = "https://test.dintero.com/v1/accounts/";
        expect(() => extractAccountId(url)).toThrow(
            "Account ID could not be extracted from the audience URL.",
        );
    });

    test("should throw an error if URL is malformed", () => {
        const url = "not-a-valid-url";
        expect(() => extractAccountId(url)).toThrow(
            "Account ID could not be extracted from the audience URL.",
        );
    });

    test("should handle URLs with multiple path segments correctly", () => {
        const url =
            "https://T12345678@test.dintero.com/v1/accounts/another-segment/T12345678";
        const accountId = extractAccountId(url);
        expect(accountId).toBe("T12345678");
    });
});
