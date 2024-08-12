import * as fs from "node:fs";
import path from "node:path";

import { generateTypes } from "../src/scripts/convert-spec";

describe("generateTypes", () => {
    const outputDir = path.join(path.resolve(), "src/types/payments");
    const outputPath = path.join(outputDir, "generated.d.ts");

    beforeAll(async () => {
        await generateTypes;
    });

    it("Should generate the generated.d.ts file", () => {
        expect(fs.existsSync(outputPath)).toBe(true);
    });

    it("Should not generate an empty file", () => {
        const fileContent = fs.readFileSync(outputPath, "utf8");
        expect(fileContent.length).toBeGreaterThan(0);
    });
});
