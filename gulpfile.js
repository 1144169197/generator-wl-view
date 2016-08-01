var gulp = require('gulp'),
	jshint = require('gulp-jshint'),//语法检查
	concat = require('gulp-concat'),//合并文件
	uglify = require('gulp-uglify'),//压缩代码
	rename = require('gulp-rename'),//重命名
	imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
	minifyCss = require('gulp-minify-css');//css压缩

// 语法检查
gulp.task('jshint', function () {
	return gulp.src('views/js/public/src/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});
// 合并文件之后压缩代码
gulp.task('minifyJs', function (){
	return gulp.src('views/js/public/src/*.js')
	.pipe(concat('public.js'))
	.pipe(gulp.dest('views/js/public/'))
	.pipe(uglify())
	.pipe(rename('public.min.js'))
	.pipe(gulp.dest('views/js/public/'));
});
// 合并文件之后压缩代码
gulp.task('minifyAngularJs', function (){
	return gulp.src('views/js/angular/src/*.js')
	.pipe(concat('angular.js'))
	.pipe(gulp.dest('views/js/angular/'))
	.pipe(uglify())
	.pipe(rename('angular.min.js'))
	.pipe(gulp.dest('views/js/angular/'));
});
gulp.task('minifyCss', function() {    //- 创建一个名为 concat 的 task
    gulp.src('views/css/src/*.css')    //- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('style.min.css')) //- 合并后的文件名
        .pipe(minifyCss(
        	{
	            advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
	            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
	            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
	            //keepSpecialComments: '*'
	            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
	        }
        )) //- 压缩处理成一行
        .pipe(gulp.dest('views/css/'));      //- 输出文件本地
});
// 压缩图片
gulp.task('img', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('./dest/images/'))
    .pipe(notify({ message: 'img task ok' }));
});
// 监视文件的变化
gulp.task('watch', function () {
	gulp.watch('views/js/public/src/*.js', ['jshint', 'minifyJs']);
});
// 注册缺省任务
gulp.task('default', ['jshint', 'minifyJs', 'minifyCss', 'watch']);
