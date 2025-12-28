const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Course = require('../models/Course');
const News = require('../models/News');
const Feedback = require('../models/Feedback');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await User.deleteMany({});
    await Course.deleteMany({});
    await News.deleteMany({});
    await Feedback.deleteMany({});
    console.log('🗑️  Cleared old data');

    const admin = await User.create({
      name: 'Admin AI Center',
      email: 'admin@aicenter.vn',
      password: 'admin123',
      role: 'admin'
    });
    console.log('👤 Created admin');

    await User.create({
      name: 'Nguyễn Văn A',
      email: 'user@gmail.com',
      password: 'user123',
      role: 'user'
    });

    // 25 khóa học - mỗi category 5 khóa với hình ảnh đa dạng
    const courses = [
      // Machine Learning (5)
      { title: 'Machine Learning cơ bản', description: 'Khóa học giới thiệu về Machine Learning, các thuật toán cơ bản', content: 'Linear Regression, Logistic Regression, Decision Trees, Random Forest, SVM', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', price: 5000000, duration: '12 tuần', level: 'beginner', instructor: 'TS. Nguyễn Văn A', category: 'machine-learning', isActive: true },
      { title: 'Python cho Data Science', description: 'Nền tảng Python cho Data Science và Machine Learning', content: 'NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800', price: 4000000, duration: '8 tuần', level: 'beginner', instructor: 'ThS. Lê Văn C', category: 'machine-learning', isActive: true },
      { title: 'Machine Learning nâng cao', description: 'Các thuật toán ML nâng cao và tối ưu hóa mô hình', content: 'Ensemble Methods, Gradient Boosting, XGBoost, Feature Engineering', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800', price: 7500000, duration: '14 tuần', level: 'advanced', instructor: 'TS. Nguyễn Văn A', category: 'machine-learning', isActive: true },
      { title: 'Time Series Analysis', description: 'Phân tích và dự đoán chuỗi thời gian', content: 'ARIMA, Prophet, LSTM for Time Series, Forecasting', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', price: 6000000, duration: '10 tuần', level: 'intermediate', instructor: 'ThS. Lê Văn C', category: 'machine-learning', isActive: true },
      { title: 'Reinforcement Learning', description: 'Học tăng cường từ cơ bản đến ứng dụng', content: 'Q-Learning, Deep Q-Networks, Policy Gradients, Actor-Critic', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', price: 8000000, duration: '12 tuần', level: 'advanced', instructor: 'TS. Nguyễn Văn A', category: 'machine-learning', isActive: true },

      // Deep Learning (5)
      { title: 'Deep Learning với TensorFlow', description: 'Xây dựng mô hình Deep Learning với TensorFlow', content: 'CNN, RNN, LSTM, Transfer Learning, Model Optimization', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', price: 7000000, duration: '16 tuần', level: 'intermediate', instructor: 'TS. Trần Thị B', category: 'deep-learning', isActive: true },
      { title: 'Deep Learning với PyTorch', description: 'Xây dựng mô hình Deep Learning với PyTorch', content: 'PyTorch Basics, CNN, RNN, GANs, Model Deployment', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', price: 7000000, duration: '16 tuần', level: 'intermediate', instructor: 'TS. Trần Thị B', category: 'deep-learning', isActive: true },
      { title: 'Convolutional Neural Networks', description: 'Chuyên sâu về CNN và Computer Vision', content: 'CNN Architecture, ResNet, VGG, Inception, Object Detection', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800', price: 7500000, duration: '12 tuần', level: 'advanced', instructor: 'TS. Phạm Thị D', category: 'deep-learning', isActive: true },
      { title: 'Recurrent Neural Networks', description: 'RNN, LSTM, GRU và xử lý chuỗi', content: 'RNN Fundamentals, LSTM, GRU, Sequence-to-Sequence, Attention', image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800', price: 7500000, duration: '12 tuần', level: 'advanced', instructor: 'ThS. Lê Văn C', category: 'deep-learning', isActive: true },
      { title: 'Generative AI và GANs', description: 'Tạo sinh nội dung với GANs', content: 'GANs, VAE, Diffusion Models, StyleGAN, Image Generation', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800', price: 8500000, duration: '14 tuần', level: 'advanced', instructor: 'TS. Trần Thị B', category: 'deep-learning', isActive: true },

      // NLP (5)
      { title: 'Natural Language Processing', description: 'Xử lý ngôn ngữ tự nhiên từ cơ bản đến nâng cao', content: 'Text preprocessing, Word embeddings, Transformers, BERT, GPT', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800', price: 6500000, duration: '14 tuần', level: 'intermediate', instructor: 'ThS. Lê Văn C', category: 'nlp', isActive: true },
      { title: 'NLP cơ bản với Python', description: 'Nhập môn xử lý ngôn ngữ tự nhiên', content: 'Tokenization, POS Tagging, NER, Text Classification, Sentiment Analysis', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', price: 5000000, duration: '10 tuần', level: 'beginner', instructor: 'ThS. Lê Văn C', category: 'nlp', isActive: true },
      { title: 'Transformers và BERT', description: 'Kiến trúc Transformer và ứng dụng BERT', content: 'Attention Mechanism, BERT, RoBERTa, Fine-tuning, Transfer Learning', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', price: 7500000, duration: '12 tuần', level: 'advanced', instructor: 'TS. Trần Thị B', category: 'nlp', isActive: true },
      { title: 'Chatbot Development', description: 'Xây dựng chatbot thông minh với NLP', content: 'Rasa, Dialogflow, Intent Recognition, Entity Extraction', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800', price: 6000000, duration: '10 tuần', level: 'intermediate', instructor: 'ThS. Lê Văn C', category: 'nlp', isActive: true },
      { title: 'Large Language Models', description: 'Làm việc với GPT, LLaMA', content: 'GPT Architecture, Prompt Engineering, Fine-tuning LLMs, RAG, LangChain', image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800', price: 9000000, duration: '14 tuần', level: 'advanced', instructor: 'TS. Nguyễn Văn A', category: 'nlp', isActive: true },

      // Computer Vision (5)
      { title: 'Computer Vision với OpenCV', description: 'Xử lý ảnh và Computer Vision', content: 'Image processing, Object detection, Face recognition, Image segmentation', image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800', price: 6000000, duration: '12 tuần', level: 'intermediate', instructor: 'TS. Phạm Thị D', category: 'computer-vision', isActive: true },
      { title: 'Computer Vision cơ bản', description: 'Nhập môn Computer Vision', content: 'Image Basics, Filtering, Edge Detection, Feature Extraction', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', price: 5000000, duration: '10 tuần', level: 'beginner', instructor: 'TS. Phạm Thị D', category: 'computer-vision', isActive: true },
      { title: 'Object Detection và Tracking', description: 'Phát hiện và theo dõi đối tượng', content: 'YOLO, SSD, Faster R-CNN, Object Tracking, Real-time Detection', image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800', price: 7500000, duration: '12 tuần', level: 'advanced', instructor: 'TS. Phạm Thị D', category: 'computer-vision', isActive: true },
      { title: 'Image Segmentation', description: 'Phân đoạn ảnh với Deep Learning', content: 'U-Net, Mask R-CNN, Semantic Segmentation, Instance Segmentation', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', price: 7000000, duration: '10 tuần', level: 'advanced', instructor: 'TS. Trần Thị B', category: 'computer-vision', isActive: true },
      { title: '3D Computer Vision', description: 'Computer Vision trong không gian 3D', content: 'Point Cloud Processing, 3D Reconstruction, SLAM, Depth Estimation', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800', price: 8500000, duration: '14 tuần', level: 'advanced', instructor: 'TS. Phạm Thị D', category: 'computer-vision', isActive: true },

      // AI Business (5)
      { title: 'AI cho Doanh nghiệp', description: 'Ứng dụng AI trong doanh nghiệp', content: 'Business Analytics, Predictive Modeling, Recommendation Systems', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', price: 5500000, duration: '10 tuần', level: 'beginner', instructor: 'TS. Nguyễn Văn A', category: 'ai-business', isActive: true },
      { title: 'AI Strategy cho Lãnh đạo', description: 'Chiến lược triển khai AI', content: 'AI Transformation, ROI Analysis, Team Building, Ethics in AI', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', price: 4500000, duration: '6 tuần', level: 'beginner', instructor: 'TS. Nguyễn Văn A', category: 'ai-business', isActive: true },
      { title: 'Customer Analytics với AI', description: 'Phân tích hành vi khách hàng', content: 'Customer Segmentation, Churn Prediction, Lifetime Value', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800', price: 6000000, duration: '8 tuần', level: 'intermediate', instructor: 'ThS. Lê Văn C', category: 'ai-business', isActive: true },
      { title: 'AI trong Marketing', description: 'Tối ưu hóa chiến dịch Marketing', content: 'Marketing Automation, Ad Optimization, Content Generation', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800', price: 5500000, duration: '8 tuần', level: 'intermediate', instructor: 'ThS. Lê Văn C', category: 'ai-business', isActive: true },
      { title: 'AI trong Finance', description: 'AI trong tài chính ngân hàng', content: 'Fraud Detection, Credit Scoring, Algorithmic Trading, Risk Management', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800', price: 7000000, duration: '10 tuần', level: 'intermediate', instructor: 'TS. Nguyễn Văn A', category: 'ai-business', isActive: true }
    ];

    for (const course of courses) {
      await Course.create(course);
    }
    console.log(`✅ Created ${courses.length} courses`);

    // Create news - mỗi category 5 tin
    const newsItems = [
      // Events (5)
      { title: 'AI Center khai giảng khóa học Machine Learning mới', summary: 'Khóa học Machine Learning cơ bản dành cho người mới bắt đầu sẽ khai giảng vào tháng 2/2024', content: 'AI Center vui mừng thông báo khai giảng khóa học Machine Learning cơ bản dành cho người mới bắt đầu. Khóa học sẽ bắt đầu từ ngày 15/02/2024 với đội ngũ giảng viên giàu kinh nghiệm.', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&auto=format', author: admin._id, category: 'Events', tags: ['Machine Learning', 'Khóa học', 'Khai giảng'], views: 150, isPublished: true },
      { title: 'Hội thảo về Deep Learning và ứng dụng', summary: 'Tham gia hội thảo miễn phí về Deep Learning và các ứng dụng trong thực tế', content: 'AI Center tổ chức hội thảo về Deep Learning với sự tham gia của các chuyên gia hàng đầu trong lĩnh vực AI.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format', author: admin._id, category: 'Events', tags: ['Deep Learning', 'Hội thảo', 'AI'], views: 230, isPublished: true },
      { title: 'Workshop: Xây dựng Chatbot với Python', summary: 'Workshop thực hành xây dựng chatbot sử dụng Python và các thư viện NLP', content: 'Tham gia workshop thực hành xây dựng chatbot từ đầu. Bạn sẽ học cách sử dụng NLTK, spaCy, và các framework như Rasa để tạo ra một chatbot thông minh.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format', author: admin._id, category: 'Events', tags: ['Workshop', 'Chatbot', 'Python'], views: 280, isPublished: true },
      { title: 'Hackathon AI 2024 - Đăng ký ngay!', summary: 'Cuộc thi lập trình AI lớn nhất năm với giải thưởng 100 triệu', content: 'AI Center tổ chức Hackathon AI 2024 với tổng giải thưởng lên đến 100 triệu đồng. Đây là cơ hội để bạn thể hiện kỹ năng, kết nối với cộng đồng AI.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&auto=format', author: admin._id, category: 'Events', tags: ['Hackathon', 'Competition', 'AI'], views: 750, isPublished: true },
      { title: 'Học bổng AI Center 2024', summary: 'Chương trình học bổng toàn phần cho sinh viên xuất sắc', content: 'AI Center công bố chương trình học bổng toàn phần năm 2024 dành cho 20 sinh viên xuất sắc. Học bổng bao gồm miễn phí học phí, laptop, và hỗ trợ sinh hoạt phí.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop&auto=format', author: admin._id, category: 'Events', tags: ['Scholarship', 'Education', 'Students'], views: 890, isPublished: true },

      // AI (5)
      { title: 'Xu hướng AI năm 2024', summary: 'Những xu hướng công nghệ AI đáng chú ý trong năm 2024', content: 'Năm 2024 hứa hẹn là một năm bùng nổ của AI với nhiều công nghệ mới như GPT-4, Multimodal AI, AI trong Healthcare, và Autonomous Systems.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', author: admin._id, category: 'AI', tags: ['AI', 'Xu hướng', '2024'], views: 450, isPublished: true },
      { title: 'AI và Tương lai của Giáo dục', summary: 'Cách AI đang thay đổi phương pháp giảng dạy và học tập', content: 'AI đang cách mạng hóa giáo dục với các ứng dụng như học tập cá nhân hóa, trợ giảng ảo, chấm bài tự động, và phân tích học tập.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', author: admin._id, category: 'AI', tags: ['AI', 'Education', 'EdTech'], views: 390, isPublished: true },
      { title: 'Trí tuệ nhân tạo trong Tài chính', summary: 'Ứng dụng AI để phát hiện gian lận và dự đoán thị trường', content: 'Ngành tài chính đang ứng dụng AI để phát hiện gian lận, đánh giá rủi ro tín dụng, giao dịch tự động, và tư vấn tài chính cá nhân.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', author: admin._id, category: 'AI', tags: ['AI', 'Finance', 'Fintech'], views: 520, isPublished: true },
      { title: 'Multimodal AI: Kết hợp nhiều loại dữ liệu', summary: 'AI có thể xử lý đồng thời text, hình ảnh, âm thanh và video', content: 'Multimodal AI là thế hệ AI mới có khả năng xử lý và kết hợp nhiều loại dữ liệu khác nhau. Bài viết giới thiệu các mô hình như CLIP, Flamingo, GPT-4V.', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800', author: admin._id, category: 'AI', tags: ['AI', 'Multimodal', 'Vision-Language'], views: 480, isPublished: true },
      { title: 'AI trong Y tế: Cơ hội và Thách thức', summary: 'Ứng dụng AI trong chẩn đoán và điều trị bệnh', content: 'AI đang thay đổi ngành y tế với khả năng chẩn đoán bệnh chính xác hơn, phát hiện sớm ung thư, và cá nhân hóa điều trị.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', author: admin._id, category: 'AI', tags: ['AI', 'Y tế', 'Healthcare'], views: 410, isPublished: true },

      // Machine Learning (5)
      { title: 'Gradient Descent và các biến thể', summary: 'Hiểu sâu về thuật toán tối ưu cơ bản trong Machine Learning', content: 'Gradient Descent là nền tảng của hầu hết các thuật toán ML. Bài viết này giải thích chi tiết về GD, SGD, Mini-batch GD, Adam, RMSprop và khi nào nên sử dụng từng loại.', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800', author: admin._id, category: 'Machine Learning', tags: ['Gradient Descent', 'Optimization', 'ML'], views: 420, isPublished: true },
      { title: 'Feature Engineering: Nghệ thuật tạo đặc trưng', summary: 'Kỹ thuật quan trọng để cải thiện hiệu suất mô hình ML', content: 'Feature Engineering là bước quan trọng trong ML pipeline. Bài viết hướng dẫn các kỹ thuật như scaling, encoding, feature selection, feature extraction, và cách xử lý missing data.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', author: admin._id, category: 'Machine Learning', tags: ['Feature Engineering', 'Data Preprocessing', 'ML'], views: 380, isPublished: true },
      { title: 'Ensemble Learning: Sức mạnh của tập thể', summary: 'Kết hợp nhiều mô hình để đạt kết quả tốt hơn', content: 'Ensemble Learning như Random Forest, XGBoost, LightGBM thường cho kết quả tốt hơn single model. Bài viết giải thích về bagging, boosting, stacking và cách áp dụng chúng.', image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800', author: admin._id, category: 'Machine Learning', tags: ['Ensemble', 'Random Forest', 'XGBoost'], views: 510, isPublished: true },
      { title: 'Overfitting và Underfitting: Cân bằng là chìa khóa', summary: 'Hiểu và khắc phục hai vấn đề phổ biến trong ML', content: 'Overfitting và underfitting là hai thách thức lớn trong ML. Bài viết này giải thích nguyên nhân, cách phát hiện, và các kỹ thuật như regularization, cross-validation để giải quyết.', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800', author: admin._id, category: 'Machine Learning', tags: ['Overfitting', 'Regularization', 'ML'], views: 450, isPublished: true },
      { title: 'Time Series Forecasting với ML', summary: 'Dự đoán chuỗi thời gian sử dụng Machine Learning', content: 'Time series forecasting có ứng dụng rộng rãi trong tài chính, bán lẻ, và IoT. Bài viết hướng dẫn các kỹ thuật như ARIMA, Prophet, LSTM, và cách xử lý seasonality, trend.', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', author: admin._id, category: 'Machine Learning', tags: ['Time Series', 'Forecasting', 'LSTM'], views: 490, isPublished: true },

      // Deep Learning (5)
      { title: 'CNN Architecture: Từ LeNet đến EfficientNet', summary: 'Lịch sử phát triển của kiến trúc CNN trong Deep Learning', content: 'Từ LeNet (1998) đến EfficientNet (2019), CNN đã có nhiều bước tiến vượt bậc. Bài viết này review các kiến trúc quan trọng như AlexNet, VGG, ResNet, Inception, MobileNet.', image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800', author: admin._id, category: 'Deep Learning', tags: ['CNN', 'Architecture', 'Computer Vision'], views: 580, isPublished: true },
      { title: 'Attention Mechanism: Trái tim của Transformer', summary: 'Cơ chế attention đã thay đổi Deep Learning như thế nào', content: 'Attention mechanism là đột phá lớn trong DL, đặc biệt là self-attention trong Transformer. Bài viết giải thích chi tiết về Query, Key, Value, multi-head attention.', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800', author: admin._id, category: 'Deep Learning', tags: ['Attention', 'Transformer', 'Deep Learning'], views: 640, isPublished: true },
      { title: 'Transfer Learning: Học từ mô hình có sẵn', summary: 'Tận dụng pre-trained models để tiết kiệm thời gian và tài nguyên', content: 'Transfer Learning cho phép sử dụng mô hình đã được train trên dataset lớn cho bài toán mới. Bài viết hướng dẫn cách fine-tune BERT, GPT, ResNet.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', author: admin._id, category: 'Deep Learning', tags: ['Transfer Learning', 'Fine-tuning', 'Pre-trained'], views: 520, isPublished: true },
      { title: 'GANs: Tạo dữ liệu giả từ không khí', summary: 'Generative Adversarial Networks và ứng dụng sáng tạo', content: 'GANs đã tạo ra cuộc cách mạng trong việc sinh dữ liệu. Bài viết giới thiệu về kiến trúc GAN, các biến thể như StyleGAN, CycleGAN, và ứng dụng trong tạo ảnh, video.', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800', author: admin._id, category: 'Deep Learning', tags: ['GAN', 'Generative AI', 'Deep Learning'], views: 670, isPublished: true },
      { title: 'Batch Normalization và Layer Normalization', summary: 'Kỹ thuật normalization giúp training nhanh và ổn định hơn', content: 'Normalization là kỹ thuật quan trọng trong DL. Bài viết so sánh Batch Norm, Layer Norm, Instance Norm, Group Norm và giải thích khi nào nên sử dụng từng loại.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', author: admin._id, category: 'Deep Learning', tags: ['Normalization', 'Batch Norm', 'Deep Learning'], views: 410, isPublished: true },

      // Research (5)
      { title: 'ChatGPT và tương lai của NLP', summary: 'Phân tích về ChatGPT và tác động của nó đến lĩnh vực xử lý ngôn ngữ tự nhiên', content: 'ChatGPT đã tạo ra một cuộc cách mạng trong lĩnh vực NLP. Bài viết này phân tích kiến trúc của ChatGPT, cách nó hoạt động, và những ứng dụng tiềm năng trong tương lai.', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', author: admin._id, category: 'Research', tags: ['ChatGPT', 'NLP', 'AI'], views: 580, isPublished: true },
      { title: 'Transformer Architecture: Cách mạng trong NLP', summary: 'Tìm hiểu về kiến trúc Transformer và tại sao nó quan trọng', content: 'Transformer đã thay đổi hoàn toàn lĩnh vực NLP. Bài viết này giải thích chi tiết về kiến trúc Transformer, attention mechanism, và cách nó được sử dụng trong BERT, GPT.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', author: admin._id, category: 'Research', tags: ['Transformer', 'NLP', 'BERT', 'GPT'], views: 560, isPublished: true },
      { title: 'Computer Vision: Từ lý thuyết đến thực hành', summary: 'Khám phá thế giới Computer Vision và các ứng dụng trong đời sống', content: 'Computer Vision là một trong những lĩnh vực hot nhất của AI. Bài viết này giới thiệu các khái niệm cơ bản về CV, từ xử lý ảnh, nhận diện đối tượng, đến các ứng dụng.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', author: admin._id, category: 'Research', tags: ['Computer Vision', 'AI', 'Image Processing'], views: 380, isPublished: true },
      { title: 'AI Explainability: Giải thích quyết định của AI', summary: 'Tại sao chúng ta cần hiểu cách AI đưa ra quyết định', content: 'Explainable AI (XAI) là xu hướng quan trọng giúp con người hiểu được cách AI đưa ra quyết định. Bài viết giới thiệu các kỹ thuật XAI như LIME, SHAP.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', author: admin._id, category: 'Research', tags: ['AI', 'XAI', 'Explainability'], views: 340, isPublished: true },
      { title: 'Quantum Machine Learning: Tương lai của AI', summary: 'Kết hợp Quantum Computing và Machine Learning', content: 'Quantum Machine Learning là sự kết hợp giữa quantum computing và ML, hứa hẹn giải quyết các bài toán phức tạp nhanh hơn gấp nhiều lần.', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800', author: admin._id, category: 'Research', tags: ['Quantum', 'ML', 'Future'], views: 460, isPublished: true }
    ];

    for (const news of newsItems) {
      await News.create(news);
    }
    console.log(`✅ Created ${newsItems.length} news (5 Events, 5 AI, 5 Machine Learning, 5 Deep Learning, 5 Research)`);

    console.log('\n📊 SUMMARY:');
    console.log(`👤 Users: ${await User.countDocuments()}`);
    console.log(`📚 Courses: ${await Course.countDocuments()}`);
    console.log(`📰 News: ${await News.countDocuments()}`);
    console.log('\n🔑 LOGIN: admin@aicenter.vn / admin123');
    console.log('✅ Seed completed!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
