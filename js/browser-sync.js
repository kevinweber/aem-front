var browserSync = require('browser-sync');

var create = (args) => {
  // Documentation: https://www.browsersync.io/docs/options
  var options = {
    notify: false,
    open: false
  }
  
  browserSync.create(args.name);
  browserSync.init(options, function (unknown, data) {
    // Callback:
    //    console.log(data.options.get("urls").get("ui"));
    //    console.log(data.options.get("urls").get("ui-external"));
  });
}

var reload = (args) => {
  console.log("Reloading browsers.");
  // Documentation: https://www.browsersync.io/docs/api#api-reload
  browserSync.reload(args.name);
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    create: create,
    reload: reload
  };
}