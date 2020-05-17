const { src, dest, watch } = require("gulp");
const uglify = require("gulp-uglify");
const gulpBabel = require("gulp-babel");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");

function scripts() {
    return src('./js/*.js')
        .pipe(gulpBabel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest('./output/js'));
}

function styles() {
    return src('./css/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(dest('./output/css'));
}

function watchFiles() {
    scripts();
    styles();
    watch("./js", scripts);
    watch("./css", styles);
}

exports.default = watchFiles;