import getUrlFormatArray from "../js/lib/getUrlFormatArray";

const mockUrlFormat = "/:version/api/:collection/:id";
const mockUrlFormatArrayResult = ["version", undefined, "collection", "id"];

describe("getUrlFormatArray function", () => {
  it("should return a desired result", () => {
    expect(getUrlFormatArray(mockUrlFormat)).toEqual(mockUrlFormatArrayResult);
  });

  it("should return type Array", () => {
    expect(getUrlFormatArray(mockUrlFormat)).toBeInstanceOf(Array);
  });
});
