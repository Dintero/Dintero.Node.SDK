export interface paths {
    "/sessions-profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create checkout session from profile
         * @description Create a corresponding Checkout Session for an order placed in your system
         *     using predefined session profile
         *
         *     #### Session with Instabank
         *
         *     Note that `items` is a required property when creating a session with
         *     Instabank configured.
         *
         *     scopes:
         *     - admin:checkout
         *     - write:checkout
         *
         */
        post: operations["checkout_session_profile_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sessions/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get checkout session details
         * @description scopes:
         *     - admin:checkout
         *     - read:checkout
         *
         */
        get: operations["checkout_session_get"];
        /**
         * Update checkout session details
         * @description Session must be locked for paying before updating.
         *
         *     **Requirements**:
         *     - `order.shipping_option` must be included in `express_shipping_options` if both are set.
         *     - `order.amount` must be equal to the sum of `order.items` and `order.shipping_option`
         *
         *     scopes:
         *     - admin:checkout
         *     - read:checkout
         *
         */
        put: operations["checkout_session_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sessions/{session_id}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Cancel session
         * @description
         *     Cancel a session
         *
         *     The session transaction will be voided in case where it is
         *     initialized or authorized.
         *
         *     Cancel is not allowed in case where the current transaction
         *     state is not initialized or authorized.
         *
         *     scopes:
         *     - admin:checkout
         *     - write:checkout
         *
         */
        post: operations["checkout_session_cancel_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sessions/payment-token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Payment token session
         * @description
         *     This endpoint lets you create payment and recurrence tokens without reserving
         *     or charging any amount.
         *
         *     The URL returned by this endpoint opens a web site where the customer
         *     can enter their payment details, e.g. card information.
         *
         *     The payment details will be validated and a transaction with a
         *     payment/recurrence token will be created on success containing the payment
         *     token created from the customer payment details.
         *
         *     - [GET /v1/transactions/{id}?includes=card.payment_token](#operation/transactions_id_get)
         *     - [GET /v1/transactions/{id}?includes=card.recurrence_token](#operation/transactions_id_get)
         *
         *     scopes:
         *     - admin:checkout
         *     - write:checkout
         *
         */
        post: operations["checkout_payment_token_session_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/{id}/capture": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Capture a transaction
         * @description Captures a transaction that was created with the Checkout
         *     endpoint with a `capture_now` value of `false`.
         *
         *     #### Capture Instabank transaction
         *
         *     Note that `items` is required when capturing a transaction
         *     with `payment_product=instabank`. The items must include
         *     the lines to Capture, with `line_id`, `quantity` and `amount`.
         *
         *     scopes:
         *     - admin:checkout
         *     - write:checkout
         *
         */
        post: operations["transactions_id_capture_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/{id}/authorization": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Extend authorization on transaction
         * @description Extend authorization on transaction for greater time to capture.
         *     NB: Currently only supported for Klarna.
         *
         */
        post: operations["transaction_tid_extend_authorization_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/{id}/refund": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Refund transaction
         * @description Once a transaction has been successfully captured,
         *     a refund operation is available. Like other operations,
         *     refund can be partial or total
         *
         *     #### Refund Instabank transaction
         *
         *     Note that `items` is required when refunding a transaction
         *     with `payment_product=instabank`. The items must include the
         *     lines to Refund, with `line_id`, `quantity` and `amount`.
         *
         *     scopes:
         *     - admin:checkout
         *     - write:checkout
         *
         */
        post: operations["transactions_id_refund_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/{id}/void": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Void transaction
         * @description At any moment before capture of a transaction, it is
         *     possible to cancel an authorization. This operation is
         *     called voiding and can be performed by doing a POST to
         *     this endpoint
         *
         *     #### Void on part capture
         *
         *     Void after a part capture will cancel the difference between
         *     the capture amount and the authorization amount.
         *
         *     Void on part capture is only supported on following types:
         *       - `payex.creditcard`
         *       - `payex.mobilepay`
         *       - `payex.vipps`
         *       - `payex.applepay`
         *       - `payex.clicktopay`
         *       - `payex.googlepay`
         *       - `vipps`
         *       - `klarna.klarna`
         *       - `klarna.billie`
         *
         *     scopes:
         *     - admin:checkout
         *     - write:checkout
         *
         */
        post: operations["transactions_id_void_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a transaction
         * @description scopes:
         *     - admin:checkout
         *     - read:checkout
         *
         */
        get: operations["transactions_id_get"];
        /**
         * Update a transaction
         * @description scopes:
         *     - admin:checkout
         *     - write:checkout
         *
         */
        put: operations["transactions_id_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all transactions
         * @description scopes:
         *     - admin:checkout
         *     - read:checkout
         *
         */
        get: operations["transactions_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{aid}/settlements": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List settlements
         * @description List settlements
         *
         *     *scopes*:
         *       - admin:billing
         *       - read:billing
         *       - admin:reports
         *       - read:reports
         *       - admin:settlements
         *       - read:settlements
         *
         */
        get: operations["aid_settlements_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{aid}/settlements/reports/configuration": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List settlement report configurations
         * @description List settlement report configurations
         *
         *     *scopes*:
         *       - admin:billing
         *       - read:billing
         *       - admin:reports
         *       - read:reports
         *       - admin:settlements
         *       - read:settlements
         *
         */
        get: operations["aid_settlement_report_config_list"];
        put?: never;
        /**
         * Create settlement report configurations
         * @description Create settlement report configurations
         *
         *     *scopes*:
         *       - admin:billing
         *       - admin:reports
         *       - admin:settlements
         *       - write:settlements
         *
         */
        post: operations["aid_settlement_report_config_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{aid}/settlements/reports/configuration/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get settlement report configuration
         * @description Get settlement report configuration
         *
         *     *scopes*:
         *       - admin:billing
         *       - read:billing
         *       - admin:reports
         *       - read:reports
         *       - admin:settlements
         *       - read:settlements
         *
         */
        get: operations["aid_settlement_report_config_details"];
        /**
         * Update settlement report configuration
         * @description Update settlement report configuration
         *
         *     *scopes*:
         *       - admin:billing
         *       - write:billing
         *       - admin:settlements
         *       - write:settlements
         *
         */
        put: operations["aid_settlement_report_config_update"];
        post?: never;
        /**
         * Delete settlement report configuration
         * @description Delete settlement report configuration
         *
         *     *scopes*:
         *       - admin:billing
         *       - write:billing
         *       - admin:settlements
         *       - write:settlements
         *
         */
        delete: operations["aid_settlement_report_config_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{aid}/settlements/{settlementid}/attachments/{attachmentid}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Download attachment
         * @description Download a settlement attachment
         *
         *     *scopes*:
         *       - admin:billing
         *       - read:billing
         *       - admin:reports
         *       - read:reports
         *       - admin:settlements
         *       - read:settlements
         *
         */
        get: operations["settlement_attachment_download"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{aid}/reports/metadata": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List report metadata
         *
         * @description Get list of report metadata for the account
         *
         *     Scopes:
         *       - read:reports
         *       - admin:reports
         *
         */
        get: operations["api_reports_metadata_list_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/branding/logos/{logos}/variant/{variant}/color/{color}/width/{width}/{template}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get payment logos image
         * @description Endpoint that returns an svg that can be used to show the world your payment options. [Go to the documentation for the checkout branding endpoints.](/docs/checkout-branding)
         */
        get: operations["branding_logoframe"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/branding/profiles/{profile_id}/variant/{variant}/color/{color}/width/{width}/{template}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get checkout profile image
         * @description Endpoint that returns an svg that can be used to show the world your payment options. [Go to the documentation for the checkout branding endpoints.](/docs/checkout-branding)
         */
        get: operations["branding_profile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{oid}/auth/token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Get Token
         * @description Use this endpoint to directly request an access_token
         *
         *     ### Client Access Token
         *     Use HTTP Basic authentication scheme for
         *     authenticating grant_type `client_credentials`, use
         *     client_id/client_secret as user/password.
         *
         *     ### Code/Password Token
         *     Use HTTP Bearer authentication scheme for authenticating
         *     grant_type `authorization_code` or `password`, where the
         *     Bearer value must be a JWT toke with access to the token
         *     endpoint.
         *
         *     ### Account User Token
         *     Use HTTP Bearer authentication scheme for authenticating
         *     grant_type `account_user_token`, where the Bearer value
         *     must be a account user JWT token.
         *
         *     > Use ID token as Bearer toke if the user was authenticated
         *     > externally. The ID must include a `email` claim that
         *     > identifies the account user.
         *
         *     ### Refresh Token
         *     Use HTTP Bearer authentication scheme for authenticating
         *     grant_type `refresh_token` where the Bearer value **must**
         *     be an Access Token for the clients that was used to create
         *     the Refresh Token.
         *
         *     ### Multi-factor authentication (MFA)
         *
         *     When a request is made to the endpoint to get an access token,
         *     normally you either get an error, or you get an access token.
         *     However, when the MFA is enabled, the endpoint may return a new
         *     error with `error.code: mfa_required`.
         *
         *     When an `mfa_required` error is returned, the client must perform
         *     a `challenge`. This is done by sending a request to the
         *     [auth/mfa/challenge](#operation/aid_auth_mfa_challenge_post) endpoint
         *
         *     To verify MFA using an OOB challenge, the client must make a request to
         *     this endpoint with `grant_type=mfa-oob`. Include the `oob_code` you
         *     received from the challenge response, as well as the `mfa_token` you
         *     received as part of mfa_required error.
         *
         *     scopes:
         *     - admin:accounts
         *     - write:accounts
         *     - write:accounts:/auth/users
         *     - write:accounts:/auth/users/no-mfa
         *
         */
        post: operations["aid_auths_oauth_token_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/accounts/{aid}/management/settings/approvals/payout-destinations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List seller approvals
         *
         * @description
         *     scopes:
         *     - admin:accounts
         *     - read:accounts
         *
         */
        get: operations["aid_management_settings_approvals_payout_destinations_get"];
        put?: never;
        /**
         * New seller approval
         *
         * @description Initiate an application for a new seller for Dintero Payout with
         *     split-payment. The application will contain a link to an URL where the
         *     signatory of the seller will need to finish submission of the
         *     case contract and sign it. Dintero will perform a KYC, AML and bank ownership
         *     check on the seller before the application `case_status`will be
         *     updated to `ACTIVE`. Once the application is approved, the payout
         *     destination will be added automatically to the Dintero Payout service.
         *
         *     scopes:
         *     - admin:accounts
         *     - write:accounts
         *     ---
         *       For testing purposes it is possible to auto-approve or decline a new seller
         *       by adding one of the following values to `payout_destination_description`:
         *
         *       - "AUTO_APPROVE": Approves the case automatically, the case status will be set to `ACTIVE`
         *       - "AUTO_DECLINE": Declines the case automatically, the case status will be set to `DECLINED`
         *       - "AUTO_WAITING_FOR_SIGNATURE": Leaves the signature check for the case, the case status will be set to `WAITING_FOR_SIGNATURE`
         *
         *     NOTE: This behavior is only available in test mode, i.e. with an `aid` prefixed with "T".
         *
         */
        post: operations["aid_management_settings_approvals_payout_destinations_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sessions/pay": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create and pay merchant initiated session
         * @description For merchant initiated payments, where the customer is not involved.
         *
         *     Receives a session and pays it with the given card token.
         *
         *     > Merchant is resposible for managing their retry policy for payments
         *     > that fails, and not retry when payment fails with `DO_NOT_RETRY` error.
         *     >
         *     > 200 response will be returned when request fails due to authorization error. Transaction
         *     > will have status `FAILED` and error information can  be found at `events.error`.
         *     >
         *     > Insufficient error handling will cause cards to be blocked
         *     > https://docs.dintero.com/docs/checkout/tokenization#do-not-try-again--excessive-reattempts
         *
         *     scopes:
         *     - admin:checkout
         *     - write:checkout
         *
         */
        post: operations["checkout_session_pay_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/examples/discount_code_callback_url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Discount codes Update
         * @description This API endpoint on the merchant side allows Dintero to get
         *     shipping_options and order with discounts based on the provided
         *     session that had its `order.discount_codes` updated.
         *
         */
        post: operations["example_discount_codes_callback_url"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/examples/session_url_callback": {
        parameters: {
            query: {
                /** @description The Id for the transaction created */
                transaction_id: string;
                /** @description Session Id. Either `session_id` or `sid` is required. */
                session_id?: string;
                /** @description Session Id if `sid_parameter_name=sid`. Either `session_id` or `sid` is required. */
                sid?: string;
                /** @description The merchants reference */
                merchant_reference: string;
                /** @description ISO 8601 format for when the transaction was created */
                time: string;
                /**
                 * @description Error code
                 * @example authorization
                 */
                error?: string;
                /** @description Event applied to transaction */
                event?: string;
                /**
                 * @description Id for the event applied to transaction
                 * @example 3
                 */
                event_id?: string;
                /**
                 * @description The method to use when delivering the callback
                 * @example POST
                 */
                method?: string;
                /** @description Report error callback */
                report_error?: boolean;
                /** @description Delay before delivering the callback */
                delay_callback?: number;
                /**
                 * @description Deliver callback on othe transaction events
                 * @example CAPTURE
                 */
                report_event?: string;
            };
            header?: {
                /** @description Dintero signature that can be used to verify the payload from the
                 *     callback.
                 *
                 *     Only include if a signature secret exist:
                 *
                 *     - [POST /v1/admin/signature](#operation/admin_signature_post)
                 *      */
                "Dintero-Signature"?: string;
            };
            path?: never;
            cookie?: never;
        };
        /**
         * Session Callback
         * @description This API endpoint on the merchant side allows Dintero to notify
         *     the `session.url.callback_url` when the payment is completed
         *
         *     > The `transaction_id` is optional if `report_error=true`
         *
         */
        get: operations["example_session_get_callback_url"];
        put?: never;
        /**
         * Session Callback
         * @description This API endpoint on the merchant side allows Dintero to notify
         *     the `session.url.callback_url` when the payment is completed
         *     > POST is only use if `callback_url` includes `method=POST` query parameter.
         *
         *     > The `body` and `transaction_id` is optional if `report_error=true`
         *
         */
        post: operations["example_session_post_callback_url"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/examples/shipping_address_callback_url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Address Update
         * @description This API endpoint on the merchant side allows Dintero to get
         *     shipping options based on the provided session after an address
         *     update
         *
         */
        post: operations["example_shipping_address_callback_url"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/accounts/{aid}/payout/fund-transfer": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Initiate fund transfer
         * @description You can use the endpoint to programmatically initiate a fund transfer
         *     between two sellers
         *
         *     Requests for fund transfers are processed asynchronously so in the response,
         *     we only inform you that we received your request. You'll get the result in
         *     the settlement report
         *
         */
        post: operations["v2_aid_payout_fund_transfers_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/accounts/{aid}/payout/payout-destinations/{payout_destination_id}/balances": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get seller balances
         * @description Get seller balance per currency
         *
         */
        get: operations["v2_aid_payout_destination_balance_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/accounts/{aid}/payout/payout-destinations/{payout_destination_id}/transfers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get seller transfers
         * @description Get list of transfers for a seller
         *
         */
        get: operations["v2_aid_payout_destination_transfers_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        SwishPayment: {
            payment_product_type: "SwishPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & {
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *      */
            phone_number: string;
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
        });
        VippsPayment: {
            payment_product_type: "VippsPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & {
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *      */
            phone_number: string;
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
        });
        BamboraMobilePayPayment: {
            payment_product_type: "BamboraMobilePayPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & {
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *      */
            phone_number: string;
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
        });
        PayExCreditcardPayment: {
            payment_product_type: "PayExCreditcardPayment";
        } & (Omit<components["schemas"]["PayPayment"], "payment_product_type"> & {
            /** @enum {string} */
            operation: "unscheduled_purchase" | "recurring_purchase";
        });
        BamboraCreditcardPayment: {
            payment_product_type: "BamboraCreditcardPayment";
        } & (Omit<components["schemas"]["PayPayment"], "payment_product_type"> & {
            /** @enum {string} */
            operation: "unscheduled_purchase" | "recurring_purchase";
        });
        CollectorInvoiceB2BPayment: {
            payment_product_type: "CollectorInvoiceB2BPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & Omit<components["schemas"]["CollectorPaymentDetails"], "payment_product_type"> & {
            shipping_address: components["schemas"]["CollectorB2BAddress"];
            billing_address: components["schemas"]["CollectorB2BAddress"];
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
        });
        CollectorFinancePayment: {
            payment_product_type: "CollectorFinancePayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & components["schemas"]["CollectorDetails"] & Omit<components["schemas"]["CollectorPaymentDetails"], "payment_product_type"> & {
            shipping_address: components["schemas"]["CollectorAddress"];
            billing_address: components["schemas"]["CollectorAddress"];
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
            /** @description Code from authorized customer.
             *      */
            authorization_code?: string;
        });
        PayExTokenProvider: {
            payment_product_type: "PayExTokenProvider";
        } & (Omit<components["schemas"]["TokenProvider"], "payment_product_type"> & {
            token_types: ("payment_token" | "recurrence_token")[];
        });
        BamboraTokenProvider: {
            payment_product_type: "BamboraTokenProvider";
        } & (Omit<components["schemas"]["TokenProvider"], "payment_product_type"> & {
            token_types: "payment_token"[];
        });
        /** @description Contains href URI to initiate a Click to Pay payment using Swedbank Pay (v3)
         *      */
        PayExV3ClickToPayPaymentOperation: {
            rel: "PayExV3ClickToPayPaymentOperation";
        } & ({
            /** @enum {string} */
            content_type: "application/javascript";
            /**
             * @description Contains the URI to initiate a payment.
             *
             * @example https://ecom.payex.com/payment/core/js...
             */
            href: string;
        } & Omit<components["schemas"]["PaymentOperation"], "rel">);
        PayExVippsPayment: {
            payment_product_type: "PayExVippsPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & {
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *      */
            phone_number: string;
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
        });
        /** @description Contains href URI to initiate a pay with Klarna
         *      */
        KlarnaPaymentOperation: {
            rel: "KlarnaPaymentOperation";
        } & ({
            /** @enum {string} */
            rel: "pay-klarna";
            /**
             * @description Contains the URI to initiate a payment.
             *
             * @example https://checkout.dintero.com/v1/sessions/{session_id}/pay
             */
            href: string;
            /** @enum {string} */
            method: "POST";
            /** @description Client token to be passed to the JS client while initializing the
             *     JS SDK
             *      */
            client_token: string;
            /** @description String representation of the payment order to be used with the payment operations.
             *      */
            order: string;
            /** @enum {string} */
            content_type: "application/json";
        } & Omit<components["schemas"]["PaymentOperation"], "rel">);
        CollectorInvoiceB2BPreapprovedPayment: {
            payment_product_type: "CollectorInvoiceB2BPreapprovedPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & Omit<components["schemas"]["CollectorPaymentDetails"], "payment_product_type"> & {
            shipping_address: components["schemas"]["CollectorB2BAddress"];
            /** @description Optional query parameter. SMS-confirm-code. To verify the identity of the payee. */
            scc?: string;
            /** @description Id to represent the company being paid from */
            company_id: string;
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
        });
        BamboraVippsPayment: {
            payment_product_type: "BamboraVippsPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & {
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *      */
            phone_number: string;
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
        });
        PayExSwishPayment: {
            payment_product_type: "PayExSwishPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & {
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *
             *     The `redirect_url` in the response will be a Swish URL that will
             *     open the app with the payment request if no phone_number is provided.
             *      */
            phone_number?: string;
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
        });
        /** @description Contains href URI to initiate a pay with Bambora Checkout
         *      */
        BamboraPaymentOperation: {
            rel: "BamboraPaymentOperation";
        } & (Omit<components["schemas"]["PaymentOperation"], "rel"> & {
            session: {
                /** @example fb49265d30aa4f1bb327b943c4d43b14 */
                token: string;
            };
            /**
             * @description Contains the URI to initiate a payment.
             *
             * @example https://v1.checkout.bambora.com/fb49265d30aa4f1bb327b943c4d43b14
             */
            href: string;
        });
        CollectorInstallmentPayment: {
            payment_product_type: "CollectorInstallmentPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & components["schemas"]["CollectorDetails"] & Omit<components["schemas"]["CollectorPaymentDetails"], "payment_product_type"> & {
            product: {
                /**
                 * @description Id of the payment product
                 * @example IF_3_001
                 */
                id: string;
            };
            shipping_address: components["schemas"]["CollectorAddress"];
            billing_address: components["schemas"]["CollectorAddress"];
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
            /** @description Code from authorized customer.
             *      */
            authorization_code?: string;
        });
        CollectorInvoicePayment: {
            payment_product_type: "CollectorInvoicePayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & components["schemas"]["CollectorDetails"] & Omit<components["schemas"]["CollectorPaymentDetails"], "payment_product_type"> & {
            shipping_address: components["schemas"]["CollectorAddress"];
            billing_address: components["schemas"]["CollectorAddress"];
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
            /** @description Code from authorized customer.
             *      */
            authorization_code?: string;
        });
        KlarnaPayment: {
            payment_product_type: "KlarnaPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & {
            /** @description Token received from Klarna on the client-side after successful authorization
             *      */
            authorization_token: string;
            billing_address: components["schemas"]["KlarnaAddress"];
            shipping_address: components["schemas"]["KlarnaAddress"];
            /**
             * @description Combination of purchase country and language. Example: `"en-GB"`
             *
             * @example en-GB
             */
            locale: string;
        });
        PayExMobilePayPayment: {
            payment_product_type: "PayExMobilePayPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & {
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *      */
            phone_number: string;
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
        });
        /** @description Client token credential */
        client_credentials: {
            grant_type: "client_credentials";
        } & (Omit<components["schemas"]["AuthToken"], "grant_type"> & {
            /**
             * @description The unique identifier of the target API you want to access.
             *     The audience must be a grant associated with the client
             *
             * @example https://api.dintero.com/v1/accounts/P00000000
             */
            audience: string;
        });
        BamboraCreditcardCitPayment: {
            payment_product_type: "BamboraCreditcardCitPayment";
        } & (Omit<components["schemas"]["Payment"], "payment_product_type"> & {
            /** @description If true will either make the backend add or update a signed cookie with
             *     customer data. If false the cookie will be removed. If not set,
             *     any existing cookie will remain unchanged
             *      */
            remember_me?: boolean;
            browser_information: {
                /** @description Whether browser can execute Java or not. The value of navigator.javaEnabled browser property.
                 *      */
                java_enabled: boolean;
                /** @description Whether browser can execute JavaScript or not.
                 *      */
                javascript_enabled: boolean;
                /**
                 * @description The bit depth of the colour palette for displaying images, in bits per pixel. The value of screen.colorDepth browser property.
                 *
                 * @example 24
                 */
                color_depth: number;
                /**
                 * @description Total height of the browser screen in pixels. The value of screen.height browser property.
                 *
                 * @example 1080
                 */
                screen_height: number;
                /**
                 * @description Total width of the browser screen in pixels. The value of screen.width browser property.
                 *
                 * @example 1920
                 */
                screen_width: number;
                /**
                 * @description Time difference between UTC time and the browser local time, in minutes.
                 *
                 * @example 180
                 */
                timezone_offset: number;
            };
        });
        /**
         * Format: uri
         * @description URL that Checkout will call when the session
         *     payment is complete and the transaction has been authorized.
         *
         *     > **Callback is only delivered to HTTPS URLs**
         *
         *     > A callback done with a transaction with status `ON_HOLD` will receive
         *     > an aditional callback (later) when the transaction state changes status
         *     > from `ON_HOLD`.
         *
         *     > The callback may be received after the transaction is `CAPTURED`
         *     > in case when the transaction was created from a session where
         *     > `auto_capture` was enabled.
         *
         *     Unlike the `return_url` the `callback_url` is system-to-system
         *     which means delivery is guaranteed.
         *
         *     Once a session payment is complete the callback_url is invoked as a
         *     `GET` request to notify your system that the payment has been approved.
         *
         *     - A callback_url with `method=POST` query parameter will be invoked as a
         *       `POST` request with the transaction included in the request body.
         *
         *     - A callback_url with `report_error=true` will enable the callback_url
         *       to be called if the payment failed with error `cancelled`, `authorization`
         *       or `failed`.
         *
         *     - A callback_url with `delay_callback=<seconds>` will delay the callback
         *       before trying to deliver the callback. The **maximum** delay is 60 seconds.
         *
         *     - A callback_url with `report_event={EVENT}` will enable the callback_url
         *       to be called if a payment event has been applied to the transaction. Valid
         *       values are `CAPTURE`, `REFUND` and `VOID`. The callback_url can contain
         *       multiple `report_event` query parameters. An `event` query parameter will be
         *       included in the request sent to the callback_url.
         *
         *     - A callback_url with `includes=session` will enable the callback_url
         *       to include the session data in the body.
         *
         *     - A callback_url with `sid_parameter_name=sid` will change the query param `session_id`
         *       to `sid` to avoid false session fixation alarms in firewalls. Possible values: `sid`, `session_id`
         *
         *     A successful delivery to an HTTPS callback_url sometimes requires
         *     more than one attempt. This can be the case, for example, if the server
         *     hosting the callback_url is down for maintenance or is experiencing
         *     heavy traffic.
         *
         *     Dintero attempts a retry only after a failed delivery attempt, following
         *     situations is considered as failed delivery
         *
         *      - HTTP status code 100 to 101 and 500 to 599 (inclusive)
         *        (HTTP status code 400 to 499 is considered as permanent failure)
         *      - A request timeout (10 seconds)
         *      - Any connection error such as connection timeout, bad certificate, etc
         *
         *     Failed delivery will be retried 20 times.
         *
         *      query name        | type          | description                  | required
         *     ------------------ | :-----------: | :--------------------------- | :-----------
         *     transaction_id     | string        | Transaction Id               | true
         *     session_id         | string        | Session Id                   | true
         *     sid                | string        | Session Id when sid_parameter_name=sid | true
         *     merchant_reference | string        | The merchants reference      | true
         *     time               | string        | ISO 8601 format              | true
         *     error              | string        | Error code                   | false
         *     event              | string        | event applied                | false
         *     event_id           | string        | event id for callback        | false
         *     includes           | string array  | include additional data      | false
         *
         *     > The transaction_id is optional when callback_url enables `report_error`
         *     > where error query will be included in case where the payment was completed
         *     > without creating an authorized transaction.
         *
         *     > It is not possible to use `https://localhost` or `http://127.0.0.1` for
         *     > the callback URL as Checkout backend would then call itself.
         *
         *     See [validating callbacks](https://docs.dintero.com/docs/validating-callbacks) to see how you can verify the integrity of the callbacks,
         *
         * @example https://example.com/callback?method=GET
         */
        CallbackUrl: string;
        SessionUrls: {
            /**
             * Format: uri
             * @description URL to page where Checkout will redirect the
             *     customer to after the Checkout process has ended.
             *
             *     If a transaction was completed successfully, a `transaction_id`
             *     will be appended to the URL as a `query` string parameter
             *
             *     > A `transaction_id` will be appended to the URL if the
             *     > Checkout failed with `error=capture`
             *
             *     > A transaction with status `ON_HOLD` must be handled as a payment
             *     > that is pending approval, where the transaction will later be updated
             *     > with a final payment staus `AUTHORIZED` or `FAILED`.
             *     > We recommend that `callback_url` is used to receive the callback when
             *     > the transaction changes status from `ON_HOLD` to `AUTHORIZED` or `FAILED`.
             *     > Alternative is to do an hourly/daily poll on the transaction to check
             *     > if the status has changed.
             *
             *     *Example*:
             *
             *        ```
             *        https://example.com/accept?transaction_id=T00000000.3YkJXSdSnUBXcmQSzn7uJj
             *        ```
             *
             *      query name        | type         | description                    | required
             *     ------------------ | :----------: | ------------------------------ | :-----------:
             *     transaction_id     |   string     | Transaction Id                 | false
             *     error              |   string     | Error code identifying cause   | false
             *     merchant_reference |   string     | The merchants reference        | true
             *
             *     In case of that something went wrong with the payment flow, an
             *     `error` query parameter will be appended to the URL. The value
             *     of the error is a code identifying the cause.
             *
             *     error         | Description
             *     ------------- | ------------
             *     cancelled     | Customer cancelled the checkout payment
             *     authorization | Customer failed to authorize the payment
             *     failed        | The transaction has been rejected by us, or an error has occurred during transaction processing
             *
             *     ### configuration.channel=in_app
             *
             *     The `in_app` channel is intended for payments done from mobile devices
             *     where `url.return_url` can be set to the application's appswitch URL.
             *
             *     #### initial_recipient=merchant
             *
             *     If the query-param `initial_recipient=merchant` is appended to the
             *     appswitch URL, the payment app will switch directly to the app,
             *     i.e. without doing a redirect.
             *
             *     **The option is not supported for:**
             *
             *     - payex.vipps
             *     - payex.swish
             *     - bambora.mobilepay
             *
             *     Following query parameters will be added to the `return_url`
             *
             *      query name        | type         | description                    | required
             *     ------------------ | :----------: | ------------------------------ | :-----------:
             *     transaction_id     |   string     | Transaction Id                 | false
             *     session_id         |   string     | Session Id                     | false
             *     error              |   string     | Error code identifying cause   | false
             *     merchant_reference |   string     | The merchants reference        | true
             *
             *     You will in this case be required to poll for status on the payment by using the
             *     `session_id` or `transaction_id` to poll from the endpoints:
             *
             *     - [GET /v1/sessions/{session_id}](#operation/checkout_session_get)
             *     - [GET /v1/transactions/{transaction_id}](#operation/transactions_id_get)
             *
             *     Poll the transaction until it has been updated with one of these statuses:
             *
             *     - AUTHORIZED
             *     - CAPTURED
             *     - FAILED
             *
             *     In case no `transaction_id` is included in the return url, poll the
             *     session to get the `transaction_id`
             *
             *     Example url: `myapp://?initial_recipient=merchant&transaction_id=T12345678.abc&merchant_reference=mref123&session_id=T12345678.abd`
             *
             * @example https://example.com/accept
             */
            return_url: string;
            callback_url?: components["schemas"]["CallbackUrl"];
            /**
             * Format: uri
             * @description URL to a webpage with the merchant's Terms of Service. Will be linked to from the checkout.
             *
             * @example https://example.com/terms.html
             */
            merchant_terms_url?: string;
        };
        SessionCustomer: {
            /** @description Customer id
             *      */
            customer_id?: string;
            /**
             * @description Customer email address
             *
             * @example john.doe@example.com
             */
            email?: string;
            /**
             * @description Customer phone number, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *
             * @example +4799999999
             */
            phone_number?: string;
        };
        /** @description Address */
        OrderAddress: {
            /** @example John */
            first_name?: string;
            /** @example Doe */
            last_name?: string;
            /** @description Gaustadalleen 21 */
            address_line?: string;
            /** @description PB 123 */
            address_line_2?: string;
            /** @example Land Lord */
            co_address?: string;
            /** @description Name of the company */
            business_name?: string;
            /**
             * @description The zip code / postal code of the address.
             * @example 0349
             */
            postal_code?: string;
            /**
             * @description The name of the postal code
             * @example Oslo
             */
            postal_place?: string;
            /**
             * Format: iso3166-alpha2
             * @description Country of the location
             * @example NO
             */
            country?: string;
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *      */
            phone_number?: string;
            /** @description The email address of a person or an organization
             *      */
            email?: string;
            latitude?: number;
            longitude?: number;
            /** @description Comment about the address
             *      */
            comment?: string;
            /** @description The organization number of the customer.
             *      */
            organization_number?: string;
            /** @description Type indicating what kind of organization it is.
             *      */
            organization_type?: string;
            /** @description The customer's reference */
            customer_reference?: string;
            /** @description For companies that needs to specify a cost center. */
            cost_center?: string;
        };
        /** @description Specify how fees are handled with splits. The default behaviour is to share
         *     the fees proportional with all splits destinations
         *      */
        PayoutFeeSplit: {
            /** @enum {string} */
            type: "proportional";
            /** @description Seller ids that will be debited for the payment fees
             *     All destinations must be included in the list of splits
             *      */
            destinations?: string[];
        };
        PayoutSplit: {
            /**
             * @description An id that identifies the seller
             *
             * @example P000000001
             */
            payout_destination_id: string;
            /**
             * Format: int32
             * @description The split amount in smalles unit for the currency, e.g. cents.
             *
             * @example 29700
             */
            amount: number;
        };
        /** @description Only required if the item is related to an event or multiple events,
         *     like for example tickets to a concert.
         *
         *     If you are selling an event package as a single ticket or item that
         *     includes multiple events, for example a festival, you need to provide
         *     information about all the individual events that are part of the package.
         *      */
        EmdEvent: {
            /**
             * @description Name of the event, e.g. "Fancy Singer"
             * @example Michael Jackson
             */
            event_name: string;
            /**
             * @description Name of the company arranging the event, e.g. "Happy Parties Ltd."
             * @example Diamond Events
             */
            event_company: string;
            /**
             * @description Category or type of venue, e.g. "Pop"
             * @example Pop
             */
            genre_of_event: string;
            /**
             * @description Name of the venue, e.g. "Song Arena"
             * @example Oslo Spektrum
             */
            arena_name?: string;
            arena_location?: {
                /**
                 * @description Street address representing the venue location, e.g. "Sonja Henies plass 2"
                 * @example Sonja Henies plass 2
                 */
                street_address?: string;
                /**
                 * @description Postal code for the venue location, e.g. "0185"
                 * @example 0185
                 */
                postal_code?: string;
                /**
                 * @description City that the venue is located in, e.g. "Oslo"
                 * @example Oslo
                 */
                city: string;
                /**
                 * @description Country that the venue is located in (ISO 3166-1 alpha-2 format), e.g. "NO"
                 *
                 * @example NO
                 */
                country: string;
            };
            /**
             * Format: date-time
             * @description Start time of the event (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-08-16T15:00:00Z
             */
            start_time: string;
            /**
             * Format: date-time
             * @description End time of the event (ISO 8601 format), e.g. "2023-08-16T16:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-08-16T16:00:00Z
             */
            end_time: string;
            /**
             * @description If tickets are digitally checked when entering the venue, e.g. true
             * @example true
             */
            access_controlled_venue?: boolean;
            /**
             * @example email
             * @enum {string}
             */
            ticket_delivery_method: "pick_up" | "email" | "post" | "phone";
            /**
             * @description Name of the recipient the ticket is delivered to, e.g. "recipient@mail.com".
             *
             *     If email or phone, then use either the email address or the phone number respectively.
             *
             * @example recipient@mail.com
             */
            ticket_delivery_recipient: string;
            /**
             * @description Name of the affiliate that originated the purchase.
             *
             * @example Klarna affiliate
             */
            affiliate_name?: string;
        }[];
        /** @description Details related to the subscription.
         *      */
        EmdSubscription: {
            /**
             * @description Name of the product on subscription, e.g. "Contact lenses"
             * @example Contact lenses
             */
            subscription_name: string;
            /**
             * Format: date-time
             * @description The start time of the subscription (ISO 8601 format),
             *     e.g. "2023-08-16T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC
             *
             * @example 2023-08-16T15:00:00Z
             */
            start_time: string;
            /**
             * Format: date-time
             * @description The end time of the subscription (ISO 8601 format),
             *     e.g. "2023-09-16T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC
             *
             * @example 2023-09-16T15:00:00Z
             */
            end_time: string;
            /**
             * @description Whether the subscription will be auto renewed upon expiry, e.g. true
             *
             * @example true
             */
            auto_renewal_of_subscription: boolean;
            /**
             * @description Name of the affiliate that originated the purchase.
             *
             * @example Klarna affiliate
             */
            affiliate_name?: string;
        };
        /** @description Information related to the customer that wants to purchase the subscription.
         *      */
        EmdCustomerAccountInfo: {
            /**
             * @description Unique name / number to identify the specific customer account.
             *     Max 24 characters, e.g. "Adam Adamsson"
             *
             * @example Adam Adamsson
             */
            unique_account_identifier: string;
            /**
             * @description The date and time the account was registered (ISO 8601 format),
             *     e.g. "2023-08-16T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-08-16T15:00:00Z
             */
            account_registration_date: string;
            /**
             * @description The date and time the account was last modified (ISO 8601 format),
             *     e.g. "2023-10-16T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-10-16T15:00:00Z
             */
            account_last_modified: string;
        };
        /** @description Only required if the item is related to a subscription.
         *
         *     If that is the case, you need to provide information about both the subscription
         *     and the customer account.
         *      */
        EmdRecurring: {
            subscription: components["schemas"]["EmdSubscription"];
            customer_account_info: components["schemas"]["EmdCustomerAccountInfo"];
        };
        EmdAirReservationDetailsItinerary: {
            /**
             * @description IATA Airport Code (three letters), e.g. "OSL"
             * @example OSL
             */
            departure: string;
            /**
             * @description City the flight departs from, e.g. "Oslo"
             * @example Oslo
             */
            departure_city?: string;
            /**
             * @description IATA Airport Code (three letters), e.g. "MUC"
             * @example MUC
             */
            arrival: string;
            /**
             * @description City the flight arrives in, e.g. "Munich"
             * @example Munich
             */
            arrival_city?: string;
            /**
             * @description IATA Airline standard (two letters or digits), e.g. "LH"
             * @example LH
             */
            carrier: string;
            /**
             * @description Price for that specific segment of the flight
             *     in smallest unit of local currency, e.g. 200000
             *
             * @example 200000
             */
            segment_price?: number;
            /**
             * @description Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z"
             *
             *     If a timezone is not specified, we assume UTC.
             *
             * @example 2023-08-16T15:00:00Z
             */
            departure_date: string;
            /**
             * @example phone
             * @enum {string}
             */
            ticket_delivery_method: "pick_up" | "email" | "post" | "phone";
            /**
             * @description Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             *     If email or phone, then use either the email address or the phone number respectively.
             *
             * @example 97712123
             */
            ticket_delivery_recipient: string;
            /**
             * @description IDs of all the passengers included in this itinerary.
             * @example [
             *       1
             *     ]
             */
            passenger_id?: number[];
            /**
             * @description Travel class, e.g. "First Class"
             * @example First Class
             */
            class?: string;
        };
        EmdTravelInsurance: {
            /**
             * @description Name of the company which offers the insurance, e.g. "Oopsie Insurance Ltd."
             * @example Oopsie Insurance Ltd.
             */
            insurance_company?: string;
            /**
             * @description Type of insurance, e.g. "travel"
             * @example travel
             * @enum {string}
             */
            insurance_type?: "cancellation" | "travel" | "cancellation_travel" | "bankruptcy";
            /**
             * @description Price of the insurance in smallest unit of local currency,
             *     e.g. 50000
             *
             * @example 50000
             */
            insurance_price?: number;
        };
        EmdTravelPassenger: {
            /**
             * @description Passenger id, e.g. 1
             * @example 1
             */
            id?: number;
            /**
             * @description Passenger title, e.g. "mr".
             *
             *     Blank if under 12 years.
             *
             * @example mr
             * @enum {string}
             */
            title?: "mr" | "mrs" | "ms" | "";
            /**
             * @description First name of the passenger, e.g. "Paul"
             * @example Paul
             */
            first_name: string;
            /**
             * @description Last name of the passenger, e.g. "Lamb"
             * @example Lamb
             */
            last_name: string;
        };
        /** @description Details about the reservation of airline tickets.
         *      */
        EmdAirReservationDetails: {
            /**
             * @description Trip booking number, e.g. "VH67899"
             *
             * @example VH67899
             */
            pnr?: string;
            /** @description Itinerary data, one per segment.
             *
             *     If you are selling a ticket that contains one flight from Oslo to Munich,
             *     and another flight from Munich to Dubai, you need to provide one
             *     itinerary object for each of these two flights, and so on.
             *      */
            itinerary: components["schemas"]["EmdAirReservationDetailsItinerary"][];
            /** @description Insurance data, one per segment */
            insurance?: components["schemas"]["EmdTravelInsurance"][];
            /** @description Passenger data, one per passenger. */
            passengers?: components["schemas"]["EmdTravelPassenger"][];
            /**
             * @description Name of the affiliate that originated the purchase.
             * @example Klarna affiliate
             */
            affiliate_name?: string;
        };
        EmdBusReservationDetailsItinerary: {
            /**
             * @description City the bus departs from, e.g. "Oslo"
             * @example Oslo
             */
            departure_city: string;
            /**
             * @description City the bus arrives in, e.g. "Munich"
             * @example Munich
             */
            arrival_city: string;
            /**
             * @description Name of transportation company. "Big Bus Travels Ltd."
             * @example Big Bus Travels Ltd.
             */
            carrier: string;
            /**
             * @description Price for that specific segment of the bus journey
             *     in smallest unit of local currency, e.g. 200000
             *
             * @example 200000
             */
            segment_price?: number;
            /**
             * @description Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             *     If a timezone is not specified, we assume UTC.
             *
             * @example 2023-08-16T15:00:00Z
             */
            departure_date: string;
            /**
             * @example phone
             * @enum {string}
             */
            ticket_delivery_method: "pick_up" | "email" | "post" | "phone";
            /**
             * @description Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             *     If email or phone, then use either the email address or the phone number respectively.
             *
             * @example 97712123
             */
            ticket_delivery_recipient: string;
            /**
             * @description IDs of all the passengers included in this itinerary.
             * @example [
             *       1
             *     ]
             */
            passenger_id?: number[];
            /**
             * @description Travel class, e.g. "First Class"
             * @example First Class
             */
            class?: string;
        };
        /** @description Details about the reservation of bus tickets.
         *      */
        EmdBusReservationDetails: {
            /**
             * @description Trip booking number, e.g. "VH67899"
             *
             * @example VH67899
             */
            pnr?: string;
            /** @description Itinerary data, one per segment.
             *
             *     If you are selling a ticket that contains one bus journey from Oslo to Munich,
             *     and another bus journey from Munich to Rome, you need to provide one
             *     itinerary object for each of these two bus journeys, and so on.
             *      */
            itinerary: components["schemas"]["EmdBusReservationDetailsItinerary"][];
            /** @description Insurance data, one per segment */
            insurance?: components["schemas"]["EmdTravelInsurance"][];
            /** @description Passenger data, one per passenger. */
            passengers?: components["schemas"]["EmdTravelPassenger"][];
            /**
             * @description Name of the affiliate that originated the purchase.
             * @example Klarna affiliate
             */
            affiliate_name?: string;
        };
        EmdTrainReservationDetailsItinerary: {
            /**
             * @description City the train departs from, e.g. "Oslo"
             * @example Oslo
             */
            departure_city: string;
            /**
             * @description City the train arrives in, e.g. "Munich"
             * @example Munich
             */
            arrival_city: string;
            /**
             * @description Name of transportation company. "Big Train Travels Ltd."
             * @example Big Train Travels Ltd.
             */
            carrier: string;
            /**
             * @description Price for that specific segment of the train journey
             *     in smallest unit of local currency, e.g. 200000
             *
             * @example 200000
             */
            segment_price?: number;
            /**
             * @description Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             *     If a timezone is not specified, we assume UTC.
             *
             * @example 2023-08-16T15:00:00Z
             */
            departure_date: string;
            /**
             * @example phone
             * @enum {string}
             */
            ticket_delivery_method: "pick_up" | "email" | "post" | "phone";
            /**
             * @description Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             *     If email or phone, then use either the email address or the phone number respectively.
             *
             * @example 97712123
             */
            ticket_delivery_recipient: string;
            /**
             * @description IDs of all the passengers included in this itinerary.
             * @example [
             *       1
             *     ]
             */
            passenger_id: number[];
            /**
             * @description Travel class, e.g. "First Class"
             * @example First Class
             */
            class?: string;
        };
        /** @description Details about the reservation of train tickets.
         *      */
        EmdTrainReservationDetails: {
            /**
             * @description Trip booking number, e.g. "VH67899"
             *
             * @example VH67899
             */
            pnr?: string;
            /** @description Itinerary data, one per segment.
             *
             *     If you are selling a ticket that contains one train journey from Oslo to Munich,
             *     and another train journey from Munich to Rome, you need to provide one
             *     itinerary object for each of these two train journeys, and so on.
             *      */
            itinerary: components["schemas"]["EmdTrainReservationDetailsItinerary"][];
            /** @description Insurance data, one per segment */
            insurance?: components["schemas"]["EmdTravelInsurance"][];
            /** @description Passenger data, one per passenger. */
            passengers?: components["schemas"]["EmdTravelPassenger"][];
            /**
             * @description Name of the affiliate that originated the purchase.
             * @example Klarna affiliate
             */
            affiliate_name?: string;
        };
        EmdFerryReservationDetailsItinerary: {
            /**
             * @description City the ferry departs from, e.g. "Oslo"
             * @example Oslo
             */
            departure_city: string;
            /**
             * @description City the ferry arrives in, e.g. "Munich"
             * @example Munich
             */
            arrival_city: string;
            /**
             * @description Name of transportation company. "Big Ferry Travels Ltd."
             * @example Big Ferry Travels Ltd.
             */
            carrier: string;
            /**
             * @description Price for that specific segment of the ferry journey
             *     in smallest unit of local currency, e.g. 200000
             *
             * @example 200000
             */
            segment_price?: number;
            /**
             * @description Departure date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             *     If a timezone is not specified, we assume UTC.
             *
             * @example 2023-08-16T15:00:00Z
             */
            departure_date: string;
            /**
             * @example phone
             * @enum {string}
             */
            ticket_delivery_method: "pick_up" | "email" | "post" | "phone";
            /**
             * @description Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             *     If email or phone, then use either the email address or the phone number respectively.
             *
             * @example 97712123
             */
            ticket_delivery_recipient: string;
            /**
             * @description IDs of all the passengers included in this itinerary.
             * @example [
             *       1
             *     ]
             */
            passenger_id?: number[];
            /**
             * @description Travel class, e.g. "First Class"
             * @example First Class
             */
            class?: string;
        };
        /** @description Details about the reservation of ferry tickets.
         *      */
        EmdFerryReservationDetails: {
            /**
             * @description Trip booking number, e.g. "VH67899"
             *
             * @example VH67899
             */
            pnr?: string;
            /** @description Itinerary data, one per segment.
             *
             *     If you are selling a ticket that contains one ferry journey from Oslo to Kiel,
             *     and another ferry journey from Kiel to Gothenburg, you need to provide one
             *     itinerary object for each of these two ferry journeys, and so on.
             *      */
            itinerary: components["schemas"]["EmdFerryReservationDetailsItinerary"][];
            /** @description Insurance data, one per segment */
            insurance?: components["schemas"]["EmdTravelInsurance"][];
            /** @description Passenger data, one per passenger. */
            passengers?: components["schemas"]["EmdTravelPassenger"][];
            /**
             * @description Name of the affiliate that originated the purchase.
             * @example Klarna affiliate
             */
            affiliate_name?: string;
        };
        EmdHotelReservationDetailsItinerary: {
            /**
             * @description Name of the hotel, e.g. "Premium Hotel"
             * @example Premium Hotel
             */
            hotel_name?: string;
            /** @description Address details of the hotel. */
            address?: {
                /**
                 * @description Street address of the hotel, e.g. "Karl Johans gt. 31"
                 * @example Karl Johans gt. 31
                 */
                street_address?: string;
                /**
                 * @description Postal code of the hotel, e.g. "0159"
                 * @example 0159
                 */
                postal_code?: string;
                /**
                 * @description City the hotel is located in, e.g. "Oslo"
                 * @example Oslo
                 */
                city: string;
                /**
                 * @description Country the hotel is located in (ISO 3166-1 alpha-2 format), e.g. "NO",
                 *
                 * @example NO
                 */
                country: string;
            };
            /**
             * @description Start time of the hotel stay (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             *     If a timezone is not specified, we assume UTC.
             *
             * @example 2023-08-16T15:00:00Z
             */
            start_time: string;
            /**
             * @description End time of the hotel stay (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
             *
             *     If a timezone is not specified, we assume UTC.
             *
             * @example 2023-08-20T15:00:00Z
             */
            end_time: string;
            /**
             * @description Number of rooms booked, e.g. 2
             * @example 2
             */
            number_of_rooms: number;
            /**
             * @description IDs of all the passengers included in this itinerary.
             * @example [
             *       1
             *     ]
             */
            passenger_id: number[];
            /**
             * @example phone
             * @enum {string}
             */
            ticket_delivery_method: "pick_up" | "email" | "post" | "phone";
            /**
             * @description Name of the recipient the ticket is delivered to, e.g. "Maximilian".
             *
             *     If email or phone, then use either the email address or the phone number respectively.
             *
             * @example 97712123
             */
            ticket_delivery_recipient: string;
            /**
             * @description Price for the hotel stay in smallest unit of local currency, e.g. 200000
             *
             * @example 200000
             */
            hotel_price: number;
            /**
             * @description Travel class, e.g. "First Class"
             * @example First Class
             */
            class?: string;
        };
        /** @description Details about the reservation of hotel rooms.
         *      */
        EmdHotelReservationDetails: {
            /**
             * @description Trip booking number, e.g. "VH67899"
             *
             * @example VH67899
             */
            pnr?: string;
            /** @description Hotel itinerary data, one per hotel stay.
             *
             *     If you are selling a package that contains multiple hotel stays,
             *     you need to provide itinerary data for each of the individual stays.
             *      */
            itinerary: components["schemas"]["EmdHotelReservationDetailsItinerary"][];
            /** @description Insurance data, one per segment */
            insurance?: components["schemas"]["EmdTravelInsurance"][];
            /** @description Passenger data, one per passenger. */
            passengers?: components["schemas"]["EmdTravelPassenger"][];
            /**
             * @description Name of the affiliate that originated the purchase.
             * @example Klarna affiliate
             */
            affiliate_name?: string;
        };
        EmdCarRentalReservationDetailsItinerary: {
            /**
             * @description Name of the car rental company, e.g. "Premium Cars Ltd."
             * @example Premium Cars
             */
            rental_company: string;
            /**
             * @description Driver IDs.
             * @example [
             *       1
             *     ]
             */
            drivers_id?: number[];
            /** @description Details related to the pick up location. */
            pick_up_location?: {
                /**
                 * @description Street address where the car should be picked up, e.g. "Karl Johans gt. 31"
                 * @example Karl Johans gt. 31
                 */
                street_address?: string;
                /**
                 * @description Postal code where the car should be picked up, e.g. "0159"
                 * @example 0159
                 */
                postal_code?: string;
                /**
                 * @description City where the car should be picked up, e.g. "Oslo"
                 * @example Oslo
                 */
                city: string;
                /**
                 * @description Country where the car should be picked up (ISO 3166-1 alpha-2 format), e.g. "NO",
                 *
                 * @example NO
                 */
                country: string;
            };
            /** @description Details related to the drop off location. */
            drop_off_location?: {
                /**
                 * @description Street address where the car should be dropped off, e.g. "Karl Johans gt. 31"
                 * @example Karl Johans gt. 31
                 */
                street_address?: string;
                /**
                 * @description Postal code where the car should be dropped off, e.g. "0159"
                 * @example 0159
                 */
                postal_code?: string;
                /**
                 * @description City where the car should be dropped off, e.g. "Oslo"
                 * @example Oslo
                 */
                city: string;
                /**
                 * @description Country where the car should be dropped off (ISO 3166-1 alpha-2 format), e.g. "NO"
                 *
                 * @example NO
                 */
                country: string;
            };
            /**
             * @description Start time of the car rental reservation (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
             *
             *     If a timezone is not specified, we assume UTC.
             *
             * @example 2023-08-16T15:00:00Z
             */
            start_time: string;
            /**
             * @description End time of the car rental reservation (ISO 8601 format), e.g. "2023-08-20T15:00:00Z".
             *
             *     If a timezone is not specified, we assume UTC.
             *
             * @example 2023-08-20T15:00:00Z
             */
            end_time: string;
            /**
             * @description Price for the car rental reservation in smallest unit of local currency, e.g. 500000
             *
             * @example 500000
             */
            car_price?: number;
            /**
             * @description Travel class, e.g. "Premium Cars Premium Class"
             * @example Premium Cars Premium Class
             */
            class?: string;
        };
        /** @description Details about the reservation of rental cars.
         *      */
        EmdCarRentalReservationDetails: {
            /**
             * @description Trip booking number, e.g. "VH67899"
             *
             * @example VH67899
             */
            pnr?: string;
            /** @description Car rental itinerary data, one per car rental.
             *
             *     If you are selling a package that contains multiple car rentals,
             *     you need to provide itinerary data for each of the individual rentals.
             *      */
            itinerary: components["schemas"]["EmdCarRentalReservationDetailsItinerary"][];
            /** @description Insurance data, one per segment */
            insurance?: components["schemas"]["EmdTravelInsurance"][];
            /** @description Driver data, one per driver. */
            drivers: components["schemas"]["EmdTravelPassenger"][];
            /**
             * @description Name of the affiliate that originated the purchase.
             * @example Klarna affiliate
             */
            affiliate_name?: string;
        };
        /** @description Only required if the item is part of a travel-related transaction.
         *
         *     If that is the case, you need to provide information about the itinerary
         *     to be booked.
         *      */
        EmdTravel: {
            air_reservation_details?: components["schemas"]["EmdAirReservationDetails"];
            bus_reservation_details?: components["schemas"]["EmdBusReservationDetails"];
            train_reservation_details?: components["schemas"]["EmdTrainReservationDetails"];
            ferry_reservation_details?: components["schemas"]["EmdFerryReservationDetails"];
            hotel_reservation_details?: components["schemas"]["EmdHotelReservationDetails"];
            car_rental_reservation_details?: components["schemas"]["EmdCarRentalReservationDetails"];
        };
        EmdMarketplaceAccountLastModified: {
            /**
             * Format: date-time
             * @description Date and time that the password was last modified (ISO 8601 format),
             *     e.g. "2023-08-17T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-08-17T15:00:00Z
             */
            password: string;
            /**
             * Format: date-time
             * @description Date and time that the email was last modified (ISO 8601 format),
             *     e.g. "2023-08-17T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-08-17T15:00:00Z
             */
            email: string;
            /**
             * Format: date-time
             * @description Date and time that the listing details were last modified (ISO 8601 format),
             *     e.g. "2023-08-17T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-08-17T15:00:00Z
             */
            listing: string;
            /**
             * Format: date-time
             * @description Date and time that the login details were last changed (ISO 8601 format),
             *     e.g. "2023-08-17T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-08-17T15:00:00Z
             */
            login: string;
            /**
             * Format: date-time
             * @description Date and time that the (physical) address was last modified (ISO 8601 format),
             *     e.g. "2023-08-17T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-08-17T15:00:00Z
             */
            address: string;
        };
        /** @description Details related to the seller involved in the marketplace order.
         *      */
        EmdMarketplaceSellerInfo: {
            /** @description Details about the seller. */
            unique_account_identifier_seller?: {
                /** @description Seller's email address, e.g. "seller@mail.com"
                 *      */
                email?: string;
                /**
                 * @description Seller's phone number, e.g. "97712123"
                 * @example 97712123
                 */
                phone_number?: string;
                other?: string;
            };
            /**
             * @description Name or unique number of the selling/delivering merchant,
             *     e.g. "Marketbrick Ltd."
             *
             * @example Marketbrick Ltd.
             */
            sub_merchant_id: string;
            /**
             * @description Name of the category to which the specific good belongs to,
             *     according to the selling merchant's categorization, e.g. "Phones".
             *
             * @example Phones
             */
            product_category: string;
            /**
             * @description Name of the good purchased.
             *
             * @example iPhone 14 Pro Max
             */
            product_name?: string;
            /**
             * Format: date-time
             * @description Date and time that the account was registered (ISO 8601 format),
             *     e.g. "2023-08-16T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-08-16T15:00:00Z
             */
            account_registration_date: string;
            account_last_modified: components["schemas"]["EmdMarketplaceAccountLastModified"];
            /**
             * @description Current rating of the good purchased according
             *     to the marketplace's rating scale, e.g. 5
             *
             * @example 5
             */
            seller_rating?: number;
            /**
             * @description Number of trades the sub-merchant did in the last 12 months, e.g. 23
             *
             * @example 23
             */
            number_of_trades: number;
            /**
             * @description Volumes of trades the sub-merchant did in the last 12 months,
             *     e.g. 230
             *
             * @example 230
             */
            volume_of_trades?: number;
        };
        /** @description Details related to the winner involved in the marketplace order.
         *      */
        EmdMarketplaceWinnerInfo: {
            /** @description Details about the winner. */
            unique_account_identifier_winner?: {
                /** @description Winner's email address, e.g. "winner@mail.com"
                 *      */
                email?: string;
                /**
                 * @description Winner's phone number, e.g. "97712123"
                 * @example 97712123
                 */
                phone_number?: string;
                other?: string;
            };
            /**
             * Format: date-time
             * @description Date and time that the account was registered (ISO 8601 format),
             *     e.g. "2023-08-16T15:00:00Z".
             *
             *     If a timezone is not specified we assume UTC.
             *
             * @example 2023-08-16T15:00:00Z
             */
            account_registration_date: string;
            account_last_modified: components["schemas"]["EmdMarketplaceAccountLastModified"];
            /**
             * @description Number of trades the winner did in the last 12 months, e.g. 23
             *
             * @example 23
             */
            number_of_trades: number;
            /**
             * @description Volumes of trades the winner did in the last 12 months,
             *     e.g. 230
             *
             * @example 230
             */
            volume_of_trades?: number;
        };
        /** @description Only required if them item is related to a marketplace order.
         *
         *     If that is the case, you need to provide information about both the seller and
         *     the winner.
         *      */
        EmdMarketplaceOrder: {
            seller_info: components["schemas"]["EmdMarketplaceSellerInfo"];
            winner_info: components["schemas"]["EmdMarketplaceWinnerInfo"];
        };
        /** @description Details related to [Klarna EMD](https://docs.klarna.com/klarna-payments/in-depth-knowledge/extra-merchant-data/).
         *
         *     Some items require extra information to be provided when using
         *     Klarna as an enabled payment option.
         *      */
        Emd: {
            event?: components["schemas"]["EmdEvent"];
            subscription?: components["schemas"]["EmdRecurring"];
            travel?: components["schemas"]["EmdTravel"];
            marketplace_order?: components["schemas"]["EmdMarketplaceOrder"];
        };
        /** @description details about order item
         *      */
        OrderItem: {
            /**
             * @description The ID or SKU of the product on the line
             *
             * @example item_01
             */
            id?: string;
            /**
             * @description The groups the product on the line belongs to
             *
             * @example [
             *       {
             *         "id": "B234",
             *         "name": "Stol"
             *       }
             *     ]
             */
            groups?: {
                /** @description Group ID */
                id: string;
                /** @description Group name */
                name?: string;
            }[];
            /**
             * @description the number of the line (or id), must be `unique` between
             *     all items. `required` when Instabank payment is configured.
             *
             * @example 1
             */
            line_id?: string;
            /** @description The version where the item was added or last updated, see the
             *     events for the source.
             *      */
            readonly version?: number;
            /**
             * @description A short, localized description of the line item
             *
             * @example Stablestol
             */
            description?: string;
            /**
             * @description The quantity of the product in the item line.
             *
             * @example 1
             */
            quantity?: number;
            /**
             * @description The total monetary amount of the line item, including VAT and discounts.
             *
             *     In smallest unit for the currency, e.g. cents
             *
             * @example 2000
             */
            amount?: number;
            /**
             * @description The VAT of the `amount` parameter. Only
             *     used for display purposes.
             *
             *     In smallest unit for the currency, e.g. cents
             *
             * @example 400
             */
            vat_amount?: number;
            /**
             * @description The VAT percentage
             *
             * @example 20
             */
            vat?: number;
            /** @description The volume of one item in m³ (cubic meters)
             *      */
            unit_volume?: number;
            /** @description The volume of one item in kg (kilo grams)
             *      */
            unit_weight?: number;
            /** @description The dimensional weight (also known as volumetric) value unit of one item. [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
             *      */
            unit_dimensional_weight?: number;
            /**
             * @description The type of order item this is.
             *
             *     - **physical** - a physical item which must be delivered or handed over
             *     - **digital** - a digital item which doesn't need shipping
             *     - **service** - payment for services like maintenance performed in your home
             *     - **gift_card** - usage of a gift card, where the amount is usually a negative number
             *     - **shipping** - payment for shipping of the order
             *     - **surcharge** - extra incurred costs, like taxes or necessary rounding
             *
             * @enum {string}
             */
            type?: "physical" | "digital" | "service" | "gift_card" | "shipping" | "surcharge";
            fee_split?: components["schemas"]["PayoutFeeSplit"];
            /** @description An array of objects specifying how the amount should be split between
             *     sellers when using Dintero Payout
             *
             *     Specify an empty array if the splits will be provided during capture.
             *     `auto_capture` cannot be enabled when splits are defined as empty array.
             *      */
            splits?: components["schemas"]["PayoutSplit"][];
            /**
             * Format: uri
             * @description URL to a thumbnail of the item. Will be displayed when redirecting to the session.
             *
             *     Recommended limitations for the image:
             *
             *     - all images should preferrably have the same dimensions
             *     - max file size should be less than 2MB
             *
             */
            thumbnail_url?: string;
            emd?: components["schemas"]["Emd"];
        };
        /** @enum {string} */
        DiscountType: "customer" | "periodic" | "manual" | "loyalty" | "total" | "employee" | "external";
        DiscountItem: {
            /**
             * @description Monetary amount in smallest unit for the currency
             *
             * @example 4400
             */
            amount?: number;
            /**
             * @description Optional, set if the amount given was from a percentage discount
             *
             * @example 44
             */
            percentage?: number;
            discount_type?: components["schemas"]["DiscountType"];
            /** @example 766da0ef-9283-42bd-b012-0582344ec53c */
            discount_id?: string;
            description?: string;
            /** @example 1 */
            line_id?: number;
        };
        /** @description Discount details for an order item */
        OrderDiscountItem: {
            /**
             * @description The item is eligible for discount
             *
             * @default false
             * @example true
             */
            eligible_for_discount: boolean;
            /** @description Discount applied to amount
             *      */
            is_changed?: boolean;
            /** @description The origin item amount before any discount
             *      */
            readonly gross_amount?: number;
            discount_lines?: components["schemas"]["DiscountItem"][];
        };
        /** @description A shipping option
         *      */
        ShippingOption: {
            /**
             * @description Id of this shipping option product.
             *
             *     The express checkout will group all products with the same id. Used for
             *     grouping delivery to the same address at different time slots, or for
             *     grouping deliveries to different pick up points.
             *
             * @example bring-pick-up-00001
             */
            id: string;
            /**
             * @description Unique id of the specific configuration of this shipping product
             *
             * @example bring-pick-up-00001-location-0a1f6b
             */
            line_id: string;
            /** @description Countries where this shipping option can be used */
            countries?: string[];
            /**
             * @description The monetary amount of the shipping option, including VAT and discounts.
             *
             *     In smallest unit for the currency, e.g. cents
             *
             * @example 3900
             */
            amount: number;
            /**
             * @description The VAT of the `amount` parameter. Only
             *     used for display purposes.
             *
             * @example 975
             */
            vat_amount?: number;
            /**
             * @description The VAT percentage
             *
             * @example 25
             */
            vat?: number;
            /**
             * @description A shipping option title. Eg. "Standard"
             *
             * @example Standard
             */
            title: string;
            /**
             * @description A short description of the shipping option product
             *
             * @example Pick up at your nearest postal office
             */
            description?: string;
            /**
             * @example pick_up
             * @enum {string}
             */
            delivery_method?: "delivery" | "pick_up" | "unspecified" | "none";
            /**
             * @description Name of company that provides shipping service
             *
             * @example Bring
             */
            operator: string;
            /**
             * @description The operators own id for this shipping product
             *
             * @example pick-up-00001-location-0a1f6b
             */
            operator_product_id?: string;
            /** @description Estimated time of arrival */
            eta?: {
                /**
                 * Format: date-time
                 * @example 2020-10-14T19:00:00Z
                 */
                starts_at?: string;
                /**
                 * Format: date-time
                 * @example 2020-10-14T20:00:00Z
                 */
                ends_at?: string;
            };
            /** @description A specified time for delivery to customer */
            time_slot?: {
                /**
                 * Format: date-time
                 * @example 2020-10-14T19:00:00Z
                 */
                starts_at?: string;
                /**
                 * Format: date-time
                 * @example 2020-10-14T20:00:00Z
                 */
                ends_at?: string;
            };
            pick_up_address?: components["schemas"]["OrderAddress"] & {
                /** @description Distance in kilometers from the shipping_address.
                 *      */
                distance?: number;
            };
            /**
             * @description Additional metadata about the shipping_option
             * @example {
             *       "operator_dest": "XAB1239",
             *       "number_x": 1921
             *     }
             */
            metadata?: {
                [key: string]: string | number;
            };
            /** @description Environmental data about the shipping option
             *      */
            environmental_data?: {
                /**
                 * @description A short description of the environmental data, something like
                 *     - "Fossil free",
                 *     - "Carbon neutral"
                 *     - "Low emissions"
                 *     - "Renewable Energy Sourced"
                 *     - "Eco-certified Fleet"
                 *
                 * @example Fossil free
                 */
                description: string;
                details?: {
                    /**
                     * @description Give context to the value field. Example:
                     *     - "CO2 emissions"
                     *     - "Energy consumption"
                     *     - "Carbon footprint"
                     *     - "Carbon offset"
                     *     - "Trees planted"
                     *     - "Renewable energy percentage"
                     *
                     * @example Carbon offset
                     */
                    label: string;
                    /** @example 1KG CO2 */
                    value: string;
                }[];
            };
            /**
             * Format: uri
             * @description URL to a thumbnail of the shipping option. Will be displayed when
             *     redirecting to the session.
             *     Recommended limitations for the image:
             *       - all images should preferrably have the same dimensions
             *       - max file size should be less than 2MB
             *
             */
            thumbnail_url?: string;
        };
        SplitShippingOption: components["schemas"]["ShippingOption"] & {
            fee_split?: components["schemas"]["PayoutFeeSplit"];
            /** @description An array of objects specifying how the amount should be split between
             *     sellers when using Dintero Payout
             *
             *     Specify an empty array if the splits will be provided during capture.
             *     `auto_capture` cannot be enabled when splits are defined as empty array.
             *      */
            splits?: components["schemas"]["PayoutSplit"][];
        };
        Address: {
            /** @example Sommerkroveien 34 */
            address_line: string;
            /** @example PB 123 */
            address_line_2?: string;
            /** @example 0349 */
            postal_code?: string;
            /** @example Oslo */
            postal_place: string;
            /**
             * Format: iso-3166-1
             * @description ISO 3166-1 country code
             *
             * @example NO
             */
            country: string;
        };
        Store: {
            /** @example sc029 */
            id: string;
            /**
             * @description name of the store, aka trade name of the store
             *
             * @example SC Oslo
             */
            name?: string;
            /**
             * @description Official name of the person or entity that owns the store.
             *
             * @example SC Oslo AS
             */
            business_name?: string;
            address?: components["schemas"]["Address"];
            /** @example SuperChain */
            chain?: string;
            /** @example contact@superchain.com */
            email?: string;
            /** @example 5790001398644 */
            gln?: string;
            /** @example 123456789MVA */
            organization_number?: string;
            /** @example +4738260107 */
            phone_number?: string;
            /**
             * Format: iso-18245
             * @description A four-digit Merchant Category Code (MCC) for the store
             *     [ISO 18245:2003](https://www.iso.org/standard/33365.html)
             *
             * @example 5814
             */
            mcc?: string;
            /**
             * @description Merchant number associated with the stores
             *     payment terminal
             *
             * @example 102603
             */
            bax?: string;
            /**
             * @description Id to a specific point-of-sale (POS) terminal
             *     or workstation
             *
             * @example T0292
             */
            terminal_id?: string;
        };
        Giftcard: {
            /** @enum {string} */
            type: "dintero.wallets";
            card_id: string;
            /** @description Non-negative, minor units. Total amount for the gift card
             *      */
            amount: number;
            masked_card_token?: string;
        };
        SessionOrderUpdate: {
            /**
             * Format: int32
             * @description The amount to authorize/capture including VAT and discounts.
             *     In smallest unit for the currency, e.g. cents
             *
             *     The `amount` should be equal to the sum of the `items.amount` + `shipping_option.amount`.
             *
             * @example 72200
             */
            amount?: number;
            /**
             * Format: iso4217-code
             * @description The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
             * @example NOK
             */
            currency?: string;
            /**
             * Format: int32
             * @description The VAT of the `amount` parameter.
             *     Only used for display purposes.
             *
             *     In smallest unit for the currency, e.g. cents
             *
             *     The `vat_amount` should be equal to the sum of the `items.vat_amount` + `shipping_option.vat_amount`.
             *
             * @example 13660
             */
            vat_amount?: number;
            /** @description A reference by the merchant to identify the corresponding
             *     order for the Checkout Session
             *      */
            merchant_reference_2?: string;
            shipping_address?: components["schemas"]["OrderAddress"];
            billing_address?: components["schemas"]["OrderAddress"];
            /**
             * @description This is a partial payment where the `order.amount` can be lower or
             *     equal to the sum of `order.items.amount`
             *
             * @default false
             */
            partial_payment: boolean;
            /**
             * @description Details about the order items.
             *
             *     #### Instabank
             *     `required` if Instabank payment is configured in and partial_payment is false.
             *     All items must include a unique `line_id`, quantity and amount
             *
             *     #### Collector Bank
             *     `required` if Collector Bank payment is configured in and partial_payment is false.
             *     All items must include a unique `line_id`, quantity and amount
             *
             * @example [
             *       {
             *         "amount": 2000,
             *         "quantity": 2,
             *         "line_id": "1",
             *         "description": "Forsvinnignspølse",
             *         "vat": 20,
             *         "id": "10"
             *       },
             *       {
             *         "amount": 6600,
             *         "quantity": 2,
             *         "line_id": "2",
             *         "description": "Vissvossafår på neppebrød",
             *         "vat": 20,
             *         "id": "6",
             *         "eligible_for_discount": true,
             *         "is_changed": true,
             *         "gross_amount": 10000,
             *         "discount_lines": [
             *           {
             *             "amount": 4400,
             *             "discount_type": "customer",
             *             "discount_id": "ed960ace-eb16-4e2e-ae52-b27647ccae8d",
             *             "description": "Vossafestpris",
             *             "line_id": 1
             *           }
             *         ]
             *       },
             *       {
             *         "amount": 59700,
             *         "quantity": 3,
             *         "line_id": "3",
             *         "description": "Luftboller",
             *         "vat": 20,
             *         "id": "1"
             *       }
             *     ]
             */
            items?: (components["schemas"]["OrderItem"] & components["schemas"]["OrderDiscountItem"])[];
            /** @description The origin amount to authorize/capture including VAT
             *     before any discount, only set if the session was updated
             *     when calculating discounts.
             *
             *     In smallest unit for the currency, e.g. cents
             *      */
            readonly gross_amount?: number;
            /** @description The original order amount was changed by discount
             *     given.
             *      */
            readonly is_changed?: boolean;
            shipping_option?: components["schemas"]["SplitShippingOption"];
            store?: components["schemas"]["Store"];
            /** @description Discounts given, additions to any items discount_lines.
             *      */
            discount_lines?: components["schemas"]["DiscountItem"][];
            discount_codes?: string[];
            /** @description The gift cards selected, the part of `order.amount` that will be
             *     authorized using gift cards
             *      */
            gift_cards?: components["schemas"]["Giftcard"][];
        };
        SessionOrder: WithRequired<components["schemas"]["SessionOrderUpdate"], "amount" | "currency"> & {
            /** @description An id that identifies the seller, value will be included
             *     in the settlement reports
             *      */
            payout_destination_id?: string;
            /** @description A reference by the merchant to identify the corresponding
             *     order for the Checkout Session
             *      */
            merchant_reference: string;
        };
        Checkbox: {
            /** @description ID to assign to the checkbox so you can reference it later
             *      */
            id: string;
            /** @description Label that should be visible next to the checkbox
             *      */
            label: string;
            /** @description If the checkbox should be checked by default or not
             *      */
            checked?: boolean;
            /** @description If the checkbox should be required or not
             *      */
            required?: boolean;
            link?: {
                /** @description Link URL */
                url: string;
                /**
                 * @description Link text
                 * @example Terms for checkbox action
                 */
                text: string;
            };
        };
        /** @description Configuration for checkboxes that should be part of the checkout
         *      */
        CheckboxConfiguration: components["schemas"]["Checkbox"][];
        SessionBase: {
            url: components["schemas"]["SessionUrls"];
            customer?: components["schemas"]["SessionCustomer"];
            order: components["schemas"]["SessionOrder"];
            /** Format: date-time */
            expires_at?: string;
            checkboxes?: components["schemas"]["CheckboxConfiguration"];
        };
        /** @description Enable customer payment tokens in the session
         *      */
        SessionCustomerTokens: {
            customer?: {
                tokens?: {
                    "bambora.creditcard"?: {
                        /** @description Preload the store payment data related to the payment
                         *     token and let the customer make a purchase without having
                         *     to enter all card data
                         *
                         *     - The `bambora.creditcard` must be enabled in the session
                         *       configuration to activate the use of provided payment token
                         *     - Use the `bambora.creditcard.generate_payment_token` option to
                         *       generate the token.
                         *      */
                        payment_token?: string;
                    };
                    "payex.creditcard"?: {
                        /** @description Preload the store payment data related to the payment
                         *     token and let the customer make a purchase without having
                         *     to enter all card data
                         *
                         *     - The `payex.creditcard` must be enabled in the session
                         *       configuration to activate the use of provided payment token
                         *     - Use the `payex.creditcard.generate_payment_token` option to
                         *       generate the token.
                         *      */
                        payment_token?: string;
                        /** @description Preload the store payment data related to the recurrence
                         *     token and let the customer make a purchase without having
                         *     to enter all card data
                         *
                         *     - The `payex.creditcard` must be enabled in the session
                         *       configuration to activate the use of provided payment token
                         *     - Use the `payex.creditcard.generate_recurrence_token` option to
                         *       generate the token.
                         *      */
                        recurrence_token?: string;
                    };
                };
            };
        };
        AutoCaptureConfiguration: {
            /** @description If `true` the transaction from the payment session will be captured
             *     automatically after the transaction has been `AUTHORIZED`. The checkout
             *     sessions `callback_url` will not be called until after the transaction
             *     has been `CAPTURED`.
             *
             *     If `auto_capture` is not specified it defaults to `false`.
             *
             *     A successful auto-capture of a transaction sometimes requires more
             *     than one capture attempt. This can be the case if the payment gateway
             *     is down or is experiencing heavy traffic.
             *
             *     Dintero will attempts capture retries for 48 hours, the `callback_url`
             *     will be invoked when capture succeeds.
             *
             *     Manual capture of a transaction that is pending auto-capture will
             *     stop the auto-capture process from completing the capture.
             *      */
            auto_capture?: boolean;
        };
        /** @description Publish checkout message to the customer.
         *      */
        PublishConfiguration: {
            /** @enum {string} */
            channel: "sms" | "push";
            /** @enum {string} */
            type: "checkout-link" | "app";
            readonly id?: string;
            /**
             * @description status of the message sent to the customer.
             *
             *     **`skipped`** will used in case where publish
             *     cannot be sent given the `session.customer`.
             *
             * @enum {string}
             */
            readonly status?: "sent" | "skipped" | "failed";
        }[];
        /**
         * @description Determines if the payment_product_type is currently available for payment
         * @enum {string}
         */
        SessionPayability: "payable" | "disabled_by_gateway" | "disabled_by_order_amount";
        /** @description Bambora configuration */
        BamboraConfiguration: {
            /**
             * @description Denotes what kind of config parameter this is
             * @enum {string}
             */
            type?: "payment_type";
            creditcard?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable Credit Card Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
                /**
                 * @description generate payment token to use for future payments
                 *
                 *     The generated payment token will be made available from
                 *     the transaction details.
                 *
                 * @default false
                 */
                generate_payment_token: boolean;
            };
            mobilepay?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable MobilePay Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
            vipps?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable Vipps Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
        };
        /** @description Dintero configuration */
        DinteroConfiguration: {
            /**
             * @description Denotes what kind of config parameter this is
             * @enum {string}
             */
            type?: "payment_type";
            /** @description Allow the payment session to be fully or partially authorized with
             *     Dintero Wallets gift card.
             *
             *     Please note that the following payment methods are not supported together
             *     with Dintero Wallets gift cards: `vipps`, `swish.swish`,
             *     `klarna.billie`, `instabank`, `collector`, and `netaxept`.
             *     Creating a session with Dintero Wallets and either of the abovementioned
             *     payment types enabled will result in an error.
             *      */
            wallets?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable gift card */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
            /** @description Allow initiating pay on zero amount session, the payability will only
             *     be enabled if the session order amount is zero. Initiating a `dintero.zero`
             *     payment will result in a transaction with `dintero.zero` payment product type
             *     that will be excluded from settlement reports (as it will not have any payout)
             *      */
            zero?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable zero amount session */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
        };
        /** @description Dintero PSP configuration */
        DinteroPspConfiguration: {
            /**
             * @description Denotes what kind of config parameter this is
             * @enum {string}
             */
            type?: "payment_type";
            creditcard?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable creditcard */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
        };
        InstabankFinanceProduct: {
            /** @example 630 */
            product_code: string;
            /**
             * Format: ^([0-9]*[.])?[0-9]+$
             * @description The minimum monthly installment basis as a percentage of the account balance.
             *
             * @example 1.67
             */
            minimum_monthly_balance_rate: string;
            /**
             * Format: ^([0-9]*[.])?[0-9]+$
             * @description The interest rate for the payment product.
             *
             * @example 0.0
             */
            annual_interest_rate?: string;
            /**
             * @description The effective annual interest rate for the payment product
             *
             * @example 0.0
             */
            readonly effective_annual_interest_rate?: string;
            /**
             * @description The startup fee for the payment product.
             *
             * @example 9500
             */
            origination_fee: number;
            /**
             * @description The notification fee for the payment product.
             *
             * @example 3900
             */
            notification_fee: number;
            /**
             * @description Minimum order amount for this product. The product option will be
             *     excluded in payments where the order amount is less than the minimum
             *     amount.
             *
             * @example 20000
             */
            minimum_amount?: number;
            loan_example: {
                /**
                 * @description The amount loaned in the example.
                 *
                 * @example 2500000
                 */
                amount: number;
                /**
                 * @description Years of payment in the example.
                 *
                 * @example 1
                 */
                years: number;
                /**
                 * @description The total amount paid back in the example.
                 *
                 * @example 2772300
                 */
                total_amount: number;
                /**
                 * @description The cost of the loan in the example.
                 *
                 * @example 272300
                 */
                cost: number;
                /**
                 * Format: ^([0-9]*[.])?[0-9]+$
                 * @description The effective annual interest rate in the example
                 *
                 * @example 21.38
                 */
                readonly effective_annual_interest_rate: string;
            };
            /** @description Url for a custom branding image */
            branding_image_url?: string;
        };
        InstabankInvoiceProduct: {
            /** @example 632 */
            product_code: string;
            /**
             * @description Number of days before the payment is due.
             * @example 10
             */
            due_in_days: number;
            /**
             * @description Minimum order amount for this product. The product option will be
             *     excluded in payments where the order amount is less than the minimum
             *     amount.
             *
             * @example 20000
             */
            minimum_amount?: number;
            /**
             * @description The fee for the payment product
             *
             * @example 9500
             */
            invoice_fee: number;
            /**
             * @description The limit for when instabank will require a full applicant during payment.
             *
             * @example 7500000
             */
            require_applicant_amount: number;
            /** @description Url for a custom branding image */
            branding_image_url?: string;
        };
        /** @description Payment product configuration
         *      */
        InstabankInstallmentProduct: {
            /**
             * @description Minimum order amount for this product. The product option will be
             *     excluded in payments where the order amount is less than the minimum
             *     amount.
             *
             * @example 20000
             */
            minimum_amount?: number;
            /** @example 633 */
            product_code: string;
            /**
             * @description Number of months
             *
             * @example 36
             */
            credit_time: number;
            /**
             * @description The startup fee for the payment product
             *
             * @example 9500
             */
            origination_fee: number;
            /**
             * @description The notification fee for the payment product
             *
             * @example 3900
             */
            notification_fee: number;
            /**
             * Format: ^([0-9]*[.])?[0-9]+$
             * @description The interest rate for the payment product.
             *
             * @example 0.0
             */
            annual_interest_rate: string;
            /**
             * @description The effective annual interest rate for the payment product
             *
             * @example 54.69
             */
            readonly effective_annual_interest_rate?: string;
            /**
             * @description The total amount to pay
             * @example 309400
             */
            readonly total_amount?: number;
            /**
             * @description The amount to pay pr month
             * @example 100000
             */
            readonly monthly_amount?: number;
            /**
             * @description The amount to pay in the first invoice. Origantion fee is added
             *     to the first invoice.
             *
             * @example 109500
             */
            readonly first_monthly_amount?: number;
            /**
             * @description The limit for when instabank will require a full applicant during payment.
             *
             * @example 2500000
             */
            require_applicant_amount?: number;
            loan_example?: {
                /**
                 * @description The amount loaned in the example.
                 *
                 * @example 2500000
                 */
                amount: number;
                /**
                 * @description Years of payment in the example.
                 *
                 * @example 1
                 */
                years: number;
                /**
                 * @description The total amount paid back in the example.
                 *
                 * @example 2772300
                 */
                total_amount: number;
                /**
                 * @description The cost of the loan in the example.
                 *
                 * @example 272300
                 */
                cost: number;
                /**
                 * Format: ^([0-9]*[.])?[0-9]+$
                 * @description The effective annual interest rate in the example
                 *
                 * @example 21.38
                 */
                readonly effective_annual_interest_rate: string;
            };
            /** @description Url for a custom branding image */
            branding_image_url?: string;
        };
        /** @description Payment product configuration
         *      */
        InstabankPostponementProduct: {
            /**
             * @description Minimum order amount for this product. The product option will be
             *     excluded in payments where the order amount is less than the minimum
             *     amount.
             *
             * @example 20000
             */
            minimum_amount?: number;
            /** @example 633 */
            product_code: string;
            /**
             * @description Number of months
             *
             * @example 36
             */
            postponement_months: number;
            /**
             * @description The startup fee for the payment product
             *
             * @example 9500
             */
            origination_fee: number;
            /**
             * @description The notification fee for the payment product
             *
             * @example 3900
             */
            notification_fee?: number;
            /**
             * Format: ^([0-9]*[.])?[0-9]+$
             * @description The interest rate for the payment product.
             *
             * @example 0.0
             */
            annual_interest_rate: string;
            /**
             * @description The effective annual interest rate for the payment product
             *
             * @example 54.69
             */
            readonly effective_annual_interest_rate?: string;
            /**
             * @description The total amount to pay
             * @example 309400
             */
            readonly total_amount?: number;
            /**
             * @description The limit for when instabank will require a full applicant during payment.
             *
             * @example 2500000
             */
            require_applicant_amount?: number;
            loan_example?: {
                /**
                 * @description The amount loaned in the example.
                 *
                 * @example 2500000
                 */
                amount: number;
                /**
                 * @description Years of payment in the example.
                 *
                 * @example 1
                 */
                years: number;
                /**
                 * @description The total amount paid back in the example.
                 *
                 * @example 2772300
                 */
                total_amount: number;
                /**
                 * @description The cost of the loan in the example.
                 *
                 * @example 272300
                 */
                cost: number;
                /**
                 * Format: ^([0-9]*[.])?[0-9]+$
                 * @description The effective annual interest rate in the example
                 *
                 * @example 21.38
                 */
                readonly effective_annual_interest_rate: string;
            };
            /** @description Url for a custom branding image */
            branding_image_url?: string;
        };
        InstabankConfiguration: {
            /** @description finance payment */
            finance?: {
                /** @description enable finance payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
                product?: unknown & components["schemas"]["InstabankFinanceProduct"];
            };
            /** @description invoice payment */
            invoice?: {
                /** @description enable invoice payment (only for amounts greater than 500 NOK) */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
                require_applicant?: boolean;
                product?: unknown & components["schemas"]["InstabankInvoiceProduct"];
            };
            /** @description Fixed Part Payment */
            installment?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @default payment_product_type
                 * @enum {string}
                 */
                type: "payment_product_type";
                /** @description enable Instabank Installment Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
                readonly products?: components["schemas"]["InstabankInstallmentProduct"][];
            };
            /** @description Postpone payment */
            postponement?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @default payment_product_type
                 * @enum {string}
                 */
                type: "payment_product_type";
                /** @description enable Instabank Postponement Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
                readonly products?: components["schemas"]["InstabankPostponementProduct"][];
            };
        };
        /** @description Netaxept configuration */
        NetaxeptConfiguration: {
            /**
             * @description Denotes what kind of config parameter this is
             * @enum {string}
             */
            type?: "payment_type";
            creditcard?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable Credit Card Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
                /** @description Use Netaxept terminal instead of Dintero Checkout
                 *
                 *     See https://shop.nets.eu/web/partners/register
                 *      */
                terminal?: {
                    /** @enum {string} */
                    terminal: "/Terminal/default.aspx" | "/terminal/mobile/default.aspx";
                    /** @description Name of the terminal template to use, created in Netaxept Admin
                     *      */
                    terminal_design?: string;
                    /** @description Set hosted payment window to single page */
                    terminal_single_page: boolean;
                    terminal_layout?: string;
                };
            };
        };
        PayExConfiguration: {
            /** @description A textual description max 40 characters of the purchase.
             *      */
            dynamic_descriptor?: string;
            swish?: {
                /** @description enable Payex Swish Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
            creditcard?: {
                /** @description enable Credit Card Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
                /**
                 * @description generate payment token to use for future payments
                 *
                 *     The generated payment token will be made available from
                 *     the transaction details.
                 *
                 * @default false
                 */
                generate_payment_token: boolean;
                /**
                 * @description generate recurrence payment token to use for future payments
                 *
                 *     The generated recurrence payment token will be made available from
                 *     the transaction details.
                 *
                 * @default false
                 */
                generate_recurrence_token: boolean;
                /** @description Disable the CVC field for payments where payment token is used.
                 *     > To use this feature it has to be enabled on the contract with Swedbank Pay.
                 *      */
                no_cvc?: boolean;
            };
            mobilepay?: {
                /** @description enable Payex MobilePay Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
            vipps?: {
                /** @description enable Payex Vipps Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
            applepay?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable PayEx Apple Pay payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
            clicktopay?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable PayEx Click to Pay payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
            googlepay?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable PayEx Google Pay payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
        };
        VippsConfiguration: {
            /** @description enable vipps payment */
            enabled: boolean;
            payability?: components["schemas"]["SessionPayability"];
            /** @description A short reference / descriptor that can be displayed to
             *     the end user
             *      */
            dynamic_descriptor?: string;
        };
        CollectorB2BAddress: {
            /** @description ACME Inc */
            business_name: string;
            /** @description The organization number of the customer. For Norway, the length is 9. For Sweden, it's either 10 or 12 digits.
             *      */
            organization_number: string;
            /** @description Gaustadalleen 21 */
            address_line: string;
            /** @description More details about address. */
            address_line_2?: string;
            /** @description CO-Address if applicable. */
            co_address?: string;
            /**
             * @description The zip code / postal code of the address.
             * @example 0349
             */
            postal_code: string;
            /**
             * @description The name of the postal code
             * @example Oslo
             */
            postal_place: string;
            /**
             * Format: iso3166-alpha2
             * @description Country of the location
             * @example NO
             */
            country: string;
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *      */
            phone_number: string;
            /** @description The email address of a person or an organisation
             *      */
            email: string;
            /** @description The customer's reference */
            customer_reference?: string;
            /** @description For companies that needs to specify a cost center. */
            cost_center?: string;
            /** @example John */
            first_name?: string;
            /** @example Doe */
            last_name?: string;
            /**
             * @description The unique identification of the address from the available addresses for the business
             *
             * @example address_1
             */
            address_id?: string;
        };
        /** @description Collector configuration */
        CollectorConfiguration: {
            /**
             * @description Denotes what kind of config parameter this is
             * @enum {unknown}
             */
            type?: "payment_type";
            /** @description A textual description max 40 characters of the purchase.
             *      */
            dynamic_descriptor?: string;
            /** @description Invoice / Part Payment */
            invoice?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @default payment_product_type
                 * @enum {string}
                 */
                type: "payment_product_type";
                /** @description enable Collector Bank Invoice Payment */
                enabled: boolean;
                countries?: string[];
                options?: {
                    /** @description Create the collector transaction with status `ON_HOLD` and let
                     *     the Collector callback update the transaction state from `ON_HOLD`
                     *     to `AUTHORIZED` or `FAILED`.
                     *
                     *     A callback will be sent to the `callback_url` when the transaction
                     *     changes state from `ON_HOLD` to any new state.
                     *
                     *     This will override the payment option `enable_on_hold` and gateway config `options.enable_on_hold`-setting.
                     *      */
                    enable_on_hold?: boolean;
                };
                payability?: components["schemas"]["SessionPayability"];
            };
            /** @description Invoice / Part Payment */
            invoice_b2b?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @default payment_product_type
                 * @enum {string}
                 */
                type: "payment_product_type";
                payability?: components["schemas"]["SessionPayability"];
                /** @description enable Collector Bank Invoice Payment B2B */
                enabled: boolean;
                countries?: string[];
                options?: {
                    /**
                     * @description For `collector.invoice_b2b`. By default, the shipping_address B2B payments will be restricted to
                     *     the registered addresses of a company.
                     *
                     *     Setting this on the session will override the `collector_b2b_address_enforcement` in `payment_options`
                     *     on the checkout configuration.
                     *
                     * @default false
                     */
                    disable_collector_b2b_address_enforcement: boolean;
                    /** @description Create the collector transaction with status `ON_HOLD` and let
                     *     the Collector callback update the transaction state from `ON_HOLD`
                     *     to `AUTHORIZED` or `FAILED`.
                     *
                     *     A callback will be sent to the `callback_url` when the transaction
                     *     changes state from `ON_HOLD` to any new state.
                     *
                     *     This will override the gateway's `options.enable_on_hold`-setting.
                     *      */
                    enable_on_hold?: boolean;
                };
            };
            /** @description Invoice for pre-approved B2B-customers */
            invoice_b2b_preapproved?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @default payment_product_type
                 * @enum {string}
                 */
                type: "payment_product_type";
                payability?: components["schemas"]["SessionPayability"];
                /** @description enable Collector Bank Invoice Payment B2B */
                enabled: boolean;
                countries?: string[];
                /** @description All Collector B2B accounts configured for the customer's phone number at the merchant.
                 *      */
                accounts?: {
                    billing_address?: components["schemas"]["CollectorB2BAddress"];
                    /** @description Token to represent the company */
                    company_id?: string;
                }[];
            };
            finance?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @default payment_product_type
                 * @enum {string}
                 */
                type: "payment_product_type";
                /** @description enable Collector Bank Finance Payment */
                enabled: boolean;
                countries?: string[];
                payability?: components["schemas"]["SessionPayability"];
            };
            /** @description Fixed Part Payment */
            installment?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @default payment_product_type
                 * @enum {string}
                 */
                type: "payment_product_type";
                /** @description enable Collector Bank Installment Payment */
                enabled: boolean;
                countries?: string[];
                options?: {
                    /** @description Create the collector transaction with status `ON_HOLD` and let
                     *     the Collector callback update the transaction state from `ON_HOLD`
                     *     to `AUTHORIZED` or `FAILED`.
                     *
                     *     A callback will be sent to the `callback_url` when the transaction
                     *     changes state from `ON_HOLD` to any new state.
                     *
                     *     This will override the gateway's `options.enable_on_hold`-setting.
                     *      */
                    enable_on_hold?: boolean;
                };
                payability?: components["schemas"]["SessionPayability"];
            };
        };
        /** @description Klarna configuration */
        KlarnaConfiguration: {
            /**
             * @description Denotes what kind of config parameter this is
             * @enum {string}
             */
            type?: "payment_type";
            klarna?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable Klarna Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
            billie?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable Klarna B2B Payment with Billie */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
        };
        SantanderConfiguration: {
            /**
             * @description Denotes what kind of config parameter this is
             * @enum {unknown}
             */
            type?: "payment_type";
            debit_account?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {unknown}
                 */
                type?: "payment_product_type";
                /** @description enable Santander Finance Debit Account */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
                /** @description The name of the chain */
                branding_name?: string;
                /** @description Debit accounts belonging to the customer's phone number */
                accounts?: {
                    /** @description Token to represent the account number */
                    account_number_token?: string;
                    /** @description Representation of the account number for display purposes */
                    masked_account_number?: string;
                }[];
            };
        };
        /** @description Swish configuration */
        SwishConfiguration: {
            /**
             * @description Denotes what kind of config parameter this is
             * @enum {string}
             */
            type?: "payment_type";
            swish?: {
                /**
                 * @description Denotes what kind of config parameter this is
                 * @enum {string}
                 */
                type?: "payment_product_type";
                /** @description enable Swish Payment */
                enabled: boolean;
                payability?: components["schemas"]["SessionPayability"];
            };
        };
        /** @description Payout configuration
         *      */
        PayoutConfiguration: {
            /** @description Use the order store id to control what `payout_destination_id` should
             *     be use
             *
             *     A session created with the option set must have a store id that resolves
             *     to a payout_destination_id or have payout_destination_id set
             *
             *     A session where both `order.store.id` and `order.payout_destination_id`
             *     will not be updated with match from `dynamic_payout_destination`
             *      */
            dynamic_payout_destination_ids?: {
                /** @enum {string} */
                type: "order_store_id";
                /** @example STORE_123 */
                order_store_id: string;
                /** @example PD_123 */
                order_payout_destination_id: string;
            }[];
            /** @description The payment products where payout is enabled
             *      */
            readonly payment_products?: {
                /**
                 * @description Payment product
                 * @enum {string}
                 */
                payment_product: "bambora" | "collector" | "payex" | "klarna";
            }[];
        };
        PaymentConfiguration: components["schemas"]["AutoCaptureConfiguration"] & {
            /**
             * @description `channel` enables special behaviour for various scenarios.
             *
             *     The majority of web integrations will not need to set this property.
             *
             *     ### in_app
             *
             *     The `in_app` channel is intended for payments done from
             *     mobile devices where `url.return_url` can be set to the
             *     application's appswitch URL.
             *
             *     #### Session deeplink URL
             *
             *     Creating a session with `channel=in_app` will return an
             *     appswitch deeplink URL if the enabled payment options in
             *     the session supports it
             *
             *     Appswitch deeplink is currently only supported for sessions
             *     that has only Vipps enabled, via Vipps or Swedbank (payex) or
             *     Mobilepay enable via Swedbank (payex)
             *
             *       - configuration.vipps.enabled
             *       - configuration.payex.vipps.enabled
             *       - configuration.payex.mobilepay.enabled
             *
             *     > `in_app` is currently not supported when express is enabled
             *
             *     > `in_app` with deeplink URL is not supported if `publish` is enabled
             *
             *     ### in_store
             *
             *     The `in_store` channel is intended for payments done
             *     in physical stores.
             *
             *     Depending on the payment_type, choosing `in_store` will
             *     change the behaviour of the payment.
             *
             * @enum {string}
             */
            channel?: "in_app" | "in_store";
            publish?: components["schemas"]["PublishConfiguration"];
            active_payment_types?: {
                /** @description Use this flag as wildcard to include all active payment types
                 *     configured for a given currency when creating a payment session.
                 *      */
                enabled?: boolean;
            };
            /**
             * @description Configure the default payment type, the selected payment when
             *     loading the checkout window. The value must be an enabled payment type.
             *
             * @enum {string}
             */
            default_payment_type?: "bambora.creditcard" | "bambora.vipps" | "dintero.zero" | "dintero_psp.creditcard" | "instabank.finance" | "instabank.invoice" | "instabank.installment" | "instabank.postponement" | "vipps" | "payex.creditcard" | "payex.mobilepay" | "payex.swish" | "payex.vipps" | "payex.applepay" | "payex.clicktopay" | "payex.googlepay" | "collector.finance" | "collector.invoice" | "collector.invoice_b2b" | "collector.invoice_b2b_preapproved" | "collector.installment_b2b_preapproved" | "collector.installment" | "santander.debit_account" | "swish.swish" | "netaxept.creditcard" | "klarna.klarna" | "klarna.billie";
            bambora?: components["schemas"]["BamboraConfiguration"];
            dintero?: components["schemas"]["DinteroConfiguration"];
            dintero_psp?: components["schemas"]["DinteroPspConfiguration"];
            instabank?: components["schemas"]["InstabankConfiguration"];
            netaxept?: components["schemas"]["NetaxeptConfiguration"];
            payex?: components["schemas"]["PayExConfiguration"];
            vipps?: components["schemas"]["VippsConfiguration"];
            collector?: components["schemas"]["CollectorConfiguration"];
            klarna?: components["schemas"]["KlarnaConfiguration"];
            santander?: components["schemas"]["SantanderConfiguration"];
            swish?: components["schemas"]["SwishConfiguration"];
            payout?: components["schemas"]["PayoutConfiguration"];
        };
        DiscountsConfiguration: {
            /** @description Configuration for discounts calculations
             *      */
            discounts?: {
                /** @enum {string} */
                readonly type?: "discounts";
                express_discount_codes?: {
                    payability?: components["schemas"]["SessionPayability"];
                    /** @description The discounts will be given by the configured express callback url.
                     *
                     *     The callback URL will be invoked when the session is updated
                     *     with a discount code, and the response used to update the discounts
                     *     on the order items and the shipping options.
                     *      */
                    enabled: boolean;
                };
                /** @description Configure discounts calculation on the session order.
                 *      */
                order?: {
                    /**
                     * @description Enable discount calculation on order
                     *     items eligible for discount
                     *
                     *     - A session that has the `customer.customer_id` set will have
                     *       its discounts calculated when the session is created.
                     *
                     *     - A session with no customer_id will only have the discounts
                     *       calculated when the customer is identified by the checkout
                     *       page.
                     *
                     *     - The autorized amount will be the net amount from the
                     *       original session amount specified when the session was
                     *       created.
                     *
                     * @default false
                     */
                    enabled: boolean;
                };
            };
        };
        SessionThemeConfiguration: {
            /** @description Customize the appearance of the checkout.
             *      */
            theme?: {
                /** @description Color on backdrop shown in desktop mode
                 *
                 *     Color, supported formats are
                 *     - hex: `#ff0000`
                 *     - rgb: `rgb(255,0,0)`
                 *     - rgba: `rgba(255,0,0,0.5)`
                 *      */
                backdrop?: string;
                /** @description Primary color used on pay button and other buttons.
                 *
                 *     Color, supported formats are
                 *     - hex: `#ff0000`
                 *     - rgb: `rgb(255,0,0)`
                 *     - rgba: `rgba(255,0,0,0.5)`
                 *      */
                primary?: string;
                /** @description **Deprecated** - will be ignored.
                 *
                 *     Default text color.
                 *
                 *     Color, supported formats are
                 *     - hex: `#ff0000`
                 *     - rgb: `rgb(255,0,0)`
                 *     - rgba: `rgba(255,0,0,0.5)`
                 *      */
                text?: string;
                /** @description **Deprecated** - will be ignored.
                 *
                 *     Color used for warnings.
                 *
                 *     Color, supported formats are
                 *     - hex: `#ff0000`
                 *     - rgb: `rgb(255,0,0)`
                 *     - rgba: `rgba(255,0,0,0.5)`
                 *      */
                warning?: string;
                /** @description **Deprecated** - will be ignored.
                 *
                 *     Color used for errors.
                 *
                 *     Color, supported formats are
                 *     - hex: `#ff0000`
                 *     - rgb: `rgb(255,0,0)`
                 *     - rgba: `rgba(255,0,0,0.5)`
                 *      */
                error?: string;
                /** @description **Deprecated** - will be ignored.
                 *
                 *     Fontstack used by the checkout.
                 *
                 *     Default value `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`
                 *      */
                "font-family"?: string;
            };
        };
        CountryConfiguration: {
            /** @description Country preferences
             *      */
            countries?: {
                /**
                 * Format: iso3166-alpha2
                 * @description Country to use as default in address and phone country code
                 *
                 */
                preferred_country?: string;
                /** @description List of countries where the customer is allowed to set their address.
                 *     If empty, all countries are allowed, except for the ones in `deny_countries`.
                 *
                 *     A country can not be in both `allow_countries` and `deny_countries`.
                 *      */
                allow_countries?: string[];
                /** @description List of countries where the customer is not allowed to set their address.
                 *
                 *     A country can not be in both `allow_countries` and `deny_countries`.
                 *      */
                deny_countries?: string[];
            };
        };
        DefaultCustomerTypeConfiguration: {
            /**
             * @description Customer type to use as default for the customer.
             *
             * @enum {string}
             */
            default_customer_type?: "b2c" | "b2b";
        };
        AllowDifferentBillingShippingAddressConfiguration: {
            /**
             * @description Allow that the shipping and billing address can be different.
             *
             *     An array of strings, the values `b2c` and `b2b` can be used to
             *     limit the what types of customer that are allowed to submit different
             *     addresses for shipping and billing.
             *
             *     By default we limit the shipping and billing addresses to be equal for
             *     both B2C and B2B customers.
             *
             * @default []
             */
            allow_different_billing_shipping_address: ("b2c" | "b2b")[];
        };
        /** @description Configure merchant information used in the
         *     checkout.
         *      */
        Merchant: {
            name: string;
            /** Format: uri */
            logo_url: string;
            website?: string;
            email?: string;
            phone_number?: string;
            merchant_category_code?: string;
            /** Format: iso3166-alpha2 */
            country?: string;
            postal_code?: string;
            postal_place?: string;
            address_line?: string;
            address_line_2?: string;
        };
        SessionExpressUpdate: {
            /** @description Shipping options that will be presented to the end user after the
             *     end user has submitted a shipping address.
             *
             *     To dynamically update the shipping_options when the _`order.shipping_address`_ is
             *     changed by the end user in the checkout, use the
             *     _`url.shipping_address_callback_url`_.
             *
             *      If the merchant is not able to ship the order to the end users shipping address, use an empty array.
             *
             *      If there is only one option, a free delivery, the order still has to contain one option with a _`price.amount`_ of 0.
             *      */
            shipping_options: components["schemas"]["ShippingOption"][];
            /**
             * @default shipping_required
             * @enum {string}
             */
            shipping_mode: "shipping_required" | "shipping_not_required";
        };
        SessionExpress: {
            /** @description ### Present only for _Express Checkout_ sessions.
             *
             *     An _Express Checkout_ session is a session where the end user will submit a
             *     shipping address and then select a shipping option before the before a
             *     payment method is selected and the payment is initiated.
             *
             *     Endpoints used in the _Express Checkout_ flow.
             *     1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
             *     2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
             *      */
            express?: components["schemas"]["SessionExpressUpdate"] & {
                /** @description Enable discount codes for Express Checkout
                 *      */
                discount_codes?: {
                    /** @description Limit how many discount codes can be added by the customer
                     *      */
                    max_count?: number;
                    /**
                     * Format: uri
                     * @description URL that Checkout will POST to when the user has submitted/changed
                     *     the discount codes for an express session.
                     *
                     *     Dintero will not attempt a retry after a failed delivery attempt.
                     *     Following situations is considered as failed delivery
                     *
                     *     - HTTP status codes that are not 200.
                     *     - A request timeout (60 seconds)
                     *     - Any connection error such as connection timeout, bad certificate, etc
                     *
                     *     The response from the callback will be used to update the order amount,
                     *     items discount_lines and shipping options.
                     *
                     *     See [POST example/discount_codes_callback_url](#operation/example_discount_codes_callback_url)
                     *     for details about the request and response.
                     *
                     * @example https://example.com/order/00128110/discount_codes_updated
                     */
                    callback_url?: string;
                };
                /**
                 * Format: uri
                 * @description URL that Checkout will POST to when the end user has submitted/changed
                 *     a shipping address for an express-session.
                 *
                 *     Dintero will not attempt a retry after a failed delivery attempt.
                 *     Following situations is considered as failed delivery
                 *
                 *     - HTTP status codes that are not 200.
                 *     - A request timeout (60 seconds)
                 *     - Any connection error such as connection timeout, bad certificate, etc
                 *
                 *     The response from the callback will be used to update the shipping options.
                 *
                 *     See [POST example/shipping_address_callback_url](#operation/example_shipping_address_callback_url)
                 *     for details about the request and response.
                 *
                 * @example https://example.com/order/00128110/address_updated
                 */
                shipping_address_callback_url?: string;
                /**
                 * @description Limit the lind of customers that can be submitted via the address form in the express checkout.
                 *
                 * @default [
                 *       "b2c",
                 *       "b2b"
                 *     ]
                 */
                customer_types: ("b2c" | "b2b")[];
            };
        };
        SessionProfile: components["schemas"]["SessionBase"] & components["schemas"]["SessionCustomerTokens"] & {
            /** @description Override configuration for the profile.
             *      */
            configuration?: components["schemas"]["PaymentConfiguration"] & components["schemas"]["DiscountsConfiguration"] & components["schemas"]["SessionThemeConfiguration"] & components["schemas"]["CountryConfiguration"] & components["schemas"]["DefaultCustomerTypeConfiguration"] & components["schemas"]["AllowDifferentBillingShippingAddressConfiguration"];
            /** @description configuration profile
             *      */
            profile_id: string;
            merchant?: components["schemas"]["Merchant"];
        } & components["schemas"]["SessionExpress"];
        /** @description Enable customer gift cards in session
         *      */
        SessionCustomerGiftcards: {
            customer?: {
                gift_cards?: {
                    /** @description Preload checkout with Wallets cards and let the customer
                     *     use it during checkout by providing PIN to activate the
                     *     card (e.g. use Wallets card as giftcard)
                     *
                     *     - The `dintero.wallets` must be enabled in the session
                     *       configuration to activate the use of the provided gift card
                     *       tokens
                     *      */
                    "dintero.wallets"?: {
                        card_id: string;
                    }[];
                };
            };
        };
        Metadata: {
            /**
             * @description Additional metadata about the resource
             * @example {
             *       "system_x_id": "XAB1239",
             *       "number_x": 1921
             *     }
             */
            metadata?: {
                [key: string]: string | number;
            };
        };
        Id: {
            /** @description An ID that uniquely identifies the resource
             *      */
            id?: string;
            /**
             * Format: date-time
             * @description The date-time when the resource was created
             *
             */
            created_at?: string;
        };
        SessionOptions: components["schemas"]["SessionBase"] & components["schemas"]["SessionExpress"] & {
            configuration: components["schemas"]["PaymentConfiguration"] & components["schemas"]["DiscountsConfiguration"] & components["schemas"]["SessionThemeConfiguration"] & components["schemas"]["CountryConfiguration"] & components["schemas"]["DefaultCustomerTypeConfiguration"] & components["schemas"]["AllowDifferentBillingShippingAddressConfiguration"];
        };
        SystemRequestHeaders: {
            /**
             * @description The name of the ecommerce solution
             * @example woocommerce
             */
            "dintero-system-name"?: string;
            /**
             * @description The version number of the ecommerce solution
             * @example 5.0.0
             */
            "dintero-system-version"?: string;
            /**
             * @description The name of the ecommerce plugin
             * @example Dintero.Checkout.WooCommerce
             */
            "dintero-system-plugin-name"?: string;
            /**
             * @description The version number of the ecommerce plugin
             * @example 2021.03.02
             */
            "dintero-system-plugin-version"?: string;
            /**
             * @description The user-agent that performed the request
             * @example Mozilla: Mozilla/5.0
             */
            "user-agent"?: string;
        };
        /**
         * @description Initiated by the merchant or used to generate a token
         *
         * @enum {string}
         */
        PaymentOperationIntent: "unscheduled_purchase" | "recurring_purchase" | "generate_payment_token";
        RequestHeaders: components["schemas"]["SystemRequestHeaders"] & {
            /**
             * @description The instance of the checkout that performed the request
             * @example abcd-14134556135
             */
            "dintero-checkout-instance-id"?: string;
        };
        CollectorB2BPaymentOperationAddress: {
            /** @description ACME Inc */
            business_name: string;
            /** @description The organization number of the customer. For Norway, the length is 9. For Sweden, it's either 10 or 12 digits.
             *      */
            organization_number: string;
            /** @description Gaustadalleen 21 */
            address_line: string;
            /**
             * @description The zip code / postal code of the address.
             * @example 0349
             */
            postal_code: string;
            /**
             * @description The name of the postal code
             * @example Oslo
             */
            postal_place: string;
            /**
             * Format: iso3166-alpha2
             * @description Country of the location
             * @example NO
             */
            country: string;
            /**
             * @description The unique identification of the address from the available addresses for the business
             *
             * @example address_1
             */
            address_id?: string;
        };
        /** @description Collector payment product
         *      */
        CollectorProduct: {
            /**
             * @description Id for the payment product
             *
             * @example IF_3_001
             */
            id: string;
            /**
             * @example interest_free
             * @enum {string}
             */
            type: "interest_free" | "annuity";
            /**
             * @description Number of months
             *
             * @example 3
             */
            credit_time: number;
            /**
             * @description The fee for a "Buy now – pay later" Payment product
             *
             * @example 0
             */
            campaign_fee: number;
            /**
             * @description The startup fee for the payment product
             *
             * @example 9500
             */
            origination_fee: number;
            /**
             * @description The notification fee for the payment product
             *
             * @example 3900
             */
            notification_fee: number;
            /**
             * @description The interest rate for the payment product.
             *
             * @example 0.0
             */
            annual_interest_rate?: string;
            /**
             * @description The effective annual interest rate for the payment product
             *
             * @example 54.69
             */
            effective_annual_interest_rate?: string;
            /**
             * @description The total amount to pay
             * @example 309400
             */
            total_amount: number;
            /**
             * @description The amount to pay pr month
             * @example 100000
             */
            monthly_amount: number;
            /**
             * @description The amount to pay in the first invoice. Origantion fee is added
             *     to the first invoice.
             *
             * @example 109500
             */
            first_monthly_amount: number;
        };
        /** @description Options for myDintero
         *      */
        MyDinteroUserCreation: {
            /** @description Actions to perform on the customer
             *      */
            actions: "create_user"[];
            /** @description Terms and conditions accepted
             *      */
            terms: {
                /**
                 * Format: uuid
                 * @description id of the myDintero terms and conditions
                 *
                 */
                id: string;
                /**
                 * Format: uri
                 * @description Url to the terms and conditions accepted by the customer
                 *
                 * @example https://example.com/toc
                 */
                url: string;
            };
        };
        SessionMeta: {
            /** @description The ID of the Checkout */
            id?: string;
            /**
             * Format: date-time
             * @description Time when the Checkout was created
             */
            created_at?: string;
            /**
             * Format: date-time
             * @description Last time when the Checkout was updated
             */
            updated_at?: string;
            /**
             * Format: date-time
             * @description The session expiration time after which the
             *     Checkout page wouldn't be available
             *
             */
            expires_at?: string;
            /** @description The IP of the customer upon visiting the page.
             *     If the page is visited multiple times, the
             *     field is always updated with the last known value.
             *      */
            customer_ip?: string;
            /** @description The full user agent of the device the customer
             *     used when visiting the checkout page
             *      */
            user_agent?: string;
            initiating_system_request_headers?: components["schemas"]["SystemRequestHeaders"];
            payment_operation?: components["schemas"]["PaymentOperationIntent"];
            /**
             * @description Checkout process events
             *
             * @example [
             *       {
             *         "id": "769952fe-86c9-4185-a1ce-aeb46da3509c",
             *         "name": "INITIATED",
             *         "created_at": "2019-05-09T09:13:40.306Z",
             *         "request_id": "b97b6312-f8b3-11ed-be56-0242ac120002"
             *       },
             *       {
             *         "name": "VISITED",
             *         "created_at": "2019-05-09T09:13:50.548Z"
             *       },
             *       {
             *         "name": "PAY_FAILED",
             *         "created_at": "2019-05-09T09:14:10.548Z",
             *         "details": {
             *           "error": "Rejected",
             *           "payment_product_type": "instabank.finance"
             *         }
             *       },
             *       {
             *         "name": "FAILED",
             *         "created_at": "2019-05-09T09:16:11.786Z"
             *       }
             *     ]
             */
            events?: {
                /** Format: date-time */
                created_at?: string;
                id?: string;
                request_id?: string;
                /** @enum {string} */
                name?: "INITIATED" | "VISITED" | "COMPLETED" | "AUTHORIZED" | "DECLINED" | "PAY_LOCK_START" | "PAY_LOCK_META" | "PAY_LOCK_END" | "PAY_FAILED" | "ON_HOLD_CALLBACK_SENT" | "AUTH_CALLBACK_SENT" | "FAILED" | "UNKNOWN" | "PAYMENT_TOKEN_FLOW_START" | "UPDATE_SESSION" | "CANCELLED" | "SET_BILLING_ADDRESS" | "SET_DISCOUNT_CODES" | "SET_SHIPPING_ADDRESS" | "SET_SHIPPING_OPTION" | "SET_GIFT_CARD" | "PUSH_NOTIFICATION_SENT" | "SECRET_CONFIRMATION_CODE_SENT" | "SET_MY_DINTERO" | "ADD_PAYMENT_INFORMATION";
                request_headers?: components["schemas"]["RequestHeaders"];
                details?: {
                    error?: string;
                    payment_product_type?: string;
                    amount?: number;
                    shipping_option?: components["schemas"]["SplitShippingOption"];
                    shipping_address?: components["schemas"]["OrderAddress"];
                    bambora?: {
                        session_token?: string;
                        session_url?: string;
                        wallet_session_id?: string;
                    };
                    klarna?: {
                        client_token: string;
                        session_id: string;
                    };
                    "payex:payment:id"?: string;
                    "collector:invoice_b2b:addresses"?: components["schemas"]["CollectorB2BPaymentOperationAddress"][];
                    "collector:installment:products"?: components["schemas"]["CollectorProduct"][];
                    my_dintero?: components["schemas"]["MyDinteroUserCreation"];
                    organization_number?: string;
                    previous_order?: components["schemas"]["SessionOrder"];
                    updated_order?: components["schemas"]["SessionOrder"];
                    previous_express?: components["schemas"]["SessionExpress"];
                    updated_express?: components["schemas"]["SessionExpress"];
                    gift_card?: {
                        card_id?: string;
                        card_amount?: number;
                        masked_card_token?: string;
                        currency?: string;
                    };
                };
            }[];
            /** @description Transaction which has been created using the checkout.
             *      */
            transaction_id?: string;
        };
        Session: components["schemas"]["SessionOptions"] & components["schemas"]["SessionMeta"];
        SessionRead: {
            order?: {
                /** @description The gift cards selected, the part of `order.amount` that will be
                 *     authorized using gift cards
                 *      */
                gift_cards?: components["schemas"]["Giftcard"][];
            };
            customer?: {
                my_dintero?: components["schemas"]["MyDinteroUserCreation"];
                gift_cards?: {
                    /** @description Preload checkout with Wallets cards and let the customer
                     *     use it during checkout by providing PIN to activate the
                     *     card (e.g. use Wallets card as giftcard)
                     *
                     *     - The `dintero.wallets` must be enabled in the session
                     *       configuration to activate the use of the provided gift card
                     *       tokens
                     *      */
                    "dintero.wallets"?: {
                        card_id: string;
                        masked_card_token?: string;
                    }[];
                };
                tokens?: {
                    "payex.creditcard"?: {
                        /**
                         * @description Id included if the payex.creditcard was created with
                         *     payment_token set.
                         *
                         * @example 2134a260d196b1d65e59b259dc43f619d7f0f3c6
                         */
                        readonly payment_token_id?: string;
                    };
                    "bambora.creditcard"?: {
                        /**
                         * @description Id included if the bambora.creditcard was created with
                         *     payment_token set.
                         *
                         * @example 2134a260d196b1d65e59b259dc43f619d7f0f3c6
                         */
                        readonly payment_token_id?: string;
                    };
                };
            };
            /** @description metadata about the session
             *      */
            metadata?: {
                /** @description Profile Id used when session was created */
                "session:profile_id"?: string;
            };
            configuration?: {
                merchant?: {
                    /** @example null */
                    id?: string;
                    /** Format: uri */
                    logo_url?: string;
                    /** @example TKP tech AS */
                    name?: string;
                };
            };
        };
        SessionCancelled: {
            cancelled_by?: string;
            /**
             * Format: date-time
             * @description The date-time when the resource was cancelled
             *
             */
            cancelled_at?: string;
        };
        Error: {
            error: {
                /** @description The code used to identify the error/warning */
                code?: string;
                /** @description The nested error(s) encountered during validation */
                errors?: Record<string, never>[];
                /** @description The human readable description of the error/warning */
                message: string;
            };
        };
        UpdateSessionOptions: {
            order: components["schemas"]["SessionOrderUpdate"];
            express?: components["schemas"]["SessionExpressUpdate"];
            /**
             * @description Remove lock after updating
             * @default true
             */
            remove_lock: boolean;
        };
        SessionPaymentToken: {
            order: {
                /**
                 * Format: iso4217-code
                 * @description The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
                 * @example NOK
                 */
                currency: string;
                /** @description A reference by the merchant to identify the corresponding
                 *     order for the Checkout Session
                 *      */
                merchant_reference: string;
                /** @description A reference by the merchant to identify the corresponding
                 *     order for the Checkout Session
                 *      */
                merchant_reference_2?: string;
                store?: components["schemas"]["Store"];
            };
            url: components["schemas"]["SessionUrls"];
            /** @description configuration profile to use for branding
             *      */
            profile_id?: string;
            customer?: components["schemas"]["SessionCustomer"];
            /** Format: date-time */
            expires_at?: string;
            configuration?: components["schemas"]["SessionThemeConfiguration"];
        };
        TokenProvider: {
            /** @description The payment product type corresponding to create token for
             *      */
            payment_product_type: string;
        };
        /**
         * @description Overall settlement status after the events
         *
         * @enum {string}
         */
        SettlementStatus: "NOT_SETTLED" | "PENDING_SETTLEMENT" | "PARTIALLY_SETTLED" | "SETTLED";
        TransactionSettlementsEvent: {
            /** @description Id of the settlement this was paid in
             *      */
            settlement_id: string;
            /** @description The providers reference for the settlement
             *      */
            provider_reference: string;
            /** @description Id for matching to transaction event
             *      */
            event_correlation_id?: string;
            /** @description The amount paid out in this settlement
             *      */
            amount: number;
            /** @description Amount captured in this settlement
             *      */
            capture?: number;
            /** @description Amount refunded in this settlement
             *      */
            refund?: number;
            /** @description Fee of the capture in this settlement
             *      */
            fee?: number;
        };
        TransactionSettlementsRead: {
            /** @description One item per payout to the merchants bank account
             *      */
            events: components["schemas"]["TransactionSettlementsEvent"][];
            /** @enum {string} */
            settlement_status?: "NOT_SETTLED" | "PENDING_SETTLEMENT" | "PARTIALLY_SETTLED" | "SETTLED";
        };
        TransactionEvent: {
            readonly id?: string;
            /**
             * @description The transaction state after this event
             *
             * @enum {string}
             */
            transaction_status?: "INITIATED" | "AUTHORIZED" | "AUTHORIZATION_VOIDED" | "CAPTURED" | "PARTIALLY_CAPTURED" | "REFUNDED" | "PARTIALLY_REFUNDED" | "DECLINED" | "FAILED" | "UNKNOWN" | "ON_HOLD";
            /** @description The gift cards that was used as part of this event
             *      */
            gift_cards?: (components["schemas"]["Giftcard"] & {
                /** @description The external transaction ID */
                transaction_id: string;
            })[];
            /**
             * @description the event type
             * @example CAPTURE
             * @enum {string}
             */
            event?: "INITIALIZE" | "AUTHORIZE" | "CAPTURE" | "REFUND" | "VOID" | "INITIATE_REFUND" | "INITIATE_VOID" | "INITIATE_CAPTURE" | "SETTLEMENT";
            /** @description The event operation completed with success
             *      */
            success?: boolean;
            /** @description Correction of the transaction status and event after
             *     a failed operation
             *      */
            correction?: {
                /** @description List of event ids added to correct the transaction status
                 *      */
                event_ids?: string[];
                /** @description status the transaction was corrected to
                 *      */
                status: string;
                /**
                 * @description Monetary amount in smallest unit for the currency
                 *
                 * @example 50000
                 */
                remaining_capture_amount: number;
                /**
                 * @description Monetary amount in smallest unit for the currency
                 *
                 * @example 50000
                 */
                remaining_refund_amount: number;
                /**
                 * @description Monetary amount in smallest unit for the currency
                 *
                 * @example 50000
                 */
                remaining_void_amount: number;
            };
            /** @description The event error is only used when the success is `false`.
             *      */
            error?: {
                /** @description The code used to identify the error/warning */
                code?: string;
                /** @description The human readable description of the error/warning */
                message: string;
                /** @enum {string} */
                type?: "DO_NOT_RETRY" | "MODIFICATIONS_REQUIRED" | "DAILY_LIMIT_EXCEEDED" | "MONTHLY_LIMIT_EXCEEDED" | "REJECTED_BY_ACQUIRER_INVALID_AMOUNT" | "REJECTED_BY_ACQUIRER_FORMAT_ERROR" | "REJECTED_BY_ACQUIRER_POSSIBLE_FRAUD" | "REJECTED_BY_ACQUIRER_CARD_STOLEN" | "REJECTED_BY_ACQUIRER_CARD_EXPIRED" | "REJECTED_BY_ACQUIRER" | "REJECTED_BY_ACQUIRER_INSUFFICIENT_FUNDS" | "ACQUIRER_HOST_OFFLINE" | "UNKNOWN";
                /** @description Result code received from Visa or Mastercard
                 *      */
                result_code?: string;
            };
            /** @description Amount captured or refunded
             *      */
            amount?: number;
            /** @description Best-effort calculation of the VAT amount in this transaction
             *      */
            calculated_vat_amount?: number;
            /** @description The applicable event items */
            items?: ({
                /** @description Metadata about discounts given */
                discount_lines?: components["schemas"]["DiscountItem"][];
            } & components["schemas"]["OrderItem"])[];
            /** Format: date-time */
            created_at?: string;
            created_by?: string;
            /**
             * Format: uuid
             * @example 05c91a5b-9c3d-4214-a7e1-e472dbe22eb9
             */
            request_id?: string;
            /** @description Additional details about the event
             *      */
            metadata?: Record<string, never>;
            /**
             * Format: uuid
             * @description The event correlation to existing event. The property will
             *     be set if the event is an CAPTURE or REFUND of correlated
             *     INITIATE_CAPTURE or INITIATE_REFUND event.
             *
             * @example 05c91a5b-9c3d-4214-a7e1-e472dbe22eb9
             */
            correlation_request_id?: string;
            /** @description Reference for the transaction event provided by the merchant.
             *
             *     - For captures, this is `capture_reference`
             *     - For refunds, this is `refund_reference`
             *
             *     When relevant, it will be visible on the Dintero settlement report.
             *      */
            event_reference?: string;
            request_headers?: components["schemas"]["RequestHeaders"];
            settlements?: components["schemas"]["TransactionSettlementsRead"];
        };
        TransactionBambora: {
            card?: {
                /**
                 * @description Visa, MasterCard, etc. The brand of the card.
                 * @example Visa
                 */
                brand?: string;
                /** @enum {string} */
                region?: "domestic" | "eea" | "inter";
                /** @example 476173******0416 */
                masked_pan?: string;
                /** Format: \d{2}/\d{4} */
                expiry_date?: string;
                /**
                 * @description Credit or Debit. Indicates the type of card used
                 *
                 * @example Credit
                 */
                type?: string;
                eci?: string;
                /**
                 * Format: iso-3166-1
                 * @description The country the card is issued in
                 */
                country?: string;
            };
            events?: {
                metadata?: {
                    "bambora:transaction:status"?: string;
                    "bambora:transactionoperation:id"?: string;
                    "bambora:meta:action:source"?: string;
                    "bambora:meta:action:code"?: string;
                    "bambora:meta:action:type"?: string;
                    /** @description Id that will be referenced on the settlement report, unique for this event
                     *      */
                    payout_correlation_id?: string;
                };
            }[];
            metadata?: {
                "gateway:id"?: string;
                "bambora:merchant_number"?: string;
                "bambora:transaction_id"?: string;
                "bambora:reference"?: string;
                "bambora:acquirer"?: string;
                "bambora:wallet"?: string;
            };
        };
        TransactionCollector: {
            events?: {
                metadata?: {
                    /** @description External status reported after adding invoice and activating invoice */
                    "collector:Invoice.InvoiceStatus"?: number;
                    /** @description External request id
                     *      */
                    "collector:CorrelationId"?: string;
                    /** @description The payment identification number. This is the id the customer must use when they do a payment of an invoice.
                     *      */
                    "collector:Invoice.PaymentReference"?: string;
                    /** @description The lowest amount to pay on the invoice. */
                    "collector:Invoice.LowestAmountToPay"?: number;
                    /** @description The total amount to pay for the invoice. */
                    "collector:Invoice.TotalAmount"?: number;
                    /** @description The due date of the invoice. */
                    "collector:Invoice.DueDate"?: string;
                    /** @description The url to invoice in pdf format. */
                    "collector:Invoice.InvoiceUrl"?: string;
                    /** @description The invoice number of the invoice that this event belongs to. */
                    "collector:Invoice.CurrentInvoiceNumber"?: string;
                    /** @description The invoice number for the next capture. */
                    "collector:Invoice.NewInvoiceNumber"?: string;
                };
            }[];
            metadata?: {
                /** @description The Collector Store ID of the payment */
                "collector:StoreId"?: string;
                /** @description The invoice number of the invoice. */
                "collector:Invoice.InvoiceNumber"?: string;
                /** @description Corresponds to the Dintero session ID */
                "collector:Invoice.OrderNumber"?: string;
                /** @description The country of the payment */
                "collector:Invoice.CountryCode"?: string;
                "collector:Invoice.ProductCode"?: string;
                "collector:Invoice.InvoiceType"?: string;
                /** @description The SettlementReference used for the payment. */
                "collector:Invoice.SettlementReference"?: string;
            };
        };
        TransactionInstabank: {
            events?: {
                metadata?: {
                    /** @description External status reported after the transaction event
                     *      */
                    "instabank:Sale.Status"?: string;
                    /** @description External request id
                     *      */
                    "instabank:RequestId"?: string;
                };
            }[];
            metadata?: {
                /** @description External reference for the transaction
                 *      */
                "instabank:Sale.ExternalReference"?: string;
                /** @description External case sequence (id)
                 *      */
                "instabank:Sale.Sequence"?: number;
                /** @description Payment product name */
                "instabank:Sale.Product.Name"?: string;
            };
        };
        TransactionDinteroPsp: {
            events?: {
                metadata?: {
                    /** @description Unique reference of operation */
                    "dintero_psp:operation_ref"?: string;
                    /** @description Reference to authorization operation upon void or capture
                     *      */
                    "dintero_psp:authorization_operation_ref"?: string;
                    /** @description Reference to capture operation upon refund
                     *      */
                    "dintero_psp:capture_operation_ref"?: string;
                    /** @description Reference to sale operation upon sale refund
                     *      */
                    "dintero_psp:sale_operation_ref"?: string;
                };
            }[];
            metadata?: {
                /** @description Transaction Id in Dintero PSP
                 *      */
                "gateway:id"?: string;
            };
            card?: {
                masked_pan?: string;
                /** Format: \d{2}/\d{4} */
                expiry_date?: string;
                /** @example visa */
                brand?: string;
                /** @example credit */
                type?: string;
                /** @example 3DSECURE */
                acquirer_transaction_type?: string;
                /** @example 2 */
                three_ds_version?: string;
                three_ds_server_trans_id?: string;
                /** @example 04 */
                eci?: string;
                /** @example wallet */
                payment_system_type?: string;
            };
        };
        TransactionKlarna: {
            events?: {
                metadata?: {
                    /** @description Internal reference sent to Klarna for the capture/refund. This will be included in the settlement files.
                     *      */
                    "klarna:reference"?: string;
                    /** @description Id of the capture created in Klarna */
                    "klarna:headers:capture_id"?: string;
                    /** @description Id of the refund created in Klarna */
                    "klarna:headers:refund_id"?: string;
                    /** @description The URI at which the capture or refund created in Klarna can be found
                     *      */
                    "klarna:headers:location"?: string;
                    /** @description Authorization expiration date (ISO 8601 format), e.g. "2023-08-16T15:00:00Z".
                     *      */
                    "klarna:authorization_expiration"?: string;
                    /** @description The reason for extending the authorization date. This will be included after extending authorization. */
                    "klarna:authorization_expiration_reason"?: string;
                    /** @description A reference specified by the merchant to identify the transaction.
                     *     This will be included after extending authorization.
                     *      */
                    "klarna:authorization_expiration_reference"?: string;
                    /** @description The reason an error occurred when trying to extend the authorization date.
                     *     This will be included after extending authorization.
                     *      */
                    "klarna:authorization_expiration_error_reason"?: string;
                };
            }[];
            metadata?: {
                /** @description Order Id in Klarna
                 *      */
                "gateway:id"?: string;
                merchant_name?: string;
                /** @enum {string} */
                "klarna:authorized_payment_method:type"?: "invoice" | "fixed_amount" | "base_account" | "direct_debit" | "direct_bank_transfer" | "b2b_invoice" | "card" | "slice_it_by_card" | "pay_later_by_card" | "pay_by_card" | "fixed_sum_credit";
                "klarna:authorized_payment_method:number_of_days"?: string;
                "klarna:authorized_payment_method:number_of_installments"?: string;
                /**
                 * @description Fraud status for order
                 *
                 * @enum {string}
                 */
                "klarna:authorized_payment_method:fraud_status"?: "ACCEPTED" | "PENDING";
            };
        };
        TransactionNetaxept: {
            card?: {
                /**
                 * @description Visa, MasterCard, etc. The brand of the card.
                 * @example Visa
                 */
                brand?: string;
                /** @example 476173******0416 */
                masked_pan?: string;
                /** Format: \d{2}/\d{4} */
                expiry_date?: string;
                /**
                 * @description Credit or Debit. Indicates the type of card used
                 *
                 * @example Credit Card
                 */
                type?: string;
                /** @description The name of the bank that issued the card used
                 *      */
                issuing_bank?: string;
                /**
                 * Format: iso-3166-1
                 * @description The country the card is issued in
                 */
                country?: string;
            };
            /**
             * @example CAPTURED
             * @enum {string}
             */
            readonly status?: "INITIATED" | "AUTHORIZED" | "AUTHORIZATION_VOIDED" | "CAPTURED" | "PARTIALLY_CAPTURED" | "REFUNDED" | "PARTIALLY_REFUNDED" | "DECLINED" | "FAILED" | "UNKNOWN";
            events?: {
                /** @enum {string} */
                readonly transaction_status?: "INITIATED" | "AUTHORIZED" | "AUTHORIZATION_VOIDED" | "CAPTURED" | "PARTIALLY_CAPTURED" | "REFUNDED" | "PARTIALLY_REFUNDED" | "DECLINED" | "FAILED" | "UNKNOWN";
                metadata?: {
                    "netaxept:transaction_id"?: string;
                    "netaxept:operation"?: string;
                    "netaxept:execution_time"?: string;
                    "netaxept:bat_number"?: string;
                    "netaxept:response_code"?: string;
                    "netaxept:terminal_url"?: string;
                };
            }[];
            metadata?: {
                "netaxept:merchant_id"?: string;
                "netaxept:transaction_id"?: string;
            };
        };
        TransactionPayEx: {
            card?: {
                /**
                 * @description Visa, MasterCard, etc. The brand of the card.
                 * @example Visa
                 */
                brand?: string;
                /** @example 476173******0416 */
                masked_pan?: string;
                /** Format: \d{2}/\d{4} */
                expiry_date?: string;
                /** @description Credit or Debit. Indicates the type of card used
                 *      */
                type?: string;
                /** @description The name of the bank that issued the card used
                 *      */
                issuing_bank?: string;
                /**
                 * Format: iso-3166-1
                 * @description The country the card is issued in
                 */
                country?: string;
                /**
                 * @description 3DSECURE or SSL. Indicates the transaction type of the acquirer.
                 *
                 * @enum {string}
                 */
                acquirer_transaction_type?: "3DSECURE" | "SSL";
                /** @description The System Trace Audit Number assigned by the acquirer to
                 *     uniquely identify the transaction.
                 *      */
                acquirer_stan?: string;
                /** @description The ID of the acquirer terminal. */
                acquirer_terminal_id?: string;
                /**
                 * Format: date-time
                 * @description The ISO-8601 date and time of the acquirer transaction.
                 */
                acquirer_transaction_time?: string;
                /**
                 * @description Y, A, U or N. Indicates the status of the authentication.
                 *
                 * @enum {string}
                 */
                authentication_status?: "Y" | "A" | "U" | "N";
                /** @description The payment token generated by the authorization. Only available
                 *     for transactions created from session where the
                 *     generate_payment_token option is enabled in the payex session
                 *     configuration or from payment token sessions created with payex
                 *     configured
                 *
                 *     - [POST /v1/sessions-payment-token](#operation/checkout_payment_token_session_post)
                 *      */
                payment_token?: string;
                /** @description The id of the payment_token, only included in transaction where
                 *     a payment_token was generated.
                 *      */
                payment_token_id?: string;
                /** @description The payment token generated by the authorization. Only available
                 *     for transactions created from session where the
                 *     generate_recurrence_token option is enabled in the payex session
                 *     configuration or from payment token sessions created with payex
                 *     configured
                 *
                 *     - [POST /v1/sessions-payment-token](#operation/checkout_payment_token_session_post)
                 *      */
                recurrence_token?: string;
                /** @description The id of the recurrence_token, only included in transaction where
                 *     a recurrence_token was generated.
                 *      */
                recurrence_token_id?: string;
            };
            events?: {
                metadata?: {
                    "payex:transaction:id"?: string;
                    "payex:transaction:number"?: number | string;
                    "payex:transaction:type"?: string;
                    "payex:transaction:state"?: string;
                    /** Format: date-time */
                    "payex:transaction:created"?: string;
                    "payex:transaction:payee_reference"?: string;
                };
            }[];
            metadata?: {
                "payex:payment:payee_info:payee_id"?: string;
                "payex:payment:payee_info:payee_name"?: string;
                "payex:payment:payee_info:subsite"?: string;
                "payex:payment:id"?: string;
                "payex:payment:number"?: number | string;
                "payex:payment:operation"?: string;
                /** Format: date-time */
                "payex:payment:created"?: string;
            };
        };
        TransactionSantander: {
            events?: {
                metadata?: {
                    /** @description ID of the application provided by Santander */
                    "santander:debit_account.ApplicationNumber"?: string;
                    /** @description Status code from Santander */
                    "santander:debit_account.StatusCode"?: string;
                };
            }[];
            metadata?: {
                /** @description ID of the application provided by Santander */
                "santander:debit_account.ApplicationNumber"?: string;
                /** @description Status code from Santander */
                "santander:debit_account.StatusCode"?: string;
            };
        };
        SwishTransactionEventMetadata: {
            "swish:payment_request:get_payment_url"?: string;
            "swish:id"?: string;
            "swish:originalPaymentReference"?: string;
            "swish:paymentReference"?: string;
            "swish:amount"?: string;
            "swish:dateCreated"?: string;
            "swish:datePaid"?: string;
            "swish:status"?: string;
            "swish:errorCode"?: string;
            "swish:errorMessage"?: string;
        };
        TransactionSwish: {
            events?: {
                metadata?: components["schemas"]["SwishTransactionEventMetadata"];
            }[];
            metadata?: {
                "swish:payment_request:id"?: string;
                "swish:swish_number"?: string;
                /** @description Payment request id */
                "swish:id"?: string;
                /** @description Capture payment reference from bank */
                "swish:paymentReference"?: string;
            };
        };
        TransactionVipps: {
            events?: {
                metadata?: {
                    /** Format: date-time */
                    "vipps:transactionInfo.timeStamp"?: string;
                    "vipps:transactionInfo.transactionId"?: string;
                    /** @enum {string} */
                    "vipps:transactionInfo.status"?: "INITIATE" | "RESERVE" | "CANCEL" | "CAPTURE" | "SALE" | "VOID" | "Captured" | "Cancelled" | "Refund";
                    "vipps:transaction.transactionText"?: string;
                };
            }[];
            metadata?: {
                "vipps:transaction.orderId"?: string;
                "vipps:transaction.transactionText"?: string;
                /**
                 * Format: ^\d{6}$
                 * @description Unique id for this merchant's sales channel: website, mobile app
                 *     etc. Short name: MSN.
                 *
                 */
                "vipps:merchantInfo.merchantSerialNumber"?: string;
                /** @enum {string} */
                "vipps:merchantInfo.paymentType"?: "eComm Regular Payment";
            };
        };
        Transaction: components["schemas"]["Id"] & {
            /**
             * @description The payment product corresponding to this transaction
             *
             * @enum {string}
             */
            payment_product: "bambora" | "collector" | "dintero" | "dintero_psp" | "instabank" | "klarna" | "netaxept" | "payex" | "santander" | "swish" | "vipps";
            /**
             * @description The payment product type corresponding to this transaction
             *
             * @enum {string}
             */
            payment_product_type: "bambora.creditcard" | "bambora.vipps" | "collector.invoice" | "collector.invoice_b2b" | "collector.invoice_b2b_preapproved" | "collector.installment" | "dintero.zero" | "dintero.wallets" | "dintero_psp.creditcard" | "instabank.finance" | "instabank.invoice" | "instabank.installment" | "instabank.postponement" | "klarna.klarna" | "klarna.billie" | "netaxept.creditcard" | "payex.creditcard" | "payex.mobilepay" | "payex.swish" | "payex.vipps" | "payex.applepay" | "payex.clicktopay" | "payex.googlepay" | "santander.debit_account" | "swish.swish" | "vipps";
            /**
             * @description Non-negative, minor units. Total amount of the transaction
             *
             * @example 72200
             */
            amount: number;
            /**
             * Format: iso4217-code
             * @description ISO 4217 transaction currency
             * @example NOK
             */
            currency: string;
            /** @description An id that identifies the seller, value will be included in
             *     the settlement reports
             *      */
            payout_destination_id?: string;
            /** @description A reference specified by the merchant to identify the transaction
             *      */
            merchant_reference?: string;
            /** @description A reference specified by the merchant to identify the transaction, can be updated after the transaction has been created
             *      */
            merchant_reference_2?: string;
            /** @description A short reference / descriptor that will show
             *     up on the customers bank statement
             *      */
            dynamic_descriptor?: string;
            payment_operation?: components["schemas"]["PaymentOperationIntent"];
            settlement_status?: components["schemas"]["SettlementStatus"];
            customer?: {
                /** @description Customer id
                 *      */
                customer_id?: string;
                /**
                 * @description Customer email address
                 *
                 * @example john.doe@example.com
                 */
                email?: string;
                /**
                 * @description Customer phone number, ITU/E.123 format with
                 *     international prefix (+PPNNNNNNNNN...)
                 *
                 * @example +4799999999
                 */
                phone_number?: string;
                my_dintero?: components["schemas"]["MyDinteroUserCreation"];
            };
            /**
             * @description The IP address of the customer
             * @example 127.0.0.1
             */
            customer_ip?: string;
            /**
             * @description The full user agent string of the device the customer used
             *     to submit the transaction
             *
             * @example Mozilla/5.0 ...
             */
            user_agent?: string;
            initiating_system_request_headers?: components["schemas"]["SystemRequestHeaders"];
            shipping_address?: components["schemas"]["OrderAddress"];
            shipping_option?: components["schemas"]["SplitShippingOption"];
            billing_address?: components["schemas"]["OrderAddress"];
            store?: components["schemas"]["Store"];
            /**
             * @description The current status of the transaction
             * @example CAPTURED
             * @enum {string}
             */
            readonly status?: "INITIATED" | "AUTHORIZED" | "AUTHORIZATION_VOIDED" | "CAPTURED" | "PARTIALLY_CAPTURED" | "REFUNDED" | "PARTIALLY_REFUNDED" | "DECLINED" | "FAILED" | "UNKNOWN" | "ON_HOLD";
            card?: {
                /** @enum {string} */
                type?: "Credit Card" | "Debit Card" | "Credit" | "Debit";
            };
            /** @description The gift cards that used to partially or fully authorize the transaction
             *      */
            gift_cards?: components["schemas"]["Giftcard"][];
            /**
             * @description The applicable transaction items
             *
             * @example [
             *       {
             *         "amount": 2000,
             *         "quantity": 2,
             *         "line_id": "1",
             *         "description": "Forsvinnignspølse",
             *         "vat": 20,
             *         "id": "10"
             *       },
             *       {
             *         "amount": 6600,
             *         "quantity": 2,
             *         "line_id": "2",
             *         "description": "Vissvossafår på neppebrød",
             *         "vat": 20,
             *         "id": "6",
             *         "eligible_for_discount": true,
             *         "is_changed": true,
             *         "gross_amount": 10000,
             *         "discount_lines": [
             *           {
             *             "amount": 4400,
             *             "discount_type": "customer",
             *             "discount_id": "ed960ace-eb16-4e2e-ae52-b27647ccae8d",
             *             "description": "Vossafestpris",
             *             "line_id": 1
             *           }
             *         ]
             *       },
             *       {
             *         "amount": 59700,
             *         "quantity": 3,
             *         "line_id": "3",
             *         "description": "Luftboller",
             *         "vat": 20,
             *         "id": "1"
             *       }
             *     ]
             */
            items?: (components["schemas"]["OrderItem"] & components["schemas"]["OrderDiscountItem"])[];
            url?: {
                /**
                 * Format: uri
                 * @description URL the customer is redirected after checkout completes
                 *     (successfully or failed)
                 *
                 */
                readonly redirect_url?: string;
                /**
                 * Format: uri
                 * @description URL the customer is redirected to for authentication.
                 *
                 */
                readonly approval_url?: string;
                /**
                 * Format: uri
                 * @description URL that Checkout will call when the session payment is complete
                 *     and the transaction has been authorized
                 *
                 */
                callback_url?: string;
            };
            /**
             * @description All events recorded on the transaction
             *
             * @example [
             *       {
             *         "event": "INITIATE",
             *         "transaction_status": "INITIATED",
             *         "created_at": "2019-01-18T13:13:37.175Z",
             *         "success": true,
             *         "request_id": "a3dcc23125bc4363b9dae29ed25a4eb1"
             *       },
             *       {
             *         "event": "AUTHORIZE",
             *         "transaction_status": "AUTHORIZED",
             *         "created_at": "2019-01-18T13:13:37.540Z",
             *         "success": true,
             *         "request_id": "f5f64165e5b3404e9af63586c184c3e9"
             *       },
             *       {
             *         "event": "CAPTURE",
             *         "transaction_status": "PARTIALLY_CAPTURED",
             *         "created_at": "2019-01-18T15:37:00.879Z",
             *         "created_by": "99115ac5-2d10-4be4-8594-bbf5e3aa7dfc",
             *         "amount": 59700,
             *         "splits": [
             *           {
             *             "payout_destination_id": "P000000001",
             *             "amount": 29700
             *           },
             *           {
             *             "payout_destination_id": "P000000002",
             *             "amount": 30000
             *           }
             *         ],
             *         "fee_split": {
             *           "type": "proportional",
             *           "destinations": [
             *             "P000000001"
             *           ]
             *         },
             *         "items": [
             *           {
             *             "amount": 59700,
             *             "quantity": 3,
             *             "line_id": "3"
             *           }
             *         ],
             *         "success": true,
             *         "request_id": "27c71936004e48649c6dd437d314d90c"
             *       },
             *       {
             *         "event": "CAPTURE",
             *         "transaction_status": "CAPTURED",
             *         "created_at": "2019-01-18T21:24:31.669Z",
             *         "created_by": "a33aef94-a17d-447a-a1dd-81055892b59d",
             *         "amount": 8600,
             *         "items": [
             *           {
             *             "amount": 2000,
             *             "quantity": 2,
             *             "line_id": "1"
             *           },
             *           {
             *             "amount": 6600,
             *             "quantity": 2,
             *             "line_id": "2"
             *           }
             *         ],
             *         "success": true,
             *         "request_id": "c3e60b98a1d1466c97151318be621cf9"
             *       }
             *     ]
             */
            events?: components["schemas"]["TransactionEvent"][];
            /**
             * @description The session id for the transaction
             * @example P00000000.465U8CUzaPVpneu1wt8Wei
             */
            session_id?: string;
            session?: components["schemas"]["Session"];
            /**
             * Format: date-time
             * @description When the transaction was last modified.
             */
            updated_at?: string;
            /**
             * Format: date-time
             * @description When the transaction was created
             */
            created_at?: string;
            /** @description Additional details about the transaction */
            metadata?: {
                merchant_name?: string;
                /** @description Profile Id used when session was created */
                "session:profile_id"?: string;
                /**
                 * @description How settlement payout will be done by Dintero
                 *
                 *     - `payout_account`: Payout directly to merchant
                 *     - `payout_splits`: Payout is splitted to one or more sellers
                 *     - `payout_destination_id`: Payout is done to a single seller
                 *
                 * @enum {string}
                 */
                payout?: "payout_account" | "payout_splits" | "payout_destination_id";
                /** @description Id that will be referenced on the settlement report
                 *      */
                payout_correlation_id?: string;
            };
            checkboxes?: components["schemas"]["CheckboxConfiguration"];
        } & components["schemas"]["TransactionBambora"] & components["schemas"]["TransactionCollector"] & components["schemas"]["TransactionInstabank"] & components["schemas"]["TransactionDinteroPsp"] & components["schemas"]["TransactionKlarna"] & components["schemas"]["TransactionNetaxept"] & components["schemas"]["TransactionPayEx"] & components["schemas"]["TransactionSantander"] & components["schemas"]["TransactionSwish"] & components["schemas"]["TransactionVipps"];
        SettlementItem: {
            /** @description Unique identifier for the settlement
             *      */
            id?: string;
            /** @description Time of first payment event in this settlement */
            start_at?: string;
            /** @description Time of last payment event in this settlement */
            end_at?: string;
            /** @description Settlement date */
            settled_at?: string;
            /** @description Time of email received in Dintero's system */
            email_received_at?: string;
            /** @description Name of payment provider. */
            provider?: string;
            /** @description The provider's unique id of the settlement */
            provider_reference?: string;
            attachments?: {
                /** @description Unique id of the attachment */
                id?: string;
                /** @description Attachment path */
                key?: string;
                /** @example application/xml */
                content_type?: string;
                extension?: string;
                /**
                 * @description Where the attachment was created. Might be created by dintero,
                 *     or might be created by the providers, e.g. payex, vipps, collector
                 *
                 * @example payex
                 */
                created_by?: string;
            }[];
            amounts?: {
                /** @description The amount paid out, unless payment_status is postponed.
                 *
                 *     `amount = capture - refund - fee`
                 *      */
                amount?: number;
                /** @description The amount captured on the orders in the settlement period.
                 *      */
                capture?: number;
                /** @description The amount refunded on the orders in the settlement period.
                 *      */
                refund?: number;
                /** @description The sum of fees on the orders in the settlement period.
                 *      */
                fee?: number;
                /**
                 * Format: iso4217-code
                 * @example NOK
                 */
                currency?: string;
            }[];
            /**
             * @description Whether the amount in the report has actually been paid or not.
             *     The payment might be postponed for later.
             *
             * @enum {string}
             */
            payment_status?: "paid" | "postponed";
            /** @description The sales location this report is for. Will only be set if all
             *     transactions share the same store_id.
             *      */
            store_id?: string;
            /** @description The seller id this report is for. Will only be set if all
             *     transactions share the same payout_destination_id.
             *      */
            payout_destination_id?: string;
        };
        SettlementResponse: {
            items?: components["schemas"]["SettlementItem"][];
            last_evaluated_key?: {
                id?: string;
                account_id?: string;
                settled_at?: string;
            };
        };
        UpdateSettlementReportConfigItem: {
            /**
             * @description **Deprecated** report configuration is not used for controlling when to create and send report
             *
             *     Value in milliseconds describing how often reports should be sent.
             *
             * @example 86400000
             */
            send_every?: number;
            /** @description The filetypes that should be sent */
            filetypes: string[];
            /** @description List of destinations. If empty, the report is just stored and visible from the backoffice. */
            destinations: {
                id?: string;
                /**
                 * @description Specifies the type of destination.
                 *
                 *     - account_email: Send email to the billing email address registered on the account
                 *     - email: Send email to the email address specified in `destination_value`
                 *
                 * @enum {string}
                 */
                destination_type: "account_email" | "email";
                /** @description If destination_type is email, the email address goes here
                 *      */
                destination_value?: string;
            }[];
            /** @description List of providers to send report for. If empty, send for all. */
            providers: string[];
            /** @description The report will only be sent to the provided destinations if it satisfies these criterias.
             *      */
            filters?: {
                /**
                 * @description The "field/column" the data will be filtered on
                 *
                 * @enum {string}
                 */
                filter?: "payout_destination_id";
                /** @description The value the records must contain for the provided filter (field/column) */
                value?: string;
            }[];
        };
        SettlementReportConfigItem: components["schemas"]["UpdateSettlementReportConfigItem"] & {
            id?: string;
            /** @description **Deprecated** report configuration is not used for controlling when to create and send report
             *
             *     Value in milliseconds (Unix epoch) describing when last time reports was sent.
             *      */
            readonly last_send_at?: number;
            /** @description **Deprecated** report configuration is not used for controlling when to create and send report
             *
             *     Value in milliseconds (Unix epoch) describing when last time reports was modified.
             *      */
            readonly last_modified_at?: number;
            /**
             * Format: date-time
             * @description The date-time when the resource was created
             *
             */
            readonly created_at?: string;
            /**
             * Format: date-time
             * @description The date-time when the resource was last updated
             *
             */
            readonly updated_at?: string;
            readonly account_id?: string;
        };
        SettlementReportConfigResponse: {
            items?: components["schemas"]["SettlementReportConfigItem"][];
            /** @description cursor for use in pagination */
            starting_after?: string;
        };
        ReportFilter: {
            /**
             * @description The "field/column" the data will be filtered on
             * @enum {string}
             */
            filter?: "operation_payout_destination" | "store_id";
            /** @description The value the records must contain for the provided filter (field/column) */
            value?: string;
        };
        ReportMetadata: {
            /** @description Unique identification of the report */
            readonly id?: string;
            /** @description Unique identification for all reports created by the same reportconfig at the same time (with different content types) */
            readonly report_job_id?: string;
            /** @description Id of the report owner */
            readonly account_id?: string;
            /** @description Id of the template used to create the report */
            readonly template_id?: string;
            /**
             * @description Report content type
             * @example application/pdf
             */
            readonly content_type?: string;
            /**
             * @description Report content language
             * @example en
             */
            readonly content_language?: string;
            /**
             * @description The ID of the user/client that created the report
             *
             * @example 1c92f7e1-2897-4d46-bdcc-c127a914fb4e
             */
            readonly created_by?: string;
            /**
             * Format: date-time
             * @description The date-time when the report was created
             *
             */
            readonly created_at?: string;
            /**
             * Format: date-time
             * @description The start of the data interval, contains created_at if data_from qparam not provided
             *
             */
            readonly data_from?: string;
            /**
             * Format: date-time
             * @description The end of the data interval, contains created_at if data_to qparam not provided
             *
             */
            readonly data_to?: string;
            /** @description Schedule for the report */
            readonly schedule?: string;
            /** @description Name of the report file stored in S3.
             *      */
            readonly report_file_name?: string;
            /** @description Custom name of the report, defined in the report configuration used to generate the report
             *      */
            readonly custom_report_name?: string;
            /** @description Id of the report configuration used to generate the report.
             *      */
            readonly report_config_id?: string;
            /** @description Source of the data used to generate the report. Defined by the report configuration used to create the report
             *      */
            readonly data_type?: string;
            /** @description Signed url used to download the report from s3
             *      */
            readonly signed_url?: string;
            /** @description List of filters used to filter the data for the report. Similar to SQL WHERE-clause. i.e, WHERE filter=value */
            report_filters?: components["schemas"]["ReportFilter"][];
        };
        /** @description cursor for use in pagination. starting_after is an object ID
         *     that defines your place in the list. For instance, if you make
         *     a list request and receive 100 objects, ending with `obj_foo`,
         *     your subsequent call can include `starting_after=obj_foo`
         *     in order to fetch the next page of the list.
         *      */
        StartingAfter: string;
        AuthToken: {
            grant_type: string;
        };
        AccessToken: {
            /**
             * @description A JWT access token
             * @example eyJhbGci...t7P4
             */
            access_token: string;
            /** @enum {string} */
            token_type: "Bearer";
            /**
             * @description The lifetime in seconds of the access token.  For
             *     example, the value "3600" denotes that the access token will
             *     expire in one hour from the time the response was generated.
             *
             * @example 86400
             */
            expires_in: number;
            /** @description Token that can be used to request new tokens when the existing
             *     Access Token expire.
             *
             *     You can only get a Refresh Token if the Access Token used in the
             *     request has scope:
             *
             *      - `create:accounts:auth:refresh_token`
             *
             *     and the `grant-type` is one of:
             *
             *      - `authorization_code`
             *      - `password`
             *
             *     **NOTE**:
             *      - A Single-Page Application should not ever receive a Refresh Token,
             *        this information is sensitive and should not be exposed client-side
             *        in a browser.
             *      - Refresh token must be stored securely by an application since
             *        they allow a user to remain authenticated essentially forever.
             *      */
            refresh_token?: string;
        };
        Entity: {
            /**
             * Format: uuid
             * @description An UUID that uniquely identifies the resource
             *
             */
            readonly id?: string;
            /**
             * Format: date-time
             * @description The date-time when the resource was created
             *
             */
            readonly created_at?: string;
            /**
             * @description The ID of the user/client created the resource
             *
             * @example 1c92f7e1-2897-4d46-bdcc-c127a914fb4e
             */
            readonly created_by?: string;
            /**
             * Format: date-time
             * @description The date-time when the resource was last updated
             *
             */
            readonly updated_at?: string;
            /**
             * @description The ID of the user/client created the resource
             *
             * @example 1c92f7e1-2897-4d46-bdcc-c127a914fb4e
             */
            readonly deleted_by?: string;
            /** Format: date-time */
            readonly deleted_at?: string;
        };
        ApprovalsBankAccount: {
            /** @description Name of the Bank used */
            bank_name?: string;
            /** @description BBAN, national bank account number */
            bank_account_number?: string;
            /**
             * @description The type of bank account number. Will default to BBAN in bank_country_code
             *     is norwegian. Will default to IBAN in all other countries.
             *
             * @enum {string}
             */
            bank_account_number_type?: "IBAN" | "BBAN";
            /**
             * Format: iso-3166-1
             * @description Country code, must be a two letter ISO 3166-1-alpha-2 country code. If not
             *     set we default to the country_code of parent approval object.
             *
             */
            bank_account_country_code?: string;
            /**
             * Format: iso4217-code
             * @description The three-character ISO-4217 currency.
             *     https://en.wikipedia.org/wiki/ISO_4217
             *
             * @example NOK
             */
            bank_account_currency: string;
            /**
             * Format: iso4217-code
             * @description The three-character ISO-4217 currency.
             *     https://en.wikipedia.org/wiki/ISO_4217
             *
             * @example NOK
             */
            payout_currency: string;
            /**
             * @description A BIC code, or Bank Identifier Code also know as SWIFT code, consistin of
             *     8 to 11 alphanumeric characters.
             *
             * @example DNBANOKKXXX
             */
            bank_identification_code?: string;
        };
        ApprovalsPayoutDestination: components["schemas"]["Entity"] & {
            /** @description ID of seller to create when the contract has been completed,
             *     signed, and approved.
             *      */
            payout_destination_id: string;
            /** @description The name of the seller */
            payout_destination_name?: string;
            /** @description Description of the seller */
            payout_destination_description?: string;
            /** @description A static reference that will be included on bank payments, the
             *     name of the service the payout-destination will be enrolled into.
             *     Eg. if yor platform is an "Uber for lawnmowers" called "Mowber"
             *     the payout_reference should be "Mowber".
             *      */
            payout_reference: string;
            /**
             * Format: iso-3166-1
             * @description Country code, must be a two letter ISO 3166-1-alpha-2 country code
             *
             */
            country_code: string;
            /** @description National organization number valid in the country specified.
             *      */
            organization_number: string;
            /** @description Bank account information about the seller. Currently
             *     the contract service only supports one bank_account per payout
             *     destination.
             *      */
            bank_accounts: components["schemas"]["ApprovalsBankAccount"][];
            /**
             * @description The interval of the payout. The interval can be `daily`, `weekly` or `monthly`.
             *
             * @enum {string}
             */
            payout_interval_type?: "daily" | "weekly" | "monthly";
            /** @description The user that will submit the form. If the email is set the user will be notified
             *     about the form via email.
             *      */
            form_submitter?: {
                /**
                 * Format: email
                 * @description The email of the user that will submit the form.
                 *
                 */
                email?: string;
                /** @description The name of the user that will submit the form.
                 *      */
                name?: string;
                /** @description The title of the user that will submit the form.
                 *      */
                title?: string;
            };
        };
        /** @enum {string} */
        ApprovalStatus: "ACTIVE" | "DECLINED" | "UNDER_MANUAL_REVIEW" | "AUTOMATIC_REVIEW" | "WAITING_FOR_SIGNATURE" | "WAITING_FOR_DECLARATION" | "ERROR" | "ARCHIVED" | "WAITING_FOR_DETAILS";
        ApprovalsPayoutDestinationResponse: components["schemas"]["ApprovalsPayoutDestination"] & {
            case_status?: components["schemas"]["ApprovalStatus"];
            links?: {
                /**
                 * Format: uri
                 * @description The URL of the link.
                 */
                href?: string;
                /**
                 * @description Specifies the type of link
                 *
                 * @enum {string}
                 */
                rel?: "contract_url" | "cdd_case_url" | "dintero_cdd_case_url" | "declaration_url" | "signed_contract_file_url";
            }[];
        };
        PaySessionBase: {
            url?: {
                callback_url?: components["schemas"]["CallbackUrl"];
            };
            customer?: components["schemas"]["SessionCustomer"];
            order: components["schemas"]["SessionOrder"];
            /** Format: date-time */
            expires_at?: string;
        };
        PaySessionOptions: components["schemas"]["PaySessionBase"] & {
            configuration?: components["schemas"]["AutoCaptureConfiguration"];
        };
        PayPayment: {
            /** @description The payment product type corresponding to this transaction
             *      */
            payment_product_type: string;
        };
        SessionPayResult: {
            session_id?: string;
            success: boolean;
            actions?: {
                /** @example PAYEX */
                source?: string;
                /** @example AUTHORIZED */
                code?: string;
                /** @example success */
                type?: string;
            }[];
        };
        /** @description Order updated with discount given by discount_code.
         *      */
        DiscountCodesOrderUpdate: {
            discount_codes?: string[];
            /**
             * @description The amount to authorize/capture including VAT and discounts.
             *     In smallest unit for the currency, e.g. cents
             *
             * @example 72200
             */
            amount: number;
            /**
             * @description Items with discount lines.
             *
             *      - The list must include all items in the session order
             *      - **Required** if the session order has any items.
             *
             * @example [
             *       {
             *         "amount": 2000,
             *         "quantity": 2,
             *         "line_id": "1",
             *         "description": "Forsvinnignspølse",
             *         "vat": 20,
             *         "id": "10"
             *       },
             *       {
             *         "amount": 6600,
             *         "quantity": 2,
             *         "line_id": "2",
             *         "description": "Vissvossafår på neppebrød",
             *         "vat": 20,
             *         "id": "6",
             *         "eligible_for_discount": true,
             *         "is_changed": true,
             *         "gross_amount": 10000,
             *         "discount_lines": [
             *           {
             *             "amount": 4400,
             *             "discount_type": "external",
             *             "discount_id": "ed960ace-eb16-4e2e-ae52-b27647ccae8d",
             *             "description": "Vossafestpris",
             *             "line_id": 1
             *           }
             *         ]
             *       },
             *       {
             *         "amount": 59700,
             *         "quantity": 3,
             *         "line_id": "3",
             *         "description": "Luftboller",
             *         "vat": 20,
             *         "id": "1"
             *       }
             *     ]
             */
            items?: (components["schemas"]["OrderItem"] & {
                discount_lines?: components["schemas"]["DiscountItem"][];
            })[];
        };
        /** @description Updates to session order. If the amount is not equal to sum of items.amount and the shipping_option.amount from the request are not equal a correction item will be added to the items.
         *      */
        ShippingAddressCallbackSessionOrderUpdate: {
            /**
             * @description The amount to authorize/capture including VAT and discounts.
             *     In smallest unit for the currency, e.g. cents
             *
             * @example 29990
             */
            amount: number;
            /**
             * Format: iso4217-code
             * @description The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217
             * @example NOK
             */
            currency?: string;
            /**
             * @description The VAT of the `amount` parameter.
             *     Only used for display purposes.
             *
             *     In smallest unit for the currency, e.g. cents
             *
             * @example 6000
             */
            vat_amount?: number;
            /** @description Details about the order items.
             *
             *     #### Instabank
             *     `required` if Instabank payment is configured in and partial_payment is false.
             *     All items must include a unique `line_id`, quantity and amount
             *
             *     #### Collector Bank
             *     `required` if Collector Bank payment is configured in and partial_payment is false.
             *     All items must include a unique `line_id`, quantity and amount
             *      */
            items?: (components["schemas"]["OrderItem"] & components["schemas"]["OrderDiscountItem"])[];
            discount_codes?: string[];
        };
        FundTransferCreateDataV2: {
            /** @description A string id that uniquely identifies the fund transfer. The `id` is used
             *     for idempotent processing so you can safely retry the request with same
             *     id if you don't receive a response (for example, in case of a timeout)
             *      */
            fund_transfer_id: string;
            /** @enum {string} */
            type: "payout-destination";
            source_payout_destination_id: string;
            destination_payout_destination_id: string;
            /** @description The amount of the fund transfer in the smallest unit of the currency */
            amount: number;
            currency: string;
            /** @description A static reference that will be included on settlements made to the sellers
             *      */
            reference: string;
        };
        /** @description This object contains the result from initiating a transfer fund
         *      */
        FundTransferV2: components["schemas"]["FundTransferCreateDataV2"] & {
            account_id: string;
            /**
             * Format: date-time
             * @description The date-time when the resource was created
             */
            readonly created_at: string;
            /** @description User id of the user who created the resource */
            readonly created_by: string;
        };
        /** @description Seller balance for a currency
         *      */
        PayoutDestinationBalanceV2: {
            readonly account_id: string;
            /** @description A string id that uniquely identifies the payout destination configuration id */
            readonly payout_destination_config_id: string;
            /** @description The id of the seller as defined elsewhere in dintero.
             *      */
            payout_destination_id: string;
            currency: string;
            /** @description Amount in the smallest unit of the currency */
            amount: number;
        };
        PayoutDestinationBalancesV2: components["schemas"]["PayoutDestinationBalanceV2"][];
        PaymentMatchReportDataV2: {
            /** @description Time of first payment event in this transfer */
            start_at?: string;
            /** @description Time of last payment event in this transfer */
            end_at?: string;
            /** @description Settlement date */
            settled_at?: string;
            /** @description Time of creation of the transfer report */
            created_at?: string;
            /** @description Name of payment provider. */
            provider?: string;
            /** @description The provider's unique id of the settlement */
            provider_reference?: string;
            attachments?: {
                /** @description Unique id of the attachment */
                id?: string;
                /** @description Attachment path */
                key?: string;
                /** @example application/xml */
                content_type?: string;
                extension?: string;
                /**
                 * @description Where the attachment was created. Might be created by dintero,
                 *     or might be created by the providers, e.g. payex, vipps, collector
                 *
                 * @example payex
                 */
                created_by?: string;
            }[];
            amounts?: {
                /** @description The amount paid out, unless payment_status is postponed.
                 *
                 *     `amount = capture - refund - fee`
                 *      */
                amount?: number;
                /** @description The amount captured on the orders in the settlement period.
                 *      */
                capture?: number;
                /** @description The amount refunded on the orders in the settlement period.
                 *      */
                refund?: number;
                /** @description The sum of fees on the orders in the settlement period.
                 *      */
                fee?: number;
                /**
                 * Format: iso4217-code
                 * @example NOK
                 */
                currency?: string;
            }[];
            /**
             * @description Status of the payment.
             *
             * @enum {string}
             */
            payment_status?: "payment-match";
            /** @description The sales location this report is for. Will only be set if all
             *     transactions share the same store_id.
             *      */
            store_id?: string;
            /** @description The seller id this report is for. Will only be set if all
             *     transactions share the same payout_destination_id.
             *      */
            payout_destination_id?: string;
        };
        /** @description Seller transfer entry
         *      */
        PayoutDestinationTransferEntryV2: {
            /** @description A string id that uniquely identifies the entry in the ledger */
            readonly ledger_entry_id: string;
            /** @description The Dintero account id */
            readonly account_id: string;
            /** @description A string id that uniquely identifies the payout destination configuration id */
            readonly payout_destination_config_id: string;
            /** @description The id of the seller as defined elsewhere in dintero.
             *      */
            readonly payout_destination_id: string;
            /**
             * Format: date-time
             * @description The date-time when the resource was created
             */
            readonly created_at: string;
            readonly currency: string;
            /** @description Amount in the smallest unit of the currency */
            readonly amount: number;
            /**
             * @description The type of the transfer.
             *     - `inbound` is a transfer from a payment provider to the sellers account in Dintero
             *     - `transfer` is a transfer between two Dintero sellers
             *     - `outbound` is a transfer from the seller account in Dintero to the sellers bank account
             *
             * @enum {string}
             */
            readonly type: "inbound" | "transfer" | "outbound";
            /** @description The underlying payment provider for the inbound payment, eg. `collector`, `bambora`, `payex`.
             *     Only applicable for type `inbound`
             *      */
            readonly inbound_payment_provider: string | null;
            /** @description The id of the transfer.
             *     Only applicable for type `transfer`
             *      */
            readonly transfer_id: string | null;
            /** @description The id of the seller that money was transferred from as defined elsewhere in dintero.
             *     Only applicable for type `transfer`
             *      */
            readonly transfer_source_payout_destination_id: string | null;
            /** @description The id of the seller that money was transferred to as defined elsewhere in dintero.
             *     Only applicable for type `transfer`
             *      */
            readonly transfer_destination_payout_destination_id: string | null;
            /** @description The reference of the transfer.
             *     Only applicable for type `transfer`
             *      */
            readonly transfer_reference: string | null;
            /** @description The country of the bank account that will receive the funds.
             *     Only applicable for type `outbound`
             *      */
            readonly outbound_receiver_country: string | null;
            /** @description The bank account number type that will receive the funds, eg. `iban` or `bban`.
             *     Only applicable for type `outbound`
             *      */
            readonly outbound_receiver_bank_account_type: string | null;
            /** @description The bank account number that will receive the funds.
             *     Only applicable for type `outbound`
             *      */
            readonly outbound_receiver_bank_account_number: string | null;
            /** @description The bic for the bank account will receive the funds.
             *     Only applicable for type `outbound` if the bank account type is `iban`
             *      */
            readonly outbound_receiver_bank_account_bic: string | null;
            /** @description Text message attached to the bank transaction.
             *     Only applicable for type `outbound`
             *      */
            readonly outbound_message: string | null;
            payment_match_report_data?: components["schemas"]["PaymentMatchReportDataV2"];
        };
        PayoutDestinationTransfersV2: components["schemas"]["PayoutDestinationTransferEntryV2"][];
        Payment: {
            /** @description The payment product type corresponding to this transaction
             *      */
            payment_product_type: string;
        };
        CollectorPaymentDetails: {
            /** @description The payment product type corresponding to this transaction
             *      */
            payment_product_type: string;
        };
        CollectorDetails: {
            /** @description The social security number of the customer. For Norway, the length is 11. For Sweden, it's either 10 or 12 digits.
             *      */
            social_security_number: string;
        };
        CollectorAddress: {
            /** @example John */
            first_name: string;
            /** @example Doe */
            last_name: string;
            /** @description Gaustadalleen 21 */
            address_line: string;
            /** @description More details about address. */
            address_line_2?: string;
            /** @description Name of the company */
            business_name?: string;
            /** @description CO-Address if applicable. */
            co_address?: string;
            /**
             * @description The zip code / postal code of the address.
             * @example 0349
             */
            postal_code: string;
            /**
             * @description The name of the postal code
             * @example Oslo
             */
            postal_place: string;
            /**
             * Format: iso3166-alpha2
             * @description Country of the location
             * @example NO
             */
            country: string;
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *      */
            phone_number: string;
            /** @description The email address of a person or an organisation
             *      */
            email: string;
        };
        PaymentOperation: {
            /** @enum {string} */
            content_type?: "application/json" | "application/javascript" | "text/html";
            /**
             * @description The HTTP method to use when performing the operation
             *
             * @enum {string}
             */
            method?: "GET" | "POST";
            rel: string;
        };
        KlarnaAddress: {
            /** @example John */
            first_name: string;
            /** @example Doe */
            last_name: string;
            /**
             * @description Street address.
             * @example Gaustadalleen 21
             */
            address_line: string;
            /** @description More details about address. */
            address_line_2?: string;
            /** @description Name of the company */
            business_name?: string;
            /**
             * @description The zip code / postal code of the address.
             * @example 0349
             */
            postal_code: string;
            /**
             * @description The name of the postal code
             * @example Oslo
             */
            postal_place: string;
            /**
             * Format: iso3166-alpha2
             * @description Country of the location
             * @example NO
             */
            country: string;
            /** @description mobile number of a person / company, ITU/E.123 format with
             *     international prefix (+PPNNNNNNNNN...)
             *      */
            phone_number: string;
            /** @description The email address of a person or an organisation
             *      */
            email: string;
        };
    };
    responses: {
        /** @description checkout session created */
        SessionCreated: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @description The id of the checkout session */
                    id?: string;
                    /**
                     * Format: uri
                     * @description URL for the Checkout session
                     *
                     * @example https://checkout.api.dintero.com/v1/view/9ea1610a357dc8189081c4cb955f26f612d91367
                     */
                    url?: string;
                    publish?: components["schemas"]["PublishConfiguration"];
                    session?: components["schemas"]["Id"] & components["schemas"]["Session"] & components["schemas"]["SessionRead"] & components["schemas"]["SessionCancelled"];
                };
            };
        };
        /** @description Bad / Invalid request */
        BadRequest: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Access forbidden, invalid JWT token was used */
        AccessForbidden: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Forbidden */
        Forbidden: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Unexpected Error */
        ServerError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Resource was not found */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Request accepted for processing.
         *      */
        TransactionOperationAccepted: {
            headers: {
                /** @description The request_id of the event that was accepted for processing.
                 *     The transaction will be updated with a new event with
                 *     `correlation_request_id` set when the operation completes.
                 *      */
                "event-request-id"?: string;
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Transaction"];
            };
        };
        /** @description Conflict */
        Conflict: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Processor temporarily unavailable */
        ProcessorTemporarilyUnavailable: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Settlements List */
        SettlementsList: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["SettlementResponse"];
            };
        };
        /** @description Unauthorized */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Settlement report configurations list */
        SettlementReportConfigList: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["SettlementReportConfigResponse"];
            };
        };
        /** @description Settlement report configuration */
        SettlementReportConfig: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["SettlementReportConfigItem"];
            };
        };
        /** @description Report Metadata */
        ReportMetadata: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    reports?: components["schemas"]["ReportMetadata"][];
                    starting_after?: components["schemas"]["StartingAfter"];
                };
            };
        };
        /** @description Too Many Requests */
        TooManyRequests: {
            headers: {
                /** @description Indicates how long the user agent should wait
                 *     in seconds before making a follow-up request.
                 *      */
                "Retry-After"?: number;
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description List of ApprovalsPayoutDestinationResponse objects */
        ApprovalsPayoutDestinationList: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    payout_destinations?: components["schemas"]["ApprovalsPayoutDestinationResponse"][];
                };
            };
        };
        /** @description Created ApprovalsPayoutDestinationResponse */
        ApprovalsPayoutDestinationCreated: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ApprovalsPayoutDestinationResponse"];
            };
        };
    };
    parameters: {
        /** @description Feature toggles that will change how the API works.
         *
         *     These feature toggles are usually the preferred way to use the API, but they break the current API.
         *
         *     - strict-session-amounts: `order.amount` must equal the sum of amounts in `order.items` + `order.shipping_option.amount` when creating sessions
         *      */
        FeatureToggles: "strict-session-amounts"[];
        /** @description The name of the ecommerce solution
         *
         *     Example: `woocommerce`
         *      */
        DinteroSystemName: string;
        /** @description The version number of the ecommerce solution
         *
         *     Example: `5.4`
         *      */
        DinteroSystemVersion: string;
        /** @description The name of the ecommerce plugin
         *
         *     Example: `Dintero.Checkout.WooCommerce`
         *      */
        DinteroSystemPluginName: string;
        /** @description The version number of the ecommerce plugin
         *
         *     Example: `2.3.4`
         *      */
        DinteroSystemPluginVersion: string;
        /** @description The session ID */
        SessionId: string;
        /** @description The ID of the transaction */
        TransactionId: string;
        /** @description List of ids that should be included in the result. ?id=A&id=B&id=X
         *      */
        Ids: string[];
        /** @description A limit on the number of objects to be returned. Limit can range
         *     between 1 and 100 items, and the default is 10 items.
         *      */
        Limit: number;
        /** @description cursor for use in pagination. starting_after is an object ID
         *     that defines your place in the list. For instance, if you make
         *     a list request and receive 100 objects, ending with `obj_foo`,
         *     your subsequent call can include `starting_after=obj_foo`
         *     in order to fetch the next page of the list.
         *      */
        StartingAfter: string;
        /** @description An id that uniquely identifies the account.
         *      */
        accountId: string;
        /** @description A limit on the number of objects to be returned. Limit can range
         *     between 1 and 1000 items, and the default is 100 items.
         *      */
        limit1k: number;
        /** @description report config id */
        reportConfigId: string;
        /** @description A limit on the number of objects to be returned. Limit can range
         *     between 1 and 100 items, and the default is 10 items.
         *      */
        limit: number;
        /** @description cursor for use in pagination. starting_after is an object ID
         *     that defines your place in the list. For instance, if you make
         *     a list request and receive 100 objects, end the result contains
         *       `paging_token=pt1`, your subsequent call can include
         *     `starting_after=pt1` in order to fetch the next page of the list.
         *      */
        startingAfter: string;
        /** @description An id that uniquely identifies the account or owner (partner)
         *      */
        owner: string;
        /** @description Seller id */
        payoutDestinationId: string;
        /** @description A limit on the number of objects to be returned. Limit can range
         *     between 1 and 1000 items, and the default is 10 items.
         *      */
        limitV2: number;
        /** @description The page (as defined by the next_page_token in the api response) */
        page: string;
    };
    requestBodies: {
        example_discount_codes_callback_urlOptions: {
            content: {
                "application/json": components["schemas"]["Id"] & components["schemas"]["Session"] & components["schemas"]["SessionRead"];
            };
        };
    };
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    checkout_session_profile_post: {
        parameters: {
            query?: {
                /** @description Include all details about the session created
                 *      */
                include_session?: boolean;
            };
            header?: {
                /** @description Feature toggles that will change how the API works.
                 *
                 *     These feature toggles are usually the preferred way to use the API, but they break the current API.
                 *
                 *     - strict-session-amounts: `order.amount` must equal the sum of amounts in `order.items` + `order.shipping_option.amount` when creating sessions
                 *      */
                "Dintero-Feature-Toggles"?: components["parameters"]["FeatureToggles"];
                /** @description The name of the ecommerce solution
                 *
                 *     Example: `woocommerce`
                 *      */
                "Dintero-System-Name"?: components["parameters"]["DinteroSystemName"];
                /** @description The version number of the ecommerce solution
                 *
                 *     Example: `5.4`
                 *      */
                "Dintero-System-Version"?: components["parameters"]["DinteroSystemVersion"];
                /** @description The name of the ecommerce plugin
                 *
                 *     Example: `Dintero.Checkout.WooCommerce`
                 *      */
                "Dintero-System-Plugin-Name"?: components["parameters"]["DinteroSystemPluginName"];
                /** @description The version number of the ecommerce plugin
                 *
                 *     Example: `2.3.4`
                 *      */
                "Dintero-System-Plugin-Version"?: components["parameters"]["DinteroSystemPluginVersion"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SessionProfile"] & components["schemas"]["SessionCustomerTokens"] & components["schemas"]["SessionCustomerGiftcards"] & components["schemas"]["Metadata"];
            };
        };
        responses: {
            200: components["responses"]["SessionCreated"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    checkout_session_get: {
        parameters: {
            query?: {
                /** @description Include aditional data that are by default excluded from the session details.
                 *
                 *     - **`events.request_headers`** Include the event headers stored for each event
                 *     - **`initiating_system_request_headers`** Include the request headers from the initating system
                 *      */
                includes?: ("events.request_headers" | "initiating_system_request_headers")[];
            };
            header?: never;
            path: {
                /** @description The session ID */
                session_id: components["parameters"]["SessionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description checkout session */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Id"] & components["schemas"]["Session"] & components["schemas"]["SessionRead"] & components["schemas"]["SessionCancelled"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["ServerError"];
        };
    };
    checkout_session_put: {
        parameters: {
            query?: {
                /** @description If `express.shipping_options` is set, there will not be a callback to `shipping_address_callback_url`,
                 *     unless `force_shipping_address_callback` is also set.
                 *
                 *     If `express.shipping_options` is not set, there will be a callback to `shipping_address_callback_url`.
                 *      */
                force_shipping_address_callback?: boolean;
                /** @description Allow updating session without it having been locked first.
                 *
                 *     Allowed for server-to-server when the checkout has not been rendered yet.
                 *      */
                update_without_lock?: boolean;
            };
            header?: {
                /** @description Feature toggles that will change how the API works.
                 *
                 *     These feature toggles are usually the preferred way to use the API, but they break the current API.
                 *
                 *     - strict-session-amounts: `order.amount` must equal the sum of amounts in `order.items` + `order.shipping_option.amount` when creating sessions
                 *      */
                "Dintero-Feature-Toggles"?: components["parameters"]["FeatureToggles"];
                /** @description The name of the ecommerce solution
                 *
                 *     Example: `woocommerce`
                 *      */
                "Dintero-System-Name"?: components["parameters"]["DinteroSystemName"];
                /** @description The version number of the ecommerce solution
                 *
                 *     Example: `5.4`
                 *      */
                "Dintero-System-Version"?: components["parameters"]["DinteroSystemVersion"];
                /** @description The name of the ecommerce plugin
                 *
                 *     Example: `Dintero.Checkout.WooCommerce`
                 *      */
                "Dintero-System-Plugin-Name"?: components["parameters"]["DinteroSystemPluginName"];
                /** @description The version number of the ecommerce plugin
                 *
                 *     Example: `2.3.4`
                 *      */
                "Dintero-System-Plugin-Version"?: components["parameters"]["DinteroSystemPluginVersion"];
            };
            path: {
                /** @description The session ID */
                session_id: components["parameters"]["SessionId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateSessionOptions"];
            };
        };
        responses: {
            /** @description checkout session */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Id"] & components["schemas"]["Session"] & components["schemas"]["SessionRead"] & components["schemas"]["SessionCancelled"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["ServerError"];
        };
    };
    checkout_session_cancel_post: {
        parameters: {
            query?: never;
            header?: {
                /** @description The name of the ecommerce solution
                 *
                 *     Example: `woocommerce`
                 *      */
                "Dintero-System-Name"?: components["parameters"]["DinteroSystemName"];
                /** @description The version number of the ecommerce solution
                 *
                 *     Example: `5.4`
                 *      */
                "Dintero-System-Version"?: components["parameters"]["DinteroSystemVersion"];
                /** @description The name of the ecommerce plugin
                 *
                 *     Example: `Dintero.Checkout.WooCommerce`
                 *      */
                "Dintero-System-Plugin-Name"?: components["parameters"]["DinteroSystemPluginName"];
                /** @description The version number of the ecommerce plugin
                 *
                 *     Example: `2.3.4`
                 *      */
                "Dintero-System-Plugin-Version"?: components["parameters"]["DinteroSystemPluginVersion"];
            };
            path: {
                /** @description The session ID */
                session_id: components["parameters"]["SessionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description checkout session */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Id"] & components["schemas"]["Session"] & components["schemas"]["SessionRead"] & components["schemas"]["SessionCancelled"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["ServerError"];
        };
    };
    checkout_payment_token_session_post: {
        parameters: {
            query?: {
                /** @description Include all details about the session created
                 *      */
                include_session?: boolean;
            };
            header?: {
                /** @description The name of the ecommerce solution
                 *
                 *     Example: `woocommerce`
                 *      */
                "Dintero-System-Name"?: components["parameters"]["DinteroSystemName"];
                /** @description The version number of the ecommerce solution
                 *
                 *     Example: `5.4`
                 *      */
                "Dintero-System-Version"?: components["parameters"]["DinteroSystemVersion"];
                /** @description The name of the ecommerce plugin
                 *
                 *     Example: `Dintero.Checkout.WooCommerce`
                 *      */
                "Dintero-System-Plugin-Name"?: components["parameters"]["DinteroSystemPluginName"];
                /** @description The version number of the ecommerce plugin
                 *
                 *     Example: `2.3.4`
                 *      */
                "Dintero-System-Plugin-Version"?: components["parameters"]["DinteroSystemPluginVersion"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description The session to create the payment token from
                     *      */
                    session: components["schemas"]["SessionPaymentToken"] & components["schemas"]["Metadata"];
                    token_provider: components["schemas"]["TokenProvider"];
                };
            };
        };
        responses: {
            200: components["responses"]["SessionCreated"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    transactions_id_capture_post: {
        parameters: {
            query?: {
                /** @description Include aditional data in the returned data that are by default excluded from the transaction details.
                 *
                 *     - **`events.request_headers`** Include the event headers stored for each event **deprecated**
                 *     - **`initiating_system_request_headers`** Include the request headers from the initating system **deprecated**
                 *
                 *     From 2023-09, `events.request_headers` and `initiating_system_request_headers` will be included by default
                 *      */
                includes?: ("events.request_headers" | "initiating_system_request_headers")[];
            };
            header?: {
                /** @description The name of the ecommerce solution
                 *
                 *     Example: `woocommerce`
                 *      */
                "Dintero-System-Name"?: components["parameters"]["DinteroSystemName"];
                /** @description The version number of the ecommerce solution
                 *
                 *     Example: `5.4`
                 *      */
                "Dintero-System-Version"?: components["parameters"]["DinteroSystemVersion"];
                /** @description The name of the ecommerce plugin
                 *
                 *     Example: `Dintero.Checkout.WooCommerce`
                 *      */
                "Dintero-System-Plugin-Name"?: components["parameters"]["DinteroSystemPluginName"];
                /** @description The version number of the ecommerce plugin
                 *
                 *     Example: `2.3.4`
                 *      */
                "Dintero-System-Plugin-Version"?: components["parameters"]["DinteroSystemPluginVersion"];
            };
            path: {
                /** @description The ID of the transaction */
                id: components["parameters"]["TransactionId"];
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /**
                     * Format: int32
                     * @description The amount to be captured
                     */
                    amount: number;
                    /** @description A reference specified by the merchant to identify the
                     *     transaction
                     *      */
                    capture_reference?: string;
                    /** @description Info about the captured order items
                     *
                     *     #### Instabank
                     *     `required` if the transaction `payment_product` is *instabank*.
                     *     The capture will then be applied to the items included.
                     *      */
                    items?: (components["schemas"]["OrderItem"] & {
                        /** @description Metadata about discounts given */
                        discount_lines?: components["schemas"]["DiscountItem"][];
                        /**
                         * @description the number of the line (or id), must be `unique` between
                         *     all items. `required` when Instabank payment is configured.
                         *
                         * @example 1
                         */
                        line_id: string;
                        /**
                         * Format: int32
                         * @description The total monetary amount of the line item
                         *
                         * @example 29990
                         */
                        amount: number;
                    })[];
                };
            };
        };
        responses: {
            /** @description Capture created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Transaction"];
                };
            };
            202: components["responses"]["TransactionOperationAccepted"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["ServerError"];
            503: components["responses"]["Conflict"];
        };
    };
    transaction_tid_extend_authorization_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The ID of the transaction */
                id: components["parameters"]["TransactionId"];
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /** @description The reason of the extension */
                    reason?: string;
                    /** @description A reference specified by the merchant to identify the
                     *     transaction
                     *      */
                    reference?: string;
                };
            };
        };
        responses: {
            /** @description Transaction extended */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Transaction"];
                };
            };
            400: components["responses"]["BadRequest"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
            500: components["responses"]["ServerError"];
        };
    };
    transactions_id_refund_post: {
        parameters: {
            query?: {
                /** @description Include aditional data in the returned data that are by default excluded from the transaction details.
                 *
                 *     - **`events.request_headers`** Include the event headers stored for each event **deprecated**
                 *     - **`initiating_system_request_headers`** Include the request headers from the initating system **deprecated**
                 *
                 *     From 2023-09, `events.request_headers` and `initiating_system_request_headers` will be included by default
                 *      */
                includes?: ("events.request_headers" | "initiating_system_request_headers")[];
            };
            header?: {
                /** @description The name of the ecommerce solution
                 *
                 *     Example: `woocommerce`
                 *      */
                "Dintero-System-Name"?: components["parameters"]["DinteroSystemName"];
                /** @description The version number of the ecommerce solution
                 *
                 *     Example: `5.4`
                 *      */
                "Dintero-System-Version"?: components["parameters"]["DinteroSystemVersion"];
                /** @description The name of the ecommerce plugin
                 *
                 *     Example: `Dintero.Checkout.WooCommerce`
                 *      */
                "Dintero-System-Plugin-Name"?: components["parameters"]["DinteroSystemPluginName"];
                /** @description The version number of the ecommerce plugin
                 *
                 *     Example: `2.3.4`
                 *      */
                "Dintero-System-Plugin-Version"?: components["parameters"]["DinteroSystemPluginVersion"];
            };
            path: {
                /** @description The ID of the transaction */
                id: components["parameters"]["TransactionId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * Format: int32
                     * @description The amount to be refunded
                     */
                    amount: number;
                    /** @description The reason of the refund */
                    reason?: string;
                    /** @description A reference specified by the merchant to identify the
                     *     transaction
                     *      */
                    refund_reference?: string;
                    /** @description Info about the refunded order items
                     *
                     *     #### Instabank
                     *     `required` if the transaction `payment_product` is *instabank*.
                     *     The refund will then be applied to the items included.
                     *      */
                    items?: (components["schemas"]["OrderItem"] & {
                        /** @description Metadata about discounts given */
                        discount_lines?: components["schemas"]["DiscountItem"][];
                        /**
                         * @description the number of the line (or id), must be `unique` between
                         *     all items. `required` when Instabank payment is configured.
                         *
                         * @example 1
                         */
                        line_id: string;
                        /**
                         * Format: int32
                         * @description The total monetary amount of the line item
                         *
                         * @example 29990
                         */
                        amount: number;
                    })[];
                };
            };
        };
        responses: {
            /** @description Refund created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Transaction"];
                };
            };
            202: components["responses"]["TransactionOperationAccepted"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["ServerError"];
            503: components["responses"]["ProcessorTemporarilyUnavailable"];
        };
    };
    transactions_id_void_post: {
        parameters: {
            query?: {
                /** @description Include aditional data in the returned data that are by default excluded from the transaction details.
                 *
                 *     - **`events.request_headers`** Include the event headers stored for each event **deprecated**
                 *     - **`initiating_system_request_headers`** Include the request headers from the initating system **deprecated**
                 *
                 *     From 2023-09, `events.request_headers` and `initiating_system_request_headers` will be included by default
                 *      */
                includes?: ("events.request_headers" | "initiating_system_request_headers")[];
            };
            header?: {
                /** @description The name of the ecommerce solution
                 *
                 *     Example: `woocommerce`
                 *      */
                "Dintero-System-Name"?: components["parameters"]["DinteroSystemName"];
                /** @description The version number of the ecommerce solution
                 *
                 *     Example: `5.4`
                 *      */
                "Dintero-System-Version"?: components["parameters"]["DinteroSystemVersion"];
                /** @description The name of the ecommerce plugin
                 *
                 *     Example: `Dintero.Checkout.WooCommerce`
                 *      */
                "Dintero-System-Plugin-Name"?: components["parameters"]["DinteroSystemPluginName"];
                /** @description The version number of the ecommerce plugin
                 *
                 *     Example: `2.3.4`
                 *      */
                "Dintero-System-Plugin-Version"?: components["parameters"]["DinteroSystemPluginVersion"];
            };
            path: {
                /** @description The ID of the transaction */
                id: components["parameters"]["TransactionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Transaction voided */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Transaction"];
                };
            };
            202: components["responses"]["TransactionOperationAccepted"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["ServerError"];
            503: components["responses"]["ProcessorTemporarilyUnavailable"];
        };
    };
    transactions_id_get: {
        parameters: {
            query?: {
                /** @description Include aditional data that are by default excluded from the transaction details.
                 *
                 *     - **`card.payment_token`**: Include the payment_token generated from the transaction.
                 *       Only available for transaction with a session that enabled generate_payment_token.
                 *     - **`card.recurrence_token`**: Include the recurrence generated from the transaction.
                 *       Only available for transaction with a session that enabled generate_recurrence_token.
                 *     - **`session`** Include the session that the transaction resulted from
                 *     - **`events.request_headers`** Include the event headers stored for each event
                 *     - **`initiating_system_request_headers`** Include the request headers from the initating system
                 *      */
                includes?: ("card.payment_token" | "card.recurrence_token" | "session" | "events.request_headers" | "initiating_system_request_headers")[];
            };
            header?: never;
            path: {
                /** @description The ID of the transaction */
                id: components["parameters"]["TransactionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Transaction */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Transaction"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["ServerError"];
            503: components["responses"]["ProcessorTemporarilyUnavailable"];
        };
    };
    transactions_id_put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The ID of the transaction */
                id: components["parameters"]["TransactionId"];
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /** @description A reference specified by the merchant to identify the transaction, can be updated after the transaction has been created */
                    merchant_reference_2?: string;
                };
            };
        };
        responses: {
            /** @description Transaction */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Transaction"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["ServerError"];
            503: components["responses"]["ProcessorTemporarilyUnavailable"];
        };
    };
    transactions_get: {
        parameters: {
            query?: {
                /** @description List of ids that should be included in the result. ?id=A&id=B&id=X
                 *      */
                id?: components["parameters"]["Ids"];
                /** @description A limit on the number of objects to be returned. Limit can range
                 *     between 1 and 100 items, and the default is 10 items.
                 *      */
                limit?: components["parameters"]["Limit"];
                /** @description cursor for use in pagination. starting_after is an object ID
                 *     that defines your place in the list. For instance, if you make
                 *     a list request and receive 100 objects, ending with `obj_foo`,
                 *     your subsequent call can include `starting_after=obj_foo`
                 *     in order to fetch the next page of the list.
                 *      */
                starting_after?: components["parameters"]["StartingAfter"];
                /** @description The status of the transaction.
                 *      */
                status?: ("AUTHORIZATION_VOIDED" | "AUTHORIZED" | "CAPTURED" | "DECLINED" | "FAILED" | "INITIATED" | "ON_HOLD" | "PARTIALLY_CAPTURED" | "PARTIALLY_REFUNDED" | "PARTIALLY_CAPTURED_REFUNDED" | "REFUNDED" | "UNKNOWN")[];
                /** @description The type of payment product used */
                payment_product?: string[];
                /** @description The payment product type */
                payment_product_type?: string[];
                /** @description The card brand for the payment */
                card_brand?: string[];
                /** @description The merchant reference used */
                merchant_reference?: string;
                /** @description The second merchant reference on the transaction */
                merchant_reference_2?: string;
                /** @description The session id(s) associated with the transactions. ?session_id=A&session_id=B&session_id=X.
                 *      */
                session_id?: string[];
                /** @description The store_id that the transaction belongs to. ?store_id=A&store_id=B&store_id=X.
                 *      */
                store_id?: string[];
                /** @description Filter by the `payout_correlation_id`. Different format between payment providers. ?payout_correlation_id=A,B
                 *      */
                payout_correlation_id?: string[];
                /** @description The currency of the transaction. ?currency=NOK&currency=SEK.
                 *      */
                currency?: string[];
                /** @description Exact transaction amount, amount authorized. */
                amount?: number;
                /** @description Lower limit for filtering on transaction amount, amount authorized. */
                "amount.gte"?: number;
                /** @description Upper limit for filtering on transaction amount, amount authorized. */
                "amount.lte"?: number;
                /** @description Transaction created after (ISO 8601. We recommend using a localised ISO 8601 datetime like `2017-07-21T17:32:28Z`. If a timezone is not specified we assume UTC) */
                "created_at.gte"?: string;
                /** @description Transaction created before a date (ISO 8601. We recommend using a localised ISO 8601 datetime like `2017-07-21T17:32:28Z`. If a timezone is not specified we assume UTC) */
                "created_at.lte"?: string;
                /** @description Transaction captured after date (This param is subject to change in the future) (ISO 8601. We recommend using a localised ISO 8601 datetime like `2017-07-21T17:32:28Z`. If a timezone is not specified we assume UTC) */
                "captured_at.gte"?: string;
                /** @description Transaction captured before date (This param is subject to change in the future) (ISO 8601. We recommend using a localised ISO 8601 datetime like `2017-07-21T17:32:28Z`. If a timezone is not specified we assume UTC) */
                "captured_at.lte"?: string;
                /** @description Transaction refunded after date (This param is subject to change in the future) (ISO 8601. We recommend using a localised ISO 8601 datetime like `2017-07-21T17:32:28Z`. If a timezone is not specified we assume UTC) */
                "refunded_at.gte"?: string;
                /** @description Transaction refunded before date (This param is subject to change in the future) (ISO 8601. We recommend using a localised ISO 8601 datetime like `2017-07-21T17:32:28Z`. If a timezone is not specified we assume UTC) */
                "refunded_at.lte"?: string;
                /** @description Will try to match the search to either transaction_id, session_id or merchant_reference, merchant_reference_2,
                 *     phone_number, email or the customer name using the format `{first_name} {last_name}`.
                 *      */
                search?: string;
                /**
                 * @description Filter on `payment_operation`
                 *
                 * @example unscheduled_purchase
                 */
                payment_operation?: string;
                /** @description Filter transactions on the `customer.customer_id`. */
                customer_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Transactions */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Transaction"][];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    aid_settlements_list: {
        parameters: {
            query?: {
                /** @description A limit on the number of objects to be returned. Limit can range
                 *     between 1 and 1000 items, and the default is 10 items.
                 *      */
                limit?: number;
                /** @description cursor for use in pagination. starting_after_id is an object ID
                 *     that defines your place in the list. For instance, if you make
                 *     a list request and receive 100 objects, ending with `obj_foo`
                 *     and `settled_at=2021-02-02`, your subsequent call can include
                 *     `starting_after_id=obj_foo&starting_after_date=2021-02-02` in
                 *     order to fetch the next page of the list.
                 *
                 *     Must be used together with `starting_after_date`
                 *      */
                starting_after_id?: string;
                /** @description cursor for use in pagination. starting_after_date is the `settled_at`
                 *     that defines your place in the list. For instance, if you make
                 *     a list request and receive 100 objects, ending with `obj_foo`
                 *     and `settled_at=2021-02-02`, your subsequent call can include
                 *     `starting_after_id=obj_foo&starting_after_date=2021-02-02` in
                 *     order to fetch the next page of the list.
                 *
                 *     Must be used together with `starting_after_id`
                 *      */
                starting_after_date?: string;
                /** @description Settlement created after */
                "created_at.gte"?: string;
                /** @description Settlement created before a date */
                "created_at.lte"?: string;
                /** @description The payment provider */
                payment_provider?: string[];
                /** @description The seller id to filter on */
                payout_destination_id?: string;
                /** @description Will try to match the search to settlement_id. */
                search?: string;
            };
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["SettlementsList"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    aid_settlement_report_config_list: {
        parameters: {
            query?: {
                /** @description cursor for use in pagination */
                starting_after?: string;
                /** @description A limit on the number of objects to be returned. Limit can range
                 *     between 1 and 1000 items, and the default is 100 items.
                 *      */
                limit?: components["parameters"]["limit1k"];
            };
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["SettlementReportConfigList"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    aid_settlement_report_config_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SettlementReportConfigItem"];
            };
        };
        responses: {
            200: components["responses"]["SettlementReportConfig"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    aid_settlement_report_config_details: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
                /** @description report config id */
                id: components["parameters"]["reportConfigId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["SettlementReportConfig"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    aid_settlement_report_config_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
                /** @description report config id */
                id: components["parameters"]["reportConfigId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateSettlementReportConfigItem"];
            };
        };
        responses: {
            200: components["responses"]["SettlementReportConfig"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    aid_settlement_report_config_delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
                /** @description report config id */
                id: components["parameters"]["reportConfigId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["SettlementReportConfig"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    settlement_attachment_download: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
                /** @description An id that uniquely identifies the settlement.
                 *      */
                settlementid: string;
                /** @description An id that uniquely identifies the attachment.
                 *      */
                attachmentid: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    api_reports_metadata_list_get: {
        parameters: {
            query?: {
                /** @description A limit on the number of objects to be returned. Limit can range
                 *     between 1 and 100 items, and the default is 10 items.
                 *      */
                limit?: components["parameters"]["limit"];
                /** @description cursor for use in pagination. starting_after is an object ID
                 *     that defines your place in the list. For instance, if you make
                 *     a list request and receive 100 objects, end the result contains
                 *       `paging_token=pt1`, your subsequent call can include
                 *     `starting_after=pt1` in order to fetch the next page of the list.
                 *      */
                starting_after?: components["parameters"]["startingAfter"];
            };
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ReportMetadata"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    branding_logoframe: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description logos for payment types separated by underscore eg. `visa_mastercard_vipps_swish_instabank`
                 *      */
                logos: string;
                /** @description Image variant, multi-colors or mono-colored.
                 *      */
                variant: "colors" | "mono";
                /** @description rgb hex color without the \# character or an rbg() or rgba() color code.
                 *      */
                color: string;
                /** @description width of image
                 *      */
                width: string;
                /** @description Template for branding image
                 *      */
                template: "dintero_top_frame.svg" | "logos.svg";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description An svg image */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    branding_profile: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Profile Id like `P00112233.abc123def321aAabBb9z9cccDdd`
                 *      */
                profile_id: string;
                /** @description Image variant, multi-colors or mono-colored.
                 *      */
                variant: "colors" | "mono";
                /** @description rgb hex color without the \# character or an rbg() or rgba() color code
                 *      */
                color: string;
                /** @description width of image
                 *      */
                width: string;
                /** @description Template for branding image
                 *      */
                template: "dintero_top_frame.svg" | "logos.svg";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description svg image */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    aid_auths_oauth_token_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account or owner (partner)
                 *      */
                oid: components["parameters"]["owner"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthToken"];
            };
        };
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccessToken"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"] & {
                        /** @description Included in the response if `mfa_required` in `error.code` is
                         *     returned. The client must then perform a `challenge`. This
                         *     is done by sending a request to the
                         *     [/mfa/challenge](#operation/aid_auth_mfa_challenge_post)
                         *     endpoint.
                         *      */
                        mfa_token?: string;
                    };
                };
            };
            429: components["responses"]["TooManyRequests"];
            500: components["responses"]["ServerError"];
        };
    };
    aid_management_settings_approvals_payout_destinations_get: {
        parameters: {
            query?: {
                /** @description filter CDDs by payout_destination_id
                 *      */
                payout_destination_id?: string;
                /** @description filter CDDs by status
                 *      */
                case_status?: ("ACTIVE" | "DECLINED" | "UNDER_MANUAL_REVIEW" | "AUTOMATIC_REVIEW" | "WAITING_FOR_SIGNATURE" | "WAITING_FOR_DECLARATION" | "ERROR" | "ARCHIVED" | "WAITING_FOR_DETAILS")[];
            };
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["responses"]["ApprovalsPayoutDestinationList"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["ServerError"];
        };
    };
    aid_management_settings_approvals_payout_destinations_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ApprovalsPayoutDestination"];
            };
        };
        responses: {
            200: components["responses"]["ApprovalsPayoutDestinationCreated"];
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            404: components["responses"]["NotFound"];
            500: components["responses"]["ServerError"];
        };
    };
    checkout_session_pay_post: {
        parameters: {
            query?: never;
            header?: {
                /**
                 * @description - **`strict-merchant-reference`**: The `session.order.merchant_reference`
                 *       must be unique. The pay request will fail with `400 BadRequest` error
                 *       if `merchant_reference` is duplicated by existing session.
                 *     - **`strict-success-merchant-reference`**: The `session.order.merchant_reference`
                 *       must be unique. The pay request will fail with `400 BadRequest` error
                 *       if `merchant_reference` is duplicated by existing session that was successfully
                 *       authorized. This flag is less strict than **`strict-merchant-reference`**, allowing
                 *       for duplicates session if previous session failed
                 *
                 * @example strict-merchant-reference
                 */
                "Dintero-Feature-Toggles"?: ("strict-merchant-reference" | "strict-success-merchant-reference")[];
                /** @description The name of the ecommerce solution
                 *
                 *     Example: `woocommerce`
                 *      */
                "Dintero-System-Name"?: components["parameters"]["DinteroSystemName"];
                /** @description The version number of the ecommerce solution
                 *
                 *     Example: `5.4`
                 *      */
                "Dintero-System-Version"?: components["parameters"]["DinteroSystemVersion"];
                /** @description The name of the ecommerce plugin
                 *
                 *     Example: `Dintero.Checkout.WooCommerce`
                 *      */
                "Dintero-System-Plugin-Name"?: components["parameters"]["DinteroSystemPluginName"];
                /** @description The version number of the ecommerce plugin
                 *
                 *     Example: `2.3.4`
                 *      */
                "Dintero-System-Plugin-Version"?: components["parameters"]["DinteroSystemPluginVersion"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description The session to create the payment from
                     *      */
                    session?: components["schemas"]["PaySessionOptions"] & components["schemas"]["SessionCustomerTokens"] & components["schemas"]["Metadata"];
                    payment?: components["schemas"]["PayPayment"];
                };
            };
        };
        responses: {
            /** @description Transaction created */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Transaction"] & components["schemas"]["SessionPayResult"];
                };
            };
            /** @description Bad / Invalid request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"] & components["schemas"]["SessionPayResult"];
                };
            };
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            /** @description Unexpected Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"] & components["schemas"]["SessionPayResult"];
                };
            };
            /** @description Request failed with 4XX error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"] & components["schemas"]["SessionPayResult"];
                };
            };
        };
    };
    example_discount_codes_callback_url: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["example_discount_codes_callback_urlOptions"];
        responses: {
            /** @description Session Discount update */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        order?: components["schemas"]["DiscountCodesOrderUpdate"];
                        /** @description Shipping options that will be presented to the end user after the
                         *     callback
                         *
                         *     - If the merchant is not able to ship the order to the end users
                         *       shipping address, use an empty array.
                         *     - If there is only one option, a free delivery, the order still
                         *       has to contain one option with a _`price.amount`_ of 0.
                         *      */
                        shipping_options: components["schemas"]["SplitShippingOption"][];
                    };
                };
            };
        };
    };
    example_session_get_callback_url: {
        parameters: {
            query: {
                /** @description The Id for the transaction created */
                transaction_id: string;
                /** @description Session Id. Either `session_id` or `sid` is required. */
                session_id?: string;
                /** @description Session Id if `sid_parameter_name=sid`. Either `session_id` or `sid` is required. */
                sid?: string;
                /** @description The merchants reference */
                merchant_reference: string;
                /** @description ISO 8601 format for when the transaction was created */
                time: string;
                /**
                 * @description Error code
                 * @example authorization
                 */
                error?: string;
                /** @description Event applied to transaction */
                event?: string;
                /**
                 * @description Id for the event applied to transaction
                 * @example 3
                 */
                event_id?: string;
                /**
                 * @description The method to use when delivering the callback
                 * @example POST
                 */
                method?: string;
                /** @description Report error callback */
                report_error?: boolean;
                /** @description Delay before delivering the callback */
                delay_callback?: number;
                /**
                 * @description Deliver callback on othe transaction events
                 * @example CAPTURE
                 */
                report_event?: string;
            };
            header?: {
                /** @description Dintero signature that can be used to verify the payload from the
                 *     callback.
                 *
                 *     Only include if a signature secret exist:
                 *
                 *     - [POST /v1/admin/signature](#operation/admin_signature_post)
                 *      */
                "Dintero-Signature"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Callback handled */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    example_session_post_callback_url: {
        parameters: {
            query: {
                /** @description The Id for the transaction created */
                transaction_id: string;
                /** @description Session Id. Either `session_id` or `sid` is required. */
                session_id?: string;
                /** @description Session Id if `sid_parameter_name=sid`. Either `session_id` or `sid` is required. */
                sid?: string;
                /** @description The merchants reference */
                merchant_reference: string;
                /** @description ISO 8601 format for when the transaction was created */
                time: string;
                /**
                 * @description Error code
                 * @example authorization
                 */
                error?: string;
                /** @description Event applied to transaction */
                event?: string;
                /**
                 * @description Id for the event applied to transaction
                 * @example 3
                 */
                event_id?: string;
                /**
                 * @description POST method used to deliver the callback
                 * @example POST
                 */
                method: string;
                /** @description Report error callback */
                report_error?: boolean;
                /** @description Delay before delivering the callback */
                delay_callback?: number;
                /**
                 * @description Deliver callback on othe transaction events
                 * @example CAPTURE
                 */
                report_event?: string;
                /**
                 * @description Aditional data included
                 * @example session
                 */
                includes: string;
            };
            header?: {
                /** @description Dintero signature that can be used to verify the payload from the
                 *     callback.
                 *
                 *     Only include if a signature secret exist:
                 *
                 *     - [POST /v1/admin/signature](#operation/admin_signature_post)
                 *      */
                "Dintero-Signature"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["Transaction"];
            };
        };
        responses: {
            /** @description Callback handled */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    example_shipping_address_callback_url: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: components["requestBodies"]["example_discount_codes_callback_urlOptions"];
        responses: {
            /** @description Session shipping options update */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Shipping options that will be presented to the end user after the
                         *     callback
                         *
                         *     - If the merchant is not able to ship the order to the end users
                         *       shipping address, use an empty array.
                         *     - If there is only one option, a free delivery, the order still
                         *       has to contain one option with a _`price.amount`_ of 0.
                         *      */
                        shipping_options: components["schemas"]["SplitShippingOption"][];
                        order?: components["schemas"]["ShippingAddressCallbackSessionOrderUpdate"];
                    };
                };
            };
        };
    };
    v2_aid_payout_fund_transfers_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
            };
            cookie?: never;
        };
        /** @description Initiate fund transfer data */
        requestBody: {
            content: {
                "application/json": components["schemas"]["FundTransferCreateDataV2"];
            };
        };
        responses: {
            /** @description Transfer fund initiated */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        fund_transfer?: components["schemas"]["FundTransferV2"];
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    v2_aid_payout_destination_balance_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
                /** @description Seller id */
                payout_destination_id: components["parameters"]["payoutDestinationId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Payout destination balances response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        payout_destination_balances?: components["schemas"]["PayoutDestinationBalancesV2"];
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
    v2_aid_payout_destination_transfers_get: {
        parameters: {
            query?: {
                /** @description A limit on the number of objects to be returned. Limit can range
                 *     between 1 and 1000 items, and the default is 10 items.
                 *      */
                limit?: components["parameters"]["limitV2"];
                /** @description The page (as defined by the next_page_token in the api response) */
                page?: components["parameters"]["page"];
                /** @description Filter by currency */
                currency?: string;
            };
            header?: never;
            path: {
                /** @description An id that uniquely identifies the account.
                 *      */
                aid: components["parameters"]["accountId"];
                /** @description Seller id */
                payout_destination_id: components["parameters"]["payoutDestinationId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Payout destination transfers response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        entries?: components["schemas"]["PayoutDestinationTransfersV2"];
                        next_page_token?: string;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["AccessForbidden"];
            403: components["responses"]["Forbidden"];
            500: components["responses"]["ServerError"];
        };
    };
}
type WithRequired<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
