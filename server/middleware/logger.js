/* globals require, module */
var winston = require('winston');

var logger = new (winston.Logger)({
   transports: [
       new (winston.transports.Console)({level: 'debug'}),
       new (winston.transports.File)({ filename: './server/logs/api.log', level: 'debug'})
   ]
});

module.exports = function (request, response, next) {
    logger.info("request received: [" + request.method + "] " + request.url);
    next();
};
