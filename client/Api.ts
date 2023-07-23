/* eslint-disable */

/**
 * this source code form is subject to the terms of the mozilla public
 * license, v. 2.0. if a copy of the mpl was not distributed with this
 * file, you can obtain one at https://mozilla.org/mpl/2.0/.
 *
 * copyright oxide computer company
 */
import type { FetchParams } from "./http-client";
import { HttpClient, toQueryString } from "./http-client";

export type {
    ApiConfig,
    ApiResult,
    ErrorBody,
    ErrorResult,
} from "./http-client";

export type Payment = {
    /** The payment product type corresponding to this transaction
     */
    paymentProductType: string;
};

export type SwishPayment = Record<string, unknown>;

export type VippsPayment = Record<string, unknown>;

export type BamboraMobilePayPayment = Record<string, unknown>;

export type PayPayment = {
    /** The payment product type corresponding to this transaction
     */
    paymentProductType: string;
};

export type PayExCreditcardPayment = Record<string, unknown>;

export type CollectorPaymentDetails = {
    /** The payment product type corresponding to this transaction
     */
    paymentProductType: string;
};

export type CollectorB2BAddress = {
    /** ACME Inc */
    businessName: string;
    /** The organization number of the customer. For Norway, the length is 9. For Sweden, it's either 10 or 12 digits.
     */
    organizationNumber: string;
    /** Gaustadalleen 21 */
    addressLine: string;
    /** More details about address. */
    addressLine2?: string;
    /** CO-Address if applicable. */
    coAddress?: string;
    /** The zip code / postal code of the address. */
    postalCode: string;
    /** The name of the postal code */
    postalPlace: string;
    /** Country of the location */
    country: string;
    /** mobile number of a person / company, ITU/E.123 format with
international prefix (+PPNNNNNNNNN...)
 */
    phoneNumber: string;
    /** The email address of a person or an organisation
     */
    email: string;
    /** The customer's reference */
    customerReference?: string;
    /** For companies that needs to specify a cost center. */
    costCenter?: string;
    firstName?: string;
    lastName?: string;
    /** The unique identification of the address from the available addresses for the business
     */
    addressId?: string;
};

export type CollectorInvoiceB2BPayment = Record<string, unknown>;

export type CollectorDetails = {
    /** The social security number of the customer. For Norway, the length is 11. For Sweden, it's either 10 or 12 digits.
     */
    socialSecurityNumber: string;
};

export type CollectorAddress = {
    firstName: string;
    lastName: string;
    /** Gaustadalleen 21 */
    addressLine: string;
    /** More details about address. */
    addressLine2?: string;
    /** Name of the company */
    businessName?: string;
    /** CO-Address if applicable. */
    coAddress?: string;
    /** The zip code / postal code of the address. */
    postalCode: string;
    /** The name of the postal code */
    postalPlace: string;
    /** Country of the location */
    country: string;
    /** mobile number of a person / company, ITU/E.123 format with
international prefix (+PPNNNNNNNNN...)
 */
    phoneNumber: string;
    /** The email address of a person or an organisation
     */
    email: string;
};

export type CollectorFinancePayment = Record<string, unknown>;

export type TokenProvider = {
    /** The payment product type corresponding to create token for
     */
    paymentProductType: string;
};

export type PayExTokenProvider = Record<string, unknown>;

export type PaymentOperationIntent =
    | "unscheduled_purchase"
    | "recurring_purchase"
    | "generate_payment_token";

export type SettlementStatus =
    | "NOT_SETTLED"
    | "PENDING_SETTLEMENT"
    | "PARTIALLY_SETTLED"
    | "SETTLED";

export type MyDinteroUserCreation = {
    /** Actions to perform on the customer
     */
    actions: "create_user"[];
    /** Terms and conditions accepted
     */
    terms: {
        /** id of the myDintero terms and conditions
         */
        id: string;
        /** Url to the terms and conditions accepted by the customer
         */
        url: string;
    };
};

export type SystemRequestHeaders = {
    /** The name of the ecommerce solution */
    "dintero-system-name"?: string;
    /** The version number of the ecommerce solution */
    "dintero-system-version"?: string;
    /** The name of the ecommerce plugin */
    "dintero-system-plugin-name"?: string;
    /** The version number of the ecommerce plugin */
    "dintero-system-plugin-version"?: string;
    /** The user-agent that performed the request */
    "user-agent"?: string;
};

export type OrderAddress = {
    firstName?: string;
    lastName?: string;
    /** Gaustadalleen 21 */
    addressLine?: string;
    /** PB 123 */
    addressLine2?: string;
    coAddress?: string;
    /** Name of the company */
    businessName?: string;
    /** The zip code / postal code of the address. */
    postalCode?: string;
    /** The name of the postal code */
    postalPlace?: string;
    /** Country of the location */
    country?: string;
    /** mobile number of a person / company, ITU/E.123 format with
international prefix (+PPNNNNNNNNN...)
 */
    phoneNumber?: string;
    /** The email address of a person or an organization
     */
    email?: string;
    latitude?: number;
    longitude?: number;
    /** Comment about the address
     */
    comment?: string;
    /** The organization number of the customer.
     */
    organizationNumber?: string;
    /** The customer's reference */
    customerReference?: string;
    /** For companies that needs to specify a cost center. */
    costCenter?: string;
};

export type ShippingOption = {
    /** Id of this shipping option product.

The express checkout will group all products with the same id. Used for
grouping delivery to the same address at different time slots, or for
grouping deliveries to different pick up points.
 */
    id: string;
    /** Unique id of the specific configuration of this shipping product
     */
    lineId: string;
    /** Countries where this shipping option can be used */
    countries?: string[];
    /** The monetary amount of the shipping option, including VAT and discounts.

In smallest unit for the currency, e.g. cents
 */
    amount: number;
    /** The VAT of the `amount` parameter. Only
used for display purposes.
 */
    vatAmount?: number;
    /** The VAT percentage
     */
    vat?: number;
    /** A shipping option title. Eg. "Standard"
     */
    title: string;
    /** A short description of the shipping option product
     */
    description?: string;
    deliveryMethod?: "delivery" | "pick_up" | "unspecified" | "none";
    /** Name of company that provides shipping service
     */
    operator: string;
    /** The operators own id for this shipping product
     */
    operatorProductId?: string;
    /** Estimated time of arrival */
    eta?: { startsAt?: Date; endsAt?: Date };
    /** A specified time for delivery to customer */
    timeSlot?: { startsAt?: Date; endsAt?: Date };
    pickUpAddress?: Record<string, unknown>;
    /** Additional metadata about the shipping_option */
    metadata?: Record<string, Record<string, unknown>>;
};

export type PayoutFeeSplit = {
    type: "proportional";
    /** Seller ids that will be debited for the payment fees
All destinations must be included in the list of splits
 */
    destinations?: string[];
};

export type PayoutSplit = {
    /** An id that identifies the seller
     */
    payoutDestinationId: string;
    /** The split amount in smalles unit for the currency, e.g. cents.
     */
    amount: number;
};

export type SplitShippingOption = ShippingOption & {
    feeSplit?: PayoutFeeSplit;
    /** An array of objects specifying how the amount should be split between
sellers when using Dintero Payout

Atleast one split is required if the shipping options is to be used with
a payment where splits is set
 */
    splits?: PayoutSplit[];
};

export type Address = {
    addressLine: string;
    addressLine2?: string;
    postalCode?: string;
    postalPlace: string;
    /** ISO 3166-1 country code
     */
    country: string;
};

export type Store = {
    id: string;
    /** name of the store, aka trade name of the store
     */
    name?: string;
    /** Official name of the person or entity that owns the store.
     */
    businessName?: string;
    address?: Address;
    chain?: string;
    email?: string;
    gln?: string;
    organizationNumber?: string;
    phoneNumber?: string;
    /** A four-digit Merchant Category Code (MCC) for the store
[ISO 18245:2003](https://www.iso.org/standard/33365.html)
 */
    mcc?: string;
    /** Merchant number associated with the stores
payment terminal
 */
    bax?: string;
    /** Id to a specific point-of-sale (POS) terminal
or workstation
 */
    terminalId?: string;
};

