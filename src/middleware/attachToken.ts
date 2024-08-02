import type { AuthSDK } from "./authToken";
import type { Dispatcher } from "undici";

export async function attachToken(
    options: Dispatcher.RequestOptions,
    authSDK: AuthSDK,
): Promise<Dispatcher.RequestOptions> {
    try {
        await authSDK.getEnsureToken();
        const token = authSDK.getToken();
        if (!token) {
            throw new Error("Failed to fetch token");
        }
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
        return options;
    } catch (error) {
        throw new Error("Failed to fetch token");
    }
}
