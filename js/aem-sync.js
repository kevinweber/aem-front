const path = require('path');
const fs = require('graceful-fs');

const aemsync = require('aemsync');
const Watcher = aemsync.Watcher;
const Pusher = aemsync.Pusher;

const browserSync = require('./browser-sync.js');
require('./browser-sync.js').create({
  name: 'aem-sync'
});

//// Command line options currently not supported!
//const MSG_HELP = `Usage: node index.js -- [OPTIONS]
//Options:
//  -t targets           Default is http://admin:admin@localhost:4502
//  -w path_to_watch     Default is parent
//  -e exclude_filter    Anymach exclude filter; disabled by default
//  -i sync_interval     Update interval; default is 300ms
//  -d                   Enable debug mode
//  -h                   Displays this screen`;

var reloadBrowser = () => {
  browserSync.reload({
    name: 'aem-sync'
  });
}

/*
 * 1. npm_package_config_<key> can be set in package.json (https://docs.npmjs.com/files/package.json#config)
 * 2. npm_config_<key> can be set using git config command (https://docs.npmjs.com/cli/config)
 */
var getConfig = (key, defaultValue) => {
  var value;

  value = process.env["npm_package_config_" + key] || process.env["npm_config_" + key] || defaultValue;

  return value;
}

var aemSync = () => {
  'use strict';

  let args = {
    w: getConfig("path_to_watch", ".."),
    t: getConfig("targets", "http://admin:admin@localhost:4502"),
    i: getConfig("sync_interval", 300),
    e: getConfig("exclude_filter", "")
  };

  //  // Show help.
  //  if (args.h) {
  //    console.log(MSG_HELP);
  //    return;
  //  }

  // Get other args.
  let workingDir = path.resolve(args.w);

  // Overview ANSI color codes: http://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html
  if (!fs.existsSync(workingDir)) {
    console.log('\x1b[36m', 'Invalid path:', workingDir, '\x1b[0m');
    return;
  }

  let targets = args.t
  let pushInterval = args.i
  let exclude = args.e

  console.log("Working dir:", workingDir)
  console.log("Targets:", targets)
  console.log("Interval:", pushInterval)
  console.log("Exclude:", exclude)

  let pusher = new Pusher(targets.split(','), 600, reloadBrowser)
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

aemSync();