import * as dintero from "../src/dintero";

describe(dintero.something.name, () => {
    test("example", () => {
        expect(dintero.something()).toEqual(42);
    });
});
