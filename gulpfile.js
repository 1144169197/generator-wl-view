var gulp = require('gulp'),
	jshint = require('gulp-jshint'),//�﷨���
	concat = require('gulp-concat'),//�ϲ��ļ�
	uglify = require('gulp-uglify'),//ѹ������
	rename = require('gulp-rename'),//������
	imagemin = require('gulp-imagemin'),//ͼƬѹ��
    pngcrush = require('imagemin-pngcrush'),
	minifyCss = require('gulp-minify-css');//cssѹ��

// �﷨���
gulp.task('jshint', function () {
	return gulp.src('views/js/public/src/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});
// �ϲ��ļ�֮��ѹ������
gulp.task('minifyJs', function (){
	return gulp.src('views/js/public/src/*.js')
	.pipe(concat('public.js'))
	.pipe(gulp.dest('views/js/public/'))
	.pipe(uglify())
	.pipe(rename('public.min.js'))
	.pipe(gulp.dest('views/js/public/'));
});
// �ϲ��ļ�֮��ѹ������
gulp.task('minifyAngularJs', function (){
	return gulp.src('views/js/angular/src/*.js')
	.pipe(concat('angular.js'))
	.pipe(gulp.dest('views/js/angular/'))
	.pipe(uglify())
	.pipe(rename('angular.min.js'))
	.pipe(gulp.dest('views/js/angular/'));
});
gulp.task('minifyCss', function() {    //- ����һ����Ϊ concat �� task
    gulp.src('views/css/src/*.css')    //- ��Ҫ�����css�ļ����ŵ�һ���ַ���������
        .pipe(concat('style.min.css')) //- �ϲ�����ļ���
        .pipe(minifyCss(
        	{
	            advanced: true,//���ͣ�Boolean Ĭ�ϣ�true [�Ƿ����߼��Ż����ϲ�ѡ�����ȣ�]
	            compatibility: 'ie7',//����ie7�����¼���д�� ���ͣ�String Ĭ�ϣ�''or'*' [���ü���ģʽ�� 'ie7'��IE7����ģʽ��'ie8'��IE8����ģʽ��'*'��IE9+����ģʽ]
	            keepBreaks: true,//���ͣ�Boolean Ĭ�ϣ�false [�Ƿ�������]
	            //keepSpecialComments: '*'
	            //������������ǰ׺ ������autoprefixer���ɵ������ǰ׺�������������������п��ܽ���ɾ����Ĳ���ǰ׺
	        }
        )) //- ѹ�������һ��
        .pipe(gulp.dest('views/css/'));      //- ����ļ�����
});
// ѹ��ͼƬ
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
// �����ļ��ı仯
gulp.task('watch', function () {
	gulp.watch('views/js/public/src/*.js', ['jshint', 'minifyJs']);
});
// ע��ȱʡ����
gulp.task('default', ['jshint', 'minifyJs', 'minifyCss', 'watch']);
