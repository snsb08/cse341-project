const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const app = express();

const port = process.env.PORT || 3041;

app
    .use('/', bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to data and running on port ${port}`);
  }
}); 