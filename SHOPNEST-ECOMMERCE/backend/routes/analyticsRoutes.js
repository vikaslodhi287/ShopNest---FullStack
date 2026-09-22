const express = require('express');
const { getAdminStats } = require('../controllers/analyticsController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', protect, admin, getAdminStats);

module.exports = router;