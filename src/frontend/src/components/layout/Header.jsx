import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import NotificationBell from '../common/NotificationBell';
import './Header.css';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Hàm lấy URL avatar đầy đủ
  const getAvatarUrl = (avatar) => {
    if (!avatar) return null;
    if (avatar.startsWith('http')) return avatar;
    return `${API_BASE}${avatar}`;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/images/icon.png" alt="AI Center" className="logo-img" />
            <span className="logo-text">AI Center</span>
          </Link>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title={isDarkMode ? 'Chế độ sáng' : 'Chế độ tối'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" className={isActive('/')}>Trang chủ</Link>
            <Link to="/about" className={isActive('/about')}>Giới thiệu</Link>
            <Link to="/team" className={isActive('/team')}>Đội ngũ</Link>
            <Link to="/courses" className={isActive('/courses')}>Khóa học</Link>
            <Link to="/news" className={isActive('/news')}>Tin tức</Link>
            <Link to="/contact" className={isActive('/contact')}>Liên hệ</Link>
            
            {user ? (
              <div className="user-menu">
                <NotificationBell />
                <Link to="/profile" className="user-profile-link" title="Trang cá nhân">
                  <img 
                    src={getAvatarUrl(user.avatar) || 'https://via.placeholder.com/32?text=U'} 
                    alt="Avatar" 
                    className="header-avatar"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/32?text=U';
                    }}
                  />
                  <span className="user-name">{user.name}</span>
                </Link>
                {user.role !== 'admin' && (
                  <Link to="/my-courses" className="my-courses-link">Khóa học của tôi</Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="admin-link">Quản trị</Link>
                )}
                <button onClick={logout} className="btn btn-outline">Đăng xuất</button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
