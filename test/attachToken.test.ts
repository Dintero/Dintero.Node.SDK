import { AuthSDK } from "../src/middleware/authToken";
import { attachToken } from "../src/middleware/attachToken";
import type { Dispatcher } from "undici";

jest.mock("../src/middleware/authToken", () => {
    return {
        AuthSDK: jest.fn().mockImplementation(() => ({
            getEnsureToken: jest.fn(),
            getToken: jest.fn(),
        })),
    };
});

describe("attachToken", () => {
    let authSDK: AuthSDK;
    let options: Dispatcher.RequestOptions;

    beforeEach(() => {
        authSDK = new AuthSDK(
            "https://api.example.com",
            "test_oid",
            "test_client_id",
            "test_client_secret",
        );

        options = {
            method: "GET",
            path: "/test-endpoint",
            headers: {
                "Content-Type": "application/json",
            },
        };

        jest.clearAllMocks();
    });

    it("should attach a token to the request options", async () => {
        const mockToken = "test_token";

        (authSDK.getEnsureToken as jest.Mock).mockResolvedValue(undefined);
        (authSDK.getToken as jest.Mock).mockReturnValue(mockToken);

        const updatedOptions = await attachToken(options, authSDK);

        expect(updatedOptions.headers).toHaveProperty(
            "Authorization",
            `Bearer ${mockToken}`,
        );
        expect(authSDK.getEnsureToken).toHaveBeenCalledTimes(1);
        expect(authSDK.getToken).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if it fails to obtain a token", async () => {
        (authSDK.getEnsureToken as jest.Mock).mockRejectedValue(
            new Error("Failed to fetch token"),
        );

        await expect(attachToken(options, authSDK)).rejects.toThrow(
            "Failed to fetch token",
        );
        expect(authSDK.getEnsureToken).toHaveBeenCalledTimes(1);
        expect(authSDK.getToken).not.toHaveBeenCalled();
    });
});
