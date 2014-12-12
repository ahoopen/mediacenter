module.exports = {

    options: {
        keepSpecialComments: '0',
        report: 'gzip'
    },

    minify: {
        expand: true,
        cwd: 'target/',
        src: ['mediaplayer.css', '!*.min.css'],
        dest: 'target/css',
        ext: '.min.css'
    }
};
