const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Course = require('../models/Course');
const News = require('../models/News');
const Feedback = require('../models/Feedback');
const Team = require('../models/Team');
const Partner = require('../models/Partner');
const Notification = require('../models/Notification');
const CourseBatch = require('../models/CourseBatch');
const Registration = require('../models/Registration');

// Import backup data
const coursesData = require('../../backup/courses.json');
const newsData = require('../../backup/news.json');
const partnersData = require('../../backup/partners.json');
const feedbacksData = require('../../backup/feedbacks.json');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const restoreData = async () => {
  try {
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Course.deleteMany({});
    await News.deleteMany({});
    await Feedback.deleteMany({});
    await Team.deleteMany({});
    await Partner.deleteMany({});
    await Notification.deleteMany({});
    await CourseBatch.deleteMany({});
    await Registration.deleteMany({});

    // 1. Create Users (only admin and user with correct passwords)
    console.log('👤 Creating users...');
    const admin = await User.create({
      name: 'Admin AI Center',
      email: 'admin@aicenter.vn',
      password: 'admin123',
      role: 'admin'
    });

    const user = await User.create({
      name: 'Nguyễn Văn A',
      email: 'user@gmail.com',
      password: 'user123',
      role: 'user'
    });
    console.log('✅ Users created');

    // 2. Restore Courses from backup
    console.log('📚 Restoring courses...');
    const courseIdMap = {};
    for (const course of coursesData) {
      const oldId = course._id;
      delete course._id;
      delete course.__v;
      const newCourse = await Course.create(course);
      courseIdMap[oldId] = newCourse._id;
    }
    console.log(`✅ ${coursesData.length} courses restored`);

    // 3. Restore News from backup (update author to new admin id)
    console.log('📰 Restoring news...');
    for (const news of newsData) {
      delete news._id;
      delete news.__v;
      news.author = admin._id; // Use new admin id
      await News.create(news);
    }
    console.log(`✅ ${newsData.length} news restored`);

    // 4. Restore Partners from backup
    console.log('🤝 Restoring partners...');
    for (const partner of partnersData) {
      delete partner._id;
      delete partner.__v;
      await Partner.create(partner);
    }
    console.log(`✅ ${partnersData.length} partners restored`);

    // 5. Restore Feedbacks from backup
    console.log('💬 Restoring feedbacks...');
    for (const feedback of feedbacksData) {
      delete feedback._id;
      delete feedback.__v;
      await Feedback.create(feedback);
    }
    console.log(`✅ ${feedbacksData.length} feedbacks restored`);

    // 6. Create Team
    console.log('👥 Creating team...');
    const teamData = [
      {
        name: 'TS. Nguyễn Văn An',
        position: 'Giám đốc Trung tâm',
        bio: 'Tiến sĩ Khoa học Máy tính tại Đại học Stanford. Hơn 15 năm kinh nghiệm trong lĩnh vực AI và Machine Learning.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        email: 'an.nguyen@aicenter.edu.vn',
        phone: '0901234567',
        order: 1,
        isActive: true
      },
      {
        name: 'ThS. Trần Thị Bình',
        position: 'Phó Giám đốc',
        bio: 'Thạc sĩ AI tại MIT. Chuyên gia về Deep Learning và Computer Vision.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        email: 'binh.tran@aicenter.edu.vn',
        phone: '0901234568',
        order: 2,
        isActive: true
      },
      {
        name: 'ThS. Lê Minh Cường',
        position: 'Trưởng phòng Đào tạo',
        bio: 'Thạc sĩ Khoa học Dữ liệu. 10 năm kinh nghiệm giảng dạy và phát triển chương trình đào tạo AI.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        email: 'cuong.le@aicenter.edu.vn',
        phone: '0901234569',
        order: 3,
        isActive: true
      },
      {
        name: 'KS. Phạm Thị Dung',
        position: 'Giảng viên Machine Learning',
        bio: 'Kỹ sư AI tại Google. Chuyên gia về NLP và các mô hình ngôn ngữ lớn.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        email: 'dung.pham@aicenter.edu.vn',
        phone: '0901234570',
        order: 4,
        isActive: true
      }
    ];
    await Team.insertMany(teamData);
    console.log('✅ Team created');

    // 7. Create Course Batches
    console.log('📅 Creating course batches...');
    const courses = await Course.find({});
    const now = new Date();
    for (const course of courses.slice(0, 6)) {
      await CourseBatch.create({
        course: course._id,
        batchName: `Đợt 1 - Tháng ${now.getMonth() + 2}/2025`,
        startDate: new Date(2025, now.getMonth() + 1, 15),
        endDate: new Date(2025, now.getMonth() + 4, 15),
        schedule: 'Thứ 3, 5, 7 (19:00 - 21:00)',
        location: 'AI Center - 126 Nguyễn Huệ, TP. Vĩnh Long',
        maxStudents: 30,
        currentStudents: Math.floor(Math.random() * 15),
        price: course.price,
        status: 'open',
        registrationDeadline: new Date(2025, now.getMonth() + 1, 10)
      });
    }
    console.log('✅ Course batches created');

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESTORE DATA SUMMARY:');
    console.log('='.repeat(50));
    console.log(`👤 Users: ${await User.countDocuments()}`);
    console.log(`👥 Team: ${await Team.countDocuments()}`);
    console.log(`🤝 Partners: ${await Partner.countDocuments()}`);
    console.log(`📚 Courses: ${await Course.countDocuments()}`);
    console.log(`📅 Course Batches: ${await CourseBatch.countDocuments()}`);
    console.log(`📰 News: ${await News.countDocuments()}`);
    console.log(`💬 Feedbacks: ${await Feedback.countDocuments()}`);
    
    console.log('\n🔑 LOGIN CREDENTIALS:');
    console.log('Admin: admin@aicenter.vn / admin123');
    console.log('User: user@gmail.com / user123');
    
    console.log('\n✅ All data restored successfully!');
    
  } catch (error) {
    console.error('❌ Error restoring data:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run
const run = async () => {
  await connectDB();
  await restoreData();
};

run().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
