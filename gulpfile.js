var gulp = require('gulp');
var exec = require('child_process').exec;
var gls = require('gulp-live-server');
wait = require('gulp-wait');

gulp.task('default', ['ngBuild'], function() {
    console.log('Finished ng build, now starting server.');
    var server = gls.new('./index.js');
    return server.start();
});

gulp.task('ngBuild', function(){
    process.chdir('client');
    exec('ng build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        //cb(err);
    });
    process.chdir('../');
});