const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Course = require('../models/Course');
const News = require('../models/News');
const Feedback = require('../models/Feedback');
const Partner = require('../models/Partner');

async function seed() {
  try {
    // Connect
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear
    await User.deleteMany({});
    await Course.deleteMany({});
    await News.deleteMany({});
    await Feedback.deleteMany({});
    await Partner.deleteMany({});
    console.log('🗑️  Cleared old data');

    // Create admin (password will be hashed by pre-save hook)
    const admin = await User.create({
      name: 'Admin AI Center',
      email: 'admin@aicenter.vn',
      password: 'admin123',
      role: 'admin'
    });
    console.log('👤 Created admin:', admin.email);

    // Create user (password will be hashed by pre-save hook)
    await User.create({
      name: 'Nguyễn Văn A',
      email: 'user@gmail.com',
      password: 'user123',
      phone: '0901234567',
      role: 'user'
    });
    console.log('👤 Created user: user@gmail.com');

    // Create courses
    const courses = [
      {
        title: 'Machine Learning cơ bản',
        description: 'Khóa học giới thiệu về Machine Learning, các thuật toán cơ bản và ứng dụng thực tế',
        content: 'Linear Regression, Logistic Regression, Decision Trees, Random Forest, SVM, Neural Networks cơ bản',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
        price: 5000000,
        duration: '12 tuần',
        level: 'beginner',
        instructor: 'TS. Nguyễn Văn A',
        category: 'machine-learning',
        isActive: true
      },
      {
        title: 'Deep Learning với TensorFlow',
        description: 'Học cách xây dựng và training các mô hình Deep Learning sử dụng TensorFlow',
        content: 'CNN, RNN, LSTM, Transfer Learning, Model Optimization, Deployment',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        price: 7000000,
        duration: '16 tuần',
        level: 'intermediate',
        instructor: 'TS. Trần Thị B',
        category: 'deep-learning',
        isActive: true
      },
      {
        title: 'Natural Language Processing',
        description: 'Xử lý ngôn ngữ tự nhiên với Python, từ cơ bản đến nâng cao',
        content: 'Text preprocessing, Word embeddings, Transformers, BERT, GPT, Sentiment Analysis',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
        price: 6500000,
        duration: '14 tuần',
        level: 'intermediate',
        instructor: 'ThS. Lê Văn C',
        category: 'nlp',
        isActive: true
      },
      {
        title: 'Computer Vision với OpenCV',
        description: 'Khóa học về xử lý ảnh và Computer Vision',
        content: 'Image processing, Object detection, Face recognition, Image segmentation',
        image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800',
        price: 6000000,
        duration: '12 tuần',
        level: 'intermediate',
        instructor: 'TS. Phạm Thị D',
        category: 'computer-vision',
        isActive: true
      },
      {
        title: 'Python cho Data Science',
        description: 'Nền tảng Python cho Data Science và Machine Learning',
        content: 'NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, Data Visualization',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
        price: 4000000,
        duration: '8 tuần',
        level: 'beginner',
        instructor: 'ThS. Lê Văn C',
        category: 'machine-learning',
        isActive: true
      },
      {
        title: 'AI cho Doanh nghiệp',
        description: 'Ứng dụng AI vào giải quyết các bài toán thực tế trong doanh nghiệp',
        content: 'Business Analytics, Predictive Modeling, Recommendation Systems, Chatbots, ROI Analysis',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        price: 5500000,
        duration: '10 tuần',
        level: 'beginner',
        instructor: 'TS. Nguyễn Văn A',
        category: 'ai-business',
        isActive: true
      },
      {
        title: 'Reinforcement Learning',
        description: 'Học tăng cường từ cơ bản đến nâng cao',
        content: 'Q-Learning, Deep Q-Networks, Policy Gradients, Actor-Critic, Applications',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        price: 8000000,
        duration: '14 tuần',
        level: 'advanced',
        instructor: 'TS. Phạm Thị D',
        category: 'deep-learning',
        isActive: true
      },
      {
        title: 'Data Engineering với Python',
        description: 'Xây dựng data pipeline và quản lý dữ liệu lớn',
        content: 'ETL, Apache Spark, Airflow, Data Warehousing, Big Data Processing',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        price: 6500000,
        duration: '12 tuần',
        level: 'intermediate',
        instructor: 'ThS. Lê Văn C',
        category: 'machine-learning',
        isActive: true
      },
      {
        title: 'MLOps - Deploy ML Models',
        description: 'Triển khai và vận hành mô hình Machine Learning trong production',
        content: 'Docker, Kubernetes, CI/CD, Model Monitoring, A/B Testing, MLflow',
        image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
        price: 7500000,
        duration: '10 tuần',
        level: 'advanced',
        instructor: 'TS. Trần Thị B',
        category: 'ai-business',
        isActive: true
      },
      {
        title: 'Generative AI với GPT',
        description: 'Tạo nội dung tự động với các mô hình AI sinh tạo',
        content: 'GPT, DALL-E, Stable Diffusion, Prompt Engineering, Fine-tuning',
        image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800',
        price: 8500000,
        duration: '12 tuần',
        level: 'intermediate',
        instructor: 'TS. Nguyễn Văn A',
        category: 'nlp',
        isActive: true
      }
    ];

    for (const course of courses) {
      await Course.create(course);
      console.log('📚 Created course:', course.title);
    }

    // Create news
    const newsItems = [
      {
        title: 'AI Center khai giảng khóa học Machine Learning mới',
        summary: 'Khóa học Machine Learning cơ bản dành cho người mới bắt đầu sẽ khai giảng vào tháng 2/2024',
        content: 'AI Center vui mừng thông báo khai giảng khóa học Machine Learning cơ bản dành cho người mới bắt đầu. Khóa học sẽ bắt đầu từ ngày 15/02/2024 với đội ngũ giảng viên giàu kinh nghiệm. Học viên sẽ được học các thuật toán ML cơ bản, thực hành trên các bài toán thực tế và nhận chứng chỉ sau khi hoàn thành.',
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
        content: 'AI Center tổ chức hội thảo về Deep Learning với sự tham gia của các chuyên gia hàng đầu trong lĩnh vực AI. Hội thảo sẽ đề cập đến các chủ đề: CNN, RNN, Transfer Learning và các ứng dụng thực tế trong Computer Vision và NLP. Đăng ký miễn phí tại website.',
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
        content: 'Năm 2024 hứa hẹn là một năm bùng nổ của AI với nhiều công nghệ mới như GPT-4, Multimodal AI, AI trong Healthcare, và Autonomous Systems. Bài viết phân tích chi tiết các xu hướng này và tác động của chúng đến các ngành công nghiệp.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        author: admin._id,
        category: 'AI',
        tags: ['AI', 'Xu hướng', '2024'],
        views: 450,
        isPublished: true
      },
      {
        title: 'AI và Tương lai của Giáo dục',
        summary: 'Cách AI đang thay đổi phương pháp giảng dạy và học tập',
        content: 'AI đang cách mạng hóa giáo dục với các ứng dụng như học tập cá nhân hóa, trợ giảng ảo, chấm bài tự động, và phân tích học tập. Bài viết khám phá cách AI giúp nâng cao chất lượng giáo dục và tạo trải nghiệm học tập tốt hơn.',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        author: admin._id,
        category: 'AI',
        tags: ['AI', 'Education', 'EdTech'],
        views: 390,
        isPublished: true
      },
      {
        title: 'Trí tuệ nhân tạo trong Tài chính',
        summary: 'Ứng dụng AI để phát hiện gian lận và dự đoán thị trường',
        content: 'Ngành tài chính đang ứng dụng AI để phát hiện gian lận, đánh giá rủi ro tín dụng, giao dịch tự động, và tư vấn tài chính cá nhân. Bài viết phân tích các case study thành công và thách thức khi triển khai AI trong fintech.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        author: admin._id,
        category: 'AI',
        tags: ['AI', 'Finance', 'Fintech'],
        views: 520,
        isPublished: true
      },
      {
        title: 'AI Explainability: Giải thích quyết định của AI',
        summary: 'Tại sao chúng ta cần hiểu cách AI đưa ra quyết định',
        content: 'Explainable AI (XAI) là xu hướng quan trọng giúp con người hiểu được cách AI đưa ra quyết định. Bài viết giới thiệu các kỹ thuật XAI như LIME, SHAP, và tầm quan trọng của việc giải thích AI trong các lĩnh vực nhạy cảm như y tế và tài chính.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        author: admin._id,
        category: 'AI',
        tags: ['AI', 'XAI', 'Explainability'],
        views: 340,
        isPublished: true
      },
      {
        title: 'Multimodal AI: Kết hợp nhiều loại dữ liệu',
        summary: 'AI có thể xử lý đồng thời text, hình ảnh, âm thanh và video',
        content: 'Multimodal AI là thế hệ AI mới có khả năng xử lý và kết hợp nhiều loại dữ liệu khác nhau. Bài viết giới thiệu các mô hình như CLIP, Flamingo, GPT-4V và ứng dụng của chúng trong thực tế.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        author: admin._id,
        category: 'AI',
        tags: ['AI', 'Multimodal', 'Vision-Language'],
        views: 480,
        isPublished: true
      },
      {
        title: 'Học viên AI Center đạt giải thưởng quốc tế',
        summary: 'Chúc mừng học viên Nguyễn Văn A đạt giải Nhất cuộc thi AI Challenge 2024',
        content: 'Học viên Nguyễn Văn A của AI Center đã xuất sắc giành giải Nhất tại cuộc thi AI Challenge 2024 với dự án về Computer Vision. Đây là thành tích đáng tự hào và là minh chứng cho chất lượng đào tạo tại AI Center.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Học viên', 'Giải thưởng', 'Thành tích'],
        views: 320,
        isPublished: true
      },
      {
        title: 'ChatGPT và tương lai của NLP',
        summary: 'Phân tích về ChatGPT và tác động của nó đến lĩnh vực xử lý ngôn ngữ tự nhiên',
        content: 'ChatGPT đã tạo ra một cuộc cách mạng trong lĩnh vực NLP. Bài viết này phân tích kiến trúc của ChatGPT, cách nó hoạt động, và những ứng dụng tiềm năng trong tương lai. Chúng ta cũng thảo luận về các thách thức và cơ hội mà công nghệ này mang lại.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        author: admin._id,
        category: 'Research',
        tags: ['ChatGPT', 'NLP', 'AI'],
        views: 580,
        isPublished: true
      },
      {
        title: 'Workshop: Xây dựng Chatbot với Python',
        summary: 'Workshop thực hành xây dựng chatbot sử dụng Python và các thư viện NLP',
        content: 'Tham gia workshop thực hành xây dựng chatbot từ đầu. Bạn sẽ học cách sử dụng NLTK, spaCy, và các framework như Rasa để tạo ra một chatbot thông minh. Workshop bao gồm cả lý thuyết và thực hành với các bài tập thực tế.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Workshop', 'Chatbot', 'Python'],
        views: 280,
        isPublished: true
      },
      {
        title: 'AI trong Y tế: Cơ hội và Thách thức',
        summary: 'Ứng dụng AI trong chẩn đoán và điều trị bệnh',
        content: 'AI đang thay đổi ngành y tế với khả năng chẩn đoán bệnh chính xác hơn, phát hiện sớm ung thư, và cá nhân hóa điều trị. Tuy nhiên, vẫn còn nhiều thách thức về đạo đức, quyền riêng tư và độ tin cậy cần được giải quyết.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
        author: admin._id,
        category: 'Research',
        tags: ['AI', 'Y tế', 'Healthcare'],
        views: 410,
        isPublished: true
      },
      {
        title: 'Khóa học Generative AI sắp ra mắt',
        summary: 'Học cách tạo nội dung tự động với GPT, DALL-E và Stable Diffusion',
        content: 'AI Center sẽ ra mắt khóa học Generative AI vào tháng 3/2024. Khóa học sẽ hướng dẫn cách sử dụng các mô hình AI sinh tạo như GPT, DALL-E, Stable Diffusion để tạo text, hình ảnh, và video tự động. Đăng ký sớm để nhận ưu đãi 20%.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Generative AI', 'GPT', 'Khóa học'],
        views: 520,
        isPublished: true
      },
      {
        title: 'Computer Vision: Từ lý thuyết đến thực hành',
        summary: 'Khám phá thế giới Computer Vision và các ứng dụng trong đời sống',
        content: 'Computer Vision là một trong những lĩnh vực hot nhất của AI. Bài viết này giới thiệu các khái niệm cơ bản về CV, từ xử lý ảnh, nhận diện đối tượng, đến các ứng dụng như xe tự lái, nhận diện khuôn mặt, và phân tích y tế.',
        image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800',
        author: admin._id,
        category: 'Research',
        tags: ['Computer Vision', 'AI', 'Image Processing'],
        views: 380,
        isPublished: true
      },
      {
        title: 'Hợp tác với Google Cloud Platform',
        summary: 'AI Center ký kết hợp tác chiến lược với Google Cloud',
        content: 'AI Center vui mừng thông báo đã ký kết hợp tác chiến lược với Google Cloud Platform. Học viên sẽ được truy cập miễn phí vào các dịch vụ GCP, tham gia các workshop do Google tổ chức, và có cơ hội thực tập tại Google.',
        image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Google', 'Partnership', 'Cloud'],
        views: 620,
        isPublished: true
      },
      {
        title: 'MLOps: Triển khai AI vào Production',
        summary: 'Hướng dẫn chi tiết về MLOps và cách deploy mô hình AI',
        content: 'MLOps là kỹ năng quan trọng để đưa mô hình AI từ lab vào production. Bài viết này hướng dẫn về CI/CD cho ML, model versioning, monitoring, và các best practices khi deploy AI systems.',
        image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
        author: admin._id,
        category: 'Research',
        tags: ['MLOps', 'Deployment', 'DevOps'],
        views: 290,
        isPublished: true
      },
      {
        title: 'AI Ethics: Đạo đức trong phát triển AI',
        summary: 'Những vấn đề đạo đức cần quan tâm khi phát triển AI',
        content: 'Khi AI ngày càng phát triển, các vấn đề về đạo đức trở nên quan trọng hơn bao giờ hết. Bài viết thảo luận về bias trong AI, quyền riêng tư, trách nhiệm của AI developers, và cách xây dựng AI có trách nhiệm.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        author: admin._id,
        category: 'Research',
        tags: ['AI Ethics', 'Responsible AI', 'Bias'],
        views: 340,
        isPublished: true
      },
      {
        title: 'Data Science Bootcamp 2024',
        summary: 'Chương trình đào tạo tập trung 3 tháng về Data Science',
        content: 'AI Center ra mắt chương trình Data Science Bootcamp - khóa học tập trung 3 tháng với 100% thời gian thực hành. Học viên sẽ làm việc trên các dự án thực tế, được mentor 1-1, và có cơ hội việc làm sau khóa học.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Data Science', 'Bootcamp', 'Training'],
        views: 480,
        isPublished: true
      },
      {
        title: 'Transformer Architecture: Cách mạng trong NLP',
        summary: 'Tìm hiểu về kiến trúc Transformer và tại sao nó quan trọng',
        content: 'Transformer đã thay đổi hoàn toàn lĩnh vực NLP. Bài viết này giải thích chi tiết về kiến trúc Transformer, attention mechanism, và cách nó được sử dụng trong BERT, GPT, và các mô hình hiện đại khác.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
        author: admin._id,
        category: 'Research',
        tags: ['Transformer', 'NLP', 'BERT', 'GPT'],
        views: 560,
        isPublished: true
      },
      {
        title: 'AI trong Nông nghiệp thông minh',
        summary: 'Ứng dụng AI để tối ưu hóa sản xuất nông nghiệp',
        content: 'AI đang giúp nông nghiệp trở nên thông minh hơn với các ứng dụng như dự đoán thời tiết, phát hiện sâu bệnh, tối ưu hóa tưới tiêu, và quản lý cây trồng. Bài viết giới thiệu các case study thành công tại Việt Nam.',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
        author: admin._id,
        category: 'Research',
        tags: ['AI', 'Agriculture', 'Smart Farming'],
        views: 310,
        isPublished: true
      },
      {
        title: 'Hackathon AI 2024 - Đăng ký ngay!',
        summary: 'Cuộc thi lập trình AI lớn nhất năm với giải thưởng 100 triệu',
        content: 'AI Center tổ chức Hackathon AI 2024 với tổng giải thưởng lên đến 100 triệu đồng. Đây là cơ hội để bạn thể hiện kỹ năng, kết nối với cộng đồng AI, và có cơ hội làm việc tại các công ty công nghệ hàng đầu. Đăng ký ngay!',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Hackathon', 'Competition', 'AI'],
        views: 750,
        isPublished: true
      },
      {
        title: 'Edge AI: AI trên thiết bị di động',
        summary: 'Xu hướng chạy AI trực tiếp trên smartphone và IoT devices',
        content: 'Edge AI cho phép chạy mô hình AI trực tiếp trên thiết bị mà không cần kết nối internet. Bài viết này giới thiệu về TensorFlow Lite, Core ML, và các công nghệ để deploy AI lên mobile và IoT devices.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
        author: admin._id,
        category: 'Research',
        tags: ['Edge AI', 'Mobile', 'IoT'],
        views: 420,
        isPublished: true
      },
      {
        title: 'Học bổng AI Center 2024',
        summary: 'Chương trình học bổng toàn phần cho sinh viên xuất sắc',
        content: 'AI Center công bố chương trình học bổng toàn phần năm 2024 dành cho 20 sinh viên xuất sắc. Học bổng bao gồm miễn phí học phí, laptop, và hỗ trợ sinh hoạt phí. Hạn nộp hồ sơ: 31/03/2024.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Scholarship', 'Education', 'Students'],
        views: 890,
        isPublished: true
      },
      {
        title: 'AutoML: Tự động hóa Machine Learning',
        summary: 'Công nghệ AutoML giúp xây dựng mô hình AI nhanh hơn',
        content: 'AutoML đang thay đổi cách chúng ta xây dựng mô hình ML. Bài viết giới thiệu các công cụ AutoML như Google AutoML, H2O.ai, Auto-sklearn, và cách sử dụng chúng để tăng tốc quá trình phát triển AI.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        author: admin._id,
        category: 'Research',
        tags: ['AutoML', 'Automation', 'ML'],
        views: 370,
        isPublished: true
      },
      {
        title: 'AI Center mở rộng cơ sở tại Hà Nội',
        summary: 'Chi nhánh mới tại Hà Nội với cơ sở vật chất hiện đại',
        content: 'AI Center vui mừng thông báo khai trương chi nhánh mới tại Hà Nội với diện tích 1000m2, trang bị GPU cluster, phòng lab hiện đại, và không gian học tập thoải mái. Khai trương vào 01/04/2024 với nhiều ưu đãi hấp dẫn.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Expansion', 'Hanoi', 'News'],
        views: 540,
        isPublished: true
      },
      {
        title: 'Quantum Machine Learning: Tương lai của AI',
        summary: 'Kết hợp Quantum Computing và Machine Learning',
        content: 'Quantum Machine Learning là sự kết hợp giữa quantum computing và ML, hứa hẹn giải quyết các bài toán phức tạp nhanh hơn gấp nhiều lần. Bài viết giới thiệu các khái niệm cơ bản và tiềm năng của QML.',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
        author: admin._id,
        category: 'Research',
        tags: ['Quantum', 'ML', 'Future'],
        views: 460,
        isPublished: true
      },
      {
        title: 'AI cho Startup: Từ ý tưởng đến sản phẩm',
        summary: 'Hướng dẫn startup xây dựng sản phẩm AI từ đầu',
        content: 'Workshop đặc biệt dành cho startup muốn tích hợp AI vào sản phẩm. Nội dung bao gồm: xác định bài toán, chọn công nghệ phù hợp, xây dựng MVP, và scale sản phẩm AI. Diễn giả là các founder thành công trong lĩnh vực AI.',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
        author: admin._id,
        category: 'Events',
        tags: ['Startup', 'AI Product', 'Workshop'],
        views: 610,
        isPublished: true
      },
      {
        title: 'Gradient Descent và các biến thể',
        summary: 'Hiểu sâu về thuật toán tối ưu cơ bản trong Machine Learning',
        content: 'Gradient Descent là nền tảng của hầu hết các thuật toán ML. Bài viết này giải thích chi tiết về GD, SGD, Mini-batch GD, Adam, RMSprop và khi nào nên sử dụng từng loại. Kèm theo code Python minh họa.',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800',
        author: admin._id,
        category: 'Machine Learning',
        tags: ['Gradient Descent', 'Optimization', 'ML'],
        views: 420,
        isPublished: true
      },
      {
        title: 'Feature Engineering: Nghệ thuật tạo đặc trưng',
        summary: 'Kỹ thuật quan trọng để cải thiện hiệu suất mô hình ML',
        content: 'Feature Engineering là bước quan trọng trong ML pipeline. Bài viết hướng dẫn các kỹ thuật như scaling, encoding, feature selection, feature extraction, và cách xử lý missing data để tạo ra features tốt hơn.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        author: admin._id,
        category: 'Machine Learning',
        tags: ['Feature Engineering', 'Data Preprocessing', 'ML'],
        views: 380,
        isPublished: true
      },
      {
        title: 'Ensemble Learning: Sức mạnh của tập thể',
        summary: 'Kết hợp nhiều mô hình để đạt kết quả tốt hơn',
        content: 'Ensemble Learning như Random Forest, XGBoost, LightGBM thường cho kết quả tốt hơn single model. Bài viết giải thích về bagging, boosting, stacking và cách áp dụng chúng trong thực tế.',
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800',
        author: admin._id,
        category: 'Machine Learning',
        tags: ['Ensemble', 'Random Forest', 'XGBoost'],
        views: 510,
        isPublished: true
      },
      {
        title: 'Overfitting và Underfitting: Cân bằng là chìa khóa',
        summary: 'Hiểu và khắc phục hai vấn đề phổ biến trong ML',
        content: 'Overfitting và underfitting là hai thách thức lớn trong ML. Bài viết này giải thích nguyên nhân, cách phát hiện, và các kỹ thuật như regularization, cross-validation, early stopping để giải quyết vấn đề.',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
        author: admin._id,
        category: 'Machine Learning',
        tags: ['Overfitting', 'Regularization', 'ML'],
        views: 450,
        isPublished: true
      },
      {
        title: 'Time Series Forecasting với ML',
        summary: 'Dự đoán chuỗi thời gian sử dụng Machine Learning',
        content: 'Time series forecasting có ứng dụng rộng rãi trong tài chính, bán lẻ, và IoT. Bài viết hướng dẫn các kỹ thuật như ARIMA, Prophet, LSTM, và cách xử lý seasonality, trend trong dữ liệu thời gian.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        author: admin._id,
        category: 'Machine Learning',
        tags: ['Time Series', 'Forecasting', 'LSTM'],
        views: 490,
        isPublished: true
      },
      {
        title: 'CNN Architecture: Từ LeNet đến EfficientNet',
        summary: 'Lịch sử phát triển của kiến trúc CNN trong Deep Learning',
        content: 'Từ LeNet (1998) đến EfficientNet (2019), CNN đã có nhiều bước tiến vượt bậc. Bài viết này review các kiến trúc quan trọng như AlexNet, VGG, ResNet, Inception, MobileNet và giải thích tại sao chúng quan trọng.',
        image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800',
        author: admin._id,
        category: 'Deep Learning',
        tags: ['CNN', 'Architecture', 'Computer Vision'],
        views: 580,
        isPublished: true
      },
      {
        title: 'Attention Mechanism: Trái tim của Transformer',
        summary: 'Cơ chế attention đã thay đổi Deep Learning như thế nào',
        content: 'Attention mechanism là đột phá lớn trong DL, đặc biệt là self-attention trong Transformer. Bài viết giải thích chi tiết về Query, Key, Value, multi-head attention và cách nó hoạt động trong BERT và GPT.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
        author: admin._id,
        category: 'Deep Learning',
        tags: ['Attention', 'Transformer', 'Deep Learning'],
        views: 640,
        isPublished: true
      },
      {
        title: 'Transfer Learning: Học từ mô hình có sẵn',
        summary: 'Tận dụng pre-trained models để tiết kiệm thời gian và tài nguyên',
        content: 'Transfer Learning cho phép sử dụng mô hình đã được train trên dataset lớn cho bài toán mới. Bài viết hướng dẫn cách fine-tune BERT, GPT, ResNet và khi nào nên sử dụng transfer learning.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        author: admin._id,
        category: 'Deep Learning',
        tags: ['Transfer Learning', 'Fine-tuning', 'Pre-trained'],
        views: 520,
        isPublished: true
      },
      {
        title: 'GANs: Tạo dữ liệu giả từ không khí',
        summary: 'Generative Adversarial Networks và ứng dụng sáng tạo',
        content: 'GANs đã tạo ra cuộc cách mạng trong việc sinh dữ liệu. Bài viết giới thiệu về kiến trúc GAN, các biến thể như StyleGAN, CycleGAN, và ứng dụng trong tạo ảnh, video, và data augmentation.',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800',
        author: admin._id,
        category: 'Deep Learning',
        tags: ['GAN', 'Generative AI', 'Deep Learning'],
        views: 670,
        isPublished: true
      },
      {
        title: 'Batch Normalization và Layer Normalization',
        summary: 'Kỹ thuật normalization giúp training nhanh và ổn định hơn',
        content: 'Normalization là kỹ thuật quan trọng trong DL. Bài viết so sánh Batch Norm, Layer Norm, Instance Norm, Group Norm và giải thích khi nào nên sử dụng từng loại trong CNN, RNN, và Transformer.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        author: admin._id,
        category: 'Deep Learning',
        tags: ['Normalization', 'Batch Norm', 'Deep Learning'],
        views: 410,
        isPublished: true
      }
    ];

    for (const news of newsItems) {
      await News.create(news);
      console.log('📰 Created news:', news.title);
    }

    // Create partners
    const partners = [
      {
        name: 'Google',
        logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        website: 'https://www.google.com',
        description: 'Đối tác công nghệ hàng đầu thế giới',
        isActive: true
      },
      {
        name: 'Microsoft',
        logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
        website: 'https://www.microsoft.com',
        description: 'Đối tác chiến lược về AI và Cloud',
        isActive: true
      },
      {
        name: 'AWS',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
        website: 'https://aws.amazon.com',
        description: 'Nhà cung cấp dịch vụ cloud hàng đầu',
        isActive: true
      },
      {
        name: 'NVIDIA',
        logo: 'https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/01-nvidia-logo-vert-500x200-2c50-d@2x.png',
        website: 'https://www.nvidia.com',
        description: 'Đối tác về GPU và AI Computing',
        isActive: true
      },
      {
        name: 'IBM',
        logo: 'https://www.ibm.com/brand/experience-guides/developer/b1db1ae501d522a1a4b49613fe07c9f1/01_8-bar-positive.svg',
        website: 'https://www.ibm.com',
        description: 'Đối tác về Watson AI và Enterprise Solutions',
        isActive: true
      },
      {
        name: 'Intel',
        logo: 'https://www.intel.com/content/dam/logos/intel-footer-logo.svg',
        website: 'https://www.intel.com',
        description: 'Đối tác về phần cứng và AI processors',
        isActive: true
      },
      {
        name: 'Meta',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
        website: 'https://www.meta.com',
        description: 'Đối tác về AI Research và PyTorch',
        isActive: true
      },
      {
        name: 'OpenAI',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
        website: 'https://www.openai.com',
        description: 'Đối tác về Generative AI và GPT',
        isActive: true
      }
    ];

    for (const partner of partners) {
      await Partner.create(partner);
      console.log('🤝 Created partner:', partner.name);
    }

    console.log('✅ Partners created');

    // Create feedback
    const feedbackItems = [
      {
        name: 'Nguyễn Văn B',
        email: 'nguyenvanb@example.com',
        subject: 'Hỏi về khóa học Machine Learning',
        message: 'Cho em hỏi khóa học Machine Learning có phù hợp với người mới bắt đầu không ạ? Em chưa có kinh nghiệm về lập trình.',
        status: 'pending'
      },
      {
        name: 'Trần Thị C',
        email: 'tranthic@example.com',
        subject: 'Đăng ký khóa học Deep Learning',
        message: 'Em muốn đăng ký khóa học Deep Learning. Khóa học có học online không ạ? Học phí có thể trả góp không?',
        status: 'read'
      },
      {
        name: 'Lê Văn D',
        email: 'levand@example.com',
        subject: 'Feedback về khóa học Python',
        message: 'Khóa học Python rất hay và bổ ích. Giảng viên nhiệt tình, tài liệu đầy đủ. Cảm ơn AI Center!',
        status: 'replied'
      },
      {
        name: 'Phạm Thị E',
        email: 'phamthie@example.com',
        subject: 'Hỏi về chứng chỉ',
        message: 'Sau khi hoàn thành khóa học, em có nhận được chứng chỉ không ạ? Chứng chỉ có được công nhận không?',
        status: 'pending'
      }
    ];

    for (const feedback of feedbackItems) {
      await Feedback.create(feedback);
    }
    console.log('💬 Created feedback');

    // Create sample registrations
    const Registration = require('../models/Registration');
    await Registration.deleteMany({});
    
    const sampleRegistrations = [
      {
        user: (await User.findOne({ email: 'user@gmail.com' }))._id,
        course: (await Course.findOne({ title: 'Machine Learning cơ bản' }))._id,
        status: 'pending'
      },
      {
        user: (await User.findOne({ email: 'user@gmail.com' }))._id,
        course: (await Course.findOne({ title: 'Deep Learning với TensorFlow' }))._id,
        status: 'approved'
      }
    ];

    for (const reg of sampleRegistrations) {
      await Registration.create(reg);
    }
    console.log('✅ Created sample registrations');

    console.log('\n✅ Seed completed successfully!');
    console.log('📊 Summary:');
    console.log(`   Users: ${await User.countDocuments()}`);
    console.log(`   Courses: ${await Course.countDocuments()}`);
    console.log(`   News: ${await News.countDocuments()}`);
    console.log(`   Partners: ${await Partner.countDocuments()}`);
    console.log(`   Feedback: ${await Feedback.countDocuments()}`);
    console.log('\n🔑 Login credentials:');
    console.log('   Admin: admin@aicenter.vn / admin123');
    console.log('   User: user@gmail.com / user123');
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seed();
