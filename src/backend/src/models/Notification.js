const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['registration', 'payment', 'course', 'news', 'system'], 
    default: 'system' 
  },
  isRead: { type: Boolean, default: false },
  link: String // Link điều hướng khi click vào thông báo
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
