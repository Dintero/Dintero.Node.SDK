export type ClientOptions = {
    clientId: string;
    clientSecret: string;
    audience: string;
    core?: { baseUrl: string };
    checkout?: { baseUrl: string };
};
