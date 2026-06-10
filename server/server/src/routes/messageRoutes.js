const express = require('express');
const c = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', c.createMessage);
router.get('/', protect, c.getMessages);
router.patch('/:id/read', protect, c.markAsRead);
router.delete('/:id', protect, c.deleteMessage);
module.exports = router;
