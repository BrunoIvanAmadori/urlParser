import isNumber from "../js/lib/isNumber";

describe("isNumber function", () => {
  it("should return true if number is integer", () => {
    expect(isNumber(122)).toBe(true);
  });

  it("should return true if number is big", () => {
    expect(isNumber(12233 * 999)).toBe(true);
  });

  it("should return false if receives string", () => {
    expect(isNumber("string")).toBe(false);
  });

  it("should return false if receives null", () => {
    expect(isNumber(null)).toBe(false);
  });
});
