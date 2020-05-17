const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const gulpBabel = require("gulp-babel");

function optimize() {
    return src('js/*.js')
        .pipe(gulpBabel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(dest('output'));
}

exports.default = optimize;