var gulp = require('gulp');
var exec = require('child_process').exec;
var gls = require('gulp-live-server');
wait = require('gulp-wait');

gulp.task('default', function(){
    process.chdir('client');
    exec('npm install', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        //cb(err);
    });
    exec('ng build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        //cb(err);
    });
    process.chdir('../');
});