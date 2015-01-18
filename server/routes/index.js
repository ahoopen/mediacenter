/* globals require, module */

var shows = require('./Show'),
    base = require('./Base'),
    episodes = require('./Episode');

module.exports = function (app) {
    shows(app);
    episodes(app);
    base(app);
};
