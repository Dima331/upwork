'use strict';

const { paths: { source, desination } } = require('../settings');
const { src, dest } = require('gulp');
const changed = require('gulp-changed');

// Копирование favicon
const favicon = () =>
  src(`${source.favicon}**`)
    .pipe(changed(desination.root))
    .pipe(dest(desination.root));

module.exports = favicon;
