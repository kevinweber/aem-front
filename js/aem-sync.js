const path = require('path');
const fs = require('graceful-fs');
const opn = require('opn');
const minimist = require('minimist');

const packageInfo = require('./../package.json');
const aemsync = require('aemsync');
const Watcher = aemsync.Watcher;
const Pusher = aemsync.Pusher;

const ANSI_COLOR_CYAN = '\x1b[36m';
const ANSI_COLOR_RESET = '\x1b[0m';

const browserSync = require('./browser-sync.js');
require('./browser-sync.js').create({
  name: 'aem-sync'
});

console.separate = () => {
  console.log("---------------------------------------");
}

// Command line options
const MSG_HELP = `Usage: aem-front [OPTIONS]
Options:
  -t targets           Default is http://admin:admin@localhost:4502
  -w path_to_watch     Default is current
  -e exclude_filter    Anymach exclude filter; disabled by default
  -i sync_interval     Update interval in milliseconds; default is 100
  -o open_page         Browser page to be opened after successful launch; default is "false".
  -b browser           Browser where page should be opened in; this parameter is platform dependent; for example, Chrome is "google chrome" on OS X, "google-chrome" on Linux and "chrome" on Windows; default is "google chrome"
  -h                   Displays this screen
  -v                   Displays version of this package`;

var reloadBrowser = () => {
  browserSync.reload({
    name: 'aem-sync'
  });
}

var init = () => {
  'use strict';

  let args = minimist(process.argv.slice(2));

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
  let workingDir = path.resolve(args.w || ".");
  let targets = args.t || "http://admin:admin@localhost:4502";
  let pushInterval = args.i || 100;
  let exclude = args.e || "";
  let startPage = args.o || false;
  let startBrowser = args.browser || "google chrome";


  // Overview ANSI color codes: http://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html
  if (!fs.existsSync(workingDir)) {
    console.log(ANSI_COLOR_CYAN, 'Invalid path:', workingDir, ANSI_COLOR_RESET);
    return;
  }

  console.separate();
  console.log("Working dir:", workingDir);
  console.log("Targets:", targets);
  console.log("Interval:", pushInterval);
  console.log("Exclude:", exclude);
  console.separate();

  let pusher = new Pusher(targets.split(','), 600, reloadBrowser);
  let watcher = new Watcher();

  // Initialize queue processing
  pusher.start()

  // Watch over workingDir
  watcher.watch(workingDir, exclude, (localPath) => {
    // Add item to Pusher's queue when a change is detected
    setTimeout(function () {
      pusher.enqueue(localPath);
    }, pushInterval);
  })

  if (startPage !== false && startPage !== "false") {
    opn(startPage, {
      app: startBrowser
    });
  }

  console.separate();
  console.log("NOTE: AEM Front can work together with the corresponding Chrome browser extension. To check if you're using the most up-to-date version, go to " + ANSI_COLOR_CYAN + "http://kevinw.de/aem-front-status/" + ANSI_COLOR_RESET + ". But you can also use AEM Front without extension by adding the code snippet displayed below into your website manually.");
  console.separate();
  console.log("\n");
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    init: init
  };
}
