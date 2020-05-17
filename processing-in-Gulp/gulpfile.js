const { src, dest, parallel } = require("gulp");
const uglify = require("gulp-uglify");
const gulpBabel = require("gulp-babel");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");

function scripts() {
    return src('./app/*.js')
        .pipe(gulpBabel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest('./output'));
}

function styles() {
    return src('./app/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(dest('./output'));
}

exports.default = parallel(scripts, styles);