export type OrderItem = {
    /** The ID or SKU of the product on the line
     */
    id?: string;
    /** The groups the product on the line belongs to
     */
    groups?: {
        /** Group ID */
        id: string;
        /** Group name */
        name?: string;
    }[];
    /** the number of the line (or id), must be `unique` between
all items. `required` when Instabank payment is configured.
 */
    lineId?: string;
    /** The version where the item was added or last updated, see the
events for the source.
 */
    version?: number;
    /** A short, localized description of the line item
     */
    description?: string;
    /** The quantity of the product in the item line.
     */
    quantity?: number;
    /** The total monetary amount of the line item, including VAT and discounts.

In smallest unit for the currency, e.g. cents
 */
    amount?: number;
    /** The VAT of the `amount` parameter. Only
used for display purposes.

In smallest unit for the currency, e.g. cents
 */
    vatAmount?: number;
    /** The VAT percentage
     */
    vat?: number;
    /** The volume of one item in m³ (cubic meters)
     */
    unitVolume?: number;
    /** The volume of one item in kg (kilo grams)
     */
    unitWeight?: number;
    /** The dimensional weight (also known as volumetric) value unit of one item. [Dimensional weight at Wikipedia](https://en.wikipedia.org/wiki/Dimensional_weight)
     */
    unitDimensionalWeight?: number;
    /** The type of order item this is.

- **physical** - a physical item which must be delivered or handed over
- **digital** - a digital item which doesn't need shipping
- **service** - payment for services like maintenance performed in your home
- **gift_card** - usage of a gift card, where the amount is usually a negative number
- **shipping** - payment for shipping of the order
- **surcharge** - extra incurred costs, like taxes or necessary rounding
 */
    type?:
        | "physical"
        | "digital"
        | "service"
        | "gift_card"
        | "shipping"
        | "surcharge";
    feeSplit?: PayoutFeeSplit;
    /** An array of objects specifying how the amount should be split between
sellers when using Dintero Payout
 */
    splits?: PayoutSplit[];
    /** URL to a thumbnail of the item. Will be displayed when redirecting to the session.

Recommended limitations for the image:

- all images should preferrably have the same dimensions
- max file size should be less than 2MB
 */
    thumbnailUrl?: string;
};

export type DiscountType =
    | "customer"
    | "periodic"
    | "manual"
    | "loyalty"
    | "total"
    | "employee"
    | "external";

export type DiscountItem = {
    /** Monetary amount in smallest unit for the currency
     */
    amount?: number;
    /** Optional, set if the amount given was from a percentage discount
     */
    percentage?: number;
    discountType?: DiscountType;
    discountId?: string;
    description?: string;
    lineId?: number;
};

export type OrderDiscountItem = {
    /** The item is eligible for discount
     */
    eligibleForDiscount?: boolean;
    /** Discount applied to amount
     */
    isChanged?: boolean;
    /** The origin item amount before any discount
     */
    grossAmount?: number;
    discountLines?: DiscountItem[];
};

export type RequestHeaders = Record<string, unknown>;

export type TransactionSettlementsEvent = {
    /** Id of the settlement this was paid in
     */
    settlementId: string;
    /** The providers reference for the settlement
     */
    providerReference: string;
    /** Id for matching to transaction event
     */
    eventCorrelationId?: string;
    /** The amount paid out in this settlement
     */
    amount: number;
    /** Amount captured in this settlement
     */
    capture?: number;
    /** Amount refunded in this settlement
     */
    refund?: number;
    /** Fee of the capture in this settlement
     */
    fee?: number;
};

export type TransactionSettlementsRead = {
    /** One item per payout to the merchants bank account
     */
    events: TransactionSettlementsEvent[];
    settlementStatus?:
        | "NOT_SETTLED"
        | "PENDING_SETTLEMENT"
        | "PARTIALLY_SETTLED"
        | "SETTLED";
};

export type TransactionEvent = {
    id?: string;
    /** The transaction state after this event
     */
    transactionStatus?: string;
    /** the event type */
    event?:
        | "INITIALIZE"
        | "AUTHORIZE"
        | "CAPTURE"
        | "REFUND"
        | "VOID"
        | "INITIATE_REFUND"
        | "INITIATE_CAPTURE"
        | "SETTLEMENT";
    /** The event operation completed with success
     */
    success?: boolean;
    /** Correction of the transaction status and event after
a failed operation
 */
    correction?: {
        /** List of event ids added to correct the transaction status
         */
        eventIds?: string[];
        /** status the transaction was corrected to
         */
        status: string;
        /** Monetary amount in smallest unit for the currency
         */
        remainingCaptureAmount: number;
        /** Monetary amount in smallest unit for the currency
         */
        remainingRefundAmount: number;
        /** Monetary amount in smallest unit for the currency
         */
        remainingVoidAmount: number;
    };
    /** The event error is only used when the success is `false`.
     */
    error?: {
        /** The code used to identify the error/warning */
        code?: string;
        /** The human readable description of the error/warning */
        message: string;
    };
    /** Amount captured or refunded
     */
    amount?: number;
    /** Best-effort calculation of the VAT amount in this transaction
     */
    calculatedVatAmount?: number;
    /** The applicable event items */
    items?: {
        /** Metadata about discounts given */
        discountLines?: DiscountItem[];
    } & OrderItem[];
    createdAt?: Date;
    createdBy?: string;
    requestId?: string;
    /** Additional details about the event
     */
    metadata?: Record<string, unknown>;
    /** The event correlation to existing event. The property will
be set if the event is an CAPTURE or REFUND of correlated
INITIATE_CAPTURE or INITIATE_REFUND event.
 */
    correlationRequestId?: string;
    /** Reference for the transaction event provided by the merchant.

- For captures, this is `capture_reference`
- For refunds, this is `refund_reference`

When relevant, it will be visible on the Dintero settlement report.
 */
    eventReference?: string;
    requestHeaders?: RequestHeaders;
    settlements?: TransactionSettlementsRead;
};

export type CallbackUrl = string;

export type SessionUrls = {
    /** URL to page where Checkout will redirect the
customer to after the Checkout process has ended.

If a transaction was completed successfully, a `transaction_id`
will be appended to the URL as a `query` string parameter

> A `transaction_id` will be appended to the URL if the
> Checkout failed with `error=capture`

> A transaction with status `ON_HOLD` must be handled as a payment
> that is pending approval, where the transaction will later be updated
> with a final payment staus `AUTHORIZED` or `FAILED`.
> We recommend that `callback_url` is used to receive the callback when
> the transaction changes status from `ON_HOLD` to `AUTHORIZED` or `FAILED`.
> Alternative is to do an hourly/daily poll on the transaction to check
> if the status has changed.

*Example*:

   ```
   https://example.com/accept?transaction_id=T00000000.3YkJXSdSnUBXcmQSzn7uJj
   ```

 query name        | type         | description                    | required
------------------ | :----------: | ------------------------------ | :-----------:
transaction_id     |   string     | Transaction Id                 | false
error              |   string     | Error code identifying cause   | false
merchant_reference |   string     | The merchants reference        | true

In case of that something went wrong with the payment flow, an
`error` query parameter will be appended to the URL. The value
of the error is a code identifying the cause.

error         | Description
------------- | ------------
cancelled     | Customer cancelled the checkout payment
authorization | Customer failed to authorize the payment
failed        | The transaction has been rejected by us, or an error has occurred during transaction processing

### configuration.channel=in_app

The `in_app` channel is intended for payments done from mobile devices
where `url.return_url` can be set to the application's appswitch URL.

If the query-param `?initial_recipient=merchant` is appended to the appswitch URL,
the payment app will redirect directly to the app, without proxying through Dintero.

In that case, the `transaction_id` will be appended to the `return_url`,
and you will need to poll [GET /v1/transactions](#operation/transactions_get) with this id
until the transaction has been updated with one of these statuses:

- AUTHORIZED
- CAPTURED
- FAILED

Example url: `myapp://?initial_recipient=merchant&transaction_id=T12345678.abc&merchant_reference=mref123&session_id=T12345678.abd`
 */
    returnUrl: string;
    callbackUrl?: CallbackUrl;
    /** URL to a webpage with the merchant's Terms of Service. Will be linked to from the checkout.
     */
    merchantTermsUrl?: string;
};

