let gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require('gulp-postcss'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  browserSyns = require("browser-sync"),
  pug = require("gulp-pug"),
  imageMin = require("gulp-imagemin"),
  spritesmith = require("gulp.spritesmith"),
  merge = require("merge-stream"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  svgSprite = require("gulp-svg-sprites"),
  filter = require("filter"),
  webpack = require("webpack-stream"),
  getData = require("jade-get-data")("app/data"),
  clean = require("gulp-clean");

let dirDist = "./dist/";
let dirApp = "./app/";
let _ = {
  dist: {
    images: dirDist + "images/",
    fonts: dirDist + "fonts/",
    js: dirDist + "js/",
    css: dirDist + "css/",
    out: "../../"
  },
  fonts: {
    dir: dirApp + "static/fonts/",
    select: "*.ttf"
  },
  minImg: {
    dir: dirApp + "static/images/",
    select: "*.*"
  },
  sprite: {
    png: {
      dir: dirApp + "static/images/pngSprite/",
      select: "*.png"
    },
    svg: {
      dir: dirApp + "static/images/svgSprite/",
      select: "*.svg"
    }
  },
  pug: {
    dir: dirApp + "templates/",
    data: {
      dir: dirApp + "data/",
      select: "**/*.json"
    },
    select: {
      pages: "pages/*.pug",
      all: "**/*.pug"
    }
  },
  style: {
    base: dirApp + "scss/base/",
    dir: dirApp + "scss/",
    select: {
      conv: "*.scss",
      all: "**/*.scss"
    }
  },
  js: {
    libs: [
      "node_modules/jquery/src/jquery.js",
      "node_modules/fancybox/dist/js/jquery.fancybox.js",
      "node_modules/swiper/js/swiper.js"
    ],
    select: "**/*.js",
    dir: dirApp + "scripts/",
    start: "index.js"
  }
};
let WPConf = {
  output: {
    filename: "scripts.min.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};

///Работа со стилями
gulp.task("scss", function() {
  return gulp
    .src(_.style.dir + _.style.select.conv)
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(postcss([
      require('autoprefixer'),
      require('postcss-discard-comments'),
      require('postcss-import'),
    ]))
    .pipe(cssnano({ zIndex: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(_.dist.css))
    .pipe(browserSyns.reload({ stream: true }));
});

/////Работа со скриптами
gulp.task("js", function() {
  return gulp
    .src(_.js.dir + _.js.start)
    .pipe(webpack(WPConf))
    .pipe(gulp.dest(_.dist.js));
});

/////Работа с картинками
gulp.task("images", function() {
  return gulp
    .src(_.minImg.dir + _.minImg.select)
    .pipe(imageMin())
    .pipe(gulp.dest(_.dist.images))
    .pipe(browserSyns.reload({ stream: true }));
});
gulp.task("pngSprite", function() {
  var spriteData = gulp
    .src(_.sprite.png.dir + _.sprite.png.select) // путь, откуда берем картинки для спрайта
    .pipe(
      spritesmith({
        imgName: "sprite.png",
        cssName: "pngSprite.scss",
        cssFormat: "scss",
        algorithm: "binary-tree",
        cssVarMap: function(sprite) {
          sprite.name = "icon-" + sprite.name;
        }
      })
    );
  var cssStream = spriteData.css.pipe(gulp.dest(_.style.base)); // путь, куда сохраняем стили
  var imgStream = spriteData.img.pipe(gulp.dest(_.dist.images)); // путь, куда сохраняем картинку

  return merge(imgStream, cssStream);
});
gulp.task("svgSprite", function() {
  return gulp
    .src(_.sprite.svg.dir + _.sprite.svg.select)
    .pipe(
      svgSprite({
        selector: "svg-%f",
        cssFile: _.dist.out + _.style.base + "svgSprite.scss",
        svg: {
          sprite: "sprite.svg"
        },
        preview: false
      })
    )
    .pipe(gulp.dest(_.dist.images));
});

/////Работа со шрифтами
gulp.task("ttf2woff2", function() {
  return gulp
    .src(_.fonts.dir + _.fonts.select)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(_.dist.fonts));
});

/////Работа с шаблонами страниц
gulp.task("pug", function() {
  return gulp
    .src(_.pug.dir + _.pug.select.pages)
    .pipe(
      pug({
        data: { getData },
        pretty: true,
        wrapLineLength: 120,
        maxPreserveNewlines: 50
      })
    )
    .pipe(gulp.dest(dirDist))
    .pipe(browserSyns.reload({ stream: true }));
});

gulp.task("watch", function() {
  //Стили и скрипты
  gulp.watch(_.style.dir + _.style.select.all, gulp.parallel("scss"));
  gulp.watch(_.js.dir + _.js.select, gulp.parallel("js"));

  //Сборка страниц из шаблонов
  gulp.watch(_.pug.dir + _.pug.select.all, gulp.parallel("pug"));
  gulp.watch(_.pug.data.dir + _.pug.data.select, gulp.parallel("pug"));

  //Сжатие картинок
  gulp.watch(_.minImg.dir + _.minImg.select, gulp.parallel("images"));

  //спрайты
  gulp.watch(
    _.sprite.png.dir + _.sprite.png.select,
    gulp.parallel("pngSprite")
  );
  gulp.watch(
    _.sprite.svg.dir + _.sprite.svg.select,
    gulp.parallel("svgSprite")
  );

  //конвертация
  gulp.watch(_.fonts.dir + _.fonts.select, gulp.parallel("ttf2woff2"));
});
gulp.task("browser-sync", function() {
  browserSyns.init({
    server: {
      baseDir: dirDist
    }
  });
});
gulp.task("clear-build", function() {
  return gulp
    .src([_.dist.js, _.dist.css, _.dist.images], {
      read: false,
      allowEmpty: true
    })
    .pipe(clean());
});

gulp.task(
  "after-clean",
  gulp.parallel("scss", "js", "pug", "images", "pngSprite", "svgSprite")
);
gulp.task("build", gulp.series("clear-build", "after-clean"));
gulp.task("dev", gulp.parallel("build", "browser-sync", "watch"));
gulp.task("default", gulp.parallel("dev"));
