module.exports = function (grunt) {
    grunt.registerTask('compile', 'Build project', [
        'browserify',
        'sass',
        'autoprefixer'
    ]);
};
