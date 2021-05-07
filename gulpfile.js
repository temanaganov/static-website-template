const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass').sync;
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const plumber = require('gulp-plumber');
const del = require('del');

function browsersync() {
    browserSync.init({
        server: 'dist/',
        online: true,
        notify: false,
        ui: false,
    });
}

function html() {
    return src('src/pug/pages/**/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                removeComments: true,
            })
        )
        .pipe(dest('dist'));
}

function styles() {
    return src(`src/styles/**/*.scss`)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss())
        .pipe(dest('dist/styles'))
        .pipe(browserSync.stream());
}

function scripts() {
    return src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(concat('index.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());
}

function copy() {
    return src('src/static/**/*').pipe(dest('dist'));
}

function clean() {
    return del('dist', { force: true });
}

function readyReload(cb) {
    browserSync.reload();
    cb();
}

function startwatch() {
    watch('src/pug/**/*.pug', series(html, readyReload));
    watch(`src/styles/**/*.scss`, styles);
    watch('src/js/**/*.js', series(scripts, readyReload));
    watch('src/static/**/*', series(copy, readyReload));
}

exports.browsersync = browsersync;
exports.startwatch = startwatch;
exports.scripts = scripts;
exports.styles = styles;
exports.html = html;
exports.copy = copy;
exports.clean = clean;

exports.build = series(clean, parallel(html, styles, scripts, copy));
exports.default = series(clean, parallel(html, styles, scripts, copy), parallel(browsersync, startwatch));
