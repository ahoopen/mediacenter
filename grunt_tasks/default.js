module.exports = function(grunt) {
    grunt.registerTask('default', '', [
        'clean',
        'compile',
        'copy:vendor',
        'copy:scrollBar',
        //'connect',
        'watch'
    ]);
};
