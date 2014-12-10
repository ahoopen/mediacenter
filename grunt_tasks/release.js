module.exports = function (grunt) {
    grunt.registerTask('release', 'release project', [
        'clean',
        'compile',
        'uglify',
        'cssmin'
        //'jshint'
    ]);
};
