const mongoose = require('mongoose');
const CourseBatch = require('../models/CourseBatch');
const Course = require('../models/Course');
require('dotenv').config();

const seedBatches = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Lấy danh sách khóa học
    const courses = await Course.find();
    if (courses.length === 0) {
      console.log('Chưa có khóa học nào. Vui lòng seed courses trước.');
      process.exit(1);
    }

    // Xóa dữ liệu cũ
    await CourseBatch.deleteMany({});
    console.log('Đã xóa dữ liệu đợt học cũ');

    const batches = [];
    
    // Tạo 2 đợt học cho mỗi khóa học
    for (const course of courses) {
      batches.push({
        course: course._id,
        batchName: 'Đợt 1 - Tháng 1/2025',
        startDate: new Date('2025-01-15'),
        endDate: new Date('2025-03-15'),
        registrationDeadline: new Date('2025-01-10'),
        schedule: 'Thứ 2, 4, 6 - 19:00-21:00',
        location: 'AI Center - 126 Nguyễn Huệ, TP. Vĩnh Long',
        maxStudents: 30,
        currentStudents: Math.floor(Math.random() * 15),
        price: course.price,
        status: 'open'
      });

      batches.push({
        course: course._id,
        batchName: 'Đợt 2 - Tháng 3/2025',
        startDate: new Date('2025-03-20'),
        endDate: new Date('2025-05-20'),
        registrationDeadline: new Date('2025-03-15'),
        schedule: 'Thứ 3, 5, 7 - 18:30-20:30',
        location: 'Online qua Zoom',
        maxStudents: 25,
        currentStudents: 0,
        price: course.price,
        status: 'upcoming'
      });
    }

    await CourseBatch.insertMany(batches);
    console.log(`Đã tạo ${batches.length} đợt học`);

    process.exit(0);
  } catch (error) {
    console.error('Lỗi:', error);
    process.exit(1);
  }
};

seedBatches();
