import assert from "assert";
import { OpenAPIV2 } from "openapi-types";

import { initIO } from "../io";
import { schemaToTypes } from "../schema/types";
import { Schema, getSortedSchemas } from "./base";

const io = initIO("Api.ts");
const { w, out, copy } = io;

const checkErrorSchema = (schema: Schema) => {
    assert.deepStrictEqual(
        schema,
        {
            type: "object",
            required: ["error"],
            properties: {
                error: {
                    type: "object",
                    required: ["message"],
                    properties: {
                        code: {
                            type: "string",
                            description:
                                "The code used to identify the error/warning",
                        },
                        errors: {
                            type: "array",
                            description:
                                "The nested error(s) encountered during validation",
                            items: {
                                type: "object",
                            },
                        },
                        message: {
                            type: "string",
                            description:
                                "The human readable description of the error/warning",
                        },
                    },
                },
            },
        },
        "Error schema does not match the one hard-coded as ErrorBody in http-client.ts.",
    );
};

export const generateApi = (spec: OpenAPIV2.Document) => {
    if (!spec.paths) {
        return;
    }

    w("/* eslint-disable */\n");

    w(`
    /**
     * this source code form is subject to the terms of the mozilla public
     * license, v. 2.0. if a copy of the mpl was not distributed with this
     * file, you can obtain one at https://mozilla.org/mpl/2.0/.
     *
     * copyright oxide computer company
     */
  `);

    copy("./static/utils.ts");
    copy("./static/http-client.ts");

    w(`import type { FetchParams } from './http-client'
    import { HttpClient, toQueryString } from './http-client'`);

    w(`export type {
      ApiConfig,
      ApiResult,
      ErrorBody,
      ErrorResult,
    } from './http-client'
    `);

    const schemaNames = getSortedSchemas(spec);
    for (const schemaName of schemaNames) {
        const schema = spec.definitions![schemaName];
        // Special case for Error type for two reasons:
        //   1) Error is already a thing in JS, so we rename to ErrorBody. This
        //      rename only works because no other types refer to this one
        //   2) We hard-code the definition of `ErrorBody` in http-client.ts, so we
        //      want to skip writing it here
        if (schemaName === "Error") {
            checkErrorSchema(schema);
            continue;
        }
        w(`export type ${schemaName} =`);
        schemaToTypes(schema, io);
        w(";\n");
    }

    w(`export class Api extends HttpClient {
       methods = {`);
    w(`}
     }`);

    out.end();
};
