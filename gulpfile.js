const { src, dest, watch, series, parallel } = require("gulp");

const autoprefixer = require("gulp-autoprefixer"); // настройка browserslist находится в pagkage.json
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const csso = require("gulp-csso");
const fileInclude = require("gulp-file-include");
const fonter = require("gulp-fonter");
const gcmq = require("gulp-group-css-media-queries");
const gulpif = require("gulp-if");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass")(require("sass"));
const svgSprite = require("gulp-svg-sprite");
const terser = require("gulp-terser"); // не удалять, оставила для проектов без webpack
const ttf2woff2 = require("gulp-ttf2woff2");
const webpack = require("webpack-stream");
//@TODO: добавить plumber + notify для вывода ошибок (сначала убедиться, что он мне нужен). Пример добавления: https://www.youtube.com/watch?v=D_HW-tvyKKE&t=4422s

let isProd = false;

const toProd = (done) => {
  isProd = true;
  done();
};

const cleanDist = () => {
  return src("dist", { read: false, allowEmpty: true }).pipe(clean({ force: true }));
};

const buildHtml = () => {
  return (
    src("src/*.html")
      // .pipe(
      //   fileInclude({
      //     prefix: "@@",
      //     basepath: "@file",
      //   })
      // )
      .pipe(
        gulpif(
          isProd,
          htmlmin({
            // collapseWhitespace: true,
            removeComments: true,
          })
        )
      )
      .pipe(dest("dist"))
  );
};

// const buildFonts = () => {
//   return src("src/assets/fonts/**/*")
//     .pipe(fonter({ formats: ["woff", "ttf"] }))
//     .pipe(ttf2woff2())
//     .pipe(dest("dist/assets/fonts"));
// };

const buildStyles = () => {
  return (
    src(["src/scss/style.scss", "src/scss/vendor.scss"])
      .pipe(sass())
      .pipe(gulpif(isProd, autoprefixer()))
      .pipe(gulpif(isProd, gcmq()))
      .pipe(gulpif(isProd, csso()))
      // .pipe(concat("style.css"))
      .pipe(dest("dist/css"))
  );
};

const buildScripts = () => {
  return src("src/js/**/*.js")
    .pipe(
      webpack({
        mode: isProd ? "production" : "development",
        entry: {
          vendor: "./src/js/vendor.js",
          // index: "./src/js/index.js",
          // tour: "./src/js/tour.js",
        },
        output: {
          filename: "[name].js",
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [["@babel/preset-env", { targets: "defaults" }]],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(src("src/js/index.js"))
    .pipe(dest("dist/js"));
};

// const buildSprite = () => {
//   return src("src/assets/images/sprite-icons/*.svg")
//     .pipe(
//       imagemin([
//         imagemin.svgo({
//           plugins: [
//             {
//               removeXMLNS: true,
//             },
//             {
//               inlineStyles: {
//                 onlyMatchedOnce: false,
//               },
//             },
//           ],
//         }),
//       ])
//     )
//     .pipe(
//       svgSprite({
//         mode: {
//           symbol: true,
//         },
//       })
//     )
//     .pipe(concat("sprite.svg"))
//     .pipe(dest("dist/assets/images"));
// };

const copyFavicons = () => {
  return src("src/assets/favicons/*", {
    base: "src/assets",
  }).pipe(dest("dist/assets"));
};

const buildImages = () => {
  // @TODO: добавить плагин gulp-newer для кэша, чтобы при добавлении картинки существующие файлы не обрабатывались заново
  return src(["src/assets/favicons/**/*", "src/assets/images/**/*"], {
    ignore: "src/assets/images/sprite-icons/**",
    base: "src/assets",
  })
    .pipe(gulpif(isProd, imagemin([imagemin.mozjpeg({ quality: 95 }), imagemin.optipng(), imagemin.svgo()])))
    .pipe(dest("dist/assets"));
};

const mainTasks = parallel(buildHtml, buildStyles, copyFavicons, buildScripts, buildImages);

const watchTask = () => {
  watch(["src/includes/*.html", "src/*.html"], buildHtml);
  watch("src/scss/**/*.scss", buildStyles);
  watch("src/assets/images/**/*", { ignored: "src/assets/images/sprite-icons/**/*" }, buildImages);
  watch("src/js/**/*.js", buildScripts);
};

exports.default = series(mainTasks, watchTask);
exports.build = series(toProd, cleanDist, mainTasks);

exports.clean = cleanDist;
