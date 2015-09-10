var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefix = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	bower = require('gulp-bower'),
	gls = require('gulp-live-server'),
	sourcemaps = require('gulp-sourcemaps'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	streamify = require('gulp-streamify'),
	source = require('vinyl-source-stream'),
	karma = require('karma').server;


var config = {
	sassPath: './resources/sass',
	bowerDir: './bower_components',
	DEST: './dist/',
	OUT: 'build.js',
	ENTRY_POINT: 'src/js/main.js'
};

gulp.task('server', function(){
	var server = gls.new('bin/www');
	server.start();
    gulp.watch(['app.js', 'routes/**/*.js'], ['server']);
});

gulp.task('browserify', function(){
	var b = browserify();
	b.add('src/js/main.js');
	return b.bundle()
		.pipe(source(config.ENTRY_POINT))
		.pipe(gulp.dest(config.DEST));
});


gulp.task('icons', function(){
	return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
		.pipe(gulp.dest('./public/fonts'));
});

gulp.task('css', function(){
	return gulp.src(config.sassPath + '/style.scss')
		.pipe(sass({
			"sourcemap=none":true,
			style: 'compressed',
			loadPath: [
				'src/stylesheets/sass',
				config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
				config.bowerDir + '/fontawesome/scss'
			]
		})
			.on("error", notify.onError(function(error){
				return "Error: " + error.message;
			})))
		.pipe(autoprefix('last 2 version'))
		.pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('test', function() {
  karma.start({
    configFile: __dirname + '/karma.config.js',
    singleRun: false
  });
});

gulp.task('watch', function(){
	gulp.watch(config.sassPath + '/**/*.scss', ['css']);
	var watcher  = watchify(browserify({
	    entries: [config.ENTRY_POINT],
	    debug: true,
	    cache: {}, packageCache: {}, fullPaths: true
	  }));
  	return watcher.on('update', function () {
	    watcher.bundle()
	      .pipe(source(config.OUT))
	      .pipe(gulp.dest(config.DEST));
	      console.log('Updated');
	  })
	    .bundle()
	    .pipe(source(config.OUT))
	    .pipe(gulp.dest(config.DEST));
});

gulp.task('default', ['icons','css','server','watch', 'test']);
