const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect, admin } = require('../middleware/auth');

// Routes cho user đã đăng nhập
router.get('/my', protect, notificationController.getMyNotifications);
router.put('/:id/read', protect, notificationController.markAsRead);
router.put('/read-all', protect, notificationController.markAllAsRead);
router.delete('/:id', protect, notificationController.deleteNotification);

// Routes cho admin
router.get('/all', protect, admin, notificationController.getAllNotifications);
router.post('/send', protect, admin, notificationController.sendToUser);
router.post('/send-all', protect, admin, notificationController.sendToAll);
router.put('/admin/:id', protect, admin, notificationController.updateNotification);
router.delete('/admin/:id', protect, admin, notificationController.adminDeleteNotification);

module.exports = router;
