const chatControllers = require('../controllers/chat_controllers');
const router = require('express').Router();

router.get('/', chatControllers.getMyChats);
router.post('/', chatControllers.createChat);

module.exports = router;
