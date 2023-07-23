import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPIV2 } from "openapi-types";

import { generateApi } from "./client/api";

const specFile = process.argv[2];
if (!specFile) {
    throw Error("Missing specFile argument");
}

SwaggerParser.parse(specFile).then((spec) => {
    generateApi(spec as OpenAPIV2.Document);
});