export type SessionCustomer = {
    /** Customer id
     */
    customerId?: string;
    /** Customer email address
     */
    email?: string;
    /** Customer phone number, ITU/E.123 format with
international prefix (+PPNNNNNNNNN...)
 */
    phoneNumber?: string;
};

export type SessionOrderUpdate = {
    /** The amount to authorize/capture including VAT and discounts.
In smallest unit for the currency, e.g. cents

The `amount` should be equal to the sum of the `items.amount` + `shipping_option.amount`.
 */
    amount?: number;
    /** The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217 */
    currency?: string;
    /** The VAT of the `amount` parameter.
Only used for display purposes.

In smallest unit for the currency, e.g. cents

The `vat_amount` should be equal to the sum of the `items.vat_amount` + `shipping_option.vat_amount`.
 */
    vatAmount?: number;
    /** A reference by the merchant to identify the corresponding
order for the Checkout Session
 */
    merchantReference2?: string;
    shippingAddress?: OrderAddress;
    billingAddress?: OrderAddress;
    /** This is a partial payment where the `order.amount` can be lower or
equal to the sum of `order.items.amount`
 */
    partialPayment?: boolean;
    /** Details about the order items.

#### Instabank
`required` if Instabank payment is configured in and partial_payment is false.
All items must include a unique `line_id`, quantity and amount

#### Collector Bank
`required` if Collector Bank payment is configured in and partial_payment is false.
All items must include a unique `line_id`, quantity and amount
 */
    items?: OrderItem & OrderDiscountItem[];
    /** The origin amount to authorize/capture including VAT
before any discount, only set if the session was updated
when calculating discounts.

In smallest unit for the currency, e.g. cents
 */
    grossAmount?: number;
    /** The original order amount was changed by discount
given.
 */
    isChanged?: boolean;
    shippingOption?: SplitShippingOption;
    store?: Store;
    /** Discounts given, additions to any items discount_lines.
     */
    discountLines?: DiscountItem[];
    discountCodes?: string[];
};

export type SessionOrder = Record<string, unknown>;

export type SessionBase = {
    url: SessionUrls;
    customer?: SessionCustomer;
    order: SessionOrder;
    expiresAt?: Date;
};

export type SessionExpressUpdate = {
    /** Shipping options that will be presented to the end user after the
end user has submitted a shipping address.

To dynamically update the shipping_options when the _`order.shipping_address`_ is
changed by the end user in the checkout, use the
_`url.shipping_address_callback_url`_.

 If the merchant is not able to ship the order to the end users shipping address, use an empty array.

 If there is only one option, a free delivery, the order still has to contain one option with a _`price.amount`_ of 0.
 */
    shippingOptions: ShippingOption[];
    shippingMode?: "shipping_required" | "shipping_not_required";
};

export type SessionExpress = {
    /** ### Present only for _Express Checkout_ sessions.

An _Express Checkout_ session is a session where the end user will submit a
shipping address and then select a shipping option before the before a
payment method is selected and the payment is initiated.

Endpoints used in the _Express Checkout_ flow.
1. [Set shipping address](/#operation/checkout_sid_json_order_shipping_address_put)
2. [Set shipping option](/#operation/checkout_sid_json_order_items_shipping_option_put)
 */
    express?: Record<string, unknown>;
};

export type AutoCaptureConfiguration = {
    /** If `true` the transaction from the payment session will be captured
automatically after the transaction has been `AUTHORIZED`. The checkout
sessions `callback_url` will not be called until after the transaction
has been `CAPTURED`.

If `auto_capture` is not specified it defaults to `false`.

A successful auto-capture of a transaction sometimes requires more
than one capture attempt. This can be the case if the payment gateway
is down or is experiencing heavy traffic.

Dintero will attempts capture retries for 48 hours, the `callback_url`
will be invoked when capture succeeds.

Manual capture of a transaction that is pending auto-capture will
stop the auto-capture process from completing the capture.
 */
    autoCapture?: boolean;
};

export type PublishConfiguration = {
    channel: "sms" | "push";
    type: "checkout-link" | "app";
    id?: string;
    /** status of the message sent to the customer.

**`skipped`** will used in case where publish
cannot be sent given the `session.customer`.
 */
    status?: "sent" | "skipped" | "failed";
}[];

export type SessionPayability =
    | "payable"
    | "disabled_by_gateway"
    | "disabled_by_order_amount";

export type BamboraConfiguration = {
    /** Denotes what kind of config parameter this is */
    type?: "payment_type";
    creditcard?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Credit Card Payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
    mobilepay?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable MobilePay Payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
    vipps?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Vipps Payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
};

export type InstabankFinanceProduct = {
    productCode: string;
    /** The minimum monthly installment basis as a percentage of the account balance.
     */
    minimumMonthlyBalanceRate: string;
    /** The interest rate for the payment product.
     */
    annualInterestRate?: string;
    /** The effective annual interest rate for the payment product
     */
    effectiveAnnualInterestRate?: string;
    /** The startup fee for the payment product.
     */
    originationFee: number;
    /** The notification fee for the payment product.
     */
    notificationFee: number;
    /** Minimum order amount for this product. The product option will be
excluded in payments where the order amount is less than the minimum
amount.
 */
    minimumAmount?: number;
    loanExample: {
        /** The amount loaned in the example.
         */
        amount: number;
        /** Years of payment in the example.
         */
        years: number;
        /** The total amount paid back in the example.
         */
        totalAmount: number;
        /** The cost of the loan in the example.
         */
        cost: number;
        /** The effective annual interest rate in the example
         */
        effectiveAnnualInterestRate: string;
    };
    /** Url for a custom branding image */
    brandingImageUrl?: string;
};

export type InstabankInvoiceProduct = {
    productCode: string;
    /** Number of days before the payment is due. */
    dueInDays: number;
    /** Minimum order amount for this product. The product option will be
excluded in payments where the order amount is less than the minimum
amount.
 */
    minimumAmount?: number;
    /** The fee for the payment product
     */
    invoiceFee: number;
    /** The limit for when instabank will require a full applicant during payment.
     */
    requireApplicantAmount: number;
    /** Url for a custom branding image */
    brandingImageUrl?: string;
};

export type InstabankInstallmentProduct = {
    /** Minimum order amount for this product. The product option will be
excluded in payments where the order amount is less than the minimum
amount.
 */
    minimumAmount?: number;
    productCode: string;
    /** Number of months
     */
    creditTime: number;
    /** The startup fee for the payment product
     */
    originationFee: number;
    /** The notification fee for the payment product
     */
    notificationFee: number;
    /** The interest rate for the payment product.
     */
    annualInterestRate: string;
    /** The effective annual interest rate for the payment product
     */
    effectiveAnnualInterestRate?: string;
    /** The total amount to pay */
    totalAmount?: number;
    /** The amount to pay pr month */
    monthlyAmount?: number;
    /** The amount to pay in the first invoice. Origantion fee is added
to the first invoice.
 */
    firstMonthlyAmount?: number;
    /** The limit for when instabank will require a full applicant during payment.
     */
    requireApplicantAmount?: number;
    loanExample?: {
        /** The amount loaned in the example.
         */
        amount: number;
        /** Years of payment in the example.
         */
        years: number;
        /** The total amount paid back in the example.
         */
        totalAmount: number;
        /** The cost of the loan in the example.
         */
        cost: number;
        /** The effective annual interest rate in the example
         */
        effectiveAnnualInterestRate: string;
    };
    /** Url for a custom branding image */
    brandingImageUrl?: string;
};

export type InstabankPostponementProduct = {
    /** Minimum order amount for this product. The product option will be
excluded in payments where the order amount is less than the minimum
amount.
 */
    minimumAmount?: number;
    productCode: string;
    /** Number of months
     */
    postponementMonths: number;
    /** The startup fee for the payment product
     */
    originationFee: number;
    /** The notification fee for the payment product
     */
    notificationFee?: number;
    /** The interest rate for the payment product.
     */
    annualInterestRate: string;
    /** The effective annual interest rate for the payment product
     */
    effectiveAnnualInterestRate?: string;
    /** The total amount to pay */
    totalAmount?: number;
    /** The limit for when instabank will require a full applicant during payment.
     */
    requireApplicantAmount?: number;
    loanExample?: {
        /** The amount loaned in the example.
         */
        amount: number;
        /** Years of payment in the example.
         */
        years: number;
        /** The total amount paid back in the example.
         */
        totalAmount: number;
        /** The cost of the loan in the example.
         */
        cost: number;
        /** The effective annual interest rate in the example
         */
        effectiveAnnualInterestRate: string;
    };
    /** Url for a custom branding image */
    brandingImageUrl?: string;
};

