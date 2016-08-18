# AEM Front

Work in progress. Things might change drastically.

### Installation

With [npm](http://npmjs.org) do:

```
npm install aem-front -g
```

### Usage

In your commandline:
```
aem-front -w path_to_watch -t targets

-w: Folder to watch; default is current.
-t: Comma separated list of target hosts; default is http://admin:admin@localhost:4502.
-e: Anymatch exclude filter; any file matching the pattern will be skipped.
-o Browser page to be opened after successful launch. If set to "false", no page will open.
-b Browser where page should be opened in; this parameter is platform dependent; for example, Chrome is "google chrome" on OS X, "google-chrome" on Linux and "chrome" on Windows; default is "google chrome".
-i: Update interval; default is 300ms.
```

```
aem-front -w ~/workspace/my_project
```

### Step-by-step guide
1. If you haven't installed Node and npm on your system yet, you can install it like this:
```
sudo brew install node
sudo npm install npm -g
```
2. Install AEM Front by running the command listed in the "Installation" section anywhere in your terminal.
3. Run the command listed in the "Usage" section in your terminal from a folder where you want to watch file changes. But you can basically run it from anywhere as long as you pass the correct path with the "-w" option.
4. After successfully starting this script, a page will open in Chrome allowing you to install the corresponding Chrome extension. The extension is required to make BrowserSync working. You can also install the extension directly from the Chrome app store: https://chrome.google.com/webstore/detail/cmpbphecgagbhhociicpakhddeagjlih


Thanks to the [BrowserSync](https://www.npmjs.com/package/browser-sync) team and to gavoja for [aemsync](https://www.npmjs.com/package/aemsync).