const Team = require('../models/Team');

// Lấy tất cả thành viên (public)
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Team.find({ isActive: true }).sort({ order: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Lấy chi tiết 1 thành viên
exports.getMemberById = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Không tìm thấy thành viên' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
