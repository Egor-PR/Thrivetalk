
const { watch, task, src } = require('gulp');
let gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
//let image = require('gulp-image');
let imagemin = require('gulp-imagemin');

//описывается поддержка scss html js
gulp.task('scss', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
});
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
  ])
    .pipe(concat('libs.min.js')) // concat-обращение в один файл
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
});

// gulp.task('img', function () {
//   return src(['app/img/**/*.jpg', 'app/img/**/*.png', 'app/img/**/*.svg'])
//     .pipe(image())
//     .pipe(dest('app/img/pic'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// })
gulp.task('img-compress', function () {
  return src('app/img/**')
    .pipe(imagemin({ prograssive: true }))
    .pipe(gulp.dest('app/bild/img'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss')) //еслии будут изменения в этом файле gulp заметит и справит
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
  gulp.watch('app/img/**', gulp.parallel('img-compress'))
  // gulp.watch('app/img/pic/*.png', gulp.parallel('img'))
  // gulp.watch('app/img/pic/*.jpg', gulp.parallel('img'))
  // gulp.watch('app/img/pic/*.svg', gulp.parallel('img'))

});
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "app/"
    },
    open: false
  });
});
gulp.task('default', gulp.parallel('scss', 'js', 'img-compress', 'browser-sync', 'watch')); //'img-compress'