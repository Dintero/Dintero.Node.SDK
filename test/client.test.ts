import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import createClient from "openapi-fetch";
import { afterEach, beforeAll, expect, test } from "@jest/globals";
import type { paths } from "../src/generated/payments";

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

test("POST /sessions-profile", async () => {
    const rawData = { success: true };
    const BASE_URL = "https://checkout.dintero.com";

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
        http.post(`${BASE_URL}/sessions-profile`, () => {
            return HttpResponse.json(rawData, { status: 200 });
        }),
    );

    const client = createClient<paths>({
        baseUrl: BASE_URL,
    });

    const { data, error } = await client.POST("/sessions-profile", {
        body: requestBody,
    });

    expect(data).toEqual(rawData);
    expect(error).toBeUndefined();
});

test("my API call", async () => {
    const rawData = { test: { data: "foo" } };
    const BASE_URL = "https://api.dintero.com";
    const testAid = "12345";

    server.use(
        http.get(`${BASE_URL}/accounts/${testAid}/settlements`, () => {
            return HttpResponse.json(rawData, { status: 200 });
        }),
    );

    const client = createClient<paths>({
        baseUrl: BASE_URL,
    });

    const { data, error } = await client.GET("/accounts/{aid}/settlements", {
        params: {
            path: {
                aid: testAid,
            },
        },
    });

    expect(data).toEqual(rawData);
    expect(error).toBeUndefined();
});