export type InstabankConfiguration = {
    /** finance payment */
    finance?: {
        /** enable finance payment */
        enabled: boolean;
        payability?: SessionPayability;
        product?: Record<string, unknown> & InstabankFinanceProduct;
    };
    /** invoice payment */
    invoice?: {
        /** enable invoice payment (only for amounts greater than 500 NOK) */
        enabled: boolean;
        payability?: SessionPayability;
        requireApplicant?: boolean;
        product?: Record<string, unknown> & InstabankInvoiceProduct;
    };
    /** Fixed Part Payment */
    installment?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Instabank Installment Payment */
        enabled: boolean;
        payability?: SessionPayability;
        products?: InstabankInstallmentProduct[];
    };
    /** Postpone payment */
    postponement?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Instabank Postponement Payment */
        enabled: boolean;
        payability?: SessionPayability;
        products?: InstabankPostponementProduct[];
    };
};

export type NetaxeptConfiguration = {
    /** Denotes what kind of config parameter this is */
    type?: "payment_type";
    creditcard?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Credit Card Payment */
        enabled: boolean;
        payability?: SessionPayability;
        /** Use Netaxept terminal instead of Dintero Checkout

See https://shop.nets.eu/web/partners/register
 */
        terminal?: {
            terminal:
                | "/Terminal/default.aspx"
                | "/terminal/mobile/default.aspx";
            /** Name of the terminal template to use, created in Netaxept Admin
             */
            terminalDesign?: string;
            /** Set hosted payment window to single page */
            terminalSinglePage: boolean;
            terminalLayout?: string;
        };
    };
};

export type PayExConfiguration = {
    /** A textual description max 40 characters of the purchase.
     */
    dynamicDescriptor?: string;
    swish?: {
        /** enable Payex Swish Payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
    creditcard?: {
        /** enable Credit Card Payment */
        enabled: boolean;
        payability?: SessionPayability;
        /** generate payment token to use for future payments

The generated payment token will be made available from
the transaction details.
 */
        generatePaymentToken?: boolean;
        /** generate recurrence payment token to use for future payments

The generated recurrence payment token will be made available from
the transaction details.
 */
        generateRecurrenceToken?: boolean;
        /** Disable the CVC field for payments where payment token is used.
> To use this feature it has to be enabled on the contract with Swedbank Pay.
 */
        noCvc?: boolean;
    };
    mobilepay?: {
        /** enable Payex MobilePay Payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
    vipps?: {
        /** enable Payex Vipps Payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
    applepay?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable PayEx Apple Pay payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
    clicktopay?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable PayEx Click to Pay payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
    googlepay?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable PayEx Google Pay payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
};

export type VippsConfiguration = {
    /** enable vipps payment */
    enabled: boolean;
    payability?: SessionPayability;
    /** A short reference / descriptor that can be displayed to
the end user
 */
    dynamicDescriptor?: string;
};

export type CollectorConfiguration = {
    /** Denotes what kind of config parameter this is */
    type?: "payment_type";
    /** A textual description max 40 characters of the purchase.
     */
    dynamicDescriptor?: string;
    /** Invoice / Part Payment */
    invoice?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Collector Bank Invoice Payment */
        enabled: boolean;
        countries?: string[];
        options?: {
            /** Create the collector transaction with status `ON_HOLD` and let
the Collector callback update the transaction state from `ON_HOLD`
to `AUTHORIZED` or `FAILED`.

A callback will be sent to the `callback_url` when the transaction
changes state from `ON_HOLD` to any new state.

This will override the payment option `enable_on_hold` and gateway config `options.enable_on_hold`-setting.
 */
            enableOnHold?: boolean;
        };
        payability?: SessionPayability;
    };
    /** Invoice / Part Payment */
    invoiceB2b?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        payability?: SessionPayability;
        /** enable Collector Bank Invoice Payment B2B */
        enabled: boolean;
        countries?: string[];
        options?: {
            /** For `collector.invoice_b2b`. By default, the shipping_address B2B payments will be restricted to
the registered addresses of a company.

Setting this on the session will override the `collector_b2b_address_enforcement` in `payment_options`
on the checkout configuration.
 */
            disableCollectorB2bAddressEnforcement?: boolean;
            /** Create the collector transaction with status `ON_HOLD` and let
the Collector callback update the transaction state from `ON_HOLD`
to `AUTHORIZED` or `FAILED`.

A callback will be sent to the `callback_url` when the transaction
changes state from `ON_HOLD` to any new state.

This will override the gateway's `options.enable_on_hold`-setting.
 */
            enableOnHold?: boolean;
        };
    };
    /** Invoice for pre-approved B2B-customers */
    invoiceB2bPreapproved?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        payability?: SessionPayability;
        /** enable Collector Bank Invoice Payment B2B */
        enabled: boolean;
        countries?: string[];
        /** All Collector B2B accounts configured for the customer's phone number at the merchant.
         */
        accounts?: {
            billingAddress?: CollectorB2BAddress;
            /** Token to represent the company */
            companyId?: string;
        }[];
    };
    finance?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Collector Bank Finance Payment */
        enabled: boolean;
        countries?: string[];
        payability?: SessionPayability;
    };
    /** Fixed Part Payment */
    installment?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Collector Bank Installment Payment */
        enabled: boolean;
        countries?: string[];
        options?: {
            /** Create the collector transaction with status `ON_HOLD` and let
the Collector callback update the transaction state from `ON_HOLD`
to `AUTHORIZED` or `FAILED`.

A callback will be sent to the `callback_url` when the transaction
changes state from `ON_HOLD` to any new state.

This will override the gateway's `options.enable_on_hold`-setting.
 */
            enableOnHold?: boolean;
        };
        payability?: SessionPayability;
    };
};

export type KlarnaConfiguration = {
    /** Denotes what kind of config parameter this is */
    type?: "payment_type";
    klarna?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Klarna Payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
};

export type SantanderConfiguration = {
    /** Denotes what kind of config parameter this is */
    type?: "payment_type";
    debitAccount?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Santander Finance Debit Account */
        enabled: boolean;
        payability?: SessionPayability;
        /** The name of the chain */
        brandingName?: string;
        /** Debit accounts belonging to the customer's phone number */
        accounts?: {
            /** Token to represent the account number */
            accountNumberToken?: string;
            /** Representation of the account number for display purposes */
            maskedAccountNumber?: string;
        }[];
    };
};

export type SwishConfiguration = {
    /** Denotes what kind of config parameter this is */
    type?: "payment_type";
    swish?: {
        /** Denotes what kind of config parameter this is */
        type?: "payment_product_type";
        /** enable Swish Payment */
        enabled: boolean;
        payability?: SessionPayability;
    };
};

export type PayoutConfiguration = {
    /** The payment products where payout is enabled
     */
    paymentProducts: {
        /** Payment product */
        paymentProduct: "bambora" | "collector" | "payex" | "klarna";
    }[];
};

export type PaymentConfiguration = Record<string, unknown>;

export type DiscountsConfiguration = {
    /** Configuration for discounts calculations
     */
    discounts?: {
        type?: "discounts";
        expressDiscountCodes?: {
            payability?: SessionPayability;
            /** The discounts will be given by the configured express callback url.

The callback URL will be invoked when the session is updated
with a discount code, and the response used to update the discounts
on the order items and the shipping options.
 */
            enabled: boolean;
        };
        /** Configure discounts calculation on the session order.
         */
        order?: {
            /** Enable discount calculation on order
items eligible for discount

- A session that has the `customer.customer_id` set will have
  its discounts calculated when the session is created.

- A session with no customer_id will only have the discounts
  calculated when the customer is identified by the checkout
  page.

- The autorized amount will be the net amount from the
  original session amount specified when the session was
  created.
 */
            enabled: boolean;
        };
    };
};

