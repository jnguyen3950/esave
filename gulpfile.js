var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var casperJS = require('gulp-casperjs');
var app = require('./server.js');

var exec = require('child_process').exec;
var childNode = exec('node server.js');

var server = '';

gulp.task('mocha', function() {
  return gulp.src('./server.spec.js', {read: false})
  .pipe(mocha());
});

gulp.task('killNode', ['mocha'], function() {
  childNode.kill();
});

gulp.task('default', ['killNode'], function() {
  process.exit(0);
});
