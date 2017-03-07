var csso = require('gulp-csso');

gulp.task('default', function () {
    return gulp.src('./main.css')
        .pipe(csso())
        .pipe(gulp.dest('./out'));
});

gulp.task('development', function () {
    return gulp.src('./main.css')
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('./out'));
});
var fs = require("fs");
var postcss = require("postcss");

var css = fs.readFileSync("from.css", "utf8");
postcss([
    require("autoprefixer-core")(),
    require("css-mqpacker")()
]).process(css).then(function (result) {
    console.log(result.css);
});
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

const imagemin = require('gulp-imagemin');

gulp.task('default', () =>
gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);
var plumber = require('gulp-plumber');
var coffee = require('gulp-coffee');

gulp.src('./src/*.ext')
    .pipe(plumber())
    .pipe(coffee())
    .pipe(gulp.dest('./dist'));

gulp.task('css', function () {
    var processors = [
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});
var rename = require("gulp-rename");
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
    return gulp.src('./less/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/css'));
});

var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');

gulp.task('svgstore', function () {
    return gulp
        .src('test/src/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('test/dest'));
});

var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('compress', function (cb) {
    pump([
            gulp.src('lib/*.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});