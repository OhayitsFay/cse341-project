const express = require('express');

const infoController = require('../controllers/info.js');
const { isAuthenticated } = require('../middleware/authenticate.js');


const router = express.Router();

// GET /feed/posts
router.get('/', infoController.getAllInfo);
router.get('/:id', infoController.getInfoById);
router.post('/', isAuthenticated, infoController.addEvent);
router.put('/:id', isAuthenticated, infoController.updateEvent);
router.delete('/:id', isAuthenticated, infoController.deleteEvent);

module.exports = router;