export type SessionThemeConfiguration = {
    /** Customize the appearance of the checkout.
     */
    theme?: {
        /** Color on backdrop shown in desktop mode

Color, supported formats are
- hex: `#ff0000`
- rgb: `rgb(255,0,0)`
- rgba: `rgba(255,0,0,0.5)`
 */
        backdrop?: string;
        /** Primary color used on pay button and other buttons.

Color, supported formats are
- hex: `#ff0000`
- rgb: `rgb(255,0,0)`
- rgba: `rgba(255,0,0,0.5)`
 */
        primary?: string;
        /** Default text color.

Color, supported formats are
- hex: `#ff0000`
- rgb: `rgb(255,0,0)`
- rgba: `rgba(255,0,0,0.5)`
 */
        text?: string;
        /** Color used for warnings.

Color, supported formats are
- hex: `#ff0000`
- rgb: `rgb(255,0,0)`
- rgba: `rgba(255,0,0,0.5)`
 */
        warning?: string;
        /** Color used for errors.

Color, supported formats are
- hex: `#ff0000`
- rgb: `rgb(255,0,0)`
- rgba: `rgba(255,0,0,0.5)`
 */
        error?: string;
        /** Fontstack used by the checkout.

Default value `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`
 */
        "font-family"?: string;
    };
};

export type CountryConfiguration = {
    /** Country preferences
     */
    countries?: {
        /** Country to use as default in address and phone country code
         */
        preferredCountry?: string;
        /** List of countries where the customer is allowed to set their address.
If empty, all countries are allowed, except for the ones in `deny_countries`.

A country can not be in both `allow_countries` and `deny_countries`.
 */
        allowCountries?: string[];
        /** List of countries where the customer is not allowed to set their address.

A country can not be in both `allow_countries` and `deny_countries`.
 */
        denyCountries?: string[];
    };
};

export type SessionOptions = Record<string, unknown>;

export type CollectorB2BPaymentOperationAddress = {
    /** ACME Inc */
    businessName: string;
    /** The organization number of the customer. For Norway, the length is 9. For Sweden, it's either 10 or 12 digits.
     */
    organizationNumber: string;
    /** Gaustadalleen 21 */
    addressLine: string;
    /** The zip code / postal code of the address. */
    postalCode: string;
    /** The name of the postal code */
    postalPlace: string;
    /** Country of the location */
    country: string;
    /** The unique identification of the address from the available addresses for the business
     */
    addressId?: string;
};

export type CollectorProduct = {
    /** Id for the payment product
     */
    id: string;
    type: "interest_free" | "annuity";
    /** Number of months
     */
    creditTime: number;
    /** The fee for a "Buy now – pay later" Payment product
     */
    campaignFee: number;
    /** The startup fee for the payment product
     */
    originationFee: number;
    /** The notification fee for the payment product
     */
    notificationFee: number;
    /** The interest rate for the payment product.
     */
    annualInterestRate?: string;
    /** The effective annual interest rate for the payment product
     */
    effectiveAnnualInterestRate?: string;
    /** The total amount to pay */
    totalAmount: number;
    /** The amount to pay pr month */
    monthlyAmount: number;
    /** The amount to pay in the first invoice. Origantion fee is added
to the first invoice.
 */
    firstMonthlyAmount: number;
};

export type SessionMeta = {
    /** The ID of the Checkout */
    id?: string;
    /** Time when the Checkout was created */
    createdAt?: Date;
    /** Last time when the Checkout was updated */
    updatedAt?: Date;
    /** The session expiration time after which the
Checkout page wouldn't be available
 */
    expiresAt?: Date;
    /** The IP of the customer upon visiting the page.
If the page is visited multiple times, the
field is always updated with the last known value.
 */
    customerIp?: string;
    /** The full user agent of the device the customer
used when visiting the checkout page
 */
    userAgent?: string;
    initiatingSystemRequestHeaders?: SystemRequestHeaders;
    paymentOperation?: PaymentOperationIntent;
    /** Checkout process events
     */
    events?: {
        createdAt?: Date;
        id?: string;
        requestId?: string;
        name?:
            | "INITIATED"
            | "VISITED"
            | "COMPLETED"
            | "AUTHORIZED"
            | "DECLINED"
            | "PAY_LOCK_START"
            | "PAY_LOCK_META"
            | "PAY_LOCK_END"
            | "PAY_FAILED"
            | "ON_HOLD_CALLBACK_SENT"
            | "AUTH_CALLBACK_SENT"
            | "FAILED"
            | "UNKNOWN"
            | "PAYMENT_TOKEN_FLOW_START"
            | "UPDATE_SESSION"
            | "CANCELLED"
            | "SET_BILLING_ADDRESS"
            | "SET_DISCOUNT_CODES"
            | "SET_SHIPPING_ADDRESS"
            | "SET_SHIPPING_OPTION"
            | "PUSH_NOTIFICATION_SENT"
            | "SECRET_CONFIRMATION_CODE_SENT"
            | "SET_MY_DINTERO";
        requestHeaders?: RequestHeaders;
        details?: {
            error?: string;
            paymentProductType?: string;
            amount?: number;
            shippingOption?: SplitShippingOption;
            shippingAddress?: OrderAddress;
            bambora?: {
                sessionToken?: string;
                sessionUrl?: string;
                walletSessionId?: string;
            };
            klarna?: { clientToken: string; sessionId: string };
            "payex:payment:id"?: string;
            "collector:invoiceB2b:addresses"?: CollectorB2BPaymentOperationAddress[];
            "collector:installment:products"?: CollectorProduct[];
            myDintero?: MyDinteroUserCreation;
            organizationNumber?: string;
            previousOrder?: SessionOrder;
            updatedOrder?: SessionOrder;
            previousExpress?: SessionExpress;
            updatedExpress?: SessionExpress;
        };
    }[];
    /** Transaction which has been created using the checkout.
     */
    transactionId?: string;
};

export type Session = SessionOptions & SessionMeta;

export type Transaction = {
    id?: string;
    /** The payment product corresponding to this transaction
     */
    paymentProduct: string;
    /** Non-negative, minor units. Total amount of the transaction
     */
    amount: number;
    /** ISO 4217 transaction currency */
    currency: string;
    /** An id that identifies the seller, value will be included in
the settlement reports
 */
    payoutDestinationId?: string;
    /** A reference specified by the merchant to identify the transaction
     */
    merchantReference?: string;
    /** A reference specified by the merchant to identify the transaction, can be updated after the transaction has been created
     */
    merchantReference2?: string;
    /** A short reference / descriptor that will show
up on the customers bank statement
 */
    dynamicDescriptor?: string;
    paymentOperation?: PaymentOperationIntent;
    settlementStatus?: SettlementStatus;
    customer?: {
        /** Customer id
         */
        customerId?: string;
        /** Customer email address
         */
        email?: string;
        /** Customer phone number, ITU/E.123 format with
international prefix (+PPNNNNNNNNN...)
 */
        phoneNumber?: string;
        myDintero?: MyDinteroUserCreation;
    };
    /** The IP address of the customer */
    customerIp?: string;
    /** The full user agent string of the device the customer used
to submit the transaction
 */
    userAgent?: string;
    initiatingSystemRequestHeaders?: SystemRequestHeaders;
    shippingAddress?: OrderAddress;
    shippingOption?: SplitShippingOption;
    billingAddress?: OrderAddress;
    store?: Store;
    /** The current status of the transaction */
    status?: string;
    /** The applicable transaction items
     */
    items?: OrderItem & OrderDiscountItem[];
    url?: {
        /** URL the customer is redirected after checkout completes
(successfully or failed)
 */
        redirectUrl?: string;
        /** URL the customer is redirected to for authentication.
         */
        approvalUrl?: string;
        /** URL that Checkout will call when the session payment is complete
and the transaction has been authorized
 */
        callbackUrl?: string;
    };
    /** All events recorded on the transaction
     */
    events?: TransactionEvent[];
    /** The session id for the transaction */
    sessionId?: string;
    session?: Session;
    /** When the transaction was last modified. */
    updatedAt?: Date;
    /** When the transaction was created */
    createdAt?: Date;
    /** Additional details about the transaction */
    metadata?: {
        merchantName?: string;
        /** Profile Id used when session was created */
        "session:profileId"?: string;
        /** How settlement payout will be done by Dintero

- `payout_account`: Payout directly to merchant
- `payout_splits`: Payout is splitted to one or more sellers
- `payout_destination_id`: Payout is done to a single seller
 */
        payout?: "payout_account" | "payout_splits" | "payout_destination_id";
        /** Id that will be referenced on the settlement report
         */
        payoutCorrelationId?: string;
    };
};

