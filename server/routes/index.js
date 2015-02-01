/* globals require, module */

var shows = require('./Show'),
    base = require('./Base'),
    episodes = require('./Episode'),
    list = require('./List');

module.exports = function (app) {
    shows(app);
    episodes(app);
    list(app);
    base(app);
};
