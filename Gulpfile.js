const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');

const _paths = [
    "src/index.prefix",
    "src/Utils.js",
    "src/EventEmitter.js",
    "src/Helpers/*.js",
    "src/TimedFunction.js",
    "src/injections/*.js",
    "src/ModuleManager.js",
    "src/GameLoop.js",
    "src/Game.js",
    "src/Gamify.js",
    "src/index.suffix"
];


gulp.task('jshint', function () {
    const gamifyjs = gulp.src(_paths).pipe(concat('gamify.js'));
    return gamifyjs
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
    return gulp.src('dist/')
        .pipe(clean());
});

gulp.task('uglify', ['clean'], function () {
    const gamifyjs = gulp.src(_paths).pipe(concat('gamify.js'));
    return gamifyjs
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['jshint', 'uglify'], function () {
    return gulp.watch(_paths, ['jshint', 'uglify']);
});