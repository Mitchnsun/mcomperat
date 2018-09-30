const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/dist/cv.min.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'cv.min.js'));
});
app.get('/dist/cv.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'cv.css'));
});
app.get('/assets/data/en/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'data', 'en', 'data.json'));
});
app.get('/assets/data/fr/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'data', 'fr', 'data.json'));
});
app.get('/assets/img/LinkedInSquare.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'img', 'LinkedInSquare.png'));
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
  // eslint-disable-next-line
  console.log(`Server running on port ${port}, ${host}`);
});
