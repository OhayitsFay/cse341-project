const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    res.send('Welcome to the Event Planning API');
});

const userRoutes = require('./user');
router.use('/users', userRoutes);

const infoRoutes = require('./info');
router.use('/info', infoRoutes);

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;