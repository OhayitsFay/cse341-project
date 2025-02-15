const router = require('express').Router();

const userController = require('../controllers/user');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);
router.post('/', isAuthenticated, userController.addUser);
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;