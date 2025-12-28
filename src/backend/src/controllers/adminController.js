const User = require('../models/User');
const Course = require('../models/Course');
const News = require('../models/News');
const Registration = require('../models/Registration');
const Feedback = require('../models/Feedback');
const Partner = require('../models/Partner');

exports.getDashboardStats = async (req, res) => {
  try {
    // Thống kê cơ bản
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalNews = await News.countDocuments();
    const totalRegistrations = await Registration.countDocuments();
    const totalFeedbacks = await Feedback.countDocuments();
    const totalPartners = await Partner.countDocuments();

    // Thống kê đăng ký theo trạng thái
    const pendingRegistrations = await Registration.countDocuments({ status: 'pending' });
    const approvedRegistrations = await Registration.countDocuments({ status: 'approved' });
    const rejectedRegistrations = await Registration.countDocuments({ status: 'rejected' });

    // Thống kê user theo role
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const normalUsers = await User.countDocuments({ role: 'user' });

    // Đăng ký gần đây (5 đăng ký mới nhất)
    const recentRegistrations = await Registration.find()
      .populate('user', 'name email')
      .populate('course', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    // Khóa học phổ biến (theo số đăng ký)
    const popularCourses = await Registration.aggregate([
      { $group: { _id: '$course', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'courses', localField: '_id', foreignField: '_id', as: 'course' } },
      { $unwind: '$course' },
      { $project: { title: '$course.title', count: 1 } }
    ]);

    // Phản hồi chưa đọc
    const unreadFeedbacks = await Feedback.countDocuments({ status: 'unread' });

    // Thống kê theo tháng (6 tháng gần nhất)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRegistrations = await Registration.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthlyUsers = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      // Tổng quan
      totalUsers,
      totalCourses,
      totalNews,
      totalRegistrations,
      totalFeedbacks,
      totalPartners,
      
      // Chi tiết đăng ký
      pendingRegistrations,
      approvedRegistrations,
      rejectedRegistrations,
      
      // Chi tiết users
      adminUsers,
      normalUsers,
      
      // Phản hồi
      unreadFeedbacks,
      
      // Danh sách
      recentRegistrations,
      popularCourses,
      
      // Biểu đồ
      monthlyRegistrations,
      monthlyUsers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin reset password cho user
exports.resetUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }

    // Đặt mật khẩu mới là "123456"
    user.password = '123456';
    await user.save();

    res.json({ message: 'Đã reset mật khẩu thành 123456' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin xóa user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
