/** - - - - - - - - - M O D U L E - - G U L P - - - - - - - - - */
const {src, dest} = require('gulp');
const gulp = require('gulp');
const browsersync = require("browser-sync").create(); //-- перезагрузка страницы
const fileinclude = require('gulp-file-include');
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const group_media = require("gulp-group-css-media-queries");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webphtml = require("gulp-webp-html");
const webpcss = require("gulp-webpcss");


/** - - - - - A l l - -  S O U R C E - - P R O J E C T - - - - - */
const project_folder = "dist";
const source_folder = "src";

let path = {
    build:{
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/"
    },
    src:{
        html: [source_folder + "/template/*.html", "!" + source_folder + "/template/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*"
    },
    watch:{
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

/** - - - - - - - - - S E R V E R - - - - - - - - - - */
function browserSync(params) {
    browsersync.init({
        server:{
            baseDir: path.clean
        },
        port:3000,
        notify:false
    })
}
/** - - - - - - - - - - C L E A N - - - - - - - - - - */
function clean(param) {
    return del(path.clean);
}

/** - - - - - - - - handlers file - - - - - - - - - */
// = = > H T M L < = = /
function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}
// = = > C S S < = = /
function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            }))
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )

        .pipe(webpcss())
        // .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}
// = = > J S < = = /
function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        // .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

// = = > I M A G E S < = = /
function images(){
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}
// = = > F O N T S < = = /
function fonts() {
    src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}

/** - - - - - - - - - W A T C H S - - - - - - - - - */
function watchFiles(params){
    gulp.watch([path.watch.html],html)
    gulp.watch([path.watch.css],css)
    gulp.watch([path.watch.js],js)
    gulp.watch([path.watch.img],images);
}

/** - - - - - - - - S T A R T - - - - - - - - - */
const build = gulp.series(clean, gulp.parallel(js,css,html,images,fonts));
const dev = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.dev = dev;
exports.default = dev;