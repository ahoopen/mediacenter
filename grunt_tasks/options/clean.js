module.exports = {
    dist: {
        files: [{
            dot: true,
            src: [
                '.tmp',
                'release/*',
                'public/css/*',
                '!release/.git*'
            ]
        }]
    }
};
