import * as fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { OpenAPIV2 } from "openapi-types";
import openapiTS, { astToString, type OpenAPI3 } from "openapi-typescript";
import swagger2openapi from "swagger2openapi";

export async function generateTypes() {
    // Fetch the Swagger spec from the URL
    const url = "https://docs.dintero.com/specs/spec-payments.yaml";
    console.log("convert-spec: GET", url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Unexpected response: ${response.status}`);
    }
    const yamlContent = await response.text();

    // Load the YAML spec
    const swaggerDoc = yaml.load(yamlContent) as OpenAPIV2.Document;

    // Convert Swagger 2.0 to OpenAPI 3.0
    const openApiV3Doc = await swagger2openapi.convertObj(swaggerDoc, {
        patch: true,
    });

    // Generate TypeScript types from the OpenAPI 3.0 document
    const ast = await openapiTS(openApiV3Doc.openapi as OpenAPI3);

    // Convert the AST to a TypeScript string
    const typesString = astToString(ast);

    // Define the output directory and file path
    const outputDir = path.join(path.resolve(), "src/generated");
    const outputPath = path.join(outputDir, "payments.d.ts");

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the generated types to a file
    console.error("convert-spec: Write result to", outputPath);
    fs.writeFileSync(outputPath, typesString);
}

// Run the script if it's executed directly
if (require.main === module) {
    generateTypes();
}
