const { src, dest, watch } = require("gulp");
const uglify = require("gulp-uglify");
const gulpBabel = require("gulp-babel");
const sass = require("gulp-sass");
const browserSync = require('browser-sync').create();
const cssnano = require("gulp-cssnano");

function browserSyncInit() {
    return browserSync.init({
        server: {
            baseDir: './'
        },
    })
}

function scripts() {
    return src('./app/js/*.js')
        .pipe(gulpBabel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest('./output/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

function styles() {
    return src('./app/css/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(dest('./output/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
}

function watchFiles() {
    scripts();
    styles();
    browserSyncInit();
    watch("./app/js", scripts);
    watch("./app/css", styles);
}

exports.default = watchFiles;