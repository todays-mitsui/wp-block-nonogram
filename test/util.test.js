import { encode, decode } from "./src/lib/encode";

describe("encode/decode", () => {
  test("should encode serials to code", () => {
    var serials = [0, 0, 0];
    expect(encode(serials)).toBe("A");

    var serials = [0, 1, 0];
    expect(encode(serials)).toBe("E");

    var serials = [2, 1, 1];
    expect(encode(serials)).toBe("l");

    var serials = [3, 3, 3];
    expect(encode(serials)).toBe("/");

    var serials = [3, 3, 3, 0];
    expect(encode(serials)).toBe("/A");

    var serials = [3, 3, 3, 0, 1];
    expect(encode(serials)).toBe("/E");

    var serials = [0, 1, 0, 2, 1, 1];
    expect(encode(serials)).toBe("El");
  });

  test("should decode code to serials", () => {
    var code = "A";
    expect(decode(code)).toEqual([0, 0, 0]);

    var code = "E";
    expect(decode(code)).toEqual([0, 1, 0]);

    var code = "l";
    expect(decode(code)).toEqual([2, 1, 1]);

    var code = "/";
    expect(decode(code)).toEqual([3, 3, 3]);

    var code = "/A";
    expect(decode(code)).toEqual([3, 3, 3, 0, 0, 0]);

    var code = "/E";
    expect(decode(code)).toEqual([3, 3, 3, 0, 1, 0]);

    var code = "El";
    expect(decode(code)).toEqual([0, 1, 0, 2, 1, 1]);
  });

  test("should throw error on invalid character", () => {
    var code = "A!";
    expect(() => decode(code)).toThrow("Invalid character");
  });

  test("encode/decode", () => {
    var serials = [0, 1, 3, 2, 1, 1, 2, 0, 3, 2, 1];
    var code = encode(serials);
    expect(decode(code).slice(0, serials.length)).toEqual(serials);
  });
});
