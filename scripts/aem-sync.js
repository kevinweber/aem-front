const minimist = require('minimist');
const path = require('path');
const fs = require('graceful-fs');

const aemsync = require('aemsync');
const Watcher = aemsync.Watcher;
const Pusher = aemsync.Pusher;

const browserSync = require('./browser-sync.js');
require('./browser-sync.js').create({ name: 'aem-sync' });

const MSG_HELP = `Usage: node index.js -- [OPTIONS]
Options:
  -t targets           Defult is http://admin:admin@localhost:4502
  -w path_to_watch     Default is current
  -e exclude_filter    Anymach exclude filter; disabled by default
  -i sync_interval     Update interval; default is 300ms
  -d                   Enable debug mode
  -h                   Displays this screen`;



var aemBrowserSyncReload = () => {
  browserSync.reload({ name: 'aem-sync' });
}

var aemSync = () => {
  'use strict';

  let args = minimist(process.argv.slice(2));

  // Show help.
  if (args.h) {
    console.log(MSG_HELP);
    return;
  }

  // Get other args.
  let workingDir = path.resolve(args.w ? args.w : '..');

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

aemSync();