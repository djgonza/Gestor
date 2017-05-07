var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var watchify = require('watchify');

gulp.task('compile', function () {

	//Definimos los archivos
	var bundle = browserify({
		entries: './app/app.js',
		debug: true
	});

	//Compilamos la primera vez
	compile(bundle);

	//Observamos el archivos cuando cambie
	watchify(bundle).on('update', function () {
		compile (bundle);
	});


});

//Compilamos a es5
function compile (bundle) {

	console.log('Compilando ...');
	console.time('Compilado!')

	bundle
	.transform("babelify", {presets: ["es2015", "react"]})
	.bundle()
	.on('error', gutil.log)
	.on('end', () => {console.timeEnd('Compilado!');})
	.pipe(source('app.js'))
	.pipe(gulp.dest('./public/'));

}