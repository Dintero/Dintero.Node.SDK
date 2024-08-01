import createCheckoutClient from "../src/client/client";
import Cache from "../src/middleware/cache";
import { AuthSDK } from "../src/middleware/authToken";

jest.mock("../src/middleware/cache", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        set: jest.fn(),
        delete: jest.fn(),
        clear: jest.fn(),
    },
}));

jest.mock("../src/middleware/authToken", () => ({
    __esModule: true,
    AuthSDK: jest.fn().mockImplementation(() => ({
        getEnsureToken: jest.fn(),
        getTokenExpiry: jest.fn(),
    })),
}));

describe("createCheckoutClient", () => {
    let mockFetch: jest.Mock;
    let mockGetEnsureToken: jest.Mock;
    let mockGetTokenExpiry: jest.Mock;

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

    beforeEach(() => {
        jest.clearAllMocks();

        (Cache.get as jest.Mock).mockImplementation((key: string) => {
            console.log(`[Test] Cache.get called with key: ${key}`);
            if (key === "dintero_access_token") return "mocked-access-token";
            return null;
        });
        (Cache.set as jest.Mock).mockImplementation(
            (key: string, value: any) => {
                console.log(
                    `[Test] Cache.set called with key: ${key}, value: ${value}`,
                );
            },
        );

        mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: true }),
        });

        mockGetEnsureToken = jest.fn().mockResolvedValue("mocked-access-token");
        mockGetTokenExpiry = jest.fn().mockResolvedValue(3600);

        (AuthSDK as jest.Mock).mockImplementation(() => ({
            getEnsureToken: mockGetEnsureToken,
            getTokenExpiry: mockGetTokenExpiry,
        }));
    });

    it("should make a successful POST request to /sessions-profile", async () => {
        const client = createCheckoutClient({
            oid: "test-oid",
            audience: "https://checkout.dintero.com",
            clientId: "test_id",
            clientSecret: "test_secret",
            fetch: mockFetch,
        });

        try {
            await client.POST("/sessions-profile", {
                body: requestBody,
                headers: { "Content-Type": "application/json" },
            });
            console.log("[Test] Finished POST request");
        } catch (error) {
            console.error("[Test] Error during POST request:", error);
            throw error;
        }

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(
            "https://checkout.dintero.com/sessions-profile",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Content-Type": "application/json",
                    Authorization: "Bearer mocked-access-token",
                }),
                body: JSON.stringify(requestBody),
            }),
        );
    });
});
