const { src, dest, watch, series, parallel } = require("gulp");
const uglify = require("gulp-uglify");
const gulpBabel = require("gulp-babel");
const gulpImage = require("gulp-image");
const useref = require('gulp-useref');
const cssnano = require("gulp-cssnano");
const gulpIf = require('gulp-if');
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const del = require('del');

const paths = {
    fonts: {
        src: 'app/fonts/*.otf',
        dest: 'output/fonts/'
    },
    images: {
        src: 'app/images/*.jpg',
        dest: 'output/images/'
    },
    stylesConvert: {
        src: 'app/scss/*.scss',
        dest: 'app/css/'
    },
    styles: {
        src: 'app/css/*.css',
        dest: 'output/css/'
    },
    scripts: {
        src: 'app/js/*.js',
        dest: 'output/js/'
    },
    output: 'output'
};

function clean() {
    return del([paths.output]);
}

function browserSyncInit() {
    console.log("browserSyncInit");
    return browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
}

function stylesConvert() {
    return src(paths.stylesConvert.src)
        .pipe(sass())
        .pipe(dest(paths.stylesConvert.dest));
}

function dev() {
    clean();
    series(stylesConvert, parallel(browserSyncInit, userefTasks))();
    watch(paths.stylesConvert.src, series(stylesConvert, userefTasks));
    watch(paths.scripts.src, userefTasks);
}

function userefTasks() {
    return src('app/*.html')
        .pipe(useref())
        .pipe(browserSync.reload({
            stream: true
        }));
};

function optimizeJSAndCss() {
    return src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', gulpBabel({
            presets: ['@babel/env']
        })))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(dest(paths.output));
}

function fonts() {
    return src(paths.fonts.src)
        .pipe(dest(paths.fonts.dest));
}

function optimizeImages() {
    return src(paths.images.src)
        .pipe(gulpImage())
        .pipe(dest(paths.images.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
}

const pro = series(clean, stylesConvert, parallel(optimizeJSAndCss, fonts, optimizeImages));

exports.clean = clean;
exports.dev = dev;
exports.pro = pro;