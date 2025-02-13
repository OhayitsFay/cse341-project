const router = require('express').Router();

const userController = require('../controllers/user');
const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);
router.post('/', isAutehnticated, userController.addUser);
router.put('/:id', isAutehnticated, userController.updateUser);
router.delete('/:id', isAutehnticated, userController.deleteUser);

module.exports = router;