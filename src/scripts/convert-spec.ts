import { request } from "undici";
import yaml from "js-yaml";
import openapiTS from "openapi-typescript";
import * as fs from "node:fs";
import path from "node:path";

export async function generateTypes() {
    try {
        const url = "https://docs.dintero.com/specs/spec-payments.yaml";
        const { body } = await request(url);
        const yamlContent = await body.text();

        const openApiDoc = yaml.load(yamlContent) as any;

        const types = await openapiTS(openApiDoc, {});

        const outputDir = path.join(path.resolve(), "src/types/payments");
        const outputPath = path.join(outputDir, "generated.d.ts");

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, String(types));

        console.log("Types generated and saved to", outputPath);
    } catch (error) {
        console.error("Error generating types", error);
    }
}

if (require.main === module) {
    generateTypes();
}
