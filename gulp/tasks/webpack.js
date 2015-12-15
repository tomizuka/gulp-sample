var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    uglify     = require('gulp-uglify'),
    webpack    = require('gulp-webpack'),
    sourcemaps = require('gulp-sourcemaps'),
    config     = require('../config');

gulp.task('webpack', function () {

  var entryFiles = function ( files ) {
    var sources = [];

    for ( var filename in files ) {
      sources.push(files[filename])
    }

    return sources;
  }(config.webpack.entry);

  gulp.src(entryFiles)
    .pipe(webpack(config.webpack))
    .pipe(sourcemaps.init())
    .pipe(gulpif(config.js.uglify, uglify()))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(config.js.dest));
});
