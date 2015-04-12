'use strict';

var gulp = require('gulp');
var path = require('path');
var del = require('del');
var browserify = require('browserify');
var reactify = require('reactify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var proxy = require('proxy-middleware');
var url = require('url');
var es = require('event-stream');
var spawn = require('child_process').spawn;
var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';

var port = 1337;


var paths = {
	base: __dirname,
	src: {
		base 	: 'public/src/',
		js 	  : 'app/',
		img   : 'public/src/img/',
		scss  : 'public/src/scss/'
	},
	dist: {
		base  : 'public/dist/',
		css   : 'public/dist/css/',
		js    : 'public/dist/js/',
		img   : 'public/dist/img/',
		fonts : 'public/dist/fonts/'
	},
	bower: './bower_components/' 
};

var pkg = require('./package.json');
var banner = ['/**',
	' * <%= pkg.name %> - <%= pkg.description %>',
	' * @version v<%= pkg.version %>',
	' * @link <%= pkg.homepage %>',
	' * @author <%= pkg.author %>',
	' * @license <%= pkg.license %>',
	' */',
	''].join('\n');

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [
	'ie >= 9',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 6',
	'opera >= 23',
	'ios >= 6',
	'android >= 4.4',
	'bb >= 10'
];


// Remove bundels
gulp.task('clean', function(cb) {
	del([
		paths.dist.css,
		paths.dist.js,
		paths.dist.img,
		paths.dist.fonts
	], cb);
});

// Copy images
gulp.task('images', function(cb) {
	return gulp.src(paths.src.img + '**/*.{png,jpg,jpeg,gif,svg}')
		.pipe(gulp.dest(paths.dist.img))
		.pipe(isProduction ? $.util.noop() : $.size({ title: 'images' }))
		.pipe(isProduction ? $.util.noop() : $.duration('images'));
});

// Copy icons
gulp.task('icons', function() {
	return gulp.src(paths.bower + 'fontawesome/fonts/**.*')
		.pipe(gulp.dest(paths.dist.fonts))
		.pipe($.size({ title: 'icons' }))
});



// Hint, uglify and concat scripts
gulp.task('scripts', function() {
	return es.concat(gulp.src([
		paths.src.js + 'App.jsx'
	]))
		.pipe($.concat('bundle.js'))
		.pipe($.browserify({
			debug: true,
			transform: ['reactify']
		}))
		.pipe($.jshint())
		.pipe(isProduction ? $.uglifyjs() : $.util.noop())
		.pipe(isProduction ? $.header(banner, { pkg: pkg }) : $.util.noop())
		.pipe(gulp.dest(paths.dist.js))
		.pipe($.size({ title: 'scripts' }))
		.pipe(isProduction ? $.util.noop() : $.duration('scripts'))
		.pipe(reload({stream: true}))
});


// Head scripts 
gulp.task('headScripts', function() {
	return es.concat(gulp.src([
		paths.bower + 'modernizr/modernizr.js',
	]))
		.pipe($.concat('head-bundle.js'))
		.pipe(isProduction ? $.uglifyjs() : $.util.noop())
		.pipe(isProduction ? $.header(banner, { pkg: pkg }) : $.util.noop())
		.pipe(gulp.dest(paths.dist.js))
		.pipe($.size({ title : 'scripts' }))
		.pipe(isProduction ? $.util.noop() : $.duration('scripts'))
});


// Compile SASS and concat styles
gulp.task('styles', function() {
	var sassFiles = $.rubySass(paths.src.scss + 'main.scss', {
			style: 'compressed',
			sourcemap: false,
			precision: 2
		})
		.on('error', function(err) {
			new $.util.PluginError('style', err, { showStack: true });
		});

	return es.concat(gulp.src([
		paths.bower + 'fontawesome/css/font-awesome.css',
		paths.bower + 'animate-css/animate.css',
	]), sassFiles)
		.pipe($.concat('main.min.css'))
		.pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
		.pipe(isProduction ? $.combineMediaQueries({
			log: true
		}) : $.util.noop())
		.pipe(isProduction ? $.cssmin() : $.util.noop())
		.pipe(isProduction ? $.header(banner, { pkg: pkg }) : $.util.noop())
		.pipe(gulp.dest(paths.dist.css))
		.pipe($.size({ title: 'styles' }))
		.pipe(isProduction ? $.util.noop() : $.duration('styles'))
		.pipe(reload({stream: true}))
});



// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
	// var proxyOptions = url.parse('http://localhost:5000');
	// proxyOptions.route = '/api';
	browserSync({
		server: {
			open: true,
			port: 3000,
			baseDir: paths.base,
			// middleware: [proxy(proxyOptions)]
		},
		browser: 'google chrome canary'
	});
});

// gulp.task('browser-sync', ['develop'], function() {
// 	browserSync.init(null, {
// 		proxy: 'http://localhost:5000',
// 		files: ['public/dist/**/*.*'],
// 		browser: 'google chrome canary',
// 	});
// });

// gulp.task('develop', function (cb) {
// 	var called = false;
// 	return $.nodemon({
// 		script: 'app.js'
// 	}).on('start', function () {
// 		if (!called) {
// 			called = true;
// 			cb();
// 		}
// 	});
// });


// Watch sass, html and js file changes
gulp.task('watch', ['browser-sync'], function() {
	gulp.watch(paths.src.scss + '**/**/*.scss', ['styles']);
	gulp.watch(paths.src.js + '**/**/*.{js,jsx}', ['scripts']);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', [
	'build',
	'watch'
]);

// Waits until clean is finished then builds the project
// gulp.task('heroku:production', function() {
// 	gulp.start([
// 		'build'
// 	]);
// });

gulp.task('build', ['clean'], function() {
	gulp.start([
		'icons',
		'images',
		'styles',
		'headScripts',
		'scripts'
	]);
});
