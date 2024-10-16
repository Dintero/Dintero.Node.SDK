import createOpenApiFetchClient from "openapi-fetch";
import {
    createAuthMiddleware,
    createDefaultHeadersMiddleware,
    createVersionPrefixMiddleware,
    extractAccountId,
} from "./middleware";
import type { CheckoutPaths, ClientOptions, CorePaths } from "./types";

export const createClient = (options: ClientOptions) => {
    const config: Required<ClientOptions> = {
        checkout: { baseUrl: "https://checkout.dintero.com" },
        core: { baseUrl: "https://api.dintero.com" },
        ...options,
    };

    const checkout = createOpenApiFetchClient<CheckoutPaths>(config.checkout);
    const core = createOpenApiFetchClient<CorePaths>(config.core);
    const accountId = extractAccountId(config.audience);

    const authMiddleware = createAuthMiddleware(config, core);
    const headersMiddleware = createDefaultHeadersMiddleware();
    const versionPrefixMiddleware = createVersionPrefixMiddleware();

    core.use(versionPrefixMiddleware, authMiddleware, headersMiddleware);
    checkout.use(versionPrefixMiddleware, authMiddleware, headersMiddleware);

    return { checkout, core, accountId };
};
