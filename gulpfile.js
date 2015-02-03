var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var config = require('./gulp.config.js')(); // config file

// Run jscs and jshint
gulp.task('lint', function() {
    log('Linting js');
    gulp.src(config.path.alljs)
    .pipe($.jscs())
    .pipe($.jshint());
});

gulp.task('styles', ['remove-styles'], function() {
    log('Compiling Sass to CSS');
    console.log(config.path.sass);
    return gulp
        .src(config.path.sass)
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: config.vendor.autoprefixerBrowsers}))
        .pipe(gulp.dest(config.path.temp));
});

gulp.task('remove-styles', function(done) {
    var files = config.path.temp + '**/*.css';
    remove(files, done);
});

function remove(path, done) {
    log('Removing ' + path);
    del(path, done);
}

function log(msg) {
    $.util.log($.util.colors.green(msg));
}
