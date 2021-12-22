import getHashTable from "../js/lib/getHashTable";

const mockUrlFormat = "/:version/api/:collection/:id";
const mockUrlInstance = "/6/api/listings/3?sort=desc&limit=10";
const mockResult = {
  version: 6,
  collection: "listings",
  id: 3,
  sort: "desc",
  limit: 10,
};

describe("getHashTable function", () => {
  it("should return a specific object", () => {
    expect(getHashTable(mockUrlInstance, mockUrlFormat)).toEqual(mockResult);
  });

  it("should return a result with type object", () => {
    expect(getHashTable(mockUrlInstance, mockUrlFormat)).toBeInstanceOf(Object);
  });
});
