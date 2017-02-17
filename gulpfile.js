"use strict";

var config = require('./config'),
    gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    clip = require('gulp-clip-empty-files'),
    jade = require('gulp-jade'),
    tscript = require('gulp-typescript'),
    connect = require('gulp-connect');

const del = require("del");

gulp.task('default', ['jade', 'managejs', 'scssToCss', 'typescript', 'fonts', 'watch', 'connect']);

gulp.task('jade', function(){
  gulp.src(config.jadeConfig.path.in)
  .pipe(jade({pretty: true}))
  .pipe(gulp.dest(config.jadeConfig.path.out))
  .pipe(connect.reload());
});

gulp.task('scssToCss',function(){
    gulp.src(config.scssConfig.path.in)
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: config.scssConfig.options.includePaths }).on('error', function (e) {
            console.log(e + "\r\n There\'s something wrong with Typescript file(s)")
    }))
    .pipe(sourcemaps.write(config.scssConfig.path.map))
    .pipe(clip())
    .pipe(gulp.dest(config.scssConfig.path.out))
    .pipe(connect.reload());
});
/**Js Dependencies */
gulp.task('managejs', function () {
    gulp.src(config.holderjs.path.in + 'holder.js')
        .pipe(gulp.dest(config.holderjs.path.out));
});
gulp.task('typescript', function () {
    gulp.src(config.typescriptConfig.path.in)
        .pipe(tscript().on('error', function (e) {
            console.log(e + "\r\n There\'s something wrong with Typescript file(s)")
        }))
        .pipe(gulp.dest(config.typescriptConfig.path.out))
        .pipe(connect.reload());
});
gulp.task('fonts', function () {
    gulp.src(config.fonts.path.in)
        .pipe(gulp.dest(config.fonts.path.out));
});
gulp.task('watch', function () {
    gulp.watch([config.jadeConfig.path.in], ['jade']);
    gulp.watch([config.scssConfig.path.watch], ['scssToCss']);
});

gulp.task('connect', function () {
    connect.server({
        root: './',
        port: 8888,
        livereload: true
    });
});

/**Production */
gulp.task('dist',['minifyAllCss']);

gulp.task('minifyAllCss', function () {
    del([config.dist.cssFiles]).then(paths => {
        console.log('Deleted CSS files in dist', paths.join('\n'));
        gulp.src(config.dist.cssPath.in)
            .pipe(minifyCss({ compatibility: 'ie8' }))
            .pipe(rename(function (path) {
                path.basename += ".min";
                return path;
            }))
            .pipe(gulp.dest(config.dist.cssPath.out));
    });
});
 



