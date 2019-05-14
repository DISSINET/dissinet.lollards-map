import "jest";
import Store from "./../../app/store";

describe("View", () => {
  beforeEach(async () => {});

  afterEach(async () => {});

  const store = new Store();
  test("store should initialize", async () => {
    expect(typeof store).toBe("object");
  });
  test("map center should change center", async () => {
    store.mapMoved([10, 10], 5, []);
    expect(store.center).toStrictEqual([10, 10]);
  });
  test("map center should change zoom", async () => {
    store.mapMoved([10, 10], 5, []);
    expect(store.zoom).toBe(5);
  });
});
