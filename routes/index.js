const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});
const infoRoutes = require('./info');
router.use('/info', infoRoutes);

const userRoutes = require('./user');
router.use('/user', userRoutes);

module.exports = router;