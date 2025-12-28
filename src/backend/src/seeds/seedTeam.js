const mongoose = require('mongoose');
const Team = require('../models/Team');
require('dotenv').config();

const teamData = [
  {
    name: 'TS. Nguyễn Văn An',
    position: 'Giám đốc Trung tâm',
    bio: 'Tiến sĩ Khoa học Máy tính tại Đại học Stanford. Hơn 15 năm kinh nghiệm trong lĩnh vực AI và Machine Learning.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    email: 'an.nguyen@aicenter.edu.vn',
    phone: '0901234567',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
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
    linkedin: 'https://linkedin.com',
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
    linkedin: 'https://linkedin.com',
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
    linkedin: 'https://linkedin.com',
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
    linkedin: 'https://linkedin.com',
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
    linkedin: 'https://linkedin.com',
    order: 6,
    isActive: true
  }
];

const seedTeam = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Team.deleteMany({});
    console.log('Đã xóa dữ liệu team cũ');

    await Team.insertMany(teamData);
    console.log(`Đã tạo ${teamData.length} thành viên đội ngũ`);

    process.exit(0);
  } catch (error) {
    console.error('Lỗi:', error);
    process.exit(1);
  }
};

seedTeam();
