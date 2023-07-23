/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright Oxide Computer Company
 */
import { snakeToCamel } from "../utils";
import { makeSchemaGenerator, refToSchemaName } from "./base";

export const schemaToTypes = makeSchemaGenerator({
    ref(schema, { w0 }) {
        if ("$ref" in schema) {
            w0(refToSchemaName(schema.$ref));
        }
    },
    enum(schema, { w0, w }) {
        if (schema.enum!.length === 1) {
            return w0(JSON.stringify(schema.enum![0]));
        }
        // TODO fix type
        for (const arm of schema.enum! as string[]) {
            w(`| ${JSON.stringify(arm)}`);
        }
    },
    boolean(_, { w0 }) {
        w0(`boolean`);
    },
    string(_, { w0 }) {
        w0(`string`);
    },
    date(_, { w0 }) {
        w0(`Date`);
    },
    number(_, { w0 }) {
        w0(`number`);
    },
    integer(_, { w0 }) {
        w0(`number`);
    },
    array(schema, io) {
        const { w0 } = io;
        // TODO fix types
        schemaToTypes(schema.items!, io);
        w0("[]");
    },
    object(schema, io) {
        const { w0, w } = io;
        // record type, which only tells us the type of the values
        if (!schema.properties || Object.keys(schema.properties).length === 0) {
            w0("Record<string,");
            if (typeof schema.additionalProperties === "object") {
                schemaToTypes(schema.additionalProperties!, io);
            } else {
                w0("unknown");
            }
            w0(">");
            return;
        }

        w0("{");
        for (const [name, subSchema] of Object.entries(
            schema.properties || {},
        )) {
            const optional = schema.required?.includes(name) ? "" : "?";
            if ("description" in subSchema) {
                w(`\n/** ${subSchema.description} */`);
            }
            w0(`${JSON.stringify(snakeToCamel(name))}${optional}: `);
            schemaToTypes(subSchema, io);
            w0(",");
        }
        w0("}");
    },
    allOf(schema, io) {
        if (schema.allOf!.length === 1) {
            schemaToTypes(schema.allOf![0], io);
        } else {
            const { w0 } = io;
            for (const s of schema.allOf!) {
                w0(" & ");
                schemaToTypes(s, io);
            }
        }
    },
    empty({ w0 }) {
        w0(`Record<string, unknown>`);
    },
    default(schema) {
        throw Error(`UNHANDLED SCHEMA: ${JSON.stringify(schema, null, 2)}`);
    },
});
