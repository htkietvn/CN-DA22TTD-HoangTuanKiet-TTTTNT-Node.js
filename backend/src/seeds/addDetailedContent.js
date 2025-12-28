const mongoose = require('mongoose');
require('dotenv').config();
const News = require('../models/News');

async function addDetailedContent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Đã kết nối MongoDB');

    // Lấy tất cả tin tức
    const allNews = await News.find();
    console.log(`\nTìm thấy ${allNews.length} tin tức\n`);

    // Nội dung chi tiết mẫu
    const detailedContentTemplate = `
      <h2>Giới thiệu</h2>
      <p>Đây là nội dung chi tiết và cụ thể hơn về chủ đề này. Nội dung được trình bày một cách có cấu trúc và dễ đọc.</p>
      
      <h3>Các điểm chính</h3>
      <ul>
        <li><strong>Điểm 1:</strong> Trí tuệ nhân tạo đang phát triển với tốc độ chóng mặt</li>
        <li><strong>Điểm 2:</strong> Machine Learning là nền tảng của nhiều ứng dụng hiện đại</li>
        <li><strong>Điểm 3:</strong> Deep Learning mở ra những khả năng mới cho công nghệ</li>
        <li><strong>Điểm 4:</strong> Ứng dụng AI đang thay đổi mọi ngành công nghiệp</li>
      </ul>

      <h3>Phân tích chi tiết</h3>
      <p>Trong những năm gần đây, sự phát triển của trí tuệ nhân tạo đã tạo ra những bước đột phá đáng kinh ngạc. Từ các hệ thống nhận dạng giọng nói đến xe tự lái, AI đang dần trở thành một phần không thể thiếu trong cuộc sống hàng ngày.</p>

      <blockquote>
        "Trí tuệ nhân tạo là công nghệ quan trọng nhất mà nhân loại đang phát triển." - Sundar Pichai, CEO Google
      </blockquote>

      <h4>Ứng dụng trong thực tế</h4>
      <p>AI đang được ứng dụng rộng rãi trong nhiều lĩnh vực:</p>
      <ol>
        <li><strong>Y tế:</strong> Chẩn đoán bệnh, phát triển thuốc mới, phân tích hình ảnh y khoa</li>
        <li><strong>Giáo dục:</strong> Cá nhân hóa học tập, hỗ trợ giảng dạy, đánh giá tự động</li>
        <li><strong>Kinh doanh:</strong> Phân tích dữ liệu, dự đoán xu hướng, tối ưu hóa quy trình</li>
        <li><strong>Giải trí:</strong> Đề xuất nội dung, tạo nội dung tự động, game thông minh</li>
      </ol>

      <h3>Xu hướng tương lai</h3>
      <p>Trong tương lai gần, chúng ta có thể kỳ vọng những tiến bộ đáng kể trong các lĩnh vực:</p>
      <ul>
        <li>AI tạo sinh (Generative AI) với khả năng sáng tạo nội dung</li>
        <li>Xử lý ngôn ngữ tự nhiên tiên tiến hơn</li>
        <li>Computer Vision với độ chính xác cao hơn</li>
        <li>AI giải thích được (Explainable AI)</li>
        <li>AI có đạo đức và an toàn</li>
      </ul>

      <h3>Kết luận</h3>
      <p>Trí tuệ nhân tạo không chỉ là xu hướng công nghệ, mà là một cuộc cách mạng đang thay đổi cách chúng ta sống và làm việc. Việc hiểu và nắm bắt công nghệ này sẽ mở ra nhiều cơ hội trong tương lai.</p>

      <p><em>Để tìm hiểu thêm về các khóa học AI của chúng tôi, vui lòng truy cập trang Khóa học hoặc liên hệ với chúng tôi.</em></p>
    `;

    // Cập nhật cho tất cả tin tức chưa có detailedContent
    for (const news of allNews) {
      if (!news.detailedContent) {
        news.detailedContent = detailedContentTemplate;
        await news.save();
        console.log(`✅ Đã thêm nội dung chi tiết cho: ${news.title}`);
      } else {
        console.log(`⏭️ Đã có nội dung chi tiết: ${news.title}`);
      }
    }

    console.log('\n🎉 Hoàn thành!');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi:', error);
    process.exit(1);
  }
}

addDetailedContent();
