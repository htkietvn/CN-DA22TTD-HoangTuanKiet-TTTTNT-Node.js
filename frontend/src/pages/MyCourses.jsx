import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/MyCourses.css';

const MyCourses = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRegistrations();
  }, []);

  const fetchMyRegistrations = async () => {
    try {
      const response = await api.get('/registrations/my-registrations');
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (id) => {
    if (window.confirm('Bạn có chắc muốn hủy đăng ký khóa học này?')) {
      try {
        await api.delete(`/registrations/cancel/${id}`);
        alert('Hủy đăng ký thành công!');
        fetchMyRegistrations();
      } catch (error) {
        alert(error.response?.data?.message || 'Có lỗi xảy ra');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: 'Chờ phê duyệt', class: 'status-pending' },
      approved: { text: 'Đã phê duyệt', class: 'status-approved' },
      rejected: { text: 'Từ chối', class: 'status-rejected' }
    };
    return statusMap[status] || statusMap.pending;
  };

  const getPaymentBadge = (paymentStatus) => {
    const paymentMap = {
      unpaid: { text: 'Chưa thanh toán', class: 'payment-unpaid' },
      paid: { text: 'Đã thanh toán', class: 'payment-paid' }
    };
    return paymentMap[paymentStatus] || paymentMap.unpaid;
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="my-courses-page">
      <div className="page-header">
        <h1>Khóa học của tôi</h1>
        <p>Quản lý các khóa học bạn đã đăng ký</p>
      </div>

      <div className="container">
        {registrations.length === 0 ? (
          <div className="empty-state">
            <h3>Bạn chưa đăng ký khóa học nào</h3>
            <p>Khám phá các khóa học của chúng tôi và bắt đầu học ngay hôm nay!</p>
            <Link to="/courses" className="btn btn-primary">
              Xem khóa học
            </Link>
          </div>
        ) : (
          <div className="registrations-grid">
            {registrations.map((registration) => (
              <div key={registration._id} className="registration-card">
                <div className="registration-image">
                  <img src={registration.course.image} alt={registration.course.title} />
                  <span className={`status-badge ${getStatusBadge(registration.status).class}`}>
                    {getStatusBadge(registration.status).text}
                  </span>
                </div>
                
                <div className="registration-content">
                  <h3>{registration.course.title}</h3>
                  
                  {/* Hiển thị thông tin đợt học nếu có */}
                  {registration.batch && (
                    <div className="batch-info-card">
                      <span className="batch-label">📅 {registration.batch.batchName}</span>
                      <div className="batch-details">
                        <span>
                          {new Date(registration.batch.startDate).toLocaleDateString('vi-VN')} - {new Date(registration.batch.endDate).toLocaleDateString('vi-VN')}
                        </span>
                        {registration.batch.schedule && <span>🕐 {registration.batch.schedule}</span>}
                        {registration.batch.location && <span>📍 {registration.batch.location}</span>}
                      </div>
                    </div>
                  )}
                  
                  <div className="registration-info">
                    <div className="info-item">
                      <span className="label">Giảng viên:</span>
                      <span className="value">{registration.course.instructor}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Thời lượng:</span>
                      <span className="value">{registration.course.duration}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Học phí:</span>
                      <span className="value price">
                        {registration.course.price.toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">Ngày đăng ký:</span>
                      <span className="value">
                        {new Date(registration.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">Thanh toán:</span>
                      <span className={`value ${getPaymentBadge(registration.paymentStatus).class}`}>
                        {getPaymentBadge(registration.paymentStatus).text}
                      </span>
                    </div>
                  </div>

                  <div className="registration-actions">
                    <Link 
                      to={`/courses/${registration.course._id}`} 
                      className="btn btn-outline"
                    >
                      Xem chi tiết
                    </Link>
                    {registration.status === 'approved' && (
                      <button className="btn btn-primary">
                        Vào học
                      </button>
                    )}
                    {registration.status === 'pending' && (
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleCancelRegistration(registration._id)}
                      >
                        Hủy đăng ký
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
