const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Course = require('../models/Course');
const News = require('../models/News');
const Project = require('../models/Project');
const Feedback = require('../models/Feedback');

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

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Course.deleteMany({});
    await News.deleteMany({});
    await Project.deleteMany({});
    await Feedback.deleteMany({});

    // Create Admin User
    console.log('👤 Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin AI Center',
      email: 'admin@aicenter.vn',
      password: adminPassword,
      role: 'admin'
    });

    // Create Regular Users
    const userPassword = await bcrypt.hash('user123', 10);
    await User.create([
      {
        name: 'Nguyễn Văn A',
        email: 'user1@example.com',
        password: userPassword,
        role: 'user'
      },
      {
        name: 'Trần Thị B',
        email: 'user2@example.com',
        password: userPassword,
        role: 'user'
      },
      {
        name: 'User Demo',
        email: 'user@gmail.com',
        password: userPassword,
        role: 'user'
      }
    ]);

    console.log('✅ Users created');

    // Create Courses
    console.log('📚 Creating courses...');
    await Course.create([
      // Machine Learning (5 khóa)
      {
        title: 'Machine Learning cơ bản',
        description: 'Khóa học giới thiệu về Machine Learning, các thuật toán cơ bản và ứng dụng thực tế',
        content: 'Khóa học bao gồm: Linear Regression, Logistic Regression, Decision Trees, Random Forest, SVM, Neural Networks cơ bản',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
        duration: '12 tuần',
        level: 'beginner',
        price: 5000000,
        instructor: 'TS. Nguyễn Văn A',
        category: 'machine-learning',
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
        instructor: 'ThS. Lê Văn C',
        category: 'machine-learning',
        isActive: true
      },
      {
        title: 'Machine Learning nâng cao',
        description: 'Các thuật toán ML nâng cao và tối ưu hóa mô hình',
        content: 'Ensemble Methods, Gradient Boosting, XGBoost, Feature Engineering, Model Tuning',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        duration: '14 tuần',
        level: 'advanced',
        price: 7500000,
        instructor: 'TS. Nguyễn Văn A',
        category: 'machine-learning',
        isActive: true
      },
      {
        title: 'Time Series Analysis với ML',
        description: 'Phân tích và dự đoán chuỗi thời gian sử dụng Machine Learning',
        content: 'ARIMA, Prophet, LSTM for Time Series, Forecasting Techniques',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        duration: '10 tuần',
        level: 'intermediate',
        price: 6000000,
        instructor: 'ThS. Lê Văn C',
        category: 'machine-learning',
        isActive: true
      },
      {
        title: 'Reinforcement Learning cơ bản',
        description: 'Học tăng cường từ cơ bản đến ứng dụng thực tế',
        content: 'Q-Learning, Deep Q-Networks, Policy Gradients, Actor-Critic',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        duration: '12 tuần',
        level: 'advanced',
        price: 8000000,
        instructor: 'TS. Nguyễn Văn A',
        category: 'machine-learning',
        isActive: true
      },

      // Deep Learning (5 khóa)
      {
        title: 'Deep Learning với TensorFlow',
        description: 'Học cách xây dựng và training các mô hình Deep Learning sử dụng TensorFlow',
        content: 'CNN, RNN, LSTM, Transfer Learning, Model Optimization',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        duration: '16 tuần',
        level: 'intermediate',
        price: 7000000,
        instructor: 'TS. Trần Thị B',
        category: 'deep-learning',
        isActive: true
      },
      {
        title: 'Deep Learning với PyTorch',
        description: 'Xây dựng mô hình Deep Learning với PyTorch framework',
        content: 'PyTorch Basics, CNN, RNN, GANs, Model Deployment',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        duration: '16 tuần',
        level: 'intermediate',
        price: 7000000,
        instructor: 'TS. Trần Thị B',
        category: 'deep-learning',
        isActive: true
      },
      {
        title: 'Convolutional Neural Networks',
        description: 'Chuyên sâu về CNN và ứng dụng trong Computer Vision',
        content: 'CNN Architecture, ResNet, VGG, Inception, Object Detection',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800',
        duration: '12 tuần',
        level: 'advanced',
        price: 7500000,
        instructor: 'TS. Phạm Thị D',
        category: 'deep-learning',
        isActive: true
      },
      {
        title: 'Recurrent Neural Networks',
        description: 'RNN, LSTM, GRU và ứng dụng trong xử lý chuỗi',
        content: 'RNN Fundamentals, LSTM, GRU, Sequence-to-Sequence, Attention Mechanism',
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800',
        duration: '12 tuần',
        level: 'advanced',
        price: 7500000,
        instructor: 'ThS. Lê Văn C',
        category: 'deep-learning',
        isActive: true
      },
      {
        title: 'Generative AI và GANs',
        description: 'Tạo sinh nội dung với GANs và các mô hình Generative',
        content: 'GANs, VAE, Diffusion Models, StyleGAN, Image Generation',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
        duration: '14 tuần',
        level: 'advanced',
        price: 8500000,
        instructor: 'TS. Trần Thị B',
        category: 'deep-learning',
        isActive: true
      },

      // NLP (5 khóa)
      {
        title: 'Natural Language Processing',
        description: 'Xử lý ngôn ngữ tự nhiên với Python, từ cơ bản đến nâng cao',
        content: 'Text preprocessing, Word embeddings, Transformers, BERT, GPT',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
        duration: '14 tuần',
        level: 'intermediate',
        price: 6500000,
        instructor: 'ThS. Lê Văn C',
        category: 'nlp',
        isActive: true
      },
      {
        title: 'NLP cơ bản với Python',
        description: 'Nhập môn xử lý ngôn ngữ tự nhiên cho người mới bắt đầu',
        content: 'Tokenization, POS Tagging, NER, Text Classification, Sentiment Analysis',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        duration: '10 tuần',
        level: 'beginner',
        price: 5000000,
        instructor: 'ThS. Lê Văn C',
        category: 'nlp',
        isActive: true
      },
      {
        title: 'Transformers và BERT',
        description: 'Kiến trúc Transformer và ứng dụng BERT trong NLP',
        content: 'Attention Mechanism, BERT, RoBERTa, Fine-tuning, Transfer Learning',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
        duration: '12 tuần',
        level: 'advanced',
        price: 7500000,
        instructor: 'TS. Trần Thị B',
        category: 'nlp',
        isActive: true
      },
      {
        title: 'Chatbot Development',
        description: 'Xây dựng chatbot thông minh với NLP và Deep Learning',
        content: 'Rasa, Dialogflow, Intent Recognition, Entity Extraction, Conversation Design',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
        duration: '10 tuần',
        level: 'intermediate',
        price: 6000000,
        instructor: 'ThS. Lê Văn C',
        category: 'nlp',
        isActive: true
      },
      {
        title: 'Large Language Models (LLMs)',
        description: 'Làm việc với các mô hình ngôn ngữ lớn như GPT, LLaMA',
        content: 'GPT Architecture, Prompt Engineering, Fine-tuning LLMs, RAG, LangChain',
        image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800',
        duration: '14 tuần',
        level: 'advanced',
        price: 9000000,
        instructor: 'TS. Nguyễn Văn A',
        category: 'nlp',
        isActive: true
      },

      // Computer Vision (5 khóa)
      {
        title: 'Computer Vision với OpenCV',
        description: 'Khóa học về xử lý ảnh và Computer Vision',
        content: 'Image processing, Object detection, Face recognition, Image segmentation',
        image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800',
        duration: '12 tuần',
        level: 'intermediate',
        price: 6000000,
        instructor: 'TS. Phạm Thị D',
        category: 'computer-vision',
        isActive: true
      },
      {
        title: 'Computer Vision cơ bản',
        description: 'Nhập môn Computer Vision và xử lý ảnh số',
        content: 'Image Basics, Filtering, Edge Detection, Feature Extraction, Color Spaces',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
        duration: '10 tuần',
        level: 'beginner',
        price: 5000000,
        instructor: 'TS. Phạm Thị D',
        category: 'computer-vision',
        isActive: true
      },
      {
        title: 'Object Detection và Tracking',
        description: 'Phát hiện và theo dõi đối tượng trong video',
        content: 'YOLO, SSD, Faster R-CNN, Object Tracking, Real-time Detection',
        image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800',
        duration: '12 tuần',
        level: 'advanced',
        price: 7500000,
        instructor: 'TS. Phạm Thị D',
        category: 'computer-vision',
        isActive: true
      },
      {
        title: 'Image Segmentation',
        description: 'Phân đoạn ảnh với Deep Learning',
        content: 'U-Net, Mask R-CNN, Semantic Segmentation, Instance Segmentation',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        duration: '10 tuần',
        level: 'advanced',
        price: 7000000,
        instructor: 'TS. Trần Thị B',
        category: 'computer-vision',
        isActive: true
      },
      {
        title: '3D Computer Vision',
        description: 'Computer Vision trong không gian 3D',
        content: 'Point Cloud Processing, 3D Reconstruction, SLAM, Depth Estimation',
        image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800',
        duration: '14 tuần',
        level: 'advanced',
        price: 8500000,
        instructor: 'TS. Phạm Thị D',
        category: 'computer-vision',
        isActive: true
      },

      // AI Business (5 khóa)
      {
        title: 'AI cho Doanh nghiệp',
        description: 'Ứng dụng AI vào giải quyết các bài toán thực tế trong doanh nghiệp',
        content: 'Business Analytics, Predictive Modeling, Recommendation Systems, Chatbots',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        duration: '10 tuần',
        level: 'beginner',
        price: 5500000,
        instructor: 'TS. Nguyễn Văn A',
        category: 'ai-business',
        isActive: true
      },
      {
        title: 'AI Strategy cho Lãnh đạo',
        description: 'Chiến lược triển khai AI trong tổ chức',
        content: 'AI Transformation, ROI Analysis, Team Building, Ethics in AI',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        duration: '6 tuần',
        level: 'beginner',
        price: 4500000,
        instructor: 'TS. Nguyễn Văn A',
        category: 'ai-business',
        isActive: true
      },
      {
        title: 'Customer Analytics với AI',
        description: 'Phân tích hành vi khách hàng bằng AI',
        content: 'Customer Segmentation, Churn Prediction, Lifetime Value, Personalization',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800',
        duration: '8 tuần',
        level: 'intermediate',
        price: 6000000,
        instructor: 'ThS. Lê Văn C',
        category: 'ai-business',
        isActive: true
      },
      {
        title: 'AI trong Marketing',
        description: 'Ứng dụng AI để tối ưu hóa chiến dịch Marketing',
        content: 'Marketing Automation, Ad Optimization, Content Generation, Social Media Analytics',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
        duration: '8 tuần',
        level: 'intermediate',
        price: 5500000,
        instructor: 'ThS. Lê Văn C',
        category: 'ai-business',
        isActive: true
      },
      {
        title: 'AI trong Finance',
        description: 'Ứng dụng AI trong lĩnh vực tài chính ngân hàng',
        content: 'Fraud Detection, Credit Scoring, Algorithmic Trading, Risk Management',
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
        duration: '10 tuần',
        level: 'intermediate',
        price: 7000000,
        instructor: 'TS. Nguyễn Văn A',
        category: 'ai-business',
        isActive: true
      }
    ]);

    console.log('✅ Courses created');

    // Create News
    console.log('📰 Creating news...');
    await News.create([
      {
        title: 'AI Center khai giảng khóa học Machine Learning mới',
        summary: 'Khóa học Machine Learning cơ bản dành cho người mới bắt đầu sẽ khai giảng vào tháng 2/2024',
        content: 'AI Center vui mừng thông báo khai giảng khóa học Machine Learning cơ bản dành cho người mới bắt đầu. Khóa học sẽ bắt đầu từ ngày 15/02/2024 với đội ngũ giảng viên giàu kinh nghiệm.',
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
        title: 'Xu hướng AI năm 2024',
        summary: 'Những xu hướng công nghệ AI đáng chú ý trong năm 2024',
        content: 'Năm 2024 hứa hẹn là một năm bùng nổ của AI với nhiều công nghệ mới như GPT-4, Multimodal AI, AI trong Healthcare.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        author: admin._id,
        category: 'AI',
        tags: ['AI', 'Xu hướng', '2024'],
        views: 450,
        isPublished: true
      }
    ]);

    console.log('✅ News created');

    // Create Projects
    console.log('🚀 Creating projects...');
    await Project.create([
      {
        title: 'Hệ thống nhận diện khuôn mặt',
        description: 'Hệ thống nhận diện khuôn mặt real-time sử dụng Deep Learning và OpenCV',
        image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800',
        technologies: ['Python', 'TensorFlow', 'OpenCV', 'Face Recognition'],
        githubUrl: 'https://github.com/aicenter/face-recognition',
        demoUrl: 'https://demo.aicenter.vn/face-recognition',
        category: 'Computer Vision'
      },
      {
        title: 'Chatbot tư vấn khóa học',
        description: 'Chatbot AI hỗ trợ tư vấn và giải đáp thắc mắc về các khóa học',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
        technologies: ['Python', 'Rasa', 'NLP', 'Flask'],
        githubUrl: 'https://github.com/aicenter/course-chatbot',
        demoUrl: 'https://demo.aicenter.vn/chatbot',
        category: 'NLP'
      }
    ]);

    console.log('✅ Projects created');

    // Create Feedback
    console.log('💬 Creating feedback...');
    await Feedback.create([
      {
        name: 'Nguyễn Văn B',
        email: 'nguyenvanb@example.com',
        subject: 'Hỏi về khóa học Machine Learning',
        message: 'Cho em hỏi khóa học Machine Learning có phù hợp với người mới bắt đầu không ạ?',
        status: 'pending'
      }
    ]);

    console.log('✅ Feedback created');

    // Summary
    console.log('\n📊 SEED DATA SUMMARY:');
    console.log(`👤 Users: ${await User.countDocuments()}`);
    console.log(`📚 Courses: ${await Course.countDocuments()}`);
    console.log(`📰 News: ${await News.countDocuments()}`);
    console.log(`🚀 Projects: ${await Project.countDocuments()}`);
    console.log(`💬 Feedback: ${await Feedback.countDocuments()}`);
    
    console.log('\n🔑 LOGIN CREDENTIALS:');
    console.log('Admin: admin@aicenter.vn / admin123');
    console.log('User: user1@example.com / user123');
    console.log('User: user@gmail.com / user123');
    
    console.log('\n✅ Seed data completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run seed
const run = async () => {
  try {
    await connectDB();
    await seedData();
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
};

run().catch(err => {
  console.error('❌ Unhandled error:', err);
  process.exit(1);
});
