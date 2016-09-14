/**
 * Main Gulp File
 **/

const gulp          = require('gulp'),
      /** Utils */
      watch         = require('gulp-watch'),
      plugins       = require('gulp-plumber'),
      browserSync   = require('browser-sync').create('jekyll'),
      requireDir    = require('require-dir'),
      runSequence   = require('run-sequence'),
      gutil         = require('gulp-util'),
      gulpAutoTask  = require('gulp-auto-task'),
      /** Config */
      paths        = require('./package.json').paths;

/** Import Main Tasks */
// Require them so they can be called as functions
const utils = requireDir('gulp-tasks');
// Automagically set up tasks
gulpAutoTask('{*,**/*}.js', {
  base: paths.tasks,
  gulp: gulp
});

/** Helper Tasks */
gulp.task('build', (callback) => {
  return utils.buildJekyll(callback, 'serve');
});

gulp.task('build:prod', (callback) => {
  return utils.buildJekyll(callback, 'prod');
});

gulp.task('build:assets', ['buildCss', 'buildJs', 'optimizeImg']);

/**
 * BrowserSync
 */
// Init server to build directory
gulp.task('browser', () => {
  browserSync.init({
    server: "./" + paths.build,
  });
});

// Force reload across all devices
gulp.task('browser:reload', () => {
  browserSync.reload();
});

/**
 * Main Builds
 */
gulp.task('serve', ['browser'], () => {
  runSequence('build', ['build:assets']);
  // CSS/SCSS
  watch([
        paths.src +'fonts/*',
        paths.bower + paths.compass + '**/*.scss',
        paths.bower + paths.bootstrap.sass + '**/*.scss',
        paths.bower + paths.hamburgers + '*/scss',
        paths.bower + paths.fontawesome + '*.scss',
        paths.css.src +'app.scss',
        paths.sass.src +'**/*.scss',
  ], () => {
    runSequence('buildCss', ['browser:reload']);
  });
  // JS
  watch([paths.js.src +'*.js', paths.vendor.src +'*.js'], () => {
    runSequence('buildJs', ['browser:reload']);
  });
  // Images
  watch([paths.img.src +'*', paths.img.src +'**/*'], () => {
    runSequence('optimizeImg', ['browser:reload']);
  });
  // Markup / Posts/ Data
  watch([
        paths.src +'*',
        paths.src +'_data/*',
        paths.src +'_plugins/*',
        paths.src +'**/*.md',
        paths.src +'**/*.html',
        paths.src +'**/*.markdown',
        paths.src +'_includes/**/*.md',
        paths.src +'_includes/**/*.svg',
        paths.src +'_includes/**/*.html',
  ], () => {
    runSequence('build', ['build:assets', 'browser:reload']);
  });

  gutil.log('Watching for changes.');
});

gulp.task('deploy', () => {
  runSequence('build:prod', ['build:assets']);
});
