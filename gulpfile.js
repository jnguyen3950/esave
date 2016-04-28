var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var casperJS = require('gulp-casperjs');
var app = require('./server.js');
var server = '';

gulp.task('mocha', function() {
  return gulp.src('./server.spec.js', {read: false})
  .pipe(mocha());
})

gulp.task('casper', function() {
  gulp.src('casper.spec.js').pipe(casperjs());
})

gulp.task('default', ['mocha'], function() {
  server.close();
})
