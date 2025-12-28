import { Link } from 'react-router-dom';
import '../styles/ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <div className="success-icon">✓</div>
        <h1>Cảm ơn bạn!</h1>
        <p>Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.</p>
        <div className="thank-you-actions">
          <Link to="/" className="btn btn-primary">Về trang chủ</Link>
          <Link to="/courses" className="btn btn-secondary">Xem khóa học</Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
