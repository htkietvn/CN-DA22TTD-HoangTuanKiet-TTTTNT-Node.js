import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AI Center</h3>
            <p>Trung tâm đào tạo và nghiên cứu trí tuệ nhân tạo hàng đầu Việt Nam</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="YouTube">📺</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Zalo">💬</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Liên kết nhanh</h4>
            <ul>
              <li><Link to="/about">Giới thiệu</Link></li>
              <li><Link to="/courses">Khóa học</Link></li>
              <li><Link to="/news">Tin tức</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Khóa học</h4>
            <ul>
              <li><Link to="/courses">Machine Learning</Link></li>
              <li><Link to="/courses">Deep Learning</Link></li>
              <li><Link to="/courses">NLP</Link></li>
              <li><Link to="/courses">Computer Vision</Link></li>
              <li><Link to="/courses">AI cho Doanh nghiệp</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Liên hệ</h4>
            <ul className="contact-info">
              <li>📍 126 Nguyễn Huệ, Phường 1, TP. Vĩnh Long</li>
              <li>📞 (0270) 123 4567</li>
              <li>✉️ info@aicenter.vn</li>
              <li>🕐 T2-T6: 8:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <Link to="/privacy-policy">Chính sách bảo mật</Link>
            <span>|</span>
            <Link to="/terms-of-service">Điều khoản sử dụng</Link>
          </div>
          <p>&copy; 2024 AI Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
