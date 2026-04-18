import assert from "node:assert";
import { after, afterEach, before, describe, test } from "node:test";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { createClient } from "../src/client";

const server = setupServer();

before(() => {
    server.listen({
        onUnhandledRequest: (request) => {
            throw new Error(
                `No request handler found for ${request.method} ${request.url}`,
            );
        },
    });
});

afterEach(() => server.resetHandlers());
after(() => server.close());

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

        assert.strictEqual(error, undefined);
        assert.deepStrictEqual(data, rawData);
        assert.strictEqual(response.status, 200);
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
        await assert.rejects(
            client.core.GET("/accounts/{aid}/settlements", {
                params: {
                    path: { aid: "T12345678" },
                },
            }),
            /Failed to fetch access token:/,
        );
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

        assert.deepStrictEqual(error, {
            error: { errors: [], message: "BAD_REQUEST" },
        });
        assert.strictEqual(data, undefined);
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

        assert.strictEqual(error, undefined);
        assert.deepStrictEqual(data, rawData);
    });
});
