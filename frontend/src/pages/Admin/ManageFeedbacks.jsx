import { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Admin.css';

const ManageFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = () => {
    api.get('/feedback').then(res => setFeedbacks(res.data));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/feedback/${id}/status`, { status: newStatus });
      loadFeedbacks();
    } catch (error) {
      alert('Có lỗi xảy ra');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa phản hồi này?')) {
      try {
        await api.delete(`/feedback/${id}`);
        alert('Xóa thành công!');
        loadFeedbacks();
        setSelectedFeedback(null);
      } catch (error) {
        alert('Có lỗi xảy ra');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Quản lý phản hồi</h1>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Tiêu đề</th>
              <th>Ngày gửi</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(feedback => (
              <tr key={feedback._id}>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.phone || 'N/A'}</td>
                <td>{feedback.subject || 'Không có tiêu đề'}</td>
                <td>{formatDate(feedback.createdAt)}</td>
                <td>
                  <select
                    className={`status ${feedback.status}`}
                    value={feedback.status}
                    onChange={(e) => handleStatusChange(feedback._id, e.target.value)}
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="read">Đã đọc</option>
                    <option value="replied">Đã trả lời</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="btn-edit" 
                    onClick={() => setSelectedFeedback(feedback)}
                    style={{ marginRight: '5px' }}
                  >
                    Xem
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(feedback._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFeedback && (
        <div className="modal">
          <div className="modal-content">
            <h2>Chi tiết phản hồi</h2>
            <div className="feedback-detail">
              <p><strong>Tên:</strong> {selectedFeedback.name}</p>
              <p><strong>Email:</strong> {selectedFeedback.email}</p>
              <p><strong>Số điện thoại:</strong> {selectedFeedback.phone || 'Không có'}</p>
              <p><strong>Tiêu đề:</strong> {selectedFeedback.subject || 'Không có'}</p>
              <p><strong>Ngày gửi:</strong> {formatDate(selectedFeedback.createdAt)}</p>
              <div className="message-box">
                <strong>Nội dung:</strong>
                <p>{selectedFeedback.message}</p>
              </div>
            </div>
            <div className="form-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => setSelectedFeedback(null)}
              >
                Đóng
              </button>
              <a 
                href={`mailto:${selectedFeedback.email}`} 
                className="btn btn-primary"
              >
                Trả lời qua Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFeedbacks;
