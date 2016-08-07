# AEM Front

1. Create a package.json with the following content:

```
{
  "name": "frontend-tools",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "config": {
    "path_to_watch": "../project-path/"
  },
  "scripts": {
    "start": "npm-run-all --parallel sync:*",
    "sync:browser": "node node_modules/aem-front/js/browser-sync.js",
    "sync:aem": "node node_modules/aem-front/js/aem-sync.js"
  },
  "author": "Kevin Weber",
  "license": "",
  "dependencies": {
    "aem-front": "0.0.2"
  }
}
```

2. Run `npm install`
3. Run `npm start` whenever you want to use this.

Use this Chrome extension to make BrowserSync working on relevant `localhost:4502` page: https://github.com/kevinweber/aem-productivity-tools