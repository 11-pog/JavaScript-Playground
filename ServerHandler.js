const path = require("path");

let express = require('express');
let fs = require('fs');

const sitePath = path.join(__dirname, "Site");

let arma = fs.readFileSync(path.join(sitePath, "armazenamento.html"), "utf-8");
let index = fs.readFileSync(path.join(sitePath, "index.html"), "utf-8");
let tempo = fs.readFileSync(path.join(sitePath, "tempo.html"), "utf-8");
let visao = fs.readFileSync(path.join(sitePath, "visao.html"), "utf-8");

let style = fs.readFileSync(path.join(sitePath, "css/style.css"), "utf-8");
let it = fs.readFileSync(path.join(sitePath, "css/it.css"), "utf-8");
let vc = fs.readFileSync(path.join(sitePath, "css/vc.css"), "utf-8");

let script = fs.readFileSync(path.join(sitePath, "js/script.js"), "utf-8");

const port = 45565;

var app = express();

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(index);
});

app.get('/tempo.html', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(tempo);
});

app.get('/visao.html', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(visao);
});

app.get('/armazenamento.html', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(arma);
});


app.get('/css/style.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.end(style);
});

app.get('/css/it.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.end(it);
});

app.get('/css/vc.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.end(vc);
});


app.get('/js/script.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.end(script);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
