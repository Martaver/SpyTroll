var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var browserify = require('browserify');
var watchify = require('watchify')
var babelify = require('babelify');
var vinylSource = require('vinyl-source-stream')
var vinylBuffer = require('vinyl-buffer')
var uglifyify = require('uglifyify')
var util = require('gulp-util')
var concat = require('gulp-concat')
var envify = require('loose-envify')
var eslint = require('gulp-eslint')
var merge = require('merge-stream')
var cssModulesify = require('css-modulesify')

var config = {
    serverFiles: 'server/**/*.js',
    jsFiles: 'browser/**/*.js',
    cssGlobalFiles: ['browser/css/global/*.css', 'node_modules/draft-js/dist/Draft.css'],
    cssLoginFiles: 'browser/css/login.css',
    cssLandingFiles: 'browser/css/landing/*.css',
    isProduction: process.env.NODE_ENV === 'production'
}

gulp.task('lint', function () {
    if (config.isProduction) { return }

    return gulp.src(config.jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
})

gulp.task('lintServer', function () {
    if(config.isProduction) { return }

    return gulp.src(config.serverFiles)
    .pipe(eslint())
    .pipe(eslint.format())
})

function getJSBundle(rootFile, outFile, watch) {
    if (config.isProduction) {
        util.log('Compiling client-side javascript for', util.colors.green('production'));
    } else {
        util.log('Compiling client-side javascript for', util.colors.yellow('development'));
    }

    var modulesOptions = {
        o:'public/css/app.css',
        after: 'autoprefixer'
    }

    if (config.isProduction) {
        modulesOptions['generateScopedName'] = cssModulesify.generateShortName
    }

    var bundler = browserify(rootFile, {
        debug: !config.isProduction,
        cache: {}, // required for watchify
        packageCache: {}, // required for watchify
        fullPaths: watch // required for watchify
    })

    if (watch) {
        bundler.plugin(watchify)
    }

    bundler.plugin('css-modulesify', modulesOptions)
    .transform(babelify, {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread']
    })
    .transform(envify)

    if (config.isProduction) {
        bundler.transform({global: true}, uglifyify)
    }

    function rebundle() {
        util.log(`Starting \'${util.colors.cyan('js')}\' for \'${util.colors.magenta(rootFile)}\'...`)
        var stream = bundler.bundle();
        stream.on('error', function (err) {
            util.log(util.colors.red(err.stack));
            util.log(util.colors.red(err));
            this.emit("end");
        })
        .pipe(vinylSource(outFile))
        .pipe(vinylBuffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public'));

        return stream
    };

    bundler.on('update', rebundle)
    bundler.on('log', (msg) => {
        util.log(`Finished \'${util.colors.cyan('js')}\' for \'${util.colors.magenta(rootFile)}\':`, msg)
    })

    return rebundle()
}

gulp.task('js:watch', ['lint'], function() {
    var appBundle = getJSBundle('browser/index.js', 'bundle.js', true)
    var loginBundle = getJSBundle('browser/loginPage/loginApp.js', 'login_bundle.js', true)
    return merge(appBundle, loginBundle)
})

gulp.task('js', ['lint'], function () {
    var appBundle = getJSBundle('browser/index.js', 'bundle.js', false)
    var loginBundle = getJSBundle('browser/loginPage/loginApp.js', 'login_bundle.js', false)

    return merge(appBundle, loginBundle)
});

gulp.task('css:landing', function() {
    return landing = gulp.src('browser/css/landing/*.css')
        .pipe(autoprefixer())
        .on('error', function (err) {
            util.log(util.colors.red(err.stack));
            util.log(util.colors.red(err));
            this.emit("end");
        })
        .pipe(concat('landing.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('css:global', function() {
    return style = gulp.src(config.cssGlobalFiles)
        .pipe(autoprefixer())
        .on('error', function (err) {
            util.log(util.colors.red(err.stack));
            util.log(util.colors.red(err));
            this.emit("end");
        })
        .pipe(concat('global_style.css'))
        .pipe(gulp.dest('public/css'));
})

gulp.task('css:login', function() {
    return style = gulp.src(config.cssLoginFiles)
        .pipe(autoprefixer())
        .on('error', function (err) {
            util.log(util.colors.red(err.stack));
            util.log(util.colors.red(err));
            this.emit("end");
        })
        .pipe(concat('login.css'))
        .pipe(gulp.dest('public/css'));
})

gulp.task('server', ['lintServer'], function() {
    return gulp.src(config.serverFiles)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['node5'],
            plugins: ['transform-object-rest-spread']
        }))
        .on('error', function (err) {
            util.log(util.colors.red(err.stack))
            util.log(util.colors.red(err));
            this.emit("end");
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('prod'))
});

gulp.task('watch', ['js:watch'], function() {
    gulp.watch(config.cssGlobalFiles, ['css:global'])
    gulp.watch(config.cssLoginFiles, ['css:login'])
    gulp.watch(config.cssLandingFiles, ['css:landing'])
    gulp.watch(config.serverFiles, ['server'])
})

gulp.task('compile', ['js', 'css:landing', 'css:global', 'css:login', 'server'])
