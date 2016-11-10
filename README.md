# AEM Front

_Work in progress. Things may change drastically._

### Installation

```
npm install aem-front -g
```

### Usage

In your command line:

    ```
    aem-front -w path_to_watch -t targets

    -w: Folder to watch; default is current.
    -t: Comma separated list of target hosts; default is http://admin:admin@localhost:4502.
    -e: Anymatch exclude filter; any file matching the pattern will be skipped.
    -o Browser page to be opened after successful launch. If set to "false", no page will open.
    -b Browser where page should be opened in; this parameter is platform dependent; for example, Chrome is "google chrome" on OS X, "google-chrome" on Linux and "chrome" on Windows; default is "google chrome".
    -i: Update interval in milliseconds; default is 100.
    ```

    ```
    aem-front -w ~/workspace/my_project
    ```

### Requirements
- NodeJS and NPM
- Chrome Browser

### Step-by-step guide
1. If you do not have Node and NPM installed, in command line run:

    ```
    sudo brew install node
    sudo npm install npm -g
    ```

2. Install AEM Front by running:

    ```
    npm install aem-front -g
    ```

3. Run the command listed in the "Usage" section in your terminal from a folder where you want to watch file changes. But you can basically run it from anywhere as long as you pass the correct path with the "-w" option.

4. After successfully starting this script, a page will open in Chrome allowing you to install the corresponding Chrome extension. The extension is required to make BrowserSync working. You can also install the extension directly from the Chrome app store: https://chrome.google.com/webstore/detail/cmpbphecgagbhhociicpakhddeagjlih


Thanks to the [BrowserSync](https://www.npmjs.com/package/browser-sync) team and to [gavoja](https://github.com/gavoja) for [aemsync](https://www.npmjs.com/package/aemsync).
