import "jest";
import { bs } from "./shared";
import "puppeteer";

describe("Loads", () => {
  beforeEach(async () => {
    jest.setTimeout(10000);
    await bs.setup();
  });

  afterEach(async () => {
    await bs.teardown();
  });

  test("app loads ", async () => {
    await bs.page.waitForSelector("[data-testid='map-wrapper']");
  });
});
