/*globals module*/
module.exports = {

    vendor: {
        expand : true,
        cwd : 'client/bower_components/jQuery.mmenu/src/js',
        src: ['jquery.mmenu.min.all.js'],
        dest: 'target/vendor'
    },
    scrollBar: {
        expand : true,
        cwd : 'client/bower_components/malihu-custom-scrollbar-plugin',
        src: ['jquery.mCustomScrollbar.js', 'jquery.mCustomScrollbar.css'],
        dest: 'target/vendor'
    }
};
