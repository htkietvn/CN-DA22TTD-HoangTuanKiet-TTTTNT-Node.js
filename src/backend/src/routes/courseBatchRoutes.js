const express = require('express');
const {
  getBatchesByCourse,
  getOpenBatches,
  getBatchById,
  getAllBatches,
  createBatch,
  updateBatch,
  deleteBatch,
  updateBatchStatus
} = require('../controllers/courseBatchController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

// Public routes
router.get('/open', getOpenBatches);
router.get('/course/:courseId', getBatchesByCourse);
router.get('/:id', getBatchById);

// Admin routes
router.get('/', protect, admin, getAllBatches);
router.post('/', protect, admin, createBatch);
router.put('/:id', protect, admin, updateBatch);
router.patch('/:id/status', protect, admin, updateBatchStatus);
router.delete('/:id', protect, admin, deleteBatch);

module.exports = router;
