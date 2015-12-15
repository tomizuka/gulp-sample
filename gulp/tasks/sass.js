var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify'),
    sass         = require('gulp-ruby-sass');
    concat       = require('gulp-concat'),
    sourcemaps    = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minify       = require('gulp-minify-css'),
    config       = require('../config').sass;

gulp.task('sass', function () {
  return sass(config.src, { sourcemap: true })
    .on('error', sass.logError)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(autoprefixer())
    .pipe(minify({ advanced: false }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(config.dest));
});
