module.exports = {

    options: {
        keepSpecialComments: '0',
        report: 'gzip'
    },

    minify: {
        expand: true,
        cwd: 'release/',
        src: ['easydelivery.css', '!*.min.css'],
        dest: 'release/css',
        ext: '.min.css'
    }
};
