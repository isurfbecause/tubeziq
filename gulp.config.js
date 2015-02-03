module.exports = function() {
    var app = './app/';
    var config = {
        path: {
            alljs: [
                app + '**/*.js',
                './*.js'
            ],
            sass: app + 'styles/**/*.scss',
            temp: './.tmp'
        },
        vendor: {
            autoprefixerBrowsers: [
            'last 2 version',
            '> 5%'
            ]
        }
    };

    return config;
};
