# AEM Front

AEM Front speeds up development in AEM significantly. It combines AEMSync with BrowserSync, and also works together with the AEM Front Extension for Google Chrome so you don't have to manually inject the BrowserSync script into your code base.

## Installation

```
npm install aem-front -g
```

## Usage

```
aem-front
```

You can also specify one or multiple of the following options:

```
-w: Folder to watch; default is current.
-t: Comma separated list of target hosts; default is http://admin:admin@localhost:4502.
-e: Anymatch exclude filter; any file matching the pattern will be skipped.
-o: Browser page to be opened after successful launch; default is "false".
-b: Browser where page should be opened in; this parameter is platform dependent; for example, Chrome is "google chrome" on OS X, "google-chrome" on Linux and "chrome" on Windows; default is "google chrome".
-i: Update interval in milliseconds; default is 100.
-v: Display version of AEM Front.
```

If you want to specify a path to watch (`-w`), a folder to exclude (`-e`) and increase the update interval (`-i`), it could look like this:

```
aem-front -w "./../sibling/my_project" -e "**/webpack.module/**" -i "500"
```

## Requirements

- NodeJS and NPM
- Required if you want to use the corresponding Chrome extension: Chrome Browser

## Step-by-step guide

1. If you do not have Node and NPM installed, in command line run:

```
sudo brew install node
sudo npm install npm -g
```

2. Install AEM Front by running:

```
npm install aem-front -g
```

3. Run the command listed in the "Usage" section in your terminal from a folder where you want to watch file changes. But you can basically run it from anywhere as long as you pass the correct path with the `-w` option.

4. After successfully starting this script, you can/should install the corresponding Chrome extension. The script injects the required BrowserSync script automatically into your website and comes with a few handy configuration options. But you can also past the BrowserSync script into your website manually. You can install the extension directly from the Chrome app store: https://chrome.google.com/webstore/detail/cmpbphecgagbhhociicpakhddeagjlih


Thanks to the [BrowserSync](https://www.npmjs.com/package/browser-sync) team and to [gavoja](https://github.com/gavoja) for [aemsync](https://www.npmjs.com/package/aemsync).
