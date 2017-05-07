const gulp = require('gulp');
const compileJSX = require('gulp-compile-jsx');
const rename = require('gulp-rename');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');

gulp.task('jsx', () => {

	var bundle = watchify(browserify('./app/index.jsx'));

	bundle.on('update', function () {

		console.log('compilando -->');

		rebundle();

		console.log('compilado!!!');

	});

	bundle
	.transform(babel)
	.bundle()
	.on('error', function (err) { console.log(err); this.emit('end') })
	.pipe(compileJSX())
	.pipe(source('index.jsx'))
	.pipe(rename('app.js'))
	.pipe(gulp.dest('public'));

	/*return gulp.src('./app/index.jsx')
	.pipe(compileJSX())
	.pipe(gulp.dest('./public/'));*/

});

gulp.task('watch', function () { 
	//return compile(true); 
	return compilar();
});

//gulp.task('default', ['build']);


