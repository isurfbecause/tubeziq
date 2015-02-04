var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var config = require('./gulp.config.js')(); // config file

gulp.task('wiredep', function() {
    var options = config.vendor.getWiredepOptions();
    var wiredep = require('wiredep').stream;
    return gulp
        .src(config.path.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.path.js)))
        .pipe(gulp.dest(config.path.app));
});

// Run jscs and jshint
gulp.task('lint', function() {
    gulp.src(config.path.alljs)
    .pipe($.jscs())
    .pipe($.jshint());
});

gulp.task('styles', ['remove-styles'], function() {
    log('Compiling Sass to CSS');
    return gulp
        .src(config.path.sass)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: config.vendor.autoprefixerBrowsers}))
        .pipe(gulp.dest(config.path.temp));
});

gulp.task('sass-watcher', function() {
    gulp.watch([config.path.sass], ['styles']);
});

gulp.task('remove-styles', function(done) {
    var files = config.path.temp + '**/*.css';
    remove(files, done);
});

function remove(path, done) {
    log('Removing ' + path);
    del(path, done);
}

function log(msg, color) {
    color = color || 'green';
    $.util.log($.util.colors[color](msg));
}
