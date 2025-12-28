const mongoose = require('mongoose');
require('dotenv').config();
const News = require('../models/News');

// Nội dung đa dạng cho từng tin tức
const diverseContent = {
  'Machine Learning': `
    <h2>Machine Learning - Nền tảng của AI hiện đại</h2>
    <p>Machine Learning (ML) là một nhánh của trí tuệ nhân tạo cho phép máy tính học từ dữ liệu mà không cần được lập trình cụ thể. Đây là công nghệ đằng sau nhiều ứng dụng mà chúng ta sử dụng hàng ngày.</p>
    
    <h3>Các loại Machine Learning</h3>
    <ul>
      <li><strong>Supervised Learning (Học có giám sát):</strong> Học từ dữ liệu đã được gán nhãn. Ví dụ: phân loại email spam, dự đoán giá nhà.</li>
      <li><strong>Unsupervised Learning (Học không giám sát):</strong> Tìm kiếm pattern trong dữ liệu chưa gán nhãn. Ví dụ: phân cụm khách hàng, giảm chiều dữ liệu.</li>
      <li><strong>Reinforcement Learning (Học tăng cường):</strong> Học thông qua thử và sai. Ví dụ: game AI, robot tự động.</li>
    </ul>

    <h3>Quy trình xây dựng mô hình ML</h3>
    <ol>
      <li><strong>Thu thập dữ liệu:</strong> Lấy dữ liệu từ nhiều nguồn khác nhau</li>
      <li><strong>Tiền xử lý:</strong> Làm sạch, chuẩn hóa dữ liệu</li>
      <li><strong>Feature Engineering:</strong> Tạo các đặc trưng hữu ích</li>
      <li><strong>Chọn mô hình:</strong> Linear Regression, Decision Tree, Neural Network...</li>
      <li><strong>Training:</strong> Huấn luyện mô hình với dữ liệu</li>
      <li><strong>Evaluation:</strong> Đánh giá hiệu suất</li>
      <li><strong>Deployment:</strong> Triển khai vào production</li>
    </ol>

    <blockquote>
      "Machine Learning là khả năng học mà không được lập trình rõ ràng." - Arthur Samuel, 1959
    </blockquote>

    <h3>Công cụ phổ biến</h3>
    <p>Các thư viện Python được sử dụng rộng rãi:</p>
    <ul>
      <li><strong>Scikit-learn:</strong> Thư viện ML cổ điển, dễ sử dụng</li>
      <li><strong>Pandas:</strong> Xử lý và phân tích dữ liệu</li>
      <li><strong>NumPy:</strong> Tính toán số học</li>
      <li><strong>Matplotlib/Seaborn:</strong> Trực quan hóa dữ liệu</li>
    </ul>
  `,

  'Deep Learning': `
    <h2>Deep Learning - Bước đột phá của AI</h2>
    <p>Deep Learning sử dụng mạng neural nhiều lớp để học các biểu diễn phức tạp từ dữ liệu. Công nghệ này đã tạo ra những bước đột phá trong nhận dạng hình ảnh, xử lý ngôn ngữ tự nhiên và nhiều lĩnh vực khác.</p>

    <h3>Tại sao Deep Learning lại mạnh?</h3>
    <p>Deep Learning có khả năng tự động học các đặc trưng từ dữ liệu thô, không cần feature engineering thủ công. Điều này đặc biệt hữu ích với dữ liệu phi cấu trúc như ảnh, âm thanh, văn bản.</p>

    <h3>Các thành phần cơ bản</h3>
    <h4>1. Neurons và Layers</h4>
    <p>Mỗi neuron nhận input, áp dụng trọng số và hàm kích hoạt để tạo output. Nhiều neurons tạo thành một layer.</p>

    <h4>2. Activation Functions</h4>
    <ul>
      <li><strong>ReLU:</strong> f(x) = max(0, x) - Phổ biến nhất</li>
      <li><strong>Sigmoid:</strong> Cho output từ 0 đến 1</li>
      <li><strong>Tanh:</strong> Cho output từ -1 đến 1</li>
      <li><strong>Softmax:</strong> Dùng cho phân loại đa lớp</li>
    </ul>

    <h4>3. Loss Functions</h4>
    <p>Đo lường sai số giữa dự đoán và thực tế:</p>
    <ul>
      <li>Mean Squared Error (MSE) cho regression</li>
      <li>Cross-Entropy cho classification</li>
    </ul>

    <h4>4. Optimization</h4>
    <p>Các thuật toán tối ưu phổ biến:</p>
    <ul>
      <li><strong>SGD:</strong> Stochastic Gradient Descent</li>
      <li><strong>Adam:</strong> Adaptive Moment Estimation</li>
      <li><strong>RMSprop:</strong> Root Mean Square Propagation</li>
    </ul>

    <blockquote>
      "Deep Learning đã cho phép chúng ta giải quyết những vấn đề mà trước đây tưởng chừng như không thể." - Geoffrey Hinton
    </blockquote>
  `
};

