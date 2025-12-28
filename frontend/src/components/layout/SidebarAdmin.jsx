import { Link, useLocation } from 'react-router-dom';
import './SidebarAdmin.css';

const SidebarAdmin = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>⚙️ Quản trị</h2>
      </div>
      <nav className="sidebar-nav">
        <Link to="/admin" className={isActive('/admin')}>
          <span className="icon">📈</span>
          Dashboard
        </Link>
        <Link to="/admin/users" className={isActive('/admin/users')}>
          <span className="icon">👤</span>
          Người dùng
        </Link>
        <Link to="/admin/courses" className={isActive('/admin/courses')}>
          <span className="icon">🎯</span>
          Khóa học
        </Link>
        <Link to="/admin/user-courses" className={isActive('/admin/user-courses')}>
          <span className="icon">📋</span>
          Đăng ký khóa học
        </Link>
        <Link to="/admin/news" className={isActive('/admin/news')}>
          <span className="icon">📝</span>
          Tin tức
        </Link>
        <Link to="/admin/feedbacks" className={isActive('/admin/feedbacks')}>
          <span className="icon">💭</span>
          Phản hồi
        </Link>
        <Link to="/admin/partners" className={isActive('/admin/partners')}>
          <span className="icon">🔗</span>
          Đối tác
        </Link>
        <Link to="/admin/notifications" className={isActive('/admin/notifications')}>
          <span className="icon">🔔</span>
          Thông báo
        </Link>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
