import { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Admin.css';

const ManageUserCourses = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await api.get('/registrations/all');
      setRegistrations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    const message = status === 'approved' ? 'phê duyệt' : 'từ chối';
    if (window.confirm(`Bạn có chắc muốn ${message} đăng ký này?`)) {
      try {
        await api.patch(`/registrations/${id}/status`, { status });
        alert(`${message.charAt(0).toUpperCase() + message.slice(1)} thành công!`);
        fetchRegistrations();
      } catch (error) {
        alert('Có lỗi xảy ra');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa đăng ký này?')) {
      try {
        await api.delete(`/registrations/${id}`);
        alert('Xóa thành công!');
        fetchRegistrations();
      } catch (error) {
        alert('Có lỗi xảy ra');
      }
    }
  };

  const handlePaymentChange = async (id, paymentStatus) => {
    const message = paymentStatus === 'paid' ? 'đã thanh toán' : 'chưa thanh toán';
    if (window.confirm(`Bạn có chắc muốn cập nhật trạng thái thành ${message}?`)) {
      try {
        await api.patch(`/registrations/${id}/payment`, { paymentStatus });
        alert('Cập nhật trạng thái thanh toán thành công!');
        fetchRegistrations();
      } catch (error) {
        alert('Có lỗi xảy ra');
      }
    }
  };

  if (loading) {
    return <div className="admin-content"><p>Đang tải...</p></div>;
  }

  return (
    <div className="admin-content">
      <h2>Khóa học đã đăng ký</h2>
      <p>Tổng số: {registrations.length} đăng ký</p>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Học viên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Khóa học</th>
              <th>Ngày đăng ký</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  Chưa có đăng ký nào
                </td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr key={reg._id}>
                  <td>{reg.user?.name || 'N/A'}</td>
                  <td>{reg.user?.email || 'N/A'}</td>
                  <td>{reg.user?.phone || 'N/A'}</td>
                  <td>{reg.course?.title || 'N/A'}</td>
                  <td>{new Date(reg.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <span className={`status status-${reg.status}`}>
                      {reg.status === 'pending' && 'Chờ duyệt'}
                      {reg.status === 'approved' && 'Đã duyệt'}
                      {reg.status === 'rejected' && 'Từ chối'}
                    </span>
                  </td>
                  <td>
                    <span 
                      className={`status ${reg.paymentStatus === 'paid' ? 'status-approved' : 'status-pending'}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handlePaymentChange(reg._id, reg.paymentStatus === 'paid' ? 'unpaid' : 'paid')}
                      title="Click để thay đổi trạng thái"
                    >
                      {reg.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </span>
                  </td>
                  <td>
                    {reg.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(reg._id, 'approved')}
                          className="btn btn-sm btn-success"
                          style={{ marginRight: '5px' }}
                        >
                          Phê duyệt
                        </button>
                        <button
                          onClick={() => handleStatusChange(reg._id, 'rejected')}
                          className="btn btn-sm btn-danger"
                          style={{ marginRight: '5px' }}
                        >
                          Từ chối
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(reg._id)}
                      className="btn btn-sm btn-delete"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUserCourses;
