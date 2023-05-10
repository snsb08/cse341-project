const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3041;

// const fs = require('node:fs');

app
    .use('/', bodyParser.json())
    .use(session({
      secret: "secret",
      resave: false,
      saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
    .use(cors({origin:'*'}))
    .use('/', require('./routes'));

passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    })
);

passport.serializeUser((user, done) => {
      done(null, user);
});
passport.deserializeUser((user, done) => {
      done(null, user);
    });

    app.get('/', (req, res) => {
      res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
    });

    app.get('/github/callback', passport.authenticate('github', {
      failureRedirect: '/api-docs', session: false
    }),
    (req, res) => {
      req.session.user = req.user;
      res.redirect('/');
    });

process.on('uncaughtException',(err, origin) => {
  console.log(process.stderr.fd,
    `Caught exception: ${err}` +
    `Exception origin: ${origin}`,
    );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to data and running on port ${port}`);
  }
});  