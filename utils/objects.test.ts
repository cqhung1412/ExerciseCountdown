import objectUtil from "./objects";

describe("isEmpty()", () => {
  it("returns true on empty object", () => {
    const result = objectUtil.isEmpty({});
    expect(result).toBeTruthy();
  });
  it("returns false on non-empty object", () => {
    const result = objectUtil.isEmpty({ isEmpty: false });
    expect(result).toBeFalsy();
  });
  it("returns false on non-object", () => {
    const result = objectUtil.isEmpty("non-object");
    expect(result).toBeFalsy();
  });
});
