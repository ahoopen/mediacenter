/*globals module*/
module.exports = {
    options: {
        baseUrl: './client/js',
        mainConfigFile: './client/js/config.js',
        name: 'config',
        optimize: 'uglify2',
        useStrict: true,
        skipDirOptimize: true,
        preserveLicenseComments: false,
        out: 'target/js/raspberry-pi.min.js',
        include: ["dst", "dust", "text"],
        excludeShallow: []
        //paths: '<%= pkg.requirejs.paths %>'
    }
};
