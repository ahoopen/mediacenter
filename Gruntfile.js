'use strict';

module.exports = function (grunt) {

    // load grunt tasks
    require('load-grunt-tasks')(grunt);

    // register grunt tasks
    grunt.loadTasks('./grunt_tasks');

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env
    };

    grunt.util._.extend(config, loadConfig('./grunt_tasks/options/'));
    grunt.initConfig(config);
};

//
// Load grunt tasks options
//
function loadConfig(path) {
    var glob = require('glob'),
        object = {},
        key;

    glob.sync('*', {cwd: path}).forEach(function (option) {
        key = option.replace(/\.js$/, '');
        object[key] = require(path + option);
    });

    return object;
}