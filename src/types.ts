import type { paths } from "./generated/payments";

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
    | "/v2/accounts/{aid}/payout/fund-transfers"
    | "/v2/accounts/{aid}/payout/payout-destinations/{payout_destination_id}/balances"
    | "/v2/accounts/{aid}/payout/payout-destinations/{payout_destination_id}/transfers"
>;

export type ClientOptions = {
    clientId: string;
    clientSecret: string;
    audience: string;
    core?: { baseUrl: string };
    checkout?: { baseUrl: string };
};
