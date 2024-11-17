const authMiddleware = require("../middlewares/auth.middleware.js");
const userControllers = require('../controllers/user_controllers');
const router = require('express').Router();

router.get('/', authMiddleware, userControllers.getAllUsers);
router.get('/get-by-id', authMiddleware, userControllers.getUserById);
router.post('/login', userControllers.login);
router.post('/register', userControllers.createUser);
router.put('/', authMiddleware, userControllers.updateUser);
router.delete('/', authMiddleware ,userControllers.deleteUser);

module.exports = router;
