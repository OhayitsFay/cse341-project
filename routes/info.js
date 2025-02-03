const express = require('express');

const infoController = require('../controllers/info');

const router = express.Router();

// GET /feed/posts
router.get('/', infoController.getAllInfo);
router.get('/:id', infoController.getInfoById);
router.post('/', infoController.addEvent);
router.put('/:id', infoController.updateEvent);
router.delete('/:id', infoController.deleteEvent);

module.exports = router;