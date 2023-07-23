import * as utils from "../static/utils";

test(utils.camelToSnake.name, () => {
    expect(utils.camelToSnake("name")).toEqual("name");
    expect(utils.camelToSnake("Name")).toEqual("_name");
    expect(utils.camelToSnake("returnUrl")).toEqual("return_url");
});

test(utils.snakeToCamel.name, () => {
    expect(utils.snakeToCamel("customer_id")).toEqual("customerId");
    expect(utils.snakeToCamel("name")).toEqual("name");
});

test(utils.isObjectOrArray.name, () => {
    const truthy = [{}, { x: 1 }, ["abc"]];
    for (const v of truthy) {
        expect(utils.isObjectOrArray(v)).toBeTruthy();
    }

    const falsy = [1, true, new Date(), "abc", /hello/, new Error()];
    for (const v of falsy) {
        expect(utils.isObjectOrArray(v)).toBeFalsy();
    }
});

describe(utils.mapObj.name, () => {
    const fn = utils.mapObj(
        (k) => k + "_",
        (_, v) => (typeof v === "number" ? v * 2 : v),
    );

    it("leaves non-objects alone", () => {
        expect(fn(5)).toEqual(5);
        expect(fn("x")).toEqual("x");
    });

    it("maps over objects and arrays", () => {
        expect(fn({ x: 5, y: { z: 3 } })).toEqual({ x_: 10, y_: { z_: 6 } });
        expect(fn([{ x: 5 }, "abc"])).toEqual([{ x_: 10 }, "abc"]);
    });
});

test(utils.processResponseBody.name, () => {
    expect(utils.processResponseBody({})).toEqual({});

    const date = new Date();
    const dateStr = date.toISOString();
    const resp = {
        id: "big-uuid",
        another_prop: "abc",
        created_at: dateStr,
    };
    expect(utils.processResponseBody(resp)).toMatchObject({
        id: "big-uuid",
        anotherProp: "abc",
        createdAt: expect.any(Date),
    });
});

describe(utils.parseIfDate.name, () => {
    it("passes through non-date values", () => {
        expect(utils.parseIfDate("abc", 123)).toEqual(123);
        expect(utils.parseIfDate("abc", "def")).toEqual("def");
    });

    const timestamp = 1643092429315;
    const dateStr = new Date(timestamp).toISOString();

    it("doesn't parse dates if key doesn't end with _at", () => {
        expect(utils.parseIfDate("abc", dateStr)).toEqual(dateStr);
    });

    it("parses dates if key ends with _at", () => {
        const value = utils.parseIfDate("whatever_at", dateStr);
        expect(value).toBeInstanceOf(Date);
        expect((value as Date).getTime()).toEqual(timestamp);
    });

    it("passes through values that fail to parse as dates", () => {
        const value = utils.parseIfDate("created_at", "blah");
        expect(value).toEqual("blah");
    });
});

test(utils.snakeify.name, () => {
    const obj = {
        id: "transaction-id",
        createdAt: new Date(Date.UTC(2021, 0, 1)).toISOString(),
        updatedAt: new Date(Date.UTC(2021, 0, 2)).toISOString(),
        payment_product_type: "dintero",
        nested_obj: {
            thereIsMore: 123,
            weAreSerious: "xyz",
        },
    };
    expect(utils.snakeify(obj)).toMatchInlineSnapshot(`
    {
      "created_at": "2021-01-01T00:00:00.000Z",
      "id": "transaction-id",
      "nested_obj": {
        "there_is_more": 123,
        "we_are_serious": "xyz",
      },
      "payment_product_type": "dintero",
      "updated_at": "2021-01-02T00:00:00.000Z",
    }
  `);
});
