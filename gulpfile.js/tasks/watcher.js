'use strict';

const { paths: { source } } = require('../settings');
const { series, watch } = require('gulp');
const browserSync = require('browser-sync').get('Local Server');
const dir = require('require-dir')('.');

const { fonts, pages, styles, scripts, images, webp, icons, favicon } = dir;

const watcher = () => {
  watch(`${source.root}**/*.pug`)
    .on('all', series(pages, browserSync.reload));
  watch(`${source.fonts}**/*.{woff,woff2}`)
    .on('all', series(fonts, browserSync.reload));
  watch(`${source.scripts}**/*.js`)
    .on('all', series(scripts, browserSync.reload));
  watch(`${source.styles}**/*.scss`)
    .on('all', series(styles));
  watch(
    [
      `${source.images.all}**/*.{jpg,png,svg}`,
      `!${source.images.icons}**/*.{jpg,png,svg}`
    ]
  )
    .on('all', series(images, browserSync.reload));
  watch(`${source.images.icons}**/*.svg`)
    .on('all', series(icons, browserSync.reload));
  watch(`${source.images.content}**/*.jpg`)
    .on('all', series(webp, browserSync.reload));
  watch(`${source.favicon}**/*.*`)
    .on('all', series(favicon, browserSync.reload));
};

module.exports = watcher;
