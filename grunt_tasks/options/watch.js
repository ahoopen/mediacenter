module.exports = {

    options : {
        livereload : false
    },
    sass : {
        files : 'scss/**/*.scss',
        tasks : ['sass', 'autoprefixer']
    },

    js : {
        files : ['client/js/**/*.js', 'client/js/**/*.dust'],
        tasks : ['jshint', 'requirejs']
    }
};
