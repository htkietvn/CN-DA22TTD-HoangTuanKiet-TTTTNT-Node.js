import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyNotifications, markAsRead, markAllAsRead } from '../../services/notificationService';
import './NotificationBell.css';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    
    // Click outside to close
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getMyNotifications();
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
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
      setUnreadCount(prev => Math.max(0, prev - 1));
      if (link) navigate(link);
    } catch (error) {
      console.error('Lỗi đánh dấu đã đọc:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Lỗi đánh dấu tất cả đã đọc:', error);
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    return new Date(date).toLocaleDateString('vi-VN');
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

  return (
    <div className="notification-bell" ref={dropdownRef}>
      <button className="bell-button" onClick={() => setIsOpen(!isOpen)}>
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h4>Thông báo</h4>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllAsRead} className="mark-all-btn">
                Đánh dấu tất cả đã đọc
              </button>
            )}
          </div>

          <div className="notification-list">
            {loading ? (
              <div className="loading">Đang tải...</div>
            ) : notifications.length === 0 ? (
              <div className="empty">Không có thông báo</div>
            ) : (
              notifications.slice(0, 10).map(notification => (
                <div
                  key={notification._id}
                  className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                  onClick={() => handleMarkAsRead(notification._id, notification.link)}
                >
                  <span className="type-icon">{getTypeIcon(notification.type)}</span>
                  <div className="notification-content">
                    <p className="title">{notification.title}</p>
                    <p className="message">{notification.message}</p>
                    <span className="time">{formatTime(notification.createdAt)}</span>
                  </div>
                  {!notification.isRead && <span className="unread-dot"></span>}
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="dropdown-footer">
              <button onClick={() => { setIsOpen(false); navigate('/notifications'); }}>
                Xem tất cả thông báo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