export type Id = {
    /** An ID that uniquely identifies the resource
     */
    id?: string;
    /** The date-time when the resource was created
     */
    createdAt?: Date;
};

export type TransactionBambora = Transaction &
    Id & {
        /** The payment product type corresponding to this transaction
         */
        paymentProductType: "bambora.creditcard" | "bambora.vipps";
        card?: {
            /** Visa, MasterCard, etc. The brand of the card. */
            brand?: string;
            maskedPan?: string;
            expiryDate?: string;
            /** Credit or Debit. Indicates the type of card used
             */
            type?: "Credit Card";
            eci?: string;
            /** The country the card is issued in */
            country?: string;
        };
        status?:
            | "INITIATED"
            | "AUTHORIZED"
            | "AUTHORIZATION_VOIDED"
            | "CAPTURED"
            | "PARTIALLY_CAPTURED"
            | "REFUNDED"
            | "PARTIALLY_REFUNDED"
            | "DECLINED"
            | "FAILED"
            | "UNKNOWN";
        events?: {
            transactionStatus?:
                | "INITIATED"
                | "AUTHORIZED"
                | "AUTHORIZATION_VOIDED"
                | "CAPTURED"
                | "PARTIALLY_CAPTURED"
                | "REFUNDED"
                | "PARTIALLY_REFUNDED"
                | "DECLINED"
                | "FAILED"
                | "UNKNOWN";
            metadata?: {
                "bambora:transaction:status"?: string;
                "bambora:transactionoperation:id"?: string;
                "bambora:meta:action:source"?: string;
                "bambora:meta:action:code"?: string;
                "bambora:meta:action:type"?: string;
            };
        }[];
        metadata?: {
            "gateway:id"?: string;
            "bambora:merchantNumber"?: string;
            "bambora:transactionId"?: string;
            "bambora:reference"?: string;
            "bambora:acquirer"?: string;
            "bambora:wallet"?: string;
        };
    };

export type PaymentOperation = {
    contentType?: "application/json" | "application/javascript" | "text/html";
    /** The HTTP method to use when performing the operation
     */
    method?: "GET" | "POST";
    rel: string;
};

export type PayExV3ClickToPayPaymentOperation = Record<string, unknown>;

export type PayExVippsPayment = Record<string, unknown>;

export type TransactionVipps = Transaction &
    Id & {
        /** The payment product type corresponding to this transaction
         */
        paymentProductType: "vipps";
        status?:
            | "INITIATED"
            | "AUTHORIZED"
            | "AUTHORIZATION_VOIDED"
            | "CAPTURED"
            | "PARTIALLY_CAPTURED"
            | "REFUNDED"
            | "PARTIALLY_REFUNDED"
            | "DECLINED"
            | "FAILED"
            | "UNKNOWN";
        events?: {
            transactionStatus?:
                | "INITIATED"
                | "AUTHORIZED"
                | "AUTHORIZATION_VOIDED"
                | "CAPTURED"
                | "PARTIALLY_CAPTURED"
                | "REFUNDED"
                | "PARTIALLY_REFUNDED"
                | "DECLINED"
                | "FAILED"
                | "UNKNOWN";
            metadata?: {
                "vipps:transactionInfo.timeStamp"?: Date;
                "vipps:transactionInfo.transactionId"?: string;
                "vipps:transactionInfo.status"?:
                    | "INITIATE"
                    | "RESERVE"
                    | "CANCEL"
                    | "CAPTURE"
                    | "VOID";
                "vipps:transaction.transactionText"?: string;
            };
        }[];
        metadata?: {
            "vipps:transaction.orderId"?: string;
            "vipps:transaction.transactionText"?: string;
            /** Unique id for this merchant's sales channel: website, mobile app
etc. Short name: MSN.
 */
            "vipps:merchantInfo.merchantSerialNumber"?: string;
            "vipps:merchantInfo.paymentType"?: "eComm Regular Payment";
        };
    };

export type KlarnaPaymentOperation = Record<string, unknown>;

export type CollectorInvoiceB2BPreapprovedPayment = Record<string, unknown>;

export type BamboraVippsPayment = Record<string, unknown>;

export type PayExSwishPayment = Record<string, unknown>;

