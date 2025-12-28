import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h1>Kiểm tra email</h1>
            <p>Mật khẩu mới đã được gửi đến email của bạn</p>
          </div>
          <div className="success-message" style={{ textAlign: 'center', padding: '30px' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>✅</div>
            <p>Vui lòng kiểm tra hộp thư đến (và thư rác) để lấy mật khẩu mới.</p>
          </div>
          <Link to="/login" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center', padding: '16px', background: 'linear-gradient(135deg, #00e5ff 0%, #00a8ff 100%)', color: '#0a1420', borderRadius: '10px', textDecoration: 'none', fontWeight: '700' }}>
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Quên mật khẩu</h1>
          <p>Nhập email để nhận mật khẩu mới</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Gửi yêu cầu'}
          </button>
        </form>

        <div className="register-link">
          <p>
            Nhớ mật khẩu? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
