var gulp = require('gulp');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

function compilar () {

	var bundle = watchify(browserify('./app/index.jsx'));

	bundle.on('update', function () {

		console.log('compilando -->');

		rebundle();

		console.log('compilado!!!');

	});

	rebundle();

	function rebundle() {
		bundle
		.transform(babel)
		.bundle()
		.on('error', function (err) { console.log(err); this.emit('end') })
		.pipe(source('index.jsx'))
		.pipe(rename('app.js'))
		.pipe(gulp.dest('public'));
	}

}

function compile(watch) {

	var bundle = watchify(browserify('./app/index.jsx'));

	if (watch) {
		bundle.on('update', function () {
			console.log('--> Compilando...');
			rebundle();
			console.log('--> Compilado!');
		});
	}

	function rebundle() {
		bundle
		.transform(babel)
		.bundle()
		.on('error', function (err) { console.log(err); this.emit('end') })
		.pipe(source('index.jsx'))
		.pipe(rename('app.js'))
		.pipe(gulp.dest('public'));
	}

	rebundle();

}

gulp.task('build', function () {
	return compile();
});

gulp.task('watch', function () { 
	//return compile(true); 
	return compilar();
});

gulp.task('default', ['build']);


