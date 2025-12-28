const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: String,
  image: String,
  duration: String,
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  price: { type: Number, default: 0 },
  originalPrice: { type: Number, default: 0 },
  instructor: String,
  category: String,
  isActive: { type: Boolean, default: true },
  // Chi tiết khóa học
  objectives: [String], // Mục tiêu khóa học
  targetAudience: [String], // Đối tượng học viên
  curriculum: [{
    week: Number,
    title: String,
    topics: [String]
  }],
  schedule: {
    startDate: String,
    time: String,
    location: String
  },
  includes: [String], // Khóa học bao gồm
  discounts: [String], // Ưu đãi
  maxStudents: { type: Number, default: 30 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
