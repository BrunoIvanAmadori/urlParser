const { isNumber } = require("./isNumber.js");

test("isNumber", () => {
  expect(isNumber(122)).toBe(true);
});
