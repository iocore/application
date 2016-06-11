var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var babel = require('gulp-babel');
var notify = require('gulp-notify');
var shell = require('gulp-shell');
var spawn = require('child_process').spawn,
    application;


var applicationWatch = [
    './src/*.es6',
    './src/**/*.es6',
    './src/**/**/*.es6',
    './src/**/**/**/*.es6'
];

/**
 * Application modules processing
 */
gulp.task('es6-compile', function() {
    return gulp.src(applicationWatch)
    .pipe(babel({
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest('./src'));
});

/**
 * All the ES6 file compilations
 */
gulp.task('babel', gulpsync.sync(['es6-compile']));

/**
 * Listening to the server
 */
gulp.task('server', function() {
    if (application) {
        application.kill();
    }
    application = spawn('./node_modules/.bin/iocore', ['iocore:server:run', process.argv[2]], {stdio: 'inherit'});
    application.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

/**
 * Watching for changes, recompiling files and restarting server
 */
gulp.task('watch', function() {
    return gulp.watch(applicationWatch, gulpsync.sync(['babel', 'server', 'watch']));
});

gulp.task('default', gulpsync.sync(['babel', 'server', 'watch']));

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (application) {
        application.kill()
    }
});
