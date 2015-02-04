module.exports = function() {
    var app = './app/';
    var config = {
        path: {
            alljs: [
                app + '**/*.js',
                './*.js'
            ],
            app: app,
            js:[
                app + 'app.js',
                app + '**/*.js',
                '!' + app + '**/*spec.js'
            ],
            index: app + 'index.html',
            sass: app + 'styles/**/*.scss',
            temp: './.tmp/'
        },
        vendor: {
            autoprefixerBrowsers: [
            'last 2 version',
            '> 5%'
            ],
            bower: {
                json: require('./bower.json'),
                directory: './bower_components/',
                ignorePath: '../..'
            }
        }
    };

    config.vendor.getWiredepOptions = function() {
        var options = {
            bowerJson: config.vendor.bower.json,
            directory: config.vendor.bower.directory,
            ignorePath: config.vendor.bower.ignorePath
        };
        return options;
    };

    return config;
};
