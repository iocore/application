require('babel-register')({
    presets: ["es2015"]
});

if (!global._babelPolyfill) {
    require('babel-polyfill');
}

var ioCore = require('iocore').ioCore;
var constants = require('iocore/core/constants');

var application = new ioCore(
    process.env['IOCORE_ENV'] || constants.ENV_PRODUCTION,
    process.env['IOCORE_CWD'] || process.cwd()
);

// Bootstrap is used for common framework bootstrap process
// Application is framework module too. Everything is framework module or npm third-party modules
// But framework module can also be npm module, it makes things easier to manage
module.exports.Bootstrap = require('./bootstrap').Bootstrap;

// Starting application
application.runCommand('iocore:server:run');
