module.exports = function (grunt) {
    grunt.registerTask('compile', 'Build project', [
        'requirejs',
        'sass',
        'autoprefixer'
    ]);
};
