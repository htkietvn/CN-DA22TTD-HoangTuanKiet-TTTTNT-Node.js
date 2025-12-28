import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyNotifications, markAsRead, markAllAsRead, deleteNotification } from '../services/notificationService';
import '../styles/Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getMyNotifications();
      setNotifications(res.data.notifications);
    } catch (error) {
      console.error('Lỗi lấy thông báo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id, link) => {
    try {
      await markAsRead(id);
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, isRead: true } : n)
      );
      if (link) navigate(link);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa thông báo này?')) return;
    try {
      await deleteNotification(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleString('vi-VN');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'registration': return '📝';
      case 'payment': return '💳';
      case 'course': return '📚';
      case 'news': return '📰';
      default: return '🔔';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'registration': return 'Đăng ký';
      case 'payment': return 'Thanh toán';
      case 'course': return 'Khóa học';
      case 'news': return 'Tin tức';
      default: return 'Hệ thống';
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="notifications-page">
        <div className="container">
          <div className="loading">Đang tải thông báo...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="container">
        <div className="notifications-header">
          <h1>🔔 Thông báo của tôi</h1>
          {unreadCount > 0 && (
            <button className="btn-mark-all" onClick={handleMarkAllAsRead}>
              Đánh dấu tất cả đã đọc ({unreadCount})
            </button>
          )}
        </div>

        <div className="notifications-filter">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            Tất cả ({notifications.length})
          </button>
          <button 
            className={filter === 'unread' ? 'active' : ''} 
            onClick={() => setFilter('unread')}
          >
            Chưa đọc ({unreadCount})
          </button>
          <button 
            className={filter === 'read' ? 'active' : ''} 
            onClick={() => setFilter('read')}
          >
            Đã đọc ({notifications.length - unreadCount})
          </button>
        </div>

        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <p>Không có thông báo nào</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div 
                key={notification._id} 
                className={`notification-card ${!notification.isRead ? 'unread' : ''}`}
              >
                <div 
                  className="notification-main"
                  onClick={() => handleMarkAsRead(notification._id, notification.link)}
                >
                  <span className="notification-icon">{getTypeIcon(notification.type)}</span>
                  <div className="notification-body">
                    <div className="notification-meta">
                      <span className="notification-type">{getTypeLabel(notification.type)}</span>
                      <span className="notification-time">{formatTime(notification.createdAt)}</span>
                    </div>
                    <h3 className="notification-title">{notification.title}</h3>
                    <p className="notification-message">{notification.message}</p>
                    {notification.link && (
                      <span className="notification-link">Click để xem chi tiết →</span>
                    )}
                  </div>
                  {!notification.isRead && <span className="unread-indicator"></span>}
                </div>
                <button 
                  className="btn-delete-notif" 
                  onClick={() => handleDelete(notification._id)}
                  title="Xóa thông báo"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
