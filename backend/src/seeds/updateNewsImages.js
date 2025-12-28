const mongoose = require('mongoose');
require('dotenv').config();
const News = require('../models/News');

async function updateImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Hình ảnh phù hợp với từng chủ đề
    const imageMap = {
      // Events
      'AI Center khai giảng khóa học Machine Learning mới': 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Hội thảo về Deep Learning và ứng dụng': 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Workshop: Xây dựng Chatbot với Python': 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Hackathon AI 2024 - Đăng ký ngay!': 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Học bổng AI Center 2024': 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
      
      // AI
      'Xu hướng AI năm 2024': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      'AI và Tương lai của Giáo dục': 'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Trí tuệ nhân tạo trong Tài chính': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Multimodal AI: Kết hợp nhiều loại dữ liệu': 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      'AI trong Y tế: Cơ hội và Thách thức': 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800',
      
      // Machine Learning
      'Gradient Descent và các biến thể': 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Feature Engineering: Nghệ thuật tạo đặc trưng': 'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Ensemble Learning: Sức mạnh của tập thể': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Overfitting và Underfitting: Cân bằng là chìa khóa': 'https://images.pexels.com/photos/7988675/pexels-photo-7988675.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Time Series Forecasting với ML': 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800',
      
      // Deep Learning
      'CNN Architecture: Từ LeNet đến EfficientNet': 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Attention Mechanism: Trái tim của Transformer': 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Transfer Learning: Học từ mô hình có sẵn': 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
      'GANs: Tạo dữ liệu giả từ không khí': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Batch Normalization và Layer Normalization': 'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg?auto=compress&cs=tinysrgb&w=800',
      
      // Research
      'ChatGPT và tương lai của NLP': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Transformer Architecture: Cách mạng trong NLP': 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Computer Vision: Từ lý thuyết đến thực hành': 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      'AI Explainability: Giải thích quyết định của AI': 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Quantum Machine Learning: Tương lai của AI': 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800'
    };

    const allNews = await News.find();
    
    for (const news of allNews) {
      if (imageMap[news.title]) {
        news.image = imageMap[news.title];
        await news.save();
        console.log(`✅ Updated: ${news.title}`);
      } else {
        console.log(`⚠️  No image mapping for: ${news.title}`);
      }
    }

    console.log(`\n✅ Updated ${allNews.length} news images with AI/Tech themed images`);
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateImages();
