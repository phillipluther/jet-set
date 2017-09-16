
let path = require('path');
let gulp = require('gulp');
let lint = require('gulp-eslint');
let minify = require('gulp-uglify');
let rename = require('gulp-rename');
let shell = require('gulp-shell');

let src = path.join(__dirname, './JetSet.js');

gulp.task('build', ['lint'], () => {
    return gulp.src(src)
        .pipe(minify())
        .pipe(rename('JetSet.min.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('lint', () => {
    return gulp.src([src, './tests/**/*.js'])
        .pipe(lint())
        .pipe(lint.format())
        .pipe(lint.failAfterError());
});

gulp.task('test', shell.task([
    'npm run test'
]));

gulp.task('watch', () => {
    gulp.watch(src, ['build']);
    gulp.watch('./tests/**/*test.js', ['test']);
});
