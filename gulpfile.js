var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	plumber = require('gulp-plumber')
	rename =  require('gulp-rename');

gulp.task("sass", function() {
	gulp
		.src("app/scss/main.scss")
		.pipe(plumber())
		.pipe(sass({ outputStyle: "expanded" }))
		.pipe(rename("main.css"))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', function () {
	gulp.src('app/css/*.css')
		.pipe(gulp.dest('build/css'));
	gulp.src('app/*.html')
		.pipe(gulp.dest('build'));
	gulp.src('app/images/*')
		.pipe(gulp.dest('build/images'));
});