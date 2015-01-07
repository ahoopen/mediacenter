/* globals require, module */

module.exports = function (request, response, next) {
    console.log("request received: [" + request.method + "] " + request.url);
    next();
};
