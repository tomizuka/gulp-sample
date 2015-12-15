var gulp   = require('gulp'),
    watch  = require('gulp-watch'),
    config = require('../config').watch;

gulp.task('watch', function () {
    watch(config.js, function () {
        gulp.start(['webpack']);
    });

    watch(config.sass, function () {
        gulp.start(['sass']);
    });

    watch(config.copy, function () {
        gulp.start(['copy']);
    });
});
