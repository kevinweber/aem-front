# AEM Front

Work in progress. Things might change drastically.

1. Create a package.json with the following content:

```
{
  "name": "frontend-tools",
  "version": "1.0",
  "description": "",
  "main": "index.js",
  "config": {
    "aem_front__path_to_watch": "../project-directory/"
  },
  "scripts": {
    "sync": "node node_modules/aem-front/bin/aem-front"
  },
  "author": "Kevin Weber",
  "license": "",
  "dependencies": {
    "aem-front": "^0.0.7"
  }
}
```

2. Make sure that the "path_to_watch" points to your AEM folder, and that under dependencies you're using the latest version of this module.
3. Run `npm install`
4. Run `npm run sync` whenever you want to use this.

Important: After successfully starting this script, a page will open in Chrome allowing you to install the corresponding Chrome extension. The extension is required to make BrowserSync working. You can also install the extension directly from the Chrome app store: https://chrome.google.com/webstore/detail/cmpbphecgagbhhociicpakhddeagjlih