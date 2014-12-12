/*globals module*/
module.exports = {
    delivery: {
        options: {
            jshintrc: '.jshintrc',
            force: false,
            globals: {
                jQuery: true
            }
        },
        src: ['client/js/**/*.js']
    }
};
