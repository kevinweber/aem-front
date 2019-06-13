const browserSync = require("browser-sync");

const create = args => {
  // Documentation: https://www.browsersync.io/docs/options
  const options = {
    notify: false,
    open: false,
    proxy: args.proxy
  };

  browserSync.create(args.name);
  browserSync.init(options, function(unknown, data) {
    // Callback:
    //    console.log(data.options.get("urls").get("ui"));
    //    console.log(data.options.get("urls").get("ui-external"));
  });
};

const reload = args => {
  console.log("Reloading browsers.");
  // Documentation: https://www.browsersync.io/docs/api#api-reload
  browserSync.reload(args.name);
};

module.exports = {
  create,
  reload
};
