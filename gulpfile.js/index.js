'use strict';

const tasks = require('require-dir')('./tasks');
const { clean, fonts, pages, styles, scripts, images, webp, icons, favicon } = tasks;
const { zip, server, watcher, lintspaces, critical } = tasks;

const { series, parallel } = require('gulp');

const build = series(
  clean,
  parallel(fonts, pages, styles, scripts, images, webp, icons, favicon)
);

exports.zip = series(zip);
exports.critical = series(critical);
exports.lintspaces = series(lintspaces);
exports.build = build;
exports.default = series(build, server, watcher);
