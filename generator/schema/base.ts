/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright Oxide Computer Company
 */
import { IJsonSchema, OpenAPIV2 } from "openapi-types";
import { P, match } from "ts-pattern";

import { IO } from "../io";

export type Schema =
    | OpenAPIV2.SchemaObject
    | OpenAPIV2.ReferenceObject
    | IJsonSchema;

export const refToSchemaName = (s: string) => s.replace("#/definitions/", "");

export interface SchemaHandlers {
    ref: (schema: OpenAPIV2.ReferenceObject, io: IO) => void;
    enum: (schema: OpenAPIV2.DefinitionsObject, io: IO) => void;
    boolean: (schema: OpenAPIV2.SchemaObject, io: IO) => void;
    string: (schema: OpenAPIV2.SchemaObject, io: IO) => void;
    date: (schema: OpenAPIV2.SchemaObject, io: IO) => void;
    number: (schema: OpenAPIV2.SchemaObject, io: IO) => void;
    integer: (schema: OpenAPIV2.SchemaObject, io: IO) => void;
    array: (schema: OpenAPIV2.ItemsObject, io: IO) => void;
    object: (schema: OpenAPIV2.SchemaObject | IJsonSchema, io: IO) => void;
    allOf: (schema: IJsonSchema, io: IO) => void;
    empty: (io: IO) => void;
    default: (schema: Schema, io: IO) => void;
}

export const makeSchemaGenerator =
    (handlers: SchemaHandlers) => (schema: Schema, io: IO) => {
        match(schema)
            .with({ $ref: P.string }, (s) => handlers.ref(s, io))
            .with({ enum: P.array(P.not(P.nullish)) }, (s) =>
                handlers.enum(s, io),
            )
            .with({ type: "boolean" }, (s) => handlers.boolean(s, io))
            .with({ type: "string", format: "date-time" }, (s) =>
                handlers.date(s, io),
            )
            .with({ type: "string" }, (s) => handlers.string(s, io))
            .with({ type: "number" }, (s) => handlers.number(s, io))
            .with({ type: "integer" }, (s) => handlers.integer(s, io))
            .with({ type: "array" }, (s) => handlers.array(s, io))
            .with({ type: "object" }, (s) => handlers.object(s, io))
            .with(
                // TODO find the `disciminator` property
                { allOf: P.not(P.nullish), "x-discriminator-value": P.string },
                (s) => handlers.allOf(s, io),
            )
            .with({ allOf: P.not(P.nullish) }, (s) => handlers.allOf(s, io))
            .with({ properties: P.any }, (s) =>
                // allof item without type
                handlers.object({ ...s, type: "object" }, io),
            )
            .with({}, () => handlers.empty(io))
            .otherwise((s) => handlers.default(s, io));
    };
