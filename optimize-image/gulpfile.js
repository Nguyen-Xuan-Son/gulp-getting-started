const { src, dest } = require("gulp");
const gulpImage = require("gulp-image");

function optimize() {
    return src('*.jpg')
        .pipe(gulpImage())
        .pipe(dest('output'));
}

exports.default = optimize;