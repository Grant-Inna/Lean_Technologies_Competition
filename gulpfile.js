const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      del = require('del'),
      browserSync = require('browser-sync').create(),
      sourcemaps = require('gulp-sourcemaps'),
      gulpif = require('gulp-if'),
      gcmq = require('gulp-group-css-media-queries'),
      imagemin = require('gulp-imagemin'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      jade = require('gulp-jade'),
      smartgrid = require('smart-grid'),
      less = require('gulp-less');

const isDev = process.argv.indexOf('--dev') !== -1,
      isProd = !isDev,
      isSync = process.argv.indexOf('--sync') !== -1;

const base = './develop/',
      src = './develop/assets/',
      prod = './build/',
      dist = './build/assets/';

function html(done){
   return gulp.src( base + '*.jade' )
   .pipe(jade({pretty: true}))
   .pipe(gulp.dest( prod ))
   .pipe(gulpif(isSync, browserSync.stream()));
   done();
}
function todo(done){
   return gulp.src( base + 'todo/*.jade' )
   .pipe(jade({pretty: true}))
   .pipe(gulp.dest( prod + 'todo' ))
   .pipe(gulpif(isSync, browserSync.stream()));
   done();
}


function styles(){
   return gulp.src( [ src + 'css/style.less' ])
   .pipe(gulpif(isDev, sourcemaps.init()))
   .pipe(less())
   .pipe(gcmq())
   .pipe(autoprefixer())
   .pipe(gulpif(isProd, cleanCSS({
      level: 2
   })))
   .pipe(gulpif(isDev, sourcemaps.write() ))
   .pipe(gulp.dest( dist + 'css'))
   .pipe(gulpif(isSync, browserSync.stream()))
}

function data(done){
   return gulp.src([src + 'data/*', src + 'data/**/*'])
   .pipe(gulp.dest( dist + 'data'));
   done();
}
function font(done){
   return gulp.src(src + 'font/**/*')
   .pipe(gulp.dest( dist + 'font/'));
   done();
}
function js(done){
   return gulp.src(src + 'js/*')
   .pipe(gulpif(isProd, uglify()))
   .pipe(gulp.dest( dist + 'js'));
   done();
}

function clear(){
   return del( prod + '*');
}


function watch(done){
   if(isSync){
      browserSync.init({
         server: {
            baseDir: './build/'
         }
      });
   }
   
   gulp.watch( src + 'css/**/*.less', styles);
   gulp.watch( base + '*.jade', html);
   gulp.watch( base + 'todo/*.jade', todo);
   gulp.watch( src + 'jade/**/*.jade', html);
   gulp.watch( src + 'jade/**/**/__*.jade', html);
   gulp.watch( src + 'data/*', data);
   gulp.watch( src + 'data/**/*', data);
   gulp.watch( src + 'data/**/**/*', data);
   gulp.watch( src + 'data/**/**/**/*', data);
   gulp.watch( src + 'js/*', js);
   done();
}



const build = gulp.series(clear,
   gulp.parallel(html, todo, styles, js, data, font )
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('font', font);
gulp.task('js', js);
gulp.task('data', data);



let gridOptions = {
   columns: 24,
   offset: "24px",
   // mobileFirst: true,
   container: {
      maxWidth: "1320px",
      fields: "160px" // fields не меньше offset делённого на 2
   },
   breakPoints: {
      ll: {
         width: "1420px"
      },
      llarge: {
         width: "1320px"
      },
      xxl: {
         width: "1200px"
      },
      xl: {
         width: "1150px",
         fields: "100px",
         offset: "16px"
      },
      middle: {
         width: "1030px"
      },
      lg: {
         width: "995px",
         fields: "60px"
      },
      md: {
         width: "770px",
         fields: "5vw"
      },
      smmd: {
         width: "660px"
      },
      sm: {
         width: "580px"
      },
      xs: {
         width: "470px"
      },
      xxs: {
         width: "370px"
      }
   }
};
function grid(done){
   smartgrid( src + 'css/base', gridOptions);
   done();
}
gulp.task('grid', gulp.parallel(grid));
