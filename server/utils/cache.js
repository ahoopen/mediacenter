/* globals require */

var fs = require('fs-extra'),
    url = require('url'),
    path = require('path'),
    Promise = require('promise'),
    http = require('http');

/**
 *  Deze klasse zorgt ervoor dat externe afbeeldingen opgeslagen worden in
 *  een cache directory. Daarnaast wordt elke episode geupdate, zodat de afbeelding
 *  verwijst naar de gecachde afbeelding.
 */

var cache = {

    /**
     * Creates the cache directory
     *
     * @param dir
     */
    createDir: function (dir) {
        fs.ensureDir(dir, function (err) {
            if (err) {
                throw err;
            }
        });
    },

    /**
     * Get the filename
     *
     * @param file
     * @returns {string}
     */
    getFileName: function (file) {
        var pathname = url.parse(file).pathname,
            filename = pathname.split("/").pop();

        return filename;
    },

    /**
     * Saves external media image to the cache directory
     *
     * @param folder
     * @param file
     * @returns {Promise}
     */
    save: function (folder, file) {
        var self = this;

        return new Promise( function(resolve, reject) {
            var dir = path.resolve('./../../cache/' + folder.toString().replace(/ /g, "-")),
                filePath = dir + '/' + self.getFileName(file),
                cachePath = "/" + folder.toString().replace(/ /g, "-") + '/' + self.getFileName(file);

            // garandeer dat de directory bestaat.
            // maak de directory aan indien deze nog niet bestaat, anders doe niks.
            self.createDir(dir);

            // get the image and write it to the cache folder
            http.get(file, function (response) {
                var imagedata = '';

                response.setEncoding('binary');
                response.on('data', function (chunk) {
                    imagedata += chunk;
                });

                response.on('end', function () {
                    fs.writeFile(filePath, imagedata, 'binary', function (err) {
                        if (err) {
                            reject(err);
                        }

                        resolve({path: cachePath });
                    });
                });
            });
        });
    },

    /**
     * Deletes the cache dir
     *
     * @param dir
     * @returns {Promise}
     */
    remove: function (dir) {
        return new Promise(function (resolve, reject) {
            var dirPath = path.resolve('./../../cache/' + dir + '/');
            fs.remove(dirPath, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }
};

module.exports = cache;


