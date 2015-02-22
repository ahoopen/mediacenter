/* globals require, module */

module.exports = function (request, response, next) {
    logger.info("request received: [" + request.method + "] " + request.url);
    next();
};
