const express = require('express');
const {
  registerCourse,
  getMyRegistrations,
  cancelRegistration,
  getAllRegistrations,
  updateRegistrationStatus,
  updatePaymentStatus,
  deleteRegistration
} = require('../controllers/registrationController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

// User routes
router.post('/', protect, registerCourse);
router.get('/my-registrations', protect, getMyRegistrations);
router.delete('/cancel/:id', protect, cancelRegistration);

// Admin routes
router.get('/all', protect, admin, getAllRegistrations);
router.patch('/:id/status', protect, admin, updateRegistrationStatus);
router.patch('/:id/payment', protect, admin, updatePaymentStatus);
router.delete('/:id', protect, admin, deleteRegistration);

module.exports = router;