export type SwishTransactionEventMetadata = {
    "swish:paymentRequest:getPaymentUrl"?: string;
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

export type TransactionSwish = Transaction &
    Id & {
        /** The payment type corresponding to this transaction
         */
        paymentProductType: "swish.swish";
        events?: {
            transactionStatus?:
                | "INITIATED"
                | "AUTHORIZED"
                | "AUTHORIZATION_VOIDED"
                | "CAPTURED"
                | "PARTIALLY_CAPTURED"
                | "REFUNDED"
                | "PARTIALLY_REFUNDED"
                | "DECLINED"
                | "FAILED"
                | "UNKNOWN";
            metadata?: SwishTransactionEventMetadata;
        }[];
        metadata?: {
            "swish:paymentRequest:id"?: string;
            "swish:swishNumber"?: string;
            /** Payment request id */
            "swish:id"?: string;
            /** Capture payment reference from bank */
            "swish:paymentReference"?: string;
        };
    };

export type TransactionKlarna = Transaction &
    Id & {
        /** The payment product type corresponding to this transaction
         */
        paymentProductType: "klarna.klarna";
        status?:
            | "INITIATED"
            | "AUTHORIZED"
            | "AUTHORIZATION_VOIDED"
            | "CAPTURED"
            | "PARTIALLY_CAPTURED"
            | "REFUNDED"
            | "PARTIALLY_REFUNDED"
            | "DECLINED"
            | "FAILED"
            | "UNKNOWN";
        events?: {
            transactionStatus?:
                | "INITIATED"
                | "AUTHORIZED"
                | "AUTHORIZATION_VOIDED"
                | "CAPTURED"
                | "PARTIALLY_CAPTURED"
                | "REFUNDED"
                | "PARTIALLY_REFUNDED"
                | "DECLINED"
                | "FAILED"
                | "UNKNOWN";
            metadata?: {
                /** Internal reference sent to Klarna for the capture/refund. This will be included in the settlement files.
                 */
                "klarna:reference"?: string;
                /** Id of the capture created in Klarna */
                "klarna:headers:captureId"?: string;
                /** Id of the refund created in Klarna */
                "klarna:headers:refundId"?: string;
                /** The URI at which the capture or refund created in Klarna can be found
                 */
                "klarna:headers:location"?: string;
            };
        }[];
        metadata?: {
            /** Order Id in Klarna
             */
            "gateway:id"?: string;
            merchantName?: string;
            "klarna:authorizedPaymentMethod:type"?:
                | "invoice"
                | "fixed_amount"
                | "base_account"
                | "direct_debit"
                | "direct_bank_transfer"
                | "b2b_invoice"
                | "card"
                | "slice_it_by_card"
                | "pay_later_by_card"
                | "pay_by_card"
                | "fixed_sum_credit";
            "klarna:authorizedPaymentMethod:numberOfDays"?: string;
            "klarna:authorizedPaymentMethod:numberOfInstallments"?: string;
            /** Fraud status for order
             */
            "klarna:authorizedPaymentMethod:fraudStatus"?:
                | "ACCEPTED"
                | "PENDING";
        };
    };

export type BamboraPaymentOperation = Record<string, unknown>;

export type CollectorInstallmentPayment = Record<string, unknown>;

export type TransactionCollector = Transaction &
    Id & {
        /** The payment product type corresponding to this transaction
         */
        paymentProductType:
            | "collector.finance"
            | "collector.invoice"
            | "collector.invoice_b2b"
            | "collector.invoice_b2b_preapproved"
            | "collector.installment";
        status?:
            | "INITIATED"
            | "ON_HOLD"
            | "AUTHORIZED"
            | "AUTHORIZATION_VOIDED"
            | "CAPTURED"
            | "PARTIALLY_CAPTURED"
            | "REFUNDED"
            | "PARTIALLY_REFUNDED"
            | "DECLINED"
            | "FAILED"
            | "UNKNOWN";
        events?: {
            transactionStatus?:
                | "INITIATED"
                | "ON_HOLD"
                | "AUTHORIZED"
                | "AUTHORIZATION_VOIDED"
                | "CAPTURED"
                | "PARTIALLY_CAPTURED"
                | "REFUNDED"
                | "PARTIALLY_REFUNDED"
                | "DECLINED"
                | "FAILED"
                | "UNKNOWN";
            metadata?: {
                /** External status reported after adding invoice and activating invoice */
                "collector:Invoice.InvoiceStatus"?: number;
                /** External request id
                 */
                "collector:CorrelationId"?: string;
                /** The payment identification number. This is the id the customer must use when they do a payment of an invoice.
                 */
                "collector:Invoice.PaymentReference"?: string;
                /** The lowest amount to pay on the invoice. */
                "collector:Invoice.LowestAmountToPay"?: number;
                /** The total amount to pay for the invoice. */
                "collector:Invoice.TotalAmount"?: number;
                /** The due date of the invoice. */
                "collector:Invoice.DueDate"?: string;
                /** The url to invoice in pdf format. */
                "collector:Invoice.InvoiceUrl"?: string;
                /** The invoice number of the invoice that this event belongs to. */
                "collector:Invoice.CurrentInvoiceNumber"?: string;
                /** The invoice number for the next capture. */
                "collector:Invoice.NewInvoiceNumber"?: string;
            };
        }[];
        metadata?: {
            /** The Collector Store ID of the payment */
            "collector:StoreId"?: string;
            /** The invoice number of the invoice. */
            "collector:Invoice.InvoiceNumber"?: string;
            /** Corresponds to the Dintero session ID */
            "collector:Invoice.OrderNumber"?: string;
            /** The country of the payment */
            "collector:Invoice.CountryCode"?: string;
            "collector:Invoice.ProductCode"?: string;
            "collector:Invoice.InvoiceType"?: string;
            /** The SettlementReference used for the payment. */
            "collector:Invoice.SettlementReference"?: string;
        };
    };

export type CollectorInvoicePayment = Record<string, unknown>;

export type KlarnaAddress = {
    firstName: string;
    lastName: string;
    /** Street address. */
    addressLine: string;
    /** More details about address. */
    addressLine2?: string;
    /** Name of the company */
    businessName?: string;
    /** The zip code / postal code of the address. */
    postalCode: string;
    /** The name of the postal code */
    postalPlace: string;
    /** Country of the location */
    country: string;
    /** mobile number of a person / company, ITU/E.123 format with
international prefix (+PPNNNNNNNNN...)
 */
    phoneNumber: string;
    /** The email address of a person or an organisation
     */
    email: string;
};

export type KlarnaPayment = Record<string, unknown>;

export type PayExMobilePayPayment = Record<string, unknown>;

export type TransactionPayEx = Transaction &
    Id & {
        /** The payment type corresponding to this transaction
         */
        paymentProductType:
            | "payex.creditcard"
            | "payex.mobilepay"
            | "payex.swish"
            | "payex.vipps"
            | "payex.applepay"
            | "payex.clicktopay"
            | "payex.googlepay";
        card?: {
            /** Visa, MasterCard, etc. The brand of the card. */
            brand?: string;
            maskedPan?: string;
            expiryDate?: string;
            /** Credit or Debit. Indicates the type of card used
             */
            type?: "Credit Card" | "Debit Card";
            /** The name of the bank that issued the card used
             */
            issuingBank?: string;
            /** The country the card is issued in */
            country?: string;
            /** 3DSECURE or SSL. Indicates the transaction type of the acquirer.
             */
            acquirerTransactionType?: "3DSECURE" | "SSL";
            /** The System Trace Audit Number assigned by the acquirer to
uniquely identify the transaction.
 */
            acquirerStan?: string;
            /** The ID of the acquirer terminal. */
            acquirerTerminalId?: string;
            /** The ISO-8601 date and time of the acquirer transaction. */
            acquirerTransactionTime?: Date;
            /** Y, A, U or N. Indicates the status of the authentication.
             */
            authenticationStatus?: "Y" | "A" | "U" | "N";
            /** The payment token generated by the authorization. Only available
for transactions created from session where the
generate_payment_token option is enabled in the payex session
configuration or from payment token sessions created with payex
configured

- [POST /v1/sessions-payment-token](#operation/checkout_payment_token_session_post)
 */
            paymentToken?: string;
            /** The id of the payment_token, only included in transaction where
a payment_token was generated.
 */
            paymentTokenId?: string;
            /** The payment token generated by the authorization. Only available
for transactions created from session where the
generate_recurrence_token option is enabled in the payex session
configuration or from payment token sessions created with payex
configured

- [POST /v1/sessions-payment-token](#operation/checkout_payment_token_session_post)
 */
            recurrenceToken?: string;
            /** The id of the recurrence_token, only included in transaction where
a recurrence_token was generated.
 */
            recurrenceTokenId?: string;
        };
        status?:
            | "INITIATED"
            | "VERIFIED"
            | "AUTHORIZED"
            | "AUTHORIZATION_VOIDED"
            | "CAPTURED"
            | "PARTIALLY_CAPTURED"
            | "REFUNDED"
            | "PARTIALLY_REFUNDED"
            | "DECLINED"
            | "FAILED"
            | "UNKNOWN";
        events?: {
            transactionStatus?:
                | "INITIATED"
                | "VERIFIED"
                | "AUTHORIZED"
                | "AUTHORIZATION_VOIDED"
                | "CAPTURED"
                | "PARTIALLY_CAPTURED"
                | "REFUNDED"
                | "PARTIALLY_REFUNDED"
                | "DECLINED"
                | "FAILED"
                | "UNKNOWN";
            metadata?: {
                "payex:transaction:id"?: string;
                "payex:transaction:number"?: Record<string, unknown>;
                "payex:transaction:type"?: string;
                "payex:transaction:state"?: string;
                "payex:transaction:created"?: Date;
                "payex:transaction:payeeReference"?: string;
            };
        }[];
        metadata?: {
            "payex:payment:payeeInfo:payeeId"?: string;
            "payex:payment:payeeInfo:payeeName"?: string;
            "payex:payment:payeeInfo:subsite"?: string;
            "payex:payment:id"?: string;
            "payex:payment:number"?: Record<string, unknown>;
            "payex:payment:operation"?: string;
            "payex:payment:created"?: Date;
        };
    };

export type AuthToken = { grantType: string };

export type client_credentials = Record<string, unknown>;

export type SessionCustomerTokens = {
    customer?: {
        tokens?: {
            "payex.creditcard"?: {
                /** Preload the store payment data related to the payment
token and let the customer make a purchase without having
to enter all card data

- The `payex.creditcard` must be enabled in the session
  configuration to activate the use of provided payment token
- Use the `payex.creditcard.generate_payment_token` option to
  generate the token.
 */
                paymentToken?: string;
                /** Preload the store payment data related to the recurrence
token and let the customer make a purchase without having
to enter all card data

- The `payex.creditcard` must be enabled in the session
  configuration to activate the use of provided payment token
- Use the `payex.creditcard.generate_recurrence_token` option to
  generate the token.
 */
                recurrenceToken?: string;
            };
        };
    };
};

export type Merchant = { name: string; logoUrl: string };

export type SessionProfile = Record<string, unknown>;

export type Metadata = {
    /** Additional metadata about the resource */
    metadata?: Record<string, Record<string, unknown>>;
};

export type SessionRead = {
    customer?: {
        myDintero?: MyDinteroUserCreation;
        tokens?: {
            "payex.creditcard"?: {
                /** Id included if the payex.creditcard was created with
payment_token set.
 */
                paymentTokenId?: string;
            };
        };
    };
    /** metadata about the session
     */
    metadata?: {
        /** Profile Id used when session was created */
        "session:profileId"?: string;
    };
    configuration?: {
        merchant?: { id?: string; logoUrl?: string; name?: string };
    };
};

export type SessionCancelled = {
    cancelledBy?: string;
    /** The date-time when the resource was cancelled
     */
    cancelledAt?: Date;
};

export type UpdateSessionOptions = Record<string, unknown>;

export type SessionPaymentToken = {
    order: {
        /** The three-character ISO-4217 currency. https://en.wikipedia.org/wiki/ISO_4217 */
        currency: string;
        /** A reference by the merchant to identify the corresponding
order for the Checkout Session
 */
        merchantReference: string;
        /** A reference by the merchant to identify the corresponding
order for the Checkout Session
 */
        merchantReference2?: string;
        store?: Store;
    };
    url: SessionUrls;
    /** configuration profile to use for branding
     */
    profileId?: string;
    customer?: SessionCustomer;
    expiresAt?: Date;
    configuration?: SessionThemeConfiguration;
};

export type SettlementItem = {
    /** Unique identifier for the settlement
     */
    id?: string;
    /** Time of first payment event in this settlement */
    startAt?: string;
    /** Time of last payment event in this settlement */
    endAt?: string;
    /** Settlement date */
    settledAt?: string;
    /** Time of email received in Dintero's system */
    emailReceivedAt?: string;
    /** Name of payment provider. */
    provider?: string;
    /** The provider's unique id of the settlement */
    providerReference?: string;
    attachments?: {
        /** Unique id of the attachment */
        id?: string;
        /** Attachment path */
        key?: string;
        contentType?: string;
        extension?: string;
        /** Where the attachment was created. Might be created by dintero,
or might be created by the providers, e.g. payex, vipps, collector
 */
        createdBy?: string;
    }[];
    amounts?: {
        /** The amount paid out, unless payment_status is postponed.

`amount = capture - refund - fee`
 */
        amount?: number;
        /** The amount captured on the orders in the settlement period.
         */
        capture?: number;
        /** The amount refunded on the orders in the settlement period.
         */
        refund?: number;
        /** The sum of fees on the orders in the settlement period.
         */
        fee?: number;
        currency?: string;
    }[];
    /** Whether the amount in the report has actually been paid or not.
The payment might be postponed for later.
 */
    paymentStatus?: "paid" | "postponed";
    /** The sales location this report is for. Will only be set if all
transactions share the same store_id.
 */
    storeId?: string;
    /** The seller id this report is for. Will only be set if all
transactions share the same payout_destination_id.
 */
    payoutDestinationId?: string;
};

export type SettlementResponse = {
    items?: SettlementItem[];
    lastEvaluatedKey?: { id?: string; accountId?: string; settledAt?: string };
};

export type UpdateSettlementReportConfigItem = {
    /** **Deprecated** report configuration is not used for controlling when to create and send report

Value in milliseconds describing how often reports should be sent.
 */
    sendEvery?: number;
    /** The filetypes that should be sent */
    filetypes: string[];
    /** List of destinations. If empty, the report is just stored and visible from the backoffice. */
    destinations: {
        id?: string;
        /** Specifies the type of destination.

- account_email: Send email to the billing email address registered on the account
- email: Send email to the email address specified in `destination_value`
 */
        destinationType: "account_email" | "email";
        /** If destination_type is email, the email address goes here
         */
        destinationValue?: string;
    }[];
    /** List of providers to send report for. If empty, send for all. */
    providers: string[];
    /** The report will only be sent to the provided destinations if it satisfies these criterias.
     */
    filters?: {
        /** The "field/column" the data will be filtered on
         */
        filter?: "payout_destination_id";
        /** The value the records must contain for the provided filter (field/column) */
        value?: string;
    }[];
};

export type SettlementReportConfigItem = Record<string, unknown>;

export type SettlementReportConfigResponse = {
    items?: SettlementReportConfigItem[];
};

export type ReportFilter = {
    /** The "field/column" the data will be filtered on */
    filter?: "operation_payout_destination" | "store_id";
    /** The value the records must contain for the provided filter (field/column) */
    value?: string;
};

export type ReportMetadata = {
    /** Unique identification of the report */
    id?: string;
    /** Unique identification for all reports created by the same reportconfig at the same time (with different content types) */
    reportJobId?: string;
    /** Id of the report owner */
    accountId?: string;
    /** Id of the template used to create the report */
    templateId?: string;
    /** Report content type */
    contentType?: string;
    /** Report content language */
    contentLanguage?: string;
    /** The ID of the user/client that created the report
     */
    createdBy?: string;
    /** The date-time when the report was created
     */
    createdAt?: Date;
    /** The start of the data interval, contains created_at if data_from qparam not provided
     */
    dataFrom?: Date;
    /** The end of the data interval, contains created_at if data_to qparam not provided
     */
    dataTo?: Date;
    /** Schedule for the report */
    schedule?: string;
    /** Name of the report file stored in S3.
     */
    reportFileName?: string;
    /** Custom name of the report, defined in the report configuration used to generate the report
     */
    customReportName?: string;
    /** Id of the report configuration used to generate the report.
     */
    reportConfigId?: string;
    /** Source of the data used to generate the report. Defined by the report configuration used to create the report
     */
    dataType?: string;
    /** Signed url used to download the report from s3
     */
    signedUrl?: string;
    /** List of filters used to filter the data for the report. Similar to SQL WHERE-clause. i.e, WHERE filter=value */
    reportFilters?: ReportFilter[];
};

export type StartingAfter = string;

export type AccessToken = {
    /** A JWT access token */
    accessToken: string;
    tokenType: "Bearer";
    /** The lifetime in seconds of the access token.  For
example, the value "3600" denotes that the access token will
expire in one hour from the time the response was generated.
 */
    expiresIn: number;
    /** Token that can be used to request new tokens when the existing
Access Token expire.

You can only get a Refresh Token if the Access Token used in the
request has scope:

 - `create:accounts:auth:refresh_token`

and the `grant-type` is one of:

 - `authorization_code`
 - `password`

**NOTE**:
 - A Single-Page Application should not ever receive a Refresh Token,
   this information is sensitive and should not be exposed client-side
   in a browser.
 - Refresh token must be stored securely by an application since
   they allow a user to remain authenticated essentially forever.
 */
    refreshToken?: string;
};

export type Entity = {
    /** An UUID that uniquely identifies the resource
     */
    id?: string;
    /** The date-time when the resource was created
     */
    createdAt?: Date;
    /** The ID of the user/client created the resource
     */
    createdBy?: string;
    /** The date-time when the resource was last updated
     */
    updatedAt?: Date;
    /** The ID of the user/client created the resource
     */
    deletedBy?: string;
    deletedAt?: Date;
};

export type ApprovalsBankAccount = {
    /** Name of the Bank used */
    bankName?: string;
    /** BBAN, national bank account number */
    bankAccountNumber?: string;
    /** The type of bank account number. Will default to BBAN in bank_country_code
is norwegian. Will default to IBAN in all other countries.
 */
    bankAccountNumberType?: "IBAN" | "BBAN";
    /** Country code, must be a two letter ISO 3166-1-alpha-2 country code. If not
set we default to the country_code of parent approval object.
 */
    bankAccountCountryCode?: string;
    /** The three-character ISO-4217 currency.
https://en.wikipedia.org/wiki/ISO_4217
 */
    bankAccountCurrency: string;
    /** The three-character ISO-4217 currency.
https://en.wikipedia.org/wiki/ISO_4217
 */
    payoutCurrency: string;
    /** A BIC code, or Bank Identifier Code also know as SWIFT code, consistin of
8 to 11 alphanumeric characters.
 */
    bankIdentificationCode?: string;
};

export type ApprovalsPayoutDestination = Record<string, unknown>;

export type ApprovalStatus =
    | "ACTIVE"
    | "DECLINED"
    | "UNDER_MANUAL_REVIEW"
    | "AUTOMATIC_REVIEW"
    | "WAITING_FOR_SIGNATURE"
    | "WAITING_FOR_DECLARATION"
    | "ERROR";

export type ApprovalsPayoutDestinationResponse = Record<string, unknown>;

export class Api extends HttpClient {
    methods = {};
}
