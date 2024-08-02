import Cache from "../src/middleware/cache";

describe("Cache", () => {
    let cache: Cache;

    beforeEach(() => {
        cache = new Cache();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("Should set and get a value", () => {
        cache.set("Key", "Value", 3600);
        expect(cache.get("Key")).toBe("Value");
    });

    it("Should return null for expired key", () => {
        cache.set("Key", "Value", 1);
        jest.advanceTimersByTime(2000);
        expect(cache.get("Key")).toBeNull();
    });

    it("Should delete a key", () => {
        cache.set("Key", "Value", 3600);
        cache.delete("Key");
        expect(cache.get("Key")).toBeNull();
    });

    it("Should clear all keys", () => {
        cache.set("key1", "Value1", 3600);
        cache.set("Key2", "Value2", 3600);
        cache.clear();
        expect(cache.get("Key1")).toBeNull;
        expect(cache.get("Key2")).toBeNull;
    });
});
