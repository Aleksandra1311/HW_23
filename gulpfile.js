const {parallel, src, dest} = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');

function copyJs() {
    return src('./src/js/**/*.js')
        .pipe(concat('app.js')) 
        .pipe(dest('./dist/js'));
}

function copyCss() {
    return src('./src/css/**/*.css')
        .pipe(dest('./dist/css'));;
}

function copyHtml() { 
    return src('./src/index.html')
        .pipe(dest('./dist'));
}

function copyJsMin() {
    return src('./src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('./dist/js'));
}

function copyCssMin() {
    return src('./src/css/**/*.css')
        .pipe(cssmin())
        .pipe(dest('./dist/css'));;
}

function copyHtmlMin() { 
    return src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(dest('./dist'));
}

module.exports = {
    build: parallel(copyHtml, copyJs, copyCss),
    minify: parallel(copyCssMin, copyJsMin),
    // дополнителнительный плагин в котором мы минифицируем все файлы сразу
    allMinify: parallel(copyHtmlMin,copyCssMin, copyJsMin),
};
