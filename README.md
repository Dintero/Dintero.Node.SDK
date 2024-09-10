# Dintero Node.js SDK

[![Build Status](https://github.com/dintero/Dintero.Node.SDK/workflows/CI/badge.svg)](https://github.com/dintero/Dintero.Node.SDK/actions?query=workflow%3ACI+branch%3Amaster)

The Dintero Node SDK provides convenient access to the Dintero API from
applications written in server-side Javascript

## Installation

Install the package with:

```sh
npm install @dintero/node-sdk
# or
yarn add @dintero/node-sdk
```

## Usage

To use the Dintero Node.js SDK, you will need to configure it with your **API credentials** that can be created in the Dintero Backoffice. These credentials include the **Client ID**, **Client Secret**, and **Audience**, which are required for authenticating your requests to the Dintero API.

### Example: Client Setup

You first need to create a client with the required credentials:

```ts
import { createClient } from "@dintero/node-sdk";

const client = createClient({
    clientId: 'your_client_id',   // Replace with your actual client ID
    clientSecret: 'your_client_secret',  // Replace with your actual client secret
    audience: 'https://api.dintero.com/v1/accounts/your_account_id',
});

export default client;

```

### Example: Session Profile

```ts
import { createClient } from '@dintero/node-sdk';

const client = createClient({
    clientId: 'your_client_id',   // Replace with your actual client ID
    clientSecret: 'your_client_secret',  // Replace with your actual client secret
    audience: 'https://api.dintero.com/v1/accounts/your_account_id',
});

const sessionProfileResponse = await client.checkout.POST('/sessions-profile', {
    method: 'POST',
    body: {
        url: {
            return_url: 'https://example.com',  // Replace with actual return URL
        },
        order: {
            amount: 1000,  
            currency: 'NOK',
            items: [
                {
                    id: 'item1',
                    line_id: 'line1',
                    description: 'Item 1',
                    amount: 1000,
                    quantity: 1,
                    vat_amount: 0,
                    vat: 0,
                    eligible_for_discount: false,
                },
            ],
            partial_payment: false,
            merchant_reference: 'ref123',  // Replace with actual merchant reference
        },
        profile_id: 'profile123',  // Replace with actual profile ID
    },
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

console.log('Session Profile Response:', sessionProfileResponse.data);
```

### Example: Fetching Settlement


```ts
import { createClient } from '@dintero/node-sdk';

const client = createClient({
    clientId: 'your_client_id',   // Replace with your actual client ID
    clientSecret: 'your_client_secret',  // Replace with your actual client secret
    audience: 'https://api.dintero.com/v1/accounts/your_account_id',
});

 const settlementsResponse = await client.core.GET(`/accounts/${client.accountId}/settlements`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        },
    });
console.log('Settlements Response:', settlementsResponse.data);

```

## Bugs

Bugs can be reported to https://github.com/Dintero/Dintero.Node.SDK/issues

## Security

Contact us at [security@dintero.com](mailto:security@dintero.com)

## Building from source

```bash
yarn install
yarn run build
```
