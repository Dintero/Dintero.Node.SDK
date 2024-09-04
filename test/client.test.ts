import createClient from "openapi-fetch";
import createClientWrapper from "../src/client/client";
import type { paths } from "../src/generated/payments";

jest.mock("openapi-fetch");

describe("createClientWrapper", () => {
    const mockCreateClient = createClient as jest.MockedFunction<
        typeof createClient
    >;
    const mockUse = jest.fn();
    const mockRequest = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        mockCreateClient.mockImplementation(() => {
            return {
                use: mockUse,
                GET: jest.fn().mockImplementation((url, init) => {
                    if (
                        url === "/accounts/{aid}/settlements" &&
                        init?.params?.path?.aid
                    ) {
                        const { aid } = init.params.path;
                        const finalUrl = url.replace("{aid}", aid);

                        return mockRequest(finalUrl, init);
                    }
                    return mockRequest(url, init);
                }),
                POST: mockRequest,
                PUT: mockRequest,
                DELETE: mockRequest,
            } as any;
        });
    });

    it("should create a checkout client with the correct base URL and middleware", async () => {
        const authToken = "test-token";
        const { checkout } = createClientWrapper(authToken);

        expect(mockCreateClient).toHaveBeenCalledWith({
            baseUrl: "https://checkout.dintero.com",
        });

        expect(mockUse).toHaveBeenCalled();

        const mockRequestObject = { headers: new Headers() };
        const middlewareFn = mockUse.mock.calls[0][0].onRequest;
        await middlewareFn({ request: mockRequestObject } as any);

        expect(mockRequestObject.headers.get("Authorization")).toBe(
            "Bearer test-token",
        );

        const requestBody: paths["/sessions-profile"]["post"]["requestBody"]["content"]["application/json"] =
            {
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

        await checkout.POST("/sessions-profile", { body: requestBody });

        expect(mockRequest).toHaveBeenCalled();
    });

    it("should create a core client with the correct base URL and middleware", async () => {
        const authToken = "test-token";
        const { core } = createClientWrapper(authToken);

        expect(mockCreateClient).toHaveBeenCalledWith({
            baseUrl: "https://api.dintero.com",
        });

        expect(mockUse).toHaveBeenCalled();

        const mockRequestObject = { headers: new Headers() };
        const middlewareFn = mockUse.mock.calls[1][0].onRequest;
        await middlewareFn({ request: mockRequestObject } as any);

        expect(mockRequestObject.headers.get("Authorization")).toBe(
            "Bearer test-token",
        );

        const aid = "test-aid";
        await core.GET("/accounts/{aid}/settlements", {
            params: {
                path: { aid },
            },
        });

        expect(mockRequest).toHaveBeenCalledWith(
            `/accounts/${aid}/settlements`,
            expect.objectContaining({
                params: {
                    path: { aid },
                },
            }),
        );
    });
});
