import createOpenApiFetchClient, { type Middleware } from "openapi-fetch";
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
const createAuthorizationMiddleware = (
    options: Required<ClientOptions>,
): Middleware => {
    return {
        async onRequest({ request }) {
            request.headers.set(
                "Authorization",
                `Bearer PLACEHOLDER_TOKEN(TODO)`,
            );
            return request;
        },
    };
};
type ClientOptions = {
    clientId: string;
    clientSecret: string;
    audience: string;
    core?: { baseUrl: string };
    checkout?: { baseUrl: string };
};
export const createClient = (options: ClientOptions) => {
    const config: Required<ClientOptions> = {
        checkout: { baseUrl: "https://checkout.dintero.com" },
        core: { baseUrl: "https://api.dintero.com" },
        ...options,
    };
    const authMiddleware = createAuthorizationMiddleware(config);
    const checkout = createOpenApiFetchClient<CheckoutPaths>(config.checkout);
    const core = createOpenApiFetchClient<CorePaths>(config.core);
    core.use(authMiddleware);
    return { checkout, core };
};
