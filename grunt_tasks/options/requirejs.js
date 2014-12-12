/*globals module*/
module.exports = {
    delivery: {
        options: {
            baseUrl: './client/js',
            mainConfigFile: './client/js/config.js',
            name: 'config',
            optimize: 'uglify2',
            useStrict: true,
            skipDirOptimize: false,
            preserveLicenseComments: true,
            include: [
                'dst',
                'dust',
                'text'
            ],
            out: 'target/js/mediacenter.min.js'
        }
    }
};
