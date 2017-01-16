var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var styl = require('gulp-styl');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
    gulp.src(['src/**/*.js'])
        .pipe(browserify())
        .pipe(concat('dest.js'))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server));
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('styles', function() {
    gulp.src(['css/**/*.css'])
        .pipe(styl({compress : true}))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server));
});

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', function() {
    gulp.run('lr-server', 'scripts', 'styles');

    gulp.watch('src/**', function(event) {
        gulp.run('scripts');
    });

    gulp.watch('css/**', function(event) {
        gulp.run('styles');
    });
});
