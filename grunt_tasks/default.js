module.exports = function(grunt) {
    grunt.registerTask('default', '', [
        'clean',
        'compile',
        'copy:css',
        //'connect',
        'watch'
    ]);
};
