const {src,dest,watch,series} = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber')
const autoPrefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create();

function sass_task() {
    return src('scss/**/*.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoPrefixer({
                browsers: "last 2 versions"
            }))
            .pipe(dest('build/css'))
            .pipe(browserSync.reload({stream:true}));
}
function html_tas(){
    return src('*.html')
            .pipe(dest('build'))
            .pipe(browserSync.reload({stream:true}))
}
function img_task() {
    return src('img/*')
        .pipe(dest('build/img'))
        .pipe(browserSync.reload({ stream: true }))
}
function browser(){
    browserSync.init({
        server : 'build'
        
    },(err)=>{
        console.log(err)
    })
}
watch('scss/**/*.scss',series(sass_task))
watch('*.html',series(img_task,html_tas))

exports.default = series(sass_task,img_task,html_tas,browser)