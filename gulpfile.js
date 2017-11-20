var gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    uglifyCss     = require('gulp-uglifycss'),
    notify        = require('gulp-notify'),
    plumber       = require('gulp-plumber'),
    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer'),
    babel         = require('gulp-babel'),
    imagemin      = require('gulp-imagemin'),
    processors    = [autoprefixer];

// TASKS
    
gulp.task('server', function() {
    browserSync.init({
        server: __dirname + '/dist'
    });
});

gulp.task('html', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
      .pipe(sass({errLogToConsole: true}))
      .pipe(postcss(processors))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({stream: true}))
      .pipe(notify({
         title: 'Sass',
         message: 'Done !',
         icon: 'groot.png',
         wait: false
      }));
});

gulp.task('js', function() {
  return gulp.src('src/js/main.js')
          // .pipe(babel({ presets: ['es2015'] }))
          .pipe(gulp.dest('dist/js'))
          .pipe(browserSync.stream());
});

gulp.task('min-img', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('concat-min-js', function() {
  return gulp.src('src/js/*.js')
           .pipe(concat('all.min.js'))
           .pipe(uglify())
           .pipe(gulp.dest('dist/js'));
});

gulp.task('concat-min-css', function() {
  return gulp.src('src/css/*.css')
           .pipe(concat('all.min.css'))
           .pipe(uglifyCss())
           .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', ['server', 'html', 'sass', 'js'], function() {
    gulp.watch('src/scss/**/**.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/js/*.js', ['js']);
});



gulp.task('concat-min', ['concat-min-js', 'concat-min-css']);