async function updateDiverseContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Đã kết nối MongoDB\n');

    const allNews = await News.find();

    for (const news of allNews) {
      let content = '';
      
      // Tạo nội dung dựa trên tiêu đề hoặc category
      if (news.title.includes('Machine Learning') || news.title.includes('ML')) {
        content = diverseContent['Machine Learning'];
      } else if (news.title.includes('Deep Learning') || news.title.includes('Neural')) {
        content = diverseContent['Deep Learning'];
      } else if (news.title.includes('ChatGPT') || news.title.includes('NLP') || news.title.includes('Transformer')) {
        content = `
          <h2>Xử lý Ngôn ngữ Tự nhiên (NLP)</h2>
          <p>Natural Language Processing là lĩnh vực giúp máy tính hiểu và xử lý ngôn ngữ con người. ChatGPT và các mô hình ngôn ngữ lớn đã tạo ra cuộc cách mạng trong NLP.</p>
          
          <h3>Các bài toán NLP phổ biến</h3>
          <ul>
            <li><strong>Text Classification:</strong> Phân loại văn bản (spam detection, sentiment analysis)</li>
            <li><strong>Named Entity Recognition:</strong> Nhận dạng thực thể (tên người, địa điểm, tổ chức)</li>
            <li><strong>Machine Translation:</strong> Dịch máy (Google Translate)</li>
            <li><strong>Question Answering:</strong> Trả lời câu hỏi tự động</li>
            <li><strong>Text Generation:</strong> Tạo văn bản (ChatGPT, GPT-4)</li>
          </ul>

          <h3>Transformer - Kiến trúc đột phá</h3>
          <p>Transformer sử dụng cơ chế attention để xử lý toàn bộ chuỗi đầu vào cùng lúc, thay vì tuần tự như RNN.</p>
          
          <h4>Các mô hình Transformer nổi tiếng</h4>
          <ol>
            <li><strong>BERT:</strong> Bidirectional Encoder - Hiểu ngữ cảnh hai chiều</li>
            <li><strong>GPT:</strong> Generative Pre-trained Transformer - Tạo văn bản</li>
            <li><strong>T5:</strong> Text-to-Text Transfer Transformer</li>
            <li><strong>BART:</strong> Kết hợp encoder-decoder</li>
          </ol>

          <blockquote>
            "Attention is all you need" - Tiêu đề paper giới thiệu Transformer, 2017
          </blockquote>

          <h3>Ứng dụng thực tế</h3>
          <ul>
            <li>Chatbot thông minh và trợ lý ảo</li>
            <li>Tóm tắt văn bản tự động</li>
            <li>Phân tích cảm xúc khách hàng</li>
            <li>Tạo nội dung marketing</li>
            <li>Hỗ trợ viết code (GitHub Copilot)</li>
          </ul>
        `;
      } else if (news.title.includes('Computer Vision') || news.title.includes('CNN') || news.title.includes('Image')) {
        content = `
          <h2>Computer Vision - Mắt của AI</h2>
          <p>Computer Vision cho phép máy tính "nhìn" và hiểu thế giới thị giác. Từ nhận dạng khuôn mặt đến xe tự lái, CV đang thay đổi cách chúng ta tương tác với công nghệ.</p>

          <h3>Kiến trúc CNN (Convolutional Neural Networks)</h3>
          <p>CNN là kiến trúc chuyên biệt cho xử lý ảnh, sử dụng các lớp convolution để trích xuất đặc trưng.</p>

          <h4>Các lớp trong CNN</h4>
          <ul>
            <li><strong>Convolutional Layer:</strong> Trích xuất đặc trưng bằng filters</li>
            <li><strong>Pooling Layer:</strong> Giảm kích thước, giữ thông tin quan trọng</li>
            <li><strong>Fully Connected Layer:</strong> Phân loại dựa trên đặc trưng</li>
          </ul>

          <h3>Các kiến trúc CNN nổi tiếng</h3>
          <table>
            <tr>
              <th>Mô hình</th>
              <th>Năm</th>
              <th>Đặc điểm</th>
            </tr>
            <tr>
              <td>LeNet</td>
              <td>1998</td>
              <td>CNN đầu tiên, nhận dạng chữ số</td>
            </tr>
            <tr>
              <td>AlexNet</td>
              <td>2012</td>
              <td>Đột phá ImageNet, sử dụng ReLU</td>
            </tr>
            <tr>
              <td>VGG</td>
              <td>2014</td>
              <td>Kiến trúc đơn giản, hiệu quả</td>
            </tr>
            <tr>
              <td>ResNet</td>
              <td>2015</td>
              <td>Skip connections, 152 layers</td>
            </tr>
            <tr>
              <td>EfficientNet</td>
              <td>2019</td>
              <td>Tối ưu độ chính xác và tốc độ</td>
            </tr>
          </table>

          <h3>Ứng dụng Computer Vision</h3>
          <h4>1. Nhận dạng và Phân loại</h4>
          <p>Xác định đối tượng trong ảnh: nhận dạng khuôn mặt, phân loại sản phẩm, kiểm tra chất lượng.</p>

          <h4>2. Object Detection</h4>
          <p>Phát hiện và định vị nhiều đối tượng: YOLO, Faster R-CNN, SSD.</p>

          <h4>3. Segmentation</h4>
          <p>Phân đoạn từng pixel: xe tự lái, chẩn đoán y tế, chỉnh sửa ảnh.</p>

          <h4>4. Pose Estimation</h4>
          <p>Ước lượng tư thế con người: thể thao, AR/VR, giám sát sức khỏe.</p>

          <blockquote>
            "Computer Vision sẽ thay đổi mọi ngành công nghiệp trong thập kỷ tới." - Fei-Fei Li
          </blockquote>
        `;
      } else if (news.title.includes('GAN') || news.title.includes('Generative')) {
        content = `
          <h2>GANs - Generative Adversarial Networks</h2>
          <p>GANs là một trong những ý tưởng thú vị nhất trong Deep Learning. Chúng có thể tạo ra dữ liệu mới giống như dữ liệu thật: ảnh, âm thanh, video.</p>

          <h3>Cách hoạt động của GANs</h3>
          <p>GANs gồm hai mạng neural cạnh tranh nhau:</p>
          
          <h4>Generator (Bộ tạo)</h4>
          <p>Nhiệm vụ: Tạo ra dữ liệu giả từ noise ngẫu nhiên, cố gắng đánh lừa Discriminator.</p>

          <h4>Discriminator (Bộ phân biệt)</h4>
          <p>Nhiệm vụ: Phân biệt dữ liệu thật và giả, cố gắng không bị Generator đánh lừa.</p>

          <blockquote>
            "GANs là ý tưởng thú vị nhất trong Machine Learning trong 10 năm qua." - Yann LeCun
          </blockquote>

          <h3>Các biến thể của GANs</h3>
          <ul>
            <li><strong>DCGAN:</strong> Deep Convolutional GAN - Sử dụng CNN</li>
            <li><strong>StyleGAN:</strong> Tạo ảnh chân dung siêu thực</li>
            <li><strong>CycleGAN:</strong> Chuyển đổi phong cách ảnh</li>
            <li><strong>Pix2Pix:</strong> Chuyển đổi ảnh có điều kiện</li>
            <li><strong>BigGAN:</strong> Tạo ảnh độ phân giải cao</li>
          </ul>

          <h3>Ứng dụng của GANs</h3>
          <ol>
            <li><strong>Tạo ảnh nghệ thuật:</strong> Stable Diffusion, Midjourney</li>
            <li><strong>Chỉnh sửa ảnh:</strong> Thay đổi tuổi, giới tính, biểu cảm</li>
            <li><strong>Tăng cường dữ liệu:</strong> Tạo thêm dữ liệu training</li>
            <li><strong>Super Resolution:</strong> Tăng độ phân giải ảnh</li>
            <li><strong>Deepfake:</strong> Tạo video giả (cần sử dụng có đạo đức)</li>
          </ol>

          <h3>Thách thức</h3>
          <p>GANs khó train và có thể gặp các vấn đề:</p>
          <ul>
            <li>Mode collapse: Generator tạo ra ảnh giống nhau</li>
            <li>Training instability: Khó cân bằng G và D</li>
            <li>Vanishing gradients: Gradient biến mất</li>
          </ul>
        `;
      } else if (news.title.includes('Reinforcement') || news.title.includes('RL')) {
        content = `
          <h2>Reinforcement Learning - Học từ Kinh nghiệm</h2>
          <p>Reinforcement Learning (RL) là phương pháp học máy trong đó agent học cách hành động trong môi trường để tối đa hóa phần thưởng tích lũy.</p>

          <h3>Các thành phần của RL</h3>
          <ul>
            <li><strong>Agent:</strong> Người ra quyết định (AI)</li>
            <li><strong>Environment:</strong> Môi trường tương tác</li>
            <li><strong>State:</strong> Trạng thái hiện tại</li>
            <li><strong>Action:</strong> Hành động có thể thực hiện</li>
            <li><strong>Reward:</strong> Phần thưởng/phạt nhận được</li>
            <li><strong>Policy:</strong> Chiến lược hành động</li>
          </ul>

          <h3>Các thuật toán RL phổ biến</h3>
          
          <h4>Value-based Methods</h4>
          <ul>
            <li><strong>Q-Learning:</strong> Học giá trị của mỗi hành động</li>
            <li><strong>DQN:</strong> Deep Q-Network - Kết hợp Q-Learning và Deep Learning</li>
          </ul>

          <h4>Policy-based Methods</h4>
          <ul>
            <li><strong>REINFORCE:</strong> Policy Gradient cơ bản</li>
            <li><strong>A3C:</strong> Asynchronous Advantage Actor-Critic</li>
          </ul>

          <h4>Actor-Critic Methods</h4>
          <ul>
            <li><strong>PPO:</strong> Proximal Policy Optimization</li>
            <li><strong>SAC:</strong> Soft Actor-Critic</li>
          </ul>

          <h3>Ứng dụng thực tế</h3>
          <ol>
            <li><strong>Game AI:</strong> AlphaGo đánh bại nhà vô địch cờ vây</li>
            <li><strong>Robot:</strong> Điều khiển robot tự động</li>
            <li><strong>Xe tự lái:</strong> Ra quyết định lái xe</li>
            <li><strong>Tài chính:</strong> Trading tự động</li>
            <li><strong>Quản lý tài nguyên:</strong> Tối ưu hóa datacenter</li>
          </ol>

          <blockquote>
            "RL là con đường đến trí tuệ nhân tạo tổng quát (AGI)." - Richard Sutton
          </blockquote>
        `;
      } else if (news.title.includes('Workshop') || news.title.includes('Chatbot')) {
        content = `
          <h2>Xây dựng Chatbot với Python</h2>
          <p>Chatbot là ứng dụng AI phổ biến nhất hiện nay. Trong workshop này, bạn sẽ học cách xây dựng chatbot từ cơ bản đến nâng cao.</p>

          <h3>Các loại Chatbot</h3>
          
          <h4>1. Rule-based Chatbot</h4>
          <p>Hoạt động dựa trên các quy tắc được định nghĩa trước. Đơn giản nhưng hạn chế.</p>
          <ul>
            <li>✅ Dễ xây dựng và kiểm soát</li>
            <li>❌ Không linh hoạt, không học được</li>
          </ul>

          <h4>2. AI-powered Chatbot</h4>
          <p>Sử dụng NLP và Machine Learning để hiểu và trả lời.</p>
          <ul>
            <li>✅ Thông minh, học từ dữ liệu</li>
            <li>✅ Xử lý được câu hỏi phức tạp</li>
            <li>❌ Cần nhiều dữ liệu training</li>
          </ul>

          <h3>Công cụ xây dựng Chatbot</h3>
          
          <h4>Thư viện Python</h4>
          <ul>
            <li><strong>NLTK:</strong> Natural Language Toolkit - Xử lý ngôn ngữ cơ bản</li>
            <li><strong>spaCy:</strong> NLP hiện đại, nhanh và chính xác</li>
            <li><strong>Rasa:</strong> Framework chatbot mã nguồn mở</li>
            <li><strong>ChatterBot:</strong> Chatbot đơn giản cho người mới</li>
          </ul>

          <h4>API và Services</h4>
          <ul>
            <li><strong>OpenAI API:</strong> GPT-3.5, GPT-4</li>
            <li><strong>Dialogflow:</strong> Từ Google</li>
            <li><strong>Microsoft Bot Framework</strong></li>
            <li><strong>Amazon Lex</strong></li>
          </ul>

          <h3>Quy trình xây dựng</h3>
          <ol>
            <li><strong>Xác định mục đích:</strong> Chatbot làm gì? Phục vụ ai?</li>
            <li><strong>Thu thập dữ liệu:</strong> Câu hỏi và câu trả lời mẫu</li>
            <li><strong>Xử lý ngôn ngữ:</strong> Tokenization, lemmatization</li>
            <li><strong>Training model:</strong> Huấn luyện mô hình NLP</li>
            <li><strong>Tích hợp:</strong> Kết nối với website, app</li>
            <li><strong>Testing:</strong> Kiểm tra và cải thiện</li>
          </ol>

          <h3>Best Practices</h3>
          <ul>
            <li>Bắt đầu đơn giản, mở rộng dần</li>
            <li>Có fallback khi không hiểu</li>
            <li>Cá nhân hóa trải nghiệm</li>
            <li>Theo dõi và phân tích hội thoại</li>
            <li>Cập nhật và cải thiện liên tục</li>
          </ul>
        `;
      } else if (news.title.includes('Hackathon') || news.title.includes('Workshop')) {
        content = `
          <h2>Sự kiện AI - Cơ hội học hỏi và kết nối</h2>
          <p>Tham gia các sự kiện AI là cách tuyệt vời để học hỏi, thực hành và kết nối với cộng đồng. Đây là nơi bạn có thể áp dụng kiến thức vào thực tế.</p>

          <h3>Lợi ích khi tham gia</h3>
          
          <h4>🎯 Học hỏi thực tế</h4>
          <p>Làm việc với dữ liệu thật, giải quyết vấn đề thực tế, không chỉ lý thuyết.</p>

          <h4>🤝 Networking</h4>
          <p>Gặp gỡ các chuyên gia, nhà tuyển dụng, và những người có cùng đam mê.</p>

          <h4>🏆 Giải thưởng hấp dẫn</h4>
          <p>Cơ hội nhận giải thưởng, học bổng, hoặc cơ hội việc làm.</p>

          <h4>💼 Xây dựng Portfolio</h4>
          <p>Dự án từ hackathon là minh chứng tuyệt vời cho kỹ năng của bạn.</p>

          <h3>Chuẩn bị cho Hackathon</h3>
          
          <h4>Trước sự kiện</h4>
          <ul>
            <li>Tìm hiểu chủ đề và yêu cầu</li>
            <li>Chuẩn bị môi trường dev (laptop, tools)</li>
            <li>Tìm team hoặc đăng ký solo</li>
            <li>Ôn lại kiến thức cần thiết</li>
          </ul>

          <h4>Trong sự kiện</h4>
          <ul>
            <li>Brainstorm ý tưởng sáng tạo</li>
            <li>Phân chia công việc rõ ràng</li>
            <li>Focus vào MVP (Minimum Viable Product)</li>
            <li>Chuẩn bị presentation ấn tượng</li>
          </ul>

          <h4>Sau sự kiện</h4>
          <ul>
            <li>Hoàn thiện dự án</li>
            <li>Đăng lên GitHub</li>
            <li>Viết blog về trải nghiệm</li>
            <li>Giữ liên lạc với team và mentors</li>
          </ul>

          <h3>Tips để thành công</h3>
          <ol>
            <li><strong>Chọn vấn đề phù hợp:</strong> Không quá khó, không quá dễ</li>
            <li><strong>Sử dụng công cụ có sẵn:</strong> API, pre-trained models</li>
            <li><strong>Demo tốt:</strong> Presentation quan trọng như code</li>
            <li><strong>Quản lý thời gian:</strong> Đừng code đến phút cuối</li>
            <li><strong>Vui vẻ:</strong> Đây là cơ hội học hỏi, đừng stress!</li>
          </ol>

          <blockquote>
            "Hackathon không phải về việc thắng, mà về việc học hỏi và kết nối." - Anonymous
          </blockquote>
        `;
      } else {
        // Nội dung mặc định cho các tin tức khác
        content = `
          <h2>${news.title}</h2>
          <p>Đây là một chủ đề quan trọng trong lĩnh vực Trí tuệ nhân tạo và Machine Learning. Hãy cùng tìm hiểu chi tiết về nó.</p>

          <h3>Tổng quan</h3>
          <p>${news.summary || news.content}</p>

          <h3>Tại sao chủ đề này quan trọng?</h3>
          <p>Trong bối cảnh công nghệ AI đang phát triển nhanh chóng, việc nắm bắt các xu hướng và kiến thức mới là vô cùng cần thiết. Chủ đề này giúp bạn:</p>
          <ul>
            <li>Hiểu rõ hơn về công nghệ AI hiện đại</li>
            <li>Áp dụng kiến thức vào thực tế</li>
            <li>Nâng cao kỹ năng chuyên môn</li>
            <li>Mở rộng cơ hội nghề nghiệp</li>
          </ul>

          <h3>Kiến thức cần có</h3>
          <p>Để hiểu sâu về chủ đề này, bạn nên có nền tảng về:</p>
          <ol>
            <li><strong>Toán học:</strong> Đại số tuyến tính, xác suất thống kê, giải tích</li>
            <li><strong>Lập trình:</strong> Python, các thư viện ML/DL</li>
            <li><strong>Machine Learning:</strong> Các thuật toán cơ bản</li>
            <li><strong>Deep Learning:</strong> Neural Networks, backpropagation</li>
          </ol>

          <h3>Tài nguyên học tập</h3>
          <ul>
            <li>Khóa học trực tuyến: Coursera, edX, Udacity</li>
            <li>Sách: "Deep Learning" by Goodfellow, "Hands-On Machine Learning"</li>
            <li>Paper: arXiv.org, Papers with Code</li>
            <li>Thực hành: Kaggle, GitHub projects</li>
          </ul>

          <h3>Bước tiếp theo</h3>
          <p>Sau khi tìm hiểu về chủ đề này, bạn có thể:</p>
          <ul>
            <li>Tham gia các khóa học chuyên sâu tại AI Center</li>
            <li>Thực hành với các dự án thực tế</li>
            <li>Tham gia cộng đồng AI để trao đổi</li>
            <li>Áp dụng vào công việc hoặc nghiên cứu</li>
          </ul>

          <blockquote>
            "Học AI không chỉ là học công nghệ, mà là học cách tư duy và giải quyết vấn đề." - AI Center
          </blockquote>
        `;
      }

      news.detailedContent = content;
      await news.save();
      console.log(`✅ ${news.title.substring(0, 50)}...`);
    }

    console.log(`\n🎉 Đã cập nhật ${allNews.length} tin tức với nội dung đa dạng!`);
    process.exit(0);
  } catch (error) {
    console.error('Lỗi:', error);
    process.exit(1);
  }
}

updateDiverseContent();
