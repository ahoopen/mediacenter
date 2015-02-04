/*globals module*/
module.exports = {
    delivery: {
        options: {
            baseUrl: './client/js',
            mainConfigFile: './client/js/config.js',
            name: 'config',
            //optimize: 'uglify2',
            optimize: 'none',
            useStrict: true,
            skipDirOptimize: false,
            preserveLicenseComments: false,
            include: [
                'dst',
                'dust',
                'text'
            ],
            out: 'target/js/mediacenter.min.js'
        }
    }
};
