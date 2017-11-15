let browserSync = require('browser-sync');

let create = (args) => {
  // Documentation: https://www.browsersync.io/docs/options
  let options = {
    notify: false,
    open: false,
    proxy: args.proxy
  };
  
  browserSync.create(args.name);
  browserSync.init(options, function (unknown, data) {
    // Callback:
    //    console.log(data.options.get("urls").get("ui"));
    //    console.log(data.options.get("urls").get("ui-external"));
  });
};

let reload = (args) => {
  console.log("Reloading browsers.");
  // Documentation: https://www.browsersync.io/docs/api#api-reload
  browserSync.reload(args.name);
};

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    create: create,
    reload: reload
  };
}