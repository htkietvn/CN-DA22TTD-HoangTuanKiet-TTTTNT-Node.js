import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import SloganMarquee from '../components/common/SloganMarquee';
import '../styles/Contact.css';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/feedback', formData);
      navigate('/thank-you');
    } catch (error) {
      alert('Gửi tin nhắn thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Liên hệ với chúng tôi</h1>
        <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
        <SloganMarquee slogans={[
          '📞 Hotline: 0901 234 567',
          '✉️ Email: info@aicenter.vn',
          '🕐 Thứ 2 - Thứ 7: 8:00 - 18:00',
          '💬 Tư vấn miễn phí 24/7'
        ]} />
      </div>

      <div className="container">
        <div className="contact-wrapper">
          {/* Thông tin liên hệ */}
          <div className="contact-info">
            <h2>Thông tin liên hệ</h2>
            
            <div className="info-item">
              <div className="icon">📍</div>
              <div>
                <h3>Địa chỉ</h3>
                <p>126 Nguyễn Huệ, Phường 1, TP. Vĩnh Long</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon">📞</div>
              <div>
                <h3>Số điện thoại</h3>
                <p>(0270) 123 4567</p>
                <p>0901 234 567</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon">✉️</div>
              <div>
                <h3>Email</h3>
                <p>info@aicenter.vn</p>
                <p>support@aicenter.vn</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon">🕐</div>
              <div>
                <h3>Giờ làm việc</h3>
                <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                <p>Thứ 7: 8:00 - 12:00</p>
                <p>Chủ nhật: Nghỉ</p>
              </div>
            </div>

            <div className="social-links">
              <h3>Kết nối với chúng tôi</h3>
              <div className="social-icons">
                <a href="#" className="social-icon facebook">📘</a>
                <a href="#" className="social-icon youtube">▶️</a>
                <a href="#" className="social-icon zalo">💬</a>
                <a href="#" className="social-icon linkedin">💼</a>
              </div>
            </div>

            {/* Google Maps */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4967!2d106.6!3d10.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQyJzAwLjAiTiAxMDbCsDM2JzAwLjAiRQ!5e0!3m2!1svi!2s!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '10px' }}
                allowFullScreen=""
                loading="lazy"
                title="AI Center Location"
              ></iframe>
            </div>
          </div>

          {/* Form liên hệ */}
          <div className="contact-form-wrapper">
            <h2>Gửi tin nhắn cho chúng tôi</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Nhập email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div className="form-group">
                  <label>Tiêu đề</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Nhập tiêu đề"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Nội dung *</label>
                <textarea
                  required
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Nhập nội dung tin nhắn..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
