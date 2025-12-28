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

// Team Data
const teamData = [
  {
    name: 'TS. Nguyễn Văn An',
    position: 'Giám đốc Trung tâm',
    bio: 'Tiến sĩ Khoa học Máy tính tại Đại học Stanford. Hơn 15 năm kinh nghiệm trong lĩnh vực AI và Machine Learning.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    email: 'an.nguyen@aicenter.edu.vn',
    phone: '0901234567',
    facebook: 'https://facebook.com',
    order: 1,
    isActive: true
  },
  {
    name: 'ThS. Trần Thị Bình',
    position: 'Phó Giám đốc',
    bio: 'Thạc sĩ AI tại MIT. Chuyên gia về Deep Learning và Computer Vision với nhiều công trình nghiên cứu được công bố quốc tế.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    email: 'binh.tran@aicenter.edu.vn',
    phone: '0901234568',
    facebook: 'https://facebook.com',
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
    facebook: 'https://facebook.com',
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
    facebook: 'https://facebook.com',
    order: 4,
    isActive: true
  },
  {
    name: 'KS. Hoàng Văn Em',
    position: 'Giảng viên Deep Learning',
    bio: 'Kỹ sư AI tại Microsoft. Chuyên gia về Neural Networks và Reinforcement Learning.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    email: 'em.hoang@aicenter.edu.vn',
    phone: '0901234571',
    facebook: 'https://facebook.com',
    order: 5,
    isActive: true
  },
  {
    name: 'ThS. Vũ Thị Phương',
    position: 'Giảng viên Data Science',
    bio: 'Thạc sĩ Thống kê ứng dụng. Chuyên gia phân tích dữ liệu với kinh nghiệm làm việc tại các tập đoàn lớn.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    email: 'phuong.vu@aicenter.edu.vn',
    phone: '0901234572',
    facebook: 'https://facebook.com',
    order: 6,
    isActive: true
  }
];

// Partners Data
const partnersData = [
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
    website: 'https://google.com',
    description: 'Đối tác công nghệ hàng đầu',
    order: 1,
    isActive: true
  },
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
    website: 'https://microsoft.com',
    description: 'Đối tác đào tạo và chứng chỉ',
    order: 2,
    isActive: true
  },
  {
    name: 'NVIDIA',
    logo: 'https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/1200px-Nvidia_logo.svg.png',
    website: 'https://nvidia.com',
    description: 'Đối tác phần cứng AI',
    order: 3,
    isActive: true
  },
  {
    name: 'AWS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png',
    website: 'https://aws.amazon.com',
    description: 'Đối tác cloud computing',
    order: 4,
    isActive: true
  }
];

