# AEM Front

Work in progress.

1. Create a package.json with the following content:

```
{
  "name": "frontend-tools",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "config": {
    "path_to_watch": "../informatica-com-aem/"
  },
  "scripts": {
    "start": "node node_modules/aem-front/bin/aem-front"
  },
  "author": "Kevin Weber",
  "license": "",
  "dependencies": {
    "aem-front": "0.0.4"
  }
}
```

2. Run `npm install`
3. Run `npm start` whenever you want to use this.

Use the corresponding Chrome extension to make BrowserSync working on relevant `localhost:4502` page: https://github.com/kevinweber/aem-productivity-tools