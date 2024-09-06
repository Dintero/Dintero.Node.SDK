# Dintero Node SDK

[![Build Status](https://github.com/dintero/Dintero.Node.SDK/workflows/CI/badge.svg)](https://github.com/dintero/Dintero.Node.SDK/actions?query=workflow%3ACI+branch%3Amaster)

The Dintero Node SDK provides convenient access to the Dintero API from
applications written in server-side Typescript

## Before you start

You will need your Dintero API credentials, which can be found in the Dintero [Backoffice](https://backoffice.dintero.com/). Make sure you have your `clientId`, `clientSecret`, and the correct `audience` for your API requests.

## Installation

NPM package

```sh
npm install @dintero/node
# or
yarn add @dintero/node
```

## Usage

The package needs to be configured with your account api client, which is
available in the **Dintero Backoffice**.

#### Example: Creating a Client

```ts
const client = createClient({
    clientId: "CLIENT_ID",        // Your Dintero Client ID
    clientSecret: "CLIENT_SECRET", // Your Dintero Client Secret
    audience: "https://${accountId}@api.dintero.com/v1/accounts/${accountId}", // Audience URL
    core: { baseUrl: "https://api.dintero.com" },  // Optional, defaults to Dintero's core API base URL
    checkout: { baseUrl: "https://checkout.dintero.com" },  // Optional, defaults to Dintero's checkout API base URL
});
```

#### Example: Creating a Session

Example to create a new session for Dintero payments:

```ts
async function createSession() {
    const { checkout } = client;
    try {
        const response = await checkout.post("/sessions-profile", {
            body: {
                // Session data
            },
        });
        console.log("Session created:", response.data);
    } catch (error) {
        console.error("Error creating session:", error);
    }
}
```

#### Example: Fetching Transaction Details

Here’s how to fetch details about a specific transaction using the `checkout` client:

```ts
async function fetchTransactionDetails(transactionId: string) {
    const { checkout } = client;
    try {
        const response = await checkout.get(`/transactions/${transactionId}`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching checkout transaction details:", error);
    }
}
```

#### Example: Fetching Settlement Details (using core client)

Here’s how to fetch settlement details using the `core` client:

```ts
async function fetchSettlementDetails(settlementId: string, accountId: string) {
    const { core } = client;
    try {
        const response = await core.get(`/accounts/${accountId}/settlements/${settlementId}`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching settlement details:", error);
    }
}
```

### Middleware

This SDK comes with built-in middleware for authentication and API versioning.

- Authentication Middleware: Automatically adds the correct Bearer token to each request and refreshes it when needed.
- Version Prefix Middleware: Automatically prefixes API paths with /v1 if the path does not already include a version number.

## Generating TypeScript Types from API Spec

To ensure your types are up to date, run the conversion script to generate TypeScript types from Dintero's OpenAPI spec:

```sh
yarn convert-spec
```
This will download the Swagger spec and convert it to OpenAPI 3.0, generating types in the `src/generated/payments.d.ts` file.

## Bugs

Bugs can be reported to https://github.com/Dintero/Dintero.Node.SDK/issues

## Security

Contact us at [security@dintero.com](mailto:security@dintero.com)

## Building from source

```bash
yarn install
yarn run build
```
