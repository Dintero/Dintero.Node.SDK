import assert from "node:assert";
import { describe, test } from "node:test";
import * as dintero from "../src/dintero";

describe("dintero", () => {
    test("createClient", () => {
        const client = dintero.createClient({
            clientId: "testClientId",
            clientSecret: "testClientSecret",
            audience: "https://api.dintero.com/v1/accounts/testAccountId",
        });
        assert.ok(client);
    });
});
