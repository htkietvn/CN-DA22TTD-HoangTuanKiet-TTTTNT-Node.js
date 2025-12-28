const Registration = require('../models/Registration');
const Course = require('../models/Course');
const CourseBatch = require('../models/CourseBatch');

// User đăng ký khóa học
exports.registerCourse = async (req, res) => {
  try {
    const { courseId, batchId } = req.body;
    const userId = req.user._id;

    // Kiểm tra đã đăng ký chưa (cùng khóa học và cùng đợt)
    const query = { user: userId, course: courseId };
    if (batchId) {
      query.batch = batchId;
    }
    
    const existingRegistration = await Registration.findOne(query);

    if (existingRegistration) {
      return res.status(400).json({ message: 'Bạn đã đăng ký khóa học này rồi' });
    }

    // Nếu có batchId, kiểm tra đợt học còn chỗ không
    if (batchId) {
      const batch = await CourseBatch.findById(batchId);
      if (!batch) {
        return res.status(404).json({ message: 'Không tìm thấy đợt học' });
      }
      if (batch.status !== 'open') {
        return res.status(400).json({ message: 'Đợt học này chưa mở đăng ký' });
      }
      if (batch.currentStudents >= batch.maxStudents) {
        return res.status(400).json({ message: 'Đợt học này đã đủ học viên' });
      }
      
      // Tăng số học viên hiện tại của đợt
      await CourseBatch.findByIdAndUpdate(batchId, { $inc: { currentStudents: 1 } });
    }

    // Tạo đăng ký mới
    const registration = await Registration.create({
      user: userId,
      course: courseId,
      batch: batchId || null,
      status: 'pending'
    });

    const populatedRegistration = await Registration.findById(registration._id)
      .populate('course', 'title price duration')
      .populate('batch', 'batchName startDate endDate schedule location')
      .populate('user', 'name email');

    res.status(201).json({
      message: 'Đăng ký khóa học thành công! Vui lòng chờ phê duyệt.',
      registration: populatedRegistration
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User xem khóa học đã đăng ký
exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate('course')
      .populate('batch', 'batchName startDate endDate schedule location')
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User hủy đăng ký khóa học
exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!registration) {
      return res.status(404).json({ message: 'Không tìm thấy đăng ký' });
    }

    if (registration.status === 'approved' && registration.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Không thể hủy đăng ký đã được duyệt và thanh toán' });
    }

    // Giảm số học viên của đợt nếu có
    if (registration.batch) {
      await CourseBatch.findByIdAndUpdate(registration.batch, { $inc: { currentStudents: -1 } });
    }

    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hủy đăng ký thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin lấy tất cả đăng ký
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('user', 'name email phone')
      .populate('course', 'title price duration')
      .populate('batch', 'batchName startDate endDate')
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin phê duyệt/từ chối đăng ký
exports.updateRegistrationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate('user', 'name email')
      .populate('course', 'title');

    res.json({
      message: `Đã ${status === 'approved' ? 'phê duyệt' : 'từ chối'} đăng ký`,
      registration
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin cập nhật trạng thái thanh toán
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    )
      .populate('user', 'name email')
      .populate('course', 'title');

    res.json({
      message: `Đã cập nhật trạng thái thanh toán thành ${paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}`,
      registration
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin xóa đăng ký
exports.deleteRegistration = async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa đăng ký' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
