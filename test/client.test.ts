import { afterEach, beforeAll, describe, expect, test } from "@jest/globals";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { createClient } from "../src/client";
import type { TokenCache } from "../src/types";

const server = setupServer();

beforeAll(() => {
    server.listen({
        onUnhandledRequest: (request) => {
            throw new Error(
                `No request handler found for ${request.method} ${request.url}`,
            );
        },
    });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const options = {
    clientId: "CLIENTID",
    clientSecret: "CLIENTSECRET",
    audience: "https://T12345678@api.dintero.com/v1/accounts/T12345678",
};

describe("client.checkout", () => {
    test("POST /sessions-profile", async () => {
        const rawData = { success: true };

        const requestBody = {
            url: { return_url: "https://example.com" },
            order: {
                amount: 1000,
                currency: "NOK",
                items: [
                    {
                        id: "item1",
                        line_id: "line1",
                        description: "Item 1",
                        amount: 1000,
                        quantity: 1,
                        vat_amount: 0,
                        vat: 0,
                        eligible_for_discount: false,
                    },
                ],
                partial_payment: false,
                merchant_reference: "ref123",
            },
            profile_id: "profile123",
        };

        server.use(
            http.post(
                "https://api.dintero.com/v1/accounts/T12345678/auth/token",
                () => {
                    return HttpResponse.json(
                        {
                            access_token: "eyJhbGci...t7P4",
                            token_type: "Bearer",
                            expires_in: 86400,
                        },
                        { status: 200 },
                    );
                },
            ),
            http.post(
                "https://checkout.dintero.com/v1/sessions-profile",
                () => {
                    return HttpResponse.json(rawData, { status: 200 });
                },
            ),
        );

        const client = createClient(options);

        const { data, error, response } = await client.checkout.POST(
            "/sessions-profile",
            {
                body: requestBody,
            },
        );

        expect(error).toBeUndefined();
        expect(data).toEqual(rawData);
        expect(response.status).toEqual(200);
    });
});

describe("client.core", () => {
    test("client auth error", async () => {
        server.use(
            http.post(
                "https://api.dintero.com/v1/accounts/T12345678/auth/token",
                () => {
                    return HttpResponse.json(
                        { error: { errors: [], message: "FORBIDDEN" } },
                        { status: 403 },
                    );
                },
            ),
        );

        const client = createClient(options);
        expect(
            client.core.GET("/accounts/{aid}/settlements", {
                params: {
                    path: { aid: "T12345678" },
                },
            }),
        ).rejects.toThrow("Failed to fetch access token:");
    });

    test("client bad request", async () => {
        server.use(
            http.post(
                "https://api.dintero.com/v1/accounts/T12345678/auth/token",
                () => {
                    return HttpResponse.json(
                        {
                            access_token: "eyJhbGci...t7P4",
                            token_type: "Bearer",
                            expires_in: 86400,
                        },
                        { status: 200 },
                    );
                },
            ),
            http.get(
                "https://api.dintero.com/v1/accounts/T12345678/settlements",
                () => {
                    return HttpResponse.json(
                        { error: { errors: [], message: "BAD_REQUEST" } },
                        { status: 400 },
                    );
                },
            ),
        );

        const client = createClient(options);
        const { data, error } = await client.core.GET(
            "/accounts/{aid}/settlements",
            {
                params: { path: { aid: "T12345678" } },
                query: { limit: 1_000_000 },
            },
        );

        expect(error).toEqual({
            error: { errors: [], message: "BAD_REQUEST" },
        });
        expect(data).toBeUndefined();
    });

    test("GET /accounts/{aid}/settlements", async () => {
        const rawData = { test: { data: "foo" } };

        server.use(
            http.post(
                "https://api.dintero.com/v1/accounts/T12345678/auth/token",
                () => {
                    return HttpResponse.json(
                        {
                            access_token: "eyJhbGci...t7P4",
                            token_type: "Bearer",
                            expires_in: 86400,
                        },
                        { status: 200 },
                    );
                },
            ),
            http.get(
                "https://api.dintero.com/v1/accounts/T12345678/settlements",
                () => {
                    return HttpResponse.json(rawData, { status: 200 });
                },
            ),
        );

        const client = createClient(options);

        const { data, error } = await client.core.GET(
            "/accounts/{aid}/settlements",
            {
                params: { path: { aid: "T12345678" } },
            },
        );

        expect(error).toBeUndefined();
        expect(data).toEqual(rawData);
    });
});

describe("client.tokenCache", () => {
    test("use cached token", async () => {
        server.use(
            http.get(
                "https://api.dintero.com/v1/accounts/T12345678/settlements",
                () => {
                    return HttpResponse.json({}, { status: 200 });
                },
            ),
        );

        const tokenCache = { set: jest.fn(), get: jest.fn() };
        const client = createClient({
            ...options,
            tokenCache: tokenCache as unknown as TokenCache,
        });

        tokenCache.get.mockResolvedValue({ accessToken: "cached-token" });

        const { error } = await client.core.GET("/accounts/{aid}/settlements", {
            params: { path: { aid: "T12345678" } },
        });

        expect(error).toBeUndefined();
        expect(tokenCache.get).toHaveBeenCalledWith(options.audience);
        expect(tokenCache.set).not.toHaveBeenCalled();
    });

    test("no token in cache", async () => {
        server.use(
            http.post(
                "https://api.dintero.com/v1/accounts/T12345678/auth/token",
                () => {
                    return HttpResponse.json(
                        {
                            access_token: "eyJhbGci...t7P4",
                            token_type: "Bearer",
                            expires_in: 86400,
                        },
                        { status: 200 },
                    );
                },
            ),
            http.get(
                "https://api.dintero.com/v1/accounts/T12345678/settlements",
                () => {
                    return HttpResponse.json({}, { status: 200 });
                },
            ),
        );

        const tokenCache = {
            set: jest.fn((a) => Promise.resolve(a)),
            get: jest.fn(),
        };

        const client = createClient({
            ...options,
            tokenCache: tokenCache as unknown as TokenCache,
        });

        tokenCache.get.mockResolvedValue(undefined);

        const { error } = await client.core.GET("/accounts/{aid}/settlements", {
            params: { path: { aid: "T12345678" } },
        });

        expect(error).toBeUndefined();
        expect(tokenCache.get).toHaveBeenCalledWith(options.audience);
        expect(tokenCache.set).toHaveBeenCalledWith(
            options.audience,
            "eyJhbGci...t7P4",
            86400,
        );
    });
});
