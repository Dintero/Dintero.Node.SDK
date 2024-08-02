import createCheckoutClient from "../src/client/client";
import { AuthSDK } from "../src/middleware/authToken";
import Cache from "../src/middleware/cache";

jest.mock("../src/middleware/cache");
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
    let mockCacheInstance: jest.Mocked<Cache>;

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

        mockCacheInstance = new Cache() as jest.Mocked<Cache>;
        mockCacheInstance.get.mockImplementation((key: string) => {
            if (key === "dintero_access_token") return "mocked-access-token";
            return null;
        });

        mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: true }),
            headers: new Headers(),
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
        } catch (error) {
            console.error("[Test] Error during POST request:", error);
            throw error;
        }

        const fetchCallArgs = mockFetch.mock.calls[0][0] as Request;

        expect(fetchCallArgs.method).toBe("POST");
        expect(fetchCallArgs.url).toBe(
            "https://checkout.dintero.com/sessions-profile",
        );
        expect(fetchCallArgs.headers.get("Content-Type")).toBe(
            "application/json",
        );
        expect(fetchCallArgs.headers.get("Authorization")).toBe(
            "Bearer mocked-access-token",
        );

        const body = await fetchCallArgs.json();
        expect(body).toEqual(requestBody);
    });
});
