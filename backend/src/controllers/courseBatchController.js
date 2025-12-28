const CourseBatch = require('../models/CourseBatch');
const Course = require('../models/Course');

// Lấy tất cả đợt học của một khóa học
exports.getBatchesByCourse = async (req, res) => {
  try {
    const batches = await CourseBatch.find({ 
      course: req.params.courseId
    }).sort({ startDate: 1 });
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy các đợt học đang mở đăng ký
exports.getOpenBatches = async (req, res) => {
  try {
    const batches = await CourseBatch.find({ 
      status: 'open',
      isActive: true 
    })
    .populate('course', 'title image price')
    .sort({ startDate: 1 });
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết một đợt học
exports.getBatchById = async (req, res) => {
  try {
    const batch = await CourseBatch.findById(req.params.id)
      .populate('course');
    if (!batch) {
      return res.status(404).json({ message: 'Không tìm thấy đợt học' });
    }
    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Lấy tất cả đợt học
exports.getAllBatches = async (req, res) => {
  try {
    const batches = await CourseBatch.find()
      .populate('course', 'title')
      .sort({ createdAt: -1 });
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Tạo đợt học mới
exports.createBatch = async (req, res) => {
  try {
    const { courseId, batchName, startDate, endDate, registrationDeadline, schedule, location, maxStudents, price, status } = req.body;

    // Kiểm tra khóa học tồn tại
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Khóa học không tồn tại' });
    }

    const batch = await CourseBatch.create({
      course: courseId,
      batchName,
      startDate,
      endDate,
      registrationDeadline,
      schedule,
      location,
      maxStudents: maxStudents || 30,
      price: price || course.price,
      status: status || 'upcoming'
    });

    const populatedBatch = await CourseBatch.findById(batch._id).populate('course', 'title');
    res.status(201).json(populatedBatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Cập nhật đợt học
exports.updateBatch = async (req, res) => {
  try {
    const batch = await CourseBatch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('course', 'title');

    if (!batch) {
      return res.status(404).json({ message: 'Không tìm thấy đợt học' });
    }
    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Xóa đợt học
exports.deleteBatch = async (req, res) => {
  try {
    const batch = await CourseBatch.findByIdAndDelete(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: 'Không tìm thấy đợt học' });
    }
    res.json({ message: 'Đã xóa đợt học' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Cập nhật trạng thái đợt học
exports.updateBatchStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const batch = await CourseBatch.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('course', 'title');

    if (!batch) {
      return res.status(404).json({ message: 'Không tìm thấy đợt học' });
    }
    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
