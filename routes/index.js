const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const passport = require('passport');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
    if (req.session.user) {
        res.send('<p>Hello! Welcome to Event Planning</p>' +
          '<br> <a href="/api-docs">API Documentation</a>' +
          '<br> Logged in as: ' + req.session.user.name  +
          '<br> <a href="/logout">Logout</a>');
    } else {
        res.send('<p>Hello! Welcome to Event Planning</p>' +
          '<br> <a href="/api-docs">API Documentation</a>' +
          '<br> <a href="/auth/github">Login with GitHub</a>');
    }
});
    
router.get('/auth/github', passport.authenticate('github'));
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
    
router.get('/auth/github/callback', passport.authenticate('github', { 
    failureRedirect: '/',
    session: false
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

const userRoutes = require('./user');
router.use('/users', userRoutes);

const infoRoutes = require('./info');
router.use('/info', infoRoutes);


module.exports = router;