/**
 * gulpfile.js
 * @Description Solar System with Threejs
 * @link https://github.com/kdaimiel/solar-system#readme
 * @author Enrique Daimiel Ruiz <k.daimiel@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
const gulp = require('gulp');
const clean = require('gulp-clean');
const jshint = require('gulp-jshint');
const jsonlint = require('gulp-jsonlint');
const Server = require('karma').Server;
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const wct = require('web-component-tester').test;
const babel = require('gulp-babel');

const paths = {
  src: 'src',
  dist: 'dist',
  test: 'test'
};

gulp.task('clean', function () {
  return gulp.src(paths.dist,  { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task('lint:js', function() {
  return gulp.src([
    paths.src + '/**/*.js',
    paths.test + '/**/*.js',
    '*.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint:json', function() {
  return gulp.src([
    paths.src + '/**/*.json',
    paths.test + '/**/*.json',
    '*.json'
  ])
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

gulp.task('lint', gulp.series('lint:js', 'lint:json'));

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:watch', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    autoWatch: true
  }, done).start();
});

gulp.task('concat', function() {
  return gulp.src([
    'src/js/objects/SolarBody.js',
    'src/js/objects/PlanetMesh.js',
    paths.src + '/**/*.js'
  ])
    .pipe(concat('solar-system.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function () {
  return gulp.src([
    'src/js/objects/SolarBody.js',
    'src/js/objects/PlanetMesh.js',
    paths.src + '/**/*.js'
  ])
    .pipe(concat('solar-system.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series(
  'test',
  'concat',
  'uglify'
));

/* Polymer Tasks*/
gulp.task('copy:polymer', function () {
  return gulp.src(paths.src + '/polymer/*')
    .pipe(gulp.dest(paths.dist));
});

gulp.task('wct:local', function () {
  return wct();
});

gulp.task('build:polymer', gulp.series(
  'wct:local',
  'copy:polymer'
));

/* React Task*/
gulp.task('build:react', function(){
  return gulp.src(paths.src + '/jsx/*.jsx')
    .pipe(babel({
      presets: ['@babel/preset-react']
    }))
    .pipe(concat('solar-system-react.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

/* General Tasks */
gulp.task('build:all', gulp.parallel(
  'build',
  'build:polymer',
  'build:react'
));

gulp.task('watch', function () {
  return gulp.watch([
    paths.src + '/**/*',
    paths.test + '/**/*',
    '*.js',
    '*.json'
  ], gulp.series('build:all'));
});

gulp.task('connect', function() {
  return connect.server({
    livereload: true
  });
});

gulp.task('serve', gulp.parallel(
  'connect',
  'watch'
));

gulp.task('default', gulp.series(
  'clean',
  'build:all',
  'serve'
));