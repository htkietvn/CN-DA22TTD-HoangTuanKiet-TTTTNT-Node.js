import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../components/layout/SidebarAdmin';
import ManageUsers from './ManageUsers';
import ManageCourses from './ManageCourses';
import ManageNews from './ManageNews';
import ManageFeedbacks from './ManageFeedbacks';
import ManageUserCourses from './ManageUserCourses';
import ManagePartners from './ManagePartners';
import ManageNotifications from './ManageNotifications';
import api from '../../services/api';
import '../../styles/Admin.css';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalNews: 0,
    totalRegistrations: 0,
    totalFeedbacks: 0,
    totalPartners: 0,
    pendingRegistrations: 0,
    approvedRegistrations: 0,
    rejectedRegistrations: 0,
    adminUsers: 0,
    normalUsers: 0,
    unreadFeedbacks: 0,
    recentRegistrations: [],
    popularCourses: [],
    monthlyRegistrations: [],
    monthlyUsers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status) => {
    const map = {
      pending: { text: 'Chờ duyệt', class: 'status-pending' },
      approved: { text: 'Đã duyệt', class: 'status-approved' },
      rejected: { text: 'Từ chối', class: 'status-rejected' }
    };
    return map[status] || map.pending;
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="admin-page dashboard-page">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Tổng quan hệ thống AI Center</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Người dùng</p>
            <span className="stat-detail">{stats.adminUsers} admin, {stats.normalUsers} user</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{stats.totalCourses}</h3>
            <p>Khóa học</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>{stats.totalRegistrations}</h3>
            <p>Đăng ký</p>
            <span className="stat-detail">{stats.pendingRegistrations} chờ duyệt</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📰</div>
          <div className="stat-info">
            <h3>{stats.totalNews}</h3>
            <p>Tin tức</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-info">
            <h3>{stats.totalFeedbacks}</h3>
            <p>Phản hồi</p>
            {stats.unreadFeedbacks > 0 && (
              <span className="stat-badge">{stats.unreadFeedbacks} mới</span>
            )}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <div className="stat-info">
            <h3>{stats.totalPartners}</h3>
            <p>Đối tác</p>
          </div>
        </div>
      </div>

      {/* Registration Status */}
      <div className="dashboard-section">
        <h2>📋 Trạng thái đăng ký</h2>
        <div className="status-cards">
          <div className="status-card pending">
            <div className="status-number">{stats.pendingRegistrations}</div>
            <div className="status-label">Chờ duyệt</div>
          </div>
          <div className="status-card approved">
            <div className="status-number">{stats.approvedRegistrations}</div>
            <div className="status-label">Đã duyệt</div>
          </div>
          <div className="status-card rejected">
            <div className="status-number">{stats.rejectedRegistrations}</div>
            <div className="status-label">Từ chối</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Registrations */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>🕐 Đăng ký gần đây</h3>
            <Link to="/admin/user-courses" className="view-all">Xem tất cả →</Link>
          </div>
          <div className="card-body">
            {stats.recentRegistrations.length === 0 ? (
              <p className="empty-text">Chưa có đăng ký nào</p>
            ) : (
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>Học viên</th>
                    <th>Khóa học</th>
                    <th>Trạng thái</th>
                    <th>Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentRegistrations.map((reg) => (
                    <tr key={reg._id}>
                      <td>{reg.user?.name || 'N/A'}</td>
                      <td>{reg.course?.title || 'N/A'}</td>
                      <td>
                        <span className={`status ${getStatusBadge(reg.status).class}`}>
                          {getStatusBadge(reg.status).text}
                        </span>
                      </td>
                      <td>{formatDate(reg.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Popular Courses */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>🔥 Khóa học phổ biến</h3>
            <Link to="/admin/courses" className="view-all">Xem tất cả →</Link>
          </div>
          <div className="card-body">
            {stats.popularCourses.length === 0 ? (
              <p className="empty-text">Chưa có dữ liệu</p>
            ) : (
              <div className="popular-list">
                {stats.popularCourses.map((course, index) => (
                  <div key={course._id} className="popular-item">
                    <span className="rank">#{index + 1}</span>
                    <span className="course-name">{course.title}</span>
                    <span className="course-count">{course.count} đăng ký</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>⚡ Thao tác nhanh</h2>
        <div className="quick-actions">
          <Link to="/admin/user-courses" className="action-btn">
            <span className="action-icon">📋</span>
            <span>Duyệt đăng ký</span>
            {stats.pendingRegistrations > 0 && (
              <span className="action-badge">{stats.pendingRegistrations}</span>
            )}
          </Link>
          <Link to="/admin/feedbacks" className="action-btn">
            <span className="action-icon">💬</span>
            <span>Xem phản hồi</span>
            {stats.unreadFeedbacks > 0 && (
              <span className="action-badge">{stats.unreadFeedbacks}</span>
            )}
          </Link>
          <Link to="/admin/courses" className="action-btn">
            <span className="action-icon">➕</span>
            <span>Thêm khóa học</span>
          </Link>
          <Link to="/admin/news" className="action-btn">
            <span className="action-icon">📝</span>
            <span>Đăng tin tức</span>
          </Link>
          <Link to="/admin/notifications" className="action-btn">
            <span className="action-icon">🔔</span>
            <span>Gửi thông báo</span>
          </Link>
          <Link to="/admin/users" className="action-btn">
            <span className="action-icon">👤</span>
            <span>Quản lý users</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/courses" element={<ManageCourses />} />
          <Route path="/news" element={<ManageNews />} />
          <Route path="/feedbacks" element={<ManageFeedbacks />} />
          <Route path="/user-courses" element={<ManageUserCourses />} />
          <Route path="/partners" element={<ManagePartners />} />
          <Route path="/notifications" element={<ManageNotifications />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
