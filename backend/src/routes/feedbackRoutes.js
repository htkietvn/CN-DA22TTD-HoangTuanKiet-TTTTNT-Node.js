const express = require('express');
const { createFeedback, getFeedbacks, updateFeedbackStatus, deleteFeedback } = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

router.post('/', createFeedback);
router.get('/', protect, admin, getFeedbacks);
router.patch('/:id/status', protect, admin, updateFeedbackStatus);
router.delete('/:id', protect, admin, deleteFeedback);

module.exports = router;
