/* globals require */

var fs = require('fs-extra'),
    url = require('url'),
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
            var dir = 'cache/' + folder.toString().replace(/ /g, "-"),
                filePath = dir + '/' + self.getFileName(file);

            // garandeer dat de directory bestaat.
            // maak de directory aan indien deze nog niet bestaat, anders doe niks.
            self.createDir(dir);

            // haal de afbeelding op en schrijf hem weg naar de cache.
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

                        // public prefix verwijderen van het path.
                        var paths = filePath.split('/');
                        paths.shift();

                        resolve({path: paths.join('/')});
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
            fs.remove('public/cache/' + dir + '/', function (err) {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }
};

module.exports = cache;


