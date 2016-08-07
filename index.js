var aemSync = require('./scripts/aem-sync.js');

var init = (function () {
//    browserSync();
  aemSync();
}());

module.exports = {
  init: init
};

aemSync.init;