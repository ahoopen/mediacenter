module.exports = {

    options: {
        includePaths : ['client/bower_components/sass-list-maps'],
        outputStyle : 'expanded',
        precision : 3
    },
    dist: {
        files: {
            'target/css/mediacenter.css' : 'scss/base.scss'
        }
    }
};
