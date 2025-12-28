const express = require('express');
const { register, login, getProfile, updateProfile, uploadAvatar, changePassword, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const uploadLocal = require('../middleware/uploadLocal');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/upload-avatar', protect, uploadLocal.single('avatar'), uploadAvatar);
router.put('/change-password', protect, changePassword);

module.exports = router;
