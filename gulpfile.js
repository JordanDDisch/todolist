var jshint = require('gulp-jshint');
var gulp   = require('gulp');

gulp.task('lint', function() {
    return gulp.src('./javascript/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
});