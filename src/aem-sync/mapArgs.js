const path = require("path");
const aemsyncDefaults = require("aemsync/src/defaults");

const mapArgs = (args = {}) => {
  const targets = args.t
    ? typeof args.t === "string"
      ? [...args.t.split(",")]
      : args.t
    : aemsyncDefaults.targets;

  const exclude = args.e
    ? typeof args.e === "string"
      ? [...args.e.split(",")]
      : args.e
    : aemsyncDefaults.exclude;

  return {
    workingDir: path.resolve(args.w || aemsyncDefaults.workingDir),
    targets,
    browserSyncTarget: targets[0],
    interval: args.i || 100,
    packmgrPath: args.u || aemsyncDefaults.packmgrPath,
    exclude,
    startPage: args.o || false,
    startBrowser: args.browser || "google chrome"
  };
};

module.exports = mapArgs;
