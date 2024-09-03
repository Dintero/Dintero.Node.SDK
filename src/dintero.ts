import createCheckoutClient from "./client/client";

export type ClientConfig = {
    oid: string;
    audience: string;
    clientId: string;
    clientSecret: string;
    endpoint?: string;
    fetch?: typeof fetch;
};

export type Token = {
    value: string | null;
    expiresAt: number;
};

const client = (config: ClientConfig) => {
    const checkout = createCheckoutClient(config);
    return { checkout };
};

export default client;
