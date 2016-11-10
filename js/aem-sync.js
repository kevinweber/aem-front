const path = require('path');
const fs = require('graceful-fs');
const opn = require('opn');
const minimist = require('minimist');

const aemsync = require('aemsync');
const Watcher = aemsync.Watcher;
const Pusher = aemsync.Pusher;

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
  -i sync_interval     Update interval; default is 300ms
  -o open_page         Browser page to be opened after successful launch; if set to "false", no page will open
  -b browser           Browser where page should be opened in; this parameter is platform dependent; for example, Chrome is "google chrome" on OS X, "google-chrome" on Linux and "chrome" on Windows; default is "google chrome"
  -h                   Displays this screen`;

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

  let workingDir = path.resolve(args.w || ".");
  let targets = args.t || "http://admin:admin@localhost:4502";
  let pushInterval = args.i || 300;
  let exclude = args.e || "";
  let startPage = args.o || "http://kevinw.de/aem-front-status/?utm_source=AEMFront&utm_medium=npm&utm_campaign=AEM";
  let startBrowser = args.browser || "google chrome";


  // Overview ANSI color codes: http://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html
  if (!fs.existsSync(workingDir)) {
    console.log('\x1b[36m', 'Invalid path:', workingDir, '\x1b[0m');
    return;
  }

  console.separate();
  console.log("Working dir:", workingDir);
  console.log("Targets:", targets);
  console.log("Interval:", pushInterval);
  console.log("Exclude:", exclude);
  console.separate();

  let pusher = new Pusher(targets.split(','), pushInterval, reloadBrowser);
  let watcher = new Watcher();

  // Initialize queue processing
  pusher.start()

  // Watch over workingDir
  watcher.watch(workingDir, exclude, (localPath) => {
    // Add item to Pusher's queue when a change is detected
    pusher.enqueue(localPath);
  })

  if (startPage !== false && startPage !== "false") {
    opn(startPage, {
      app: startBrowser
    });
  }

  console.separate();
  console.log("NOTE: To check if you're using the most up-to-date version of the corresponding AEM Front browser extension, go to http://kevinw.de/aem-front-status/");
  console.separate();
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    init: init
  };
}
