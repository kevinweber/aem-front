const fs = require("graceful-fs");
const opn = require("opn");
const minimist = require("minimist");

const packageInfo = require("../../package.json");
const mapArgs = require("./mapArgs");

const browserSync = require("../browser-sync");

const aemsync = require("aemsync");

const Watcher = aemsync.Watcher;
const Pipeline = aemsync.Pipeline;

const ANSI_COLOR_CYAN = "\x1b[36m";
const ANSI_COLOR_MAGENTA = "\x1b[35m";
const ANSI_COLOR_RESET = "\x1b[0m";

const consoleSeparator = () => {
  console.log("---------------------------------------");
};

// Command line options
const MSG_HELP = `Usage: aem-front [OPTIONS]
Options:
  -t targets           Default is http://admin:admin@localhost:4502
  -w path_to_watch     Default is current
  -e exclude_filter    Anymach exclude filter; disabled by default
  -i sync_interval     Update interval in milliseconds; default is 100
  -u packmgr_path      Package manager path; default is /crx/packmgr/service.jsp
  -o open_page         Browser page to be opened after successful launch; default is "false".
  -b browser           Browser where page should be opened in; this parameter is platform dependent; for example, Chrome is "google chrome" on OS X, "google-chrome" on Linux and "chrome" on Windows; default is "google chrome"
  -h                   Displays this screen
  -v                   Displays version of this package`;

const reloadBrowser = browserSyncTarget => (err, host) => {
  if (err) {
    return console.error(`Error when pushing package to ${host}`, err);
  }

  if (browserSyncTarget.includes(host)) {
    browserSync.reload({
      name: "aem-sync"
    });
  }
};

const init = () => {
  "use strict";

  const args = minimist(process.argv.slice(2));

  // Show help
  if (args.h) {
    console.log(MSG_HELP);
    return;
  }

  // Show version
  if (args.v) {
    console.log(packageInfo.version);
    return;
  }

  const {
    workingDir,
    targets,
    browserSyncTarget,
    interval,
    packmgrPath,
    exclude,
    startPage,
    startBrowser
  } = mapArgs(args);

  if (targets.length > 1) {
    consoleSeparator();
    console.log(
      `You've provided multiple targets. BrowserSync only uses the first one: ${browserSyncTarget}`
    );
  }

  browserSync.create({
    name: "aem-sync",
    proxy: browserSyncTarget
  });

  // Overview of ANSI color codes: http://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html
  if (!fs.existsSync(workingDir)) {
    consoleSeparator();
    console.log(
      `Invalid path: ${ANSI_COLOR_CYAN}${workingDir}${ANSI_COLOR_RESET}`
    );
    return;
  }

  consoleSeparator();
  console.log(`
  Watch over: ${ANSI_COLOR_MAGENTA}${workingDir}${ANSI_COLOR_RESET}
     Targets: ${ANSI_COLOR_MAGENTA}${targets}${ANSI_COLOR_RESET}
    Excludes: ${ANSI_COLOR_MAGENTA}${exclude}${ANSI_COLOR_RESET}
    Interval: ${ANSI_COLOR_MAGENTA}${interval}${ANSI_COLOR_RESET}
  `);

  // Reload browser once files are pushed to AEM instance
  const onPushEnd = reloadBrowser(browserSyncTarget);

  aemsync(workingDir, {
    workingDir,
    targets,
    interval,
    exclude,
    packmgrPath,
    onPushEnd
  });

  if (startPage !== false && startPage !== "false") {
    opn(startPage, {
      app: startBrowser
    });
  }

  consoleSeparator();
  console.log(
    `NOTE: It's recommended to use AEM Front together with the corresponding Chrome browser extension. Get it from the official app store: ${ANSI_COLOR_CYAN}https://chrome.google.com/webstore/detail/cmpbphecgagbhhociicpakhddeagjlih${ANSI_COLOR_RESET}. Alternatively, you can use AEM Front without extension by adding a BrowserSync code into your AEM site manually.`
  );
  consoleSeparator();
  console.log("\n");
};

module.exports = {
  init
};
