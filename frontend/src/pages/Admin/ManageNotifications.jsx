import { useState, useEffect } from 'react';
import { getAllNotifications, sendNotification, sendNotificationToAll, updateNotification, adminDeleteNotification } from '../../services/notificationService';
import axios from 'axios';
import '../../styles/Admin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sendToAll, setSendToAll] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    message: '',
    type: 'system',
    link: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [notifRes, usersRes] = await Promise.all([
        getAllNotifications(),
        axios.get(`${API_URL}/admin/users`, { headers })
      ]);
      
      setNotifications(notifRes.data);
      setUsers(usersRes.data.filter(u => u.role === 'user'));
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ userId: '', title: '', message: '', type: 'system', link: '' });
    setSendToAll(false);
    setEditingId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Sửa thông báo
        await updateNotification(editingId, {
          title: formData.title,
          message: formData.message,
          type: formData.type,
          link: formData.link
        });
        alert('Đã cập nhật thông báo!');
      } else if (sendToAll) {
        await sendNotificationToAll({
          title: formData.title,
          message: formData.message,
          type: formData.type,
          link: formData.link
        });
        alert('Đã gửi thông báo đến tất cả người dùng!');
      } else {
        if (!formData.userId) {
          alert('Vui lòng chọn người nhận!');
          return;
        }
        await sendNotification(formData);
        alert('Đã gửi thông báo!');
      }
      resetForm();
      fetchData();
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (notif) => {
    setEditingId(notif._id);
    setFormData({
      userId: notif.user?._id || '',
      title: notif.title,
      message: notif.message,
      type: notif.type,
      link: notif.link || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa thông báo này?')) return;
    try {
      await adminDeleteNotification(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
      alert('Đã xóa thông báo!');
    } catch (error) {
      alert('Lỗi xóa: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('vi-VN');
  };

  const getTypeBadge = (type) => {
    const types = {
      registration: { label: 'Đăng ký', color: '#3498db' },
      payment: { label: 'Thanh toán', color: '#27ae60' },
      course: { label: 'Khóa học', color: '#9b59b6' },
      news: { label: 'Tin tức', color: '#e67e22' },
      system: { label: 'Hệ thống', color: '#95a5a6' }
    };
    const t = types[type] || types.system;
    return <span className="badge" style={{ background: t.color }}>{t.label}</span>;
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Quản lý thông báo</h2>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          + Gửi thông báo mới
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <h3>{notifications.length}</h3>
          <p>Tổng thông báo</p>
        </div>
        <div className="stat-card">
          <h3>{notifications.filter(n => !n.isRead).length}</h3>
          <p>Chưa đọc</p>
        </div>
        <div className="stat-card">
          <h3>{notifications.filter(n => n.isRead).length}</h3>
          <p>Đã đọc</p>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Người nhận</th>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Loại</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length === 0 ? (
              <tr><td colSpan="7" className="text-center">Chưa có thông báo nào</td></tr>
            ) : (
              notifications.map(notif => (
                <tr key={notif._id}>
                  <td>{notif.user?.name || 'N/A'}<br/><small>{notif.user?.email}</small></td>
                  <td><strong>{notif.title}</strong></td>
                  <td className="message-cell">{notif.message}</td>
                  <td>{getTypeBadge(notif.type)}</td>
                  <td>
                    <span className={`status ${notif.isRead ? 'read' : 'unread'}`}>
                      {notif.isRead ? 'Đã đọc' : 'Chưa đọc'}
                    </span>
                  </td>
                  <td>{formatDate(notif.createdAt)}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(notif)}>Sửa</button>
                    <button className="btn-delete" onClick={() => handleDelete(notif._id)}>Xóa</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => resetForm()}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{editingId ? 'Sửa thông báo' : 'Gửi thông báo mới'}</h3>
            <form onSubmit={handleSubmit}>
              {!editingId && (
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={sendToAll}
                      onChange={(e) => setSendToAll(e.target.checked)}
                    />
                    Gửi đến tất cả người dùng
                  </label>
                </div>
              )}

              {!editingId && !sendToAll && (
                <div className="form-group">
                  <label>Người nhận *</label>
                  <select
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    required={!sendToAll && !editingId}
                  >
                    <option value="">-- Chọn người nhận --</option>
                    {users.map(user => (
                      <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Loại thông báo</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="system">Hệ thống</option>
                  <option value="registration">Đăng ký</option>
                  <option value="payment">Thanh toán</option>
                  <option value="course">Khóa học</option>
                  <option value="news">Tin tức</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tiêu đề *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Nhập tiêu đề thông báo"
                />
              </div>

              <div className="form-group">
                <label>Nội dung *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows="4"
                  placeholder="Nhập nội dung thông báo"
                />
              </div>

              <div className="form-group">
                <label>Link điều hướng (tùy chọn)</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="VD: /courses/123"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Cập nhật' : (sendToAll ? 'Gửi đến tất cả' : 'Gửi thông báo')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotifications;
