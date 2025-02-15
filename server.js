const express = require('express');
const mongodb = require('./database/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app
  .use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true }))
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json())

  .use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    next(); 
  })
  .use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']})) // allow to server to accept request from different origin
  .use(cors({origin: '*'}))// allow to server to accept request from different origin
  .use("/", require('./routes/index'));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
    function (_accessToken, _refreshToken, profile, done) {
      return done(null, profile);
    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

app.get('/', (req, res) => { res.send(res.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', { 
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
  });


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        }); // Server is running on port 5000
    }
});

