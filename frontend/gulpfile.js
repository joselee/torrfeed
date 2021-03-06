const gulp = require('gulp');
const clean = require('gulp-clean');
const htmlreplace = require('gulp-html-replace');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const embedTemplates = require('gulp-angular-embed-templates');
const Builder = require('systemjs-builder');
const builder = new Builder('', 'systemjs.config.js');
const sass = require('gulp-sass');

/* --- Production build tasks --- */
gulp.task('prod', ['build'], () => {
    return gulp.start(['prod-js', 'prod-css', 'prod-fonts', 'prod-index']);
});
gulp.task('prod-js', () => {
    return builder.buildStatic('./build/main.js', './dist/app.js', { minify: true });
});
gulp.task('prod-css', () => {
    return gulp.src('./build/app.css')
        .pipe(gulp.dest('./dist'));
});
gulp.task('prod-fonts', () => {
    return gulp.src('./build/fonts/*')
        .pipe(gulp.dest('./dist/fonts'));
});
gulp.task('prod-index', () => {
    return gulp.src('./index.html')
        .pipe(htmlreplace({ js: './app.js', css: './app.css' }))
        .pipe(gulp.dest('./dist'));
});


/* --- Core build tasks --- */
gulp.task('build', ['ts', 'sass', 'fonts']);
gulp.task('clean', () => {
    return gulp.src(['./build', './dist'], { read: false })
        .pipe(clean());
});
gulp.task('ts', () => {
    return gulp.src('./src/**/*.ts')
        .pipe(embedTemplates({ sourceType: 'ts' }))
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build'));
});
gulp.task('sass', () => {
    return gulp.src('./src/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('./app.css'))
        .pipe(gulp.dest('./build'));
});
gulp.task('fonts', () => {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./build/fonts'));
});


/* --- Default serve and watch --- */
gulp.task('watch', ['build'], () => {
    gulp.watch(['./src/**/*.ts', './src/**/*.html'], ['ts']);
    gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);