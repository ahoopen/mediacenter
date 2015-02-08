module.exports = function(grunt) {
    grunt.registerTask('default', '', [
        'clean',
        'compile',
        'copy:scrollBar',
        //'connect',
        'watch'
    ]);
};
