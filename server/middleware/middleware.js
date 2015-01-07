/* globals require, module */
var logger = require('./logger');

module.exports = function (app) {
    app.use(logger);
};
