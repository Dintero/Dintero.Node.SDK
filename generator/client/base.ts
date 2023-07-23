/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright Oxide Computer Company
 */
import { OpenAPIV2 } from "openapi-types";

import { topologicalSort } from "../utils";

export type Schema = OpenAPIV2.DefinitionsObject | OpenAPIV2.ReferenceObject;

/**
 * Returns a list of schema names sorted by dependency order.
 */
export const getSortedSchemas = (spec: OpenAPIV2.Document) => {
    return topologicalSort(
        Object.keys(spec.definitions || {}).map((name) => [
            name,
            JSON.stringify(spec.definitions![name])
                .match(/#\/definitions\/[A-Za-z0-9]+/g)
                ?.map((s) => s.replace("#/definitions/", "")),
        ]),
    );
};
