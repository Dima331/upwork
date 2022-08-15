'use strict';

const { paths: { source, desination } } = require('../settings');
const { src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const browserSync = require('browser-sync').get('Local Server');

const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass')(require('sass'));
const gcmq = require('gulp-group-css-media-queries');
const csscomb = require("gulp-csscomb");

const cleanCSS = require('gulp-clean-css');
const isDev = !process.env.NODE_ENV;

// Компиляция стилей проекта
const styles = () => {
  const pluginsPostcss = [autoprefixer()];

  return src(`${source.styles}style.scss`, { sourcemaps: true })
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gcmq())
    .pipe(csscomb())
    .pipe(postcss(pluginsPostcss))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(csso({ forceMediaMerge: true, comments: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpIf(isDev, dest(desination.styles, { sourcemaps: true }), dest(desination.styles)))
    .pipe(gulpIf(isDev, browserSync.stream()));
};

module.exports = styles;
