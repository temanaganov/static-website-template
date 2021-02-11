const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const plumber = require('gulp-plumber')
const del = require('del');

const sassSyntax = 'sass';

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
	return src(`src/styles/**/*.${sassSyntax}`)
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss())
		.pipe(dest('dist/styles'))
		.pipe(browserSync.stream());
}

function scripts() {
	return src('src/js/*.js')
		.pipe(plumber())
		.pipe(concat('index.js'))
		.pipe(babel())
		.pipe(uglify())
		.pipe(dest('dist/js/'))
		.pipe(browserSync.stream());
}

function images() {
	return src('src/images/**/*').pipe(dest('dist/images'));
}

function fonts() {
	return src('src/fonts/*').pipe(dest('dist/fonts'));
}

function clean() {
	return del('dist', { force: true });
}

function startwatch() {
	watch('src/pug/**/*.pug').on('change', series(html, browserSync.reload));
	watch(`src/styles/**/*.${sassSyntax}`).on('change', styles);
	watch('src/js/**/*.js').on('change', scripts);
	watch('src/images/**/*').on('change', images);
	watch('src/fonts/*').on('change', fonts);
}

exports.browsersync = browsersync;
exports.startwatch = startwatch;
exports.scripts = scripts;
exports.styles = styles;
exports.html = html;
exports.fonts = fonts;
exports.clean = clean;

exports.build = series(clean, parallel(html, styles, scripts, images, fonts));
exports.default = series(clean, parallel(html, styles, scripts, images, fonts), parallel(browsersync, startwatch));
