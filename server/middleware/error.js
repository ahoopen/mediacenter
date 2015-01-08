/* globals module */

module.exports = function (err, request, response, next) {
    response.status(err.status || 500);
    response.render('Error', {
        message: err.message,
        error: err
    });
};
