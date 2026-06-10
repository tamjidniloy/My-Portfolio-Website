const express = require('express');
const { getSettings, upsertSettings } = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', getSettings);
router.put('/', protect, upsertSettings);
router.post('/', protect, upsertSettings);
module.exports = router;
