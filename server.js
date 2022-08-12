let asyncCss = `<script>
function loadStyle(url){
	let link = document.createElement('link');
	link.href = url;
	link.rel = 'stylesheet';
	document.body.appendChild(link);
}
loadStyle('css/style.min.css');
</script>`;

const express = require('express');
const path = require('path');
let fs = require('fs');

const app = express();

app.use('/css', express.static(path.resolve(__dirname, './build/css')));
app.use('/js', express.static(path.resolve(__dirname, './build/js')));
app.use('/img', express.static(path.resolve(__dirname, './build/img')));
app.use('/fonts', express.static(path.resolve(__dirname, './build/fonts')));

app.get('*', function (request, response) {
  let page = ('page' in request.query) ? request.query.page : 'index';

  let isCritical = 'crit' in request.query;
  let incAsync = 'async' in request.query;

  let criticalCss = fs.readFileSync(`./build/css/${page}-critical.css`).toString('UTF-8');
  let html = fs.readFileSync(`./build/${page}.html`).toString('UTF-8');

  if (isCritical) {
    html = html.replace('<link rel="stylesheet" href="css/style.min.css">', `<style>${criticalCss}</style>`);

    if (incAsync) {
      html = html.replace('<!--asyncCss-->', `${asyncCss}`);
    }
  }

  response.send(html);
});

app.listen(3000);
