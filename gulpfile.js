var gulp = require('gulp');
var browserify = require('browserify');
var minify = require('gulp-minify');
var fontmagic = require('postcss-font-magician');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var jadevars = require('./jadevariables.js').jadevars;
var sass = require('gulp-sass');
var postcss = require("gulp-postcss");
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var jade = require('gulp-jade');
var concat = require("gulp-concat");
var flexibility = require('postcss-flexibility');
var fs = require("fs");
var marked = require("marked");
var walk = require("walk");
jadevars.articles = [];
gulp.task('postsass', function(){
    var source = "./public/style/*.scss";
    var output = "./public/style/";
    var postprocess = [
        autoprefixer({
            'browsers': 'last 4 versions'
        }),
        flexibility(),
        fontmagic(),
        cssnano()
    ];
    return gulp.src(source)
        .pipe(sass())
        .pipe(postcss(postprocess))
        .pipe(concat('serve.css'))
        .pipe(gulp.dest(output));
});
gulp.task('jade', function(){
    var source = "./*.jade";
    var output = "./";
    return gulp.src(source)
        .pipe(jade({
            'locals': jadevars,
            'pretty': true
        }))
        .pipe(gulp.dest(output));
});
gulp.task('browser', function(){
    var buildscript = function() {
        var bundler = browserify({
            entries: './public/script/main.js',
            debug: true
        });
        var handleErrors = function(error){
            console.log(error);
        };
        var stream = bundler.bundle();
        return stream.on('error', handleErrors)
            .pipe(source('serve.js'))
            .pipe(gulp.dest('./public/script'));
    };
    return buildscript();
});
gulp.task('watch', function(){
    gulp.watch('./main.js',[
        'browser'
    ]);
    gulp.watch('./public/style/*.scss',[
        'postsass'
    ]);
    gulp.watch('./*.jade',[
        'jade'
    ]);
    gulp.watch('./jadevariables.js',[
        'jade'
    ]);
});


gulp.task('default', gulp.series('browser', 'jade', 'postsass'));