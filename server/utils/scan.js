/* globals require */

var path = require('path'),
    fs = require('fs'),
    async = require('async');

var getFiles = function (dir, extensions, callback) {

    fs.readdir(dir, function (err, files) {
        var returnFiles = [];

        async.each(files, function (file, next) {
            var filePath = dir + '/' + file;

            // exclude hidden directories.
            if( isUnixHiddenPath(filePath) ) {
                next();
            } else {
                fs.stat(filePath, function (err, stat) {
                    if (err) {
                        return next(err);
                    }

                    if (stat.isDirectory()) {
                        getFiles(filePath, extensions, function (err, results) {
                            if (err) {
                                return next(err);
                            }

                            returnFiles = returnFiles.concat(results);
                            next();
                        });
                    } else if (stat.isFile()) {
                        extensions.forEach(function (extension) {
                            if (file.indexOf(extension, file.length - extension.length) !== -1) {
                                returnFiles.push({filename: file, location: filePath});
                            }
                        });

                        next();
                    }
                });
            }
            // error callback
        }, function (err) {
            callback(err, returnFiles);
        });
    });
};

/**
 * Checks whether a path starts with or contains a hidden file or a folder.
 * @param {string} source - The path of the file that needs to be validated.
 * returns {boolean} - `true` if the source is blacklisted and otherwise `false`.
 */
var isUnixHiddenPath = function (path) {
    return (/(^|.\/)\.+[^\/\.]/g).test(path);
};

module.exports = getFiles;
