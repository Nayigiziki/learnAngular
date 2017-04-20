var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('build-js', function() {
    return gulp.src('src/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src'));
});

gulp.task('js-watch', ['build-js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    });

    gulp.watch(['src/index.html','src/app/*.js','src/app/**/*.js', 'src/app/**/*.html'], ['js-watch']);
});