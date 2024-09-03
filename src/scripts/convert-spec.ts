import { request } from "undici";
import yaml from "js-yaml";
import openapiTS, { astToString } from "openapi-typescript";
import swagger2openapi from "swagger2openapi";
import * as fs from "node:fs";
import path from "node:path";

export async function generateTypes() {
    try {
        // Fetch the Swagger spec from the URL
        const url = "https://docs.dintero.com/specs/spec-payments.yaml";
        const { body } = await request(url);
        const yamlContent = await body.text();

        // Load the YAML spec
        const swaggerDoc = yaml.load(yamlContent) as any;

        // Convert Swagger 2.0 to OpenAPI 3.0
        let openApiV3Doc = swaggerDoc;
        if (swaggerDoc.swagger === "2.0") {
            const result = await swagger2openapi.convertObj(swaggerDoc, {
                patch: true,
            });
            openApiV3Doc = result.openapi;
        }

        // Generate TypeScript types from the OpenAPI 3.0 document
        const ast = await openapiTS(openApiV3Doc);

        // Convert the AST to a TypeScript string
        const typesString = astToString(ast);

        // Define the output directory and file path
        const outputDir = path.join(path.resolve(), "src/types/payments");
        const outputPath = path.join(outputDir, "generated#2.d.ts");

        // Ensure the output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write the generated types to a file
        fs.writeFileSync(outputPath, typesString);
    } catch (error) {
        console.error("Error generating types", error);
    }
}

// Run the script if it's executed directly
if (require.main === module) {
    generateTypes();
}
