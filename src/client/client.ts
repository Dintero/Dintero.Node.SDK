import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "../generated/payments";

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

export type CorePaths = Pick<
    paths,
    | "/accounts/{aid}/settlements"
    | "/accounts/{oid}/auth/token"
    | "/accounts/{aid}/reports/metadata"
    | "/accounts/{aid}/settlements/reports/configuration"
    | "/accounts/{aid}/settlements/reports/configuration/{id}"
    | "/accounts/{aid}/management/settings/approvals/payout-destinations"
    | "/accounts/{aid}/settlements/{settlementid}/attachments/{attachmentid}"
    | "/v2/accounts/{aid}/payout/fund-transfer"
    | "/v2/accounts/{aid}/payout/payout-destinations/{payout_destination_id}/balances"
    | "/v2/accounts/{aid}/payout/payout-destinations/{payout_destination_id}/transfers"
>;

// Create client for checkout with middleware
const createCheckoutClient = (authToken: string) => {
    const baseUrl = "https://checkout.dintero.com";

    // Middleware to add Authorization header
    const authMiddleware: Middleware = {
        async onRequest({ request }) {
            request.headers.set("Authorization", `Bearer ${authToken}`);
            return request;
        },
    };

    const client = createClient<CheckoutPaths>({ baseUrl });
    client.use(authMiddleware);

    return client;
};

// Create client for core with middleware
const createCoreClient = (authToken: string) => {
    const baseUrl = "https://api.dintero.com";

    // Middleware to add Authorization header
    const authMiddleware: Middleware = {
        async onRequest({ request }) {
            request.headers.set("Authorization", `Bearer ${authToken}`);
            return request;
        },
    };

    const client = createClient<CorePaths>({ baseUrl });
    client.use(authMiddleware);

    return client;
};

// Wrapper to create both clients
const createClientWrapper = (authToken: string) => {
    return {
        checkout: createCheckoutClient(authToken),
        core: createCoreClient(authToken),
    };
};

export default createClientWrapper;
