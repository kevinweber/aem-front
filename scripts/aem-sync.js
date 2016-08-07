const minimist = require('minimist');
const path = require('path');
const fs = require('graceful-fs');

const aemsync = require('aemsync');
const Watcher = aemsync.Watcher;
const Pusher = aemsync.Pusher;
const exec = require('child_process').exec;

const MSG_HELP = `Usage: node index.js -- [OPTIONS]
Options:
  -t targets           Defult is http://admin:admin@localhost:4502
  -w path_to_watch     Default is current
  -e exclude_filter    Anymach exclude filter; disabled by default
  -i sync_interval     Update interval; default is 300ms
  -d                   Enable debug mode
  -h                   Displays this screen`;


// Documentation: https://www.browsersync.io/docs/command-line#reload
//  # Reload assuming standard address of http://localhost:3000
//  $ browser-sync reload
//
//  # Reload assuming standard address of http://localhost:3000
//  $ browser-sync reload --port 4000 --files="*.css"
//
//  # Reload assuming standard address of http://localhost:3000
//  $ browser-sync reload --url https://localhost:3000 --files="*.css"
var cmdReloadBrowser = 'browser-sync reload';

var aemBrowserSyncReload = function () {
  // Manually trigger browser reload
  exec(cmdReloadBrowser, function (error, stdout, stderr) {
    if (error) {
      console.log(error);
    }
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
  });
}

var aemSync = function () {
  'use strict';

  let args = minimist(process.argv.slice(2));

  // Show help.
  if (args.h) {
    console.log(MSG_HELP);
    return;
  }

  // Get other args.
  let workingDir = path.resolve(args.w ? args.w : '.');

  // Overview ANSI color codes: http://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html
  if (!fs.existsSync(workingDir)) {
    console.log('\x1b[36m', 'Invalid path:', workingDir, '\x1b[0m');
    return;
  }

  let targets = args.t ? args.t : 'http://admin:admin@localhost:4502'
  let pushInterval = args.i ? args.i : 300
  let exclude = args.e ? args.e : ''

  console.log("Working dir:", workingDir)
  console.log("Targets:", targets)
  console.log("Interval:", pushInterval)
  console.log("Exclude:", exclude)

  let pusher = new Pusher(targets.split(','), 600, aemBrowserSyncReload)
  let watcher = new Watcher()

  // Initialize queue processing.
  pusher.start()

  // Watch over workingDir.
  watcher.watch(workingDir, exclude, (localPath) => {
    // Add item to Pusher's queue when a change is detected.
    pusher.enqueue(localPath)
  })

}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = aemSync;
}