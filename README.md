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
    "path_to_watch": "../project-directory/"
  },
  "scripts": {
    "sync": "node node_modules/aem-front/bin/aem-front"
  },
  "author": "Kevin Weber",
  "license": "",
  "dependencies": {
    "aem-front": "^0.0.4"
  }
}
```

2. Run `npm install`
3. Run `npm run sync` whenever you want to use this.

Use the corresponding Chrome extension to make BrowserSync working: https://github.com/kevinweber/aem-productivity-tools