module.exports = {

    options : {
        livereload : false
    },
    sass : {
        files : 'scss/**/*.scss',
        tasks : ['sass', 'autoprefixer', 'copy:css']
    },

    js : {
        files : 'public/javascript/**/*.js',
        tasks : ['jshint']
    }
};
