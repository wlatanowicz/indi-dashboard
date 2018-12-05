var gulp = require('gulp');
var requireDir = require('require-dir');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var globImporter = require('node-sass-glob-importer');

requireDir('./compiler/gulp_tasks');

gulp.task('build', ['tomek-build', 'sass'] );

gulp.task( 'watch', function () {
	gulp.watch( [ './app/**/*' ], [ 'tomek-build', 'sass' ] );
} );

gulp.task('sass', function () {
	return gulp.src('./app/style/*.scss')
	  .pipe(sass({
			importer: globImporter()
		}))
	  .on('error', function (error) {
			console.error(
			'Error (' + error.plugin + '): ' + error.messageFormatted
			);
	  })
	  .pipe(
		postcss([
		  autoprefixer()
		])
	  )
	  .pipe(gulp.dest("./build/style"));
});
  