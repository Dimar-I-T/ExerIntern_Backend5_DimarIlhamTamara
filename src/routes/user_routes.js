const userControllers = require('../controllers/user_controllers');
const router = require('express').Router();

router.get('/', userControllers.getAllUsers);
router.get('/get-by-id', userControllers.getUserById);
router.post('/login', userControllers.login);
router.post('/register', userControllers.createUser);
router.put('/', userControllers.updateUser);
router.delete('/', userControllers.deleteUser);

module.exports = router;
