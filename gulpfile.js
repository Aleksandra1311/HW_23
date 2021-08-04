// const gulp = require('gulp'); // но мы сразу использ деструкрутизацию поэтому перепишем код ниже
const {parallel, src, dest} = require('gulp'); //parallel - файлы копир паралельно, src - создание трубы, dest - Destination(путь назначения)
const concat = require('gulp-concat'); //плагин для склейки наших ссылок/папок из нескольких в 1 на подключение
const uglify = require('gulp-uglify'); //слепили, без пробелов. только для js файлов
const cssmin = require('gulp-cssmin'); //слепливает css
const htmlmin = require('gulp-htmlmin');

// функц переноса js в папку dist
function copyJs() {
    return src('./src/js/**/*.js')
        .pipe(concat('app.js')) // склеили все файлы
        .pipe(dest('./dist/js'));
}

function copyJsMin() {
    return src('./src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('./dist/js'));
}

    // функц переноса css в папку dist
function copyCss() {
    return src('./src/css/**/*.css')
        .pipe(dest('./dist/css'));;
}

function copyCssMin() {
    return src('./src/css/**/*.css')
        .pipe(cssmin())
        .pipe(dest('./dist/css'));;
}
// если бы у нас были библиотечные стили  мы бы их отдельно перенесли

// function copyVenderCss() {
//     return src(['./src/css/**/*.css']) // в [ указываю полный пусть каждого стиля через , 'ссылка' ], порядок важен
//         .pipe(dest('./dist/css'));;
// }

    // функц переноса html в папку dist
function copyHtml() { 
    return src('./src/index.html')
        .pipe(dest('./dist')); //созд трубу и в неё передаем путь к файлу, pipe - (куда ложить), а в нём dest - путь назначения
}
function copyHtmlMin() { 
    return src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(dest('./dist')); //созд трубу и в неё передаем путь к файлу, pipe - (куда ложить), а в нём dest - путь назначения
}

module.exports = {
    // build: gulp.parallel(copyJs, copyCss),// но мы сразу использ деструкрутизацию поэтому перепишем код ниже
    build: parallel(copyHtml, copyJs, copyCss),
    minify: parallel(copyCssMin, copyJsMin),
    // дополнителнительный плагин 
    allMinify: parallel(copyHtmlMin,copyCssMin, copyJsMin),
};
