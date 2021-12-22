import hashTableToString from "../js/lib/hashTableToString";
import getHashTable from "../js/lib/getHashTable";
const mockUrlFormat = "/:version/api/:collection/:id";
const mockUrlInstance = "/6/api/listings/3?sort=desc&limit=10";

const mockResult = `{
  version: 6,
  collection: "listings",
  id: 3,
  sort: "desc",
  limit: 10
}`;

describe("hashTableToString function", () => {
  it("should return a string when a hashTable is provided", () => {
    expect(
      typeof hashTableToString(getHashTable(mockUrlInstance, mockUrlFormat))
    ).toBe("string");
  });

  it("should return a specific string when provided with the mock", () => {
    expect(
      hashTableToString(getHashTable(mockUrlInstance, mockUrlFormat))
    ).toEqual(mockResult);
  });
});
