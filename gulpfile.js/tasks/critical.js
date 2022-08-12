const { paths: { desination } } = require('../settings');
const crit = require('critical');

let pages = ['index'];

let optional = {};

const critical = () => {
  pages.forEach(async page => {
    await crit.generate({
      base: desination.root,
      src: `${page}.html`,
      css: ['css/style.min.css'],
      target: {
        css: `css/${page}-critical.css`
      },
      width: 1340,
      height: 600,
      ignore: {
        atrule: ['@font-face'],
        rule: [/hljs-/, /code/],
        decl: (node, value) => {
          let { selector } = node.parent;

          if (!(selector in optional)) {
            return false;
          }

          return !optional[selector].includes(node.prop);
        },
      }
    })
  });
};

module.exports = critical;
