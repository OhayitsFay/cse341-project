const express = require('express');

const infoController = require('../controllers/info.js');
const { isAutehnticated } = require('../middleware/authenticate.js');


const router = express.Router();

// GET /feed/posts
router.get('/', infoController.getAllInfo);
router.get('/:id', infoController.getInfoById);
router.post('/', isAutehnticated, infoController.addEvent);
router.put('/:id', isAutehnticated, infoController.updateEvent);
router.delete('/:id', isAutehnticated, infoController.deleteEvent);

module.exports = router;