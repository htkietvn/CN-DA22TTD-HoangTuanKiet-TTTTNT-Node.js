const Notification = require('../models/Notification');

// Lấy thông báo của user đang đăng nhập
exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    
    const unreadCount = await Notification.countDocuments({ 
      user: req.user._id, 
      isRead: false 
    });

    res.json({ notifications, unreadCount });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Đánh dấu đã đọc 1 thông báo
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Đánh dấu tất cả đã đọc
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { isRead: true }
    );

    res.json({ message: 'Đã đánh dấu tất cả là đã đọc' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Xóa thông báo
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!notification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo' });
    }

    res.json({ message: 'Đã xóa thông báo' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Admin: Gửi thông báo đến 1 user
exports.sendToUser = async (req, res) => {
  try {
    const { userId, title, message, type, link } = req.body;
    
    console.log('=== SEND NOTIFICATION ===');
    console.log('Body:', req.body);
    console.log('userId:', userId);

    if (!userId) {
      return res.status(400).json({ message: 'Thiếu userId' });
    }

    const notification = await Notification.create({
      user: userId,
      title,
      message,
      type: type || 'system',
      link
    });

    console.log('Created notification:', notification);
    res.status(201).json(notification);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Admin: Gửi thông báo đến tất cả user
exports.sendToAll = async (req, res) => {
  try {
    const { title, message, type, link } = req.body;
    const User = require('../models/User');
    
    const users = await User.find({ role: 'user' }).select('_id');
    
    const notifications = users.map(user => ({
      user: user._id,
      title,
      message,
      type: type || 'system',
      link
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({ message: `Đã gửi thông báo đến ${users.length} người dùng` });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Admin: Lấy tất cả thông báo
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Admin: Sửa thông báo
exports.updateNotification = async (req, res) => {
  try {
    const { title, message, type, link } = req.body;
    
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { title, message, type, link },
      { new: true }
    ).populate('user', 'name email');

    if (!notification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Admin: Xóa thông báo
exports.adminDeleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo' });
    }

    res.json({ message: 'Đã xóa thông báo' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
