module.exports = {

    options: {
        includePaths : ['public/components/sass-list-maps'],
        outputStyle : 'expanded',
        precision : 3
    },
    dist: {
        files: {
            'release/easydelivery.css' : 'scss/base.scss'
        }
    }
};
