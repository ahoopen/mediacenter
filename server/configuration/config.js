var path = require('path'),
    rootPath = path.resolve(__dirname + '../..');

/**
 * Expose config
 */

module.exports = {

    database: {
        root: rootPath,
        db: 'mongodb://localhost/mediacenter'
    },

    server: {
        port: 8080
    },

    version: {
        file: "https://raw.github.com/ahoopen/mediacenter/master/package.json"
    },

    /**
     * Configuratie voor het ophalen en installeren van updates
     */
    update: {
        location: "https://codeload.github.com/ahoopen/mediacenter/zip/master",
        // de locatie waar de update naar toe gedownload word
        folder: "./install",
        // bestand waar de update naar toegeschreven word.
        output: "./install/update.zip",
        // de locatie waar de update geinstalleerd word.
        target: "./../"
    },

    schedule: {
        // tijd waarop er gekeken wordt of er een update beschikbaar is.
        update: "04:00"
    },

    metadata: {
        apiKey : 'd086542135ccd8848541b28dfeea5d91',

        folder: "/media/usb/",
        //folder: "/Users/auketenhoopen/Desktop/data/",
        //
        extensions: ['.mkv', '.mp4', '.avi', 'mpeg', 'mov', 'wmv']
    }
};