// Seed all data
const seedAll = async () => {
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
    console.log('👤 Creating users...');
    const admin = await User.create({
      name: 'Admin AI Center',
      email: 'admin@aicenter.vn',
      password: 'admin123',
      role: 'admin'
    });

    const users = await User.create([
      { name: 'Nguyễn Văn A', email: 'user1@example.com', password: 'user123', role: 'user' },
      { name: 'Trần Thị B', email: 'user2@example.com', password: 'user123', role: 'user' },
      { name: 'User Demo', email: 'user@gmail.com', password: 'user123', role: 'user' }
    ]);
    console.log('✅ Users created');

    // Create Team
    console.log('👥 Creating team...');
    await Team.insertMany(teamData);
    console.log('✅ Team created');

    // Create Partners
    console.log('🤝 Creating partners...');
    await Partner.insertMany(partnersData);
    console.log('✅ Partners created');

    // Create Courses
    console.log('📚 Creating courses...');
    const courses = await Course.create([
      {
        title: 'Machine Learning cơ bản',
        description: 'Khóa học giới thiệu về Machine Learning, các thuật toán cơ bản và ứng dụng thực tế',
        content: 'Khóa học bao gồm: Linear Regression, Logistic Regression, Decision Trees, Random Forest, SVM, Neural Networks cơ bản',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
        duration: '12 tuần',
        level: 'beginner',
        price: 5000000,
        instructor: 'TS. Nguyễn Văn An',
        category: 'machine-learning',
        isActive: true
      },
      {
        title: 'Deep Learning với TensorFlow',
        description: 'Học cách xây dựng và training các mô hình Deep Learning sử dụng TensorFlow',
        content: 'CNN, RNN, LSTM, Transfer Learning, Model Optimization',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        duration: '16 tuần',
        level: 'intermediate',
        price: 7000000,
        instructor: 'ThS. Trần Thị Bình',
        category: 'deep-learning',
        isActive: true
      },
      {
        title: 'Natural Language Processing',
        description: 'Xử lý ngôn ngữ tự nhiên với Python, từ cơ bản đến nâng cao',
        content: 'Text preprocessing, Word embeddings, Transformers, BERT, GPT',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
        duration: '14 tuần',
        level: 'intermediate',
        price: 6500000,
        instructor: 'ThS. Lê Minh Cường',
        category: 'nlp',
        isActive: true
      },
      {
        title: 'Computer Vision với OpenCV',
        description: 'Khóa học về xử lý ảnh và Computer Vision',
        content: 'Image processing, Object detection, Face recognition, Image segmentation',
        image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800',
        duration: '12 tuần',
        level: 'intermediate',
        price: 6000000,
        instructor: 'KS. Phạm Thị Dung',
        category: 'computer-vision',
        isActive: true
      },
      {
        title: 'Python cho Data Science',
        description: 'Nền tảng Python cho Data Science và Machine Learning',
        content: 'NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
        duration: '8 tuần',
        level: 'beginner',
        price: 4000000,
        instructor: 'ThS. Lê Minh Cường',
        category: 'machine-learning',
        isActive: true
      },
      {
        title: 'AI cho Doanh nghiệp',
        description: 'Ứng dụng AI vào giải quyết các bài toán thực tế trong doanh nghiệp',
        content: 'Business Analytics, Predictive Modeling, Recommendation Systems, Chatbots',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        duration: '10 tuần',
        level: 'beginner',
        price: 5500000,
        instructor: 'TS. Nguyễn Văn An',
        category: 'ai-business',
        isActive: true
      }
    ]);
    console.log('✅ Courses created');

    // Create Course Batches
    console.log('📅 Creating course batches...');
    const now = new Date();
    for (const course of courses) {
      await CourseBatch.create([
        {
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
        }
      ]);
    }
    console.log('✅ Course batches created');

    // Create News
    console.log('📰 Creating news...');
    await News.create([
      {
        title: 'AI Center khai giảng khóa học Machine Learning mới',
        summary: 'Khóa học Machine Learning cơ bản dành cho người mới bắt đầu sẽ khai giảng vào tháng 2/2025',
        content: 'AI Center vui mừng thông báo khai giảng khóa học Machine Learning cơ bản dành cho người mới bắt đầu. Khóa học sẽ bắt đầu từ ngày 15/02/2025 với đội ngũ giảng viên giàu kinh nghiệm.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Machine Learning', 'Khóa học', 'Khai giảng'],
        views: 150,
        isPublished: true
      },
      {
        title: 'Hội thảo về Deep Learning và ứng dụng',
        summary: 'Tham gia hội thảo miễn phí về Deep Learning và các ứng dụng trong thực tế',
        content: 'AI Center tổ chức hội thảo về Deep Learning với sự tham gia của các chuyên gia hàng đầu trong lĩnh vực AI.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Deep Learning', 'Hội thảo', 'AI'],
        views: 230,
        isPublished: true
      },
      {
        title: 'Xu hướng AI năm 2025',
        summary: 'Những xu hướng công nghệ AI đáng chú ý trong năm 2025',
        content: 'Năm 2025 hứa hẹn là một năm bùng nổ của AI với nhiều công nghệ mới như GPT-5, Multimodal AI, AI trong Healthcare.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        author: admin._id,
        category: 'AI',
        tags: ['AI', 'Xu hướng', '2025'],
        views: 450,
        isPublished: true
      }
    ]);
    console.log('✅ News created');

    // Create Notifications
    console.log('🔔 Creating notifications...');
    for (const user of users) {
      await Notification.create([
        {
          user: user._id,
          title: 'Chào mừng bạn đến với AI Center!',
          message: 'Cảm ơn bạn đã đăng ký tài khoản. Khám phá các khóa học AI hấp dẫn ngay!',
          type: 'system',
          isRead: false
        },
        {
          user: user._id,
          title: 'Khóa học mới: Machine Learning cơ bản',
          message: 'Khóa học Machine Learning cơ bản vừa được mở đăng ký. Đăng ký ngay để nhận ưu đãi!',
          type: 'course',
          isRead: false
        }
      ]);
    }
    console.log('✅ Notifications created');

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 SEED DATA SUMMARY:');
    console.log('='.repeat(50));
    console.log(`👤 Users: ${await User.countDocuments()}`);
    console.log(`👥 Team: ${await Team.countDocuments()}`);
    console.log(`🤝 Partners: ${await Partner.countDocuments()}`);
    console.log(`📚 Courses: ${await Course.countDocuments()}`);
    console.log(`📅 Course Batches: ${await CourseBatch.countDocuments()}`);
    console.log(`📰 News: ${await News.countDocuments()}`);
    console.log(`🔔 Notifications: ${await Notification.countDocuments()}`);
    
    console.log('\n🔑 LOGIN CREDENTIALS:');
    console.log('Admin: admin@aicenter.vn / admin123');
    console.log('User: user@gmail.com / user123');
    
    console.log('\n✅ All seed data completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run
const run = async () => {
  await connectDB();
  await seedAll();
};

run().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
