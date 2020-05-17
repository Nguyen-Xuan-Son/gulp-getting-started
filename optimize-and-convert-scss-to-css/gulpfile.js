const { src, dest } = require("gulp");
const sass = require("gulp-sass");
const cssnano = require('gulp-cssnano');

function optimizePreprocessorCSS() {
    return src('*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(dest('output'));
}

exports.default = optimizePreprocessorCSS;