"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");

gulp.task("style", function() {
    var prefixer = [autoprefixer({browsers: ["last 2 version"]})];

    gulp.src("sass/style.scss")
    	.pipe(plumber())
        .pipe(sass())
        .pipe(postcss(prefixer))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
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

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(fn) {
  run("clean", "copy", "style", fn);
});
