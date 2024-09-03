import createClient from "openapi-fetch";
// import { AuthSDK } from "../middleware/authToken";
import { createAuthMiddleware } from "../middleware/authMiddleware"; // Adjust the path as needed
import Cache from "../middleware/cache";
import type { paths } from "src/types/payments/generated";
import type { ClientConfig } from "../dintero";

export type CheckoutPaths = Pick<
    paths,
    | "/sessions-profile"
    | "/accounts/{oid}/auth/token"
    | "/sessions/{session_id}"
    | "/sessions/{session_id}/cancel"
    | "/transactions/{id}/capture"
    | "/transactions/{id}/authorization"
    | "/transactions/{id}/refund"
    | "/transactions/{id}/void"
    | "/transactions/{id}"
    | "/transactions"
>;

const createCheckoutClient = (config: ClientConfig) => {
    const baseUrl = new URL(config.endpoint ?? "https://checkout.dintero.com");
    const cache = new Cache();

    // Create the auth middleware with the configuration and cache
    const authMiddleware = createAuthMiddleware(config, cache);

    const client = createClient<CheckoutPaths>({
        baseUrl: baseUrl.toString(),
    });

    client.use(authMiddleware); // Apply the middleware

    return client;
};

export default createCheckoutClient;
