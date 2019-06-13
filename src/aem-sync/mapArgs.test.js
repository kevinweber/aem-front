const path = require("path");
const mapArgs = require("./mapArgs");

jest.mock("path");
path.resolve.mockImplementation(pathString => pathString);

const defaultConfig = {
  browserSyncTarget: "http://admin:admin@localhost:4502",
  exclude: [
    "**/jcr_root/*",
    "**/@(.git|.svn|.hg|target)",
    "**/@(.git|.svn|.hg|target)/**"
  ],
  interval: 100,
  packmgrPath: "/crx/packmgr/service.jsp",
  startBrowser: "google chrome",
  startPage: false,
  targets: ["http://admin:admin@localhost:4502"],
  workingDir: "."
};

describe("mapArgs", () => {
  it("returns expected default values", () => {
    expect(mapArgs()).toStrictEqual(defaultConfig);
  });

  it("supports multiple `-t` arguments", () => {
    expect(
      mapArgs({
        t: ["targetA", "targetB"]
      })
    ).toHaveProperty("targets", ["targetA", "targetB"]);
  });

  it("supports one `-t` argument with comma-separated values", () => {
    expect(
      mapArgs({
        t: "targetA,targetB"
      })
    ).toHaveProperty("targets", ["targetA", "targetB"]);
  });

  it("supports multiple `-e` arguments", () => {
    expect(
      mapArgs({
        e: ["excludeA", "excludeB"]
      })
    ).toHaveProperty("exclude", ["excludeA", "excludeB"]);
  });

  it("supports one `-e` argument with comma-separated values", () => {
    expect(
      mapArgs({
        e: "excludeA,excludeB"
      })
    ).toHaveProperty("exclude", ["excludeA", "excludeB"]);
  });
});
