export type ClientOptions = {
    accountId: string;
    clientId: string;
    clientSecret: string;
    audience: string;
    core?: { baseUrl: string };
    checkout?: { baseUrl: string };
};
