const path = require('path');
const fs = require('graceful-fs');
const opn = require('opn');
const minimist = require('minimist');

const packageInfo = require('./../package.json');

const browserSync = require('./browser-sync.js');

const aemsync = require('aemsync');
const Watcher = aemsync.Watcher;
const Pipeline = aemsync.Pipeline;

const ANSI_COLOR_CYAN = '\x1b[36m';
const ANSI_COLOR_RESET = '\x1b[0m';

console.separate = () => {
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

let reloadBrowser = () => {
  browserSync.reload({
    name: 'aem-sync'
  });
};

let init = () => {
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

  let workingDir = path.resolve(args.w || '.');
  let targets = (args.t || 'http://admin:admin@localhost:4502').split(',')
  let interval = args.i || 100;
  let packmgrPath = args.u;
  let exclude = args.e || '';
  let startPage = args.o || false;
  let startBrowser = args.browser || 'google chrome';

  if (targets.length > 1) {
    console.log(`You've provided multiple targets. Only the first one is used by BrowserSync.`);
    return;
  }

  browserSync.create({
    name: 'aem-sync',
    proxy: targets[0]
  });

  // Overview ANSI color codes: http://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html
  if (!fs.existsSync(workingDir)) {
    console.log(ANSI_COLOR_CYAN, 'Invalid path:', workingDir, ANSI_COLOR_RESET);
    return;
  }

  console.separate();
  console.log('Working dir:', workingDir);
  console.log('Targets:', targets);
  console.log('Interval:', interval);
  console.log('Exclude:', exclude);
  console.separate();

  // Reload browser once files are pushed to AEM instance
  let onPushEnd = reloadBrowser;
  aemsync({
    workingDir,
    targets,
    interval,
    exclude,
    packmgrPath,
    onPushEnd
  });

  if (startPage !== false && startPage !== 'false') {
    opn(startPage, {
      app: startBrowser
    });
  }

  console.separate();
  console.log(`NOTE: AEM Front can work together with the corresponding Chrome browser extension. To check if you're using the most up-to-date version, go to ${ANSI_COLOR_CYAN}https://kevinw.de/aem-front-status/${ANSI_COLOR_RESET}. But you can also use AEM Front without extension by adding the code snippet displayed below into your website manually.`);
  console.separate();
  console.log('\n');
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    init: init
  };
}
