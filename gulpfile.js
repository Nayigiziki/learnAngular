var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var nodemon = require('gulp-nodemon');

gulp.task('build', function() {
    return gulp.src('src/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src'));
});


gulp.task('watch', function () {
    watch(['src/index.html','src/app/*.js','src/app/**/*.js', 'src/app/**/*.html'], batch(function (events, done) {
        gulp.start('build', done);
    }));
});


gulp.task('start', function () {
    nodemon({
        script: 'server/server.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
})


gulp.task('serve', ['build', 'watch']);