"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();

gulp.task("style", function() {
    var prefixer = [autoprefixer({browsers: ["last 2 version"]})];

    gulp.src("sass/style.scss")
    	.pipe(plumber())
        .pipe(sass())
        .pipe(postcss(prefixer))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task("serve", ["style"], function() {
    browserSync.init({
        server: ".",
        notify: false,
 		open: true,
		cors: true,
		ui: false
    });

    gulp.watch("sass/**/*{.scss,sass}", ["style"]);
    gulp.watch("*.html").on("change", browserSync.reload);
});
