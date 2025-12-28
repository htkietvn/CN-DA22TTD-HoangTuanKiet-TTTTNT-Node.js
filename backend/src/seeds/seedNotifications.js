const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const User = require('../models/User');
require('dotenv').config();

const seedNotifications = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Lấy danh sách user (không phải admin)
    const users = await User.find({ role: 'user' });
    
    if (users.length === 0) {
      console.log('Không có user nào để gửi thông báo!');
      process.exit(0);
    }

    // Xóa thông báo cũ
    await Notification.deleteMany({});
    console.log('Đã xóa thông báo cũ');

    const notifications = [];

    // Tạo thông báo mẫu cho mỗi user
    for (const user of users) {
      notifications.push(
        {
          user: user._id,
          title: 'Chào mừng bạn đến với AI Center!',
          message: 'Cảm ơn bạn đã đăng ký tài khoản. Khám phá các khóa học AI hấp dẫn ngay!',
          type: 'system',
          isRead: false,
          link: '/courses'
        },
        {
          user: user._id,
          title: 'Khóa học mới: Machine Learning cơ bản',
          message: 'Khóa học Machine Learning dành cho người mới bắt đầu đã mở đăng ký. Ưu đãi 20% cho 50 học viên đầu tiên!',
          type: 'course',
          isRead: false,
          link: '/courses'
        },
        {
          user: user._id,
          title: 'Đăng ký khóa học thành công',
          message: 'Bạn đã đăng ký thành công khóa học. Vui lòng thanh toán để hoàn tất.',
          type: 'registration',
          isRead: true,
          link: '/my-courses'
        },
        {
          user: user._id,
          title: 'Tin tức: AI Center hợp tác với Google',
          message: 'AI Center chính thức trở thành đối tác đào tạo của Google tại Việt Nam.',
          type: 'news',
          isRead: true,
          link: '/news'
        }
      );
    }

    await Notification.insertMany(notifications);
    console.log(`Đã tạo ${notifications.length} thông báo cho ${users.length} user`);

    process.exit(0);
  } catch (error) {
    console.error('Lỗi:', error);
    process.exit(1);
  }
};

seedNotifications();
