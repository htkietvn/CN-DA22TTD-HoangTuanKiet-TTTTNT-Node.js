const mongoose = require('mongoose');
require('dotenv').config();
const News = require('../models/News');

const detailedNewsContent = [
  {
    title: 'AI và Machine Learning: Xu hướng công nghệ 2024',
    detailedContent: `
      <h2>Giới thiệu về AI và Machine Learning</h2>
      <p>Trí tuệ nhân tạo (AI) và Machine Learning đang thay đổi cách chúng ta sống và làm việc. Năm 2024 đánh dấu một bước ngoặt quan trọng trong sự phát triển của công nghệ này.</p>
      
      <h3>Các xu hướng chính</h3>
      <ul>
        <li><strong>AI Generative:</strong> ChatGPT, DALL-E và các công cụ tạo nội dung tự động đang bùng nổ</li>
        <li><strong>AutoML:</strong> Tự động hóa quá trình xây dựng mô hình ML</li>
        <li><strong>Edge AI:</strong> Đưa AI vào các thiết bị IoT và di động</li>
        <li><strong>Explainable AI:</strong> Làm cho AI minh bạch và dễ hiểu hơn</li>
      </ul>

      <h3>Ứng dụng thực tế</h3>
      <p>Machine Learning đang được ứng dụng rộng rãi trong nhiều lĩnh vực:</p>
      
      <blockquote>
        "AI không phải là tương lai, nó là hiện tại. Những ai không thích nghi sẽ bị bỏ lại phía sau." - Andrew Ng
      </blockquote>

      <h4>1. Y tế</h4>
      <p>Chẩn đoán bệnh qua hình ảnh y khoa, dự đoán dịch bệnh, phát triển thuốc mới.</p>

      <h4>2. Tài chính</h4>
      <p>Phát hiện gian lận, đánh giá tín dụng, giao dịch tự động, tư vấn đầu tư.</p>

      <h4>3. Giáo dục</h4>
      <p>Cá nhân hóa học tập, chấm bài tự động, hỗ trợ giảng dạy thông minh.</p>

      <h3>Kết luận</h3>
      <p>Tương lai của AI và Machine Learning là vô cùng hứa hẹn. Đây là thời điểm tuyệt vời để bắt đầu học và nghiên cứu về lĩnh vực này.</p>
    `
  },
  {
    title: 'Deep Learning: Từ lý thuyết đến thực hành',
    detailedContent: `
      <h2>Deep Learning là gì?</h2>
      <p>Deep Learning là một nhánh của Machine Learning sử dụng mạng neural nhân tạo với nhiều lớp (deep neural networks) để học các biểu diễn dữ liệu ở nhiều mức độ trừu tượng khác nhau.</p>

      <h3>Kiến trúc mạng neural cơ bản</h3>
      <p>Một mạng neural thường bao gồm:</p>
      <ol>
        <li><strong>Input Layer:</strong> Lớp đầu vào nhận dữ liệu</li>
        <li><strong>Hidden Layers:</strong> Các lớp ẩn xử lý thông tin</li>
        <li><strong>Output Layer:</strong> Lớp đầu ra cho kết quả</li>
      </ol>

      <h3>Các loại mạng neural phổ biến</h3>
      
      <h4>Convolutional Neural Networks (CNN)</h4>
      <p>Chuyên dùng cho xử lý ảnh và computer vision. CNN đã đạt được những thành tựu đáng kinh ngạc trong nhận dạng hình ảnh, vượt qua cả con người trong một số tác vụ.</p>

      <h4>Recurrent Neural Networks (RNN)</h4>
      <p>Thích hợp cho dữ liệu tuần tự như văn bản, âm thanh, chuỗi thời gian. LSTM và GRU là các biến thể phổ biến của RNN.</p>

      <h4>Transformer</h4>
      <p>Kiến trúc mới nhất, là nền tảng cho các mô hình ngôn ngữ lớn như GPT, BERT. Transformer sử dụng cơ chế attention để xử lý dữ liệu hiệu quả hơn.</p>

      <blockquote>
        "Deep Learning đã mở ra một kỷ nguyên mới cho AI, nơi máy tính có thể học từ dữ liệu mà không cần lập trình chi tiết." - Yann LeCun
      </blockquote>

      <h3>Công cụ và Framework</h3>
      <ul>
        <li><strong>TensorFlow:</strong> Framework mạnh mẽ từ Google</li>
        <li><strong>PyTorch:</strong> Linh hoạt và dễ sử dụng, được ưa chuộng trong nghiên cứu</li>
        <li><strong>Keras:</strong> API cấp cao, dễ học cho người mới</li>
        <li><strong>JAX:</strong> Framework mới với hiệu năng cao</li>
      </ul>

      <h3>Bắt đầu với Deep Learning</h3>
      <p>Để bắt đầu học Deep Learning, bạn cần:</p>
      <ol>
        <li>Nắm vững Python và các thư viện NumPy, Pandas</li>
        <li>Hiểu cơ bản về đại số tuyến tính và giải tích</li>
        <li>Thực hành với các dataset mẫu như MNIST, CIFAR-10</li>
        <li>Tham gia các khóa học và cộng đồng</li>
      </ol>
    `
  },
  {
    title: 'Computer Vision: Ứng dụng AI trong xử lý ảnh',
    detailedContent: `
      <h2>Computer Vision - Tầm nhìn máy tính</h2>
      <p>Computer Vision là lĩnh vực cho phép máy tính "nhìn" và hiểu thế giới thị giác như con người. Đây là một trong những ứng dụng thành công nhất của Deep Learning.</p>

      <h3>Các bài toán chính trong Computer Vision</h3>

      <h4>1. Image Classification (Phân loại ảnh)</h4>
      <p>Xác định ảnh thuộc về lớp nào. Ví dụ: phân biệt chó và mèo, nhận dạng chữ số viết tay.</p>

      <h4>2. Object Detection (Phát hiện đối tượng)</h4>
      <p>Tìm và định vị các đối tượng trong ảnh. Các thuật toán phổ biến: YOLO, R-CNN, SSD.</p>

      <h4>3. Semantic Segmentation (Phân đoạn ngữ nghĩa)</h4>
      <p>Gán nhãn cho từng pixel trong ảnh. Ứng dụng trong xe tự lái, y tế.</p>

      <h4>4. Face Recognition (Nhận dạng khuôn mặt)</h4>
      <p>Xác định danh tính người dùng qua khuôn mặt. Được dùng trong bảo mật, điểm danh.</p>

      <h3>Ứng dụng thực tế</h3>

      <blockquote>
        "Computer Vision đang biến đổi mọi ngành công nghiệp, từ y tế đến nông nghiệp, từ bán lẻ đến sản xuất."
      </blockquote>

      <ul>
        <li><strong>Y tế:</strong> Phát hiện ung thư qua X-quang, MRI</li>
        <li><strong>Xe tự lái:</strong> Nhận diện biển báo, người đi bộ, làn đường</li>
        <li><strong>Nông nghiệp:</strong> Giám sát cây trồng, phát hiện sâu bệnh</li>
        <li><strong>Bán lẻ:</strong> Thanh toán tự động, phân tích hành vi khách hàng</li>
        <li><strong>An ninh:</strong> Giám sát thông minh, phát hiện hành vi bất thường</li>
      </ul>

      <h3>Công nghệ và mô hình tiên tiến</h3>
      <p>Các mô hình Computer Vision hiện đại:</p>
      <ul>
        <li><strong>Vision Transformer (ViT):</strong> Áp dụng Transformer cho ảnh</li>
        <li><strong>CLIP:</strong> Kết nối ảnh và văn bản từ OpenAI</li>
        <li><strong>SAM (Segment Anything):</strong> Phân đoạn mọi đối tượng</li>
        <li><strong>Stable Diffusion:</strong> Tạo ảnh từ văn bản</li>
      </ul>

      <h3>Học Computer Vision</h3>
      <p>Lộ trình học tập được đề xuất:</p>
      <ol>
        <li>Nắm vững xử lý ảnh cơ bản với OpenCV</li>
        <li>Học các kiến trúc CNN: LeNet, AlexNet, VGG, ResNet</li>
        <li>Thực hành với các dataset: ImageNet, COCO, Pascal VOC</li>
        <li>Tham gia các cuộc thi Kaggle về Computer Vision</li>
      </ol>
    `
  }
];

async function updateNewsContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Đã kết nối MongoDB');

    for (const newsData of detailedNewsContent) {
      const news = await News.findOne({ title: newsData.title });
      if (news) {
        news.detailedContent = newsData.detailedContent;
        await news.save();
        console.log(`✅ Đã cập nhật: ${newsData.title}`);
      } else {
        console.log(`⚠️ Không tìm thấy: ${newsData.title}`);
      }
    }

    console.log('\n🎉 Hoàn thành cập nhật nội dung chi tiết cho tin tức!');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi:', error);
    process.exit(1);
  }
}

updateNewsContent();
