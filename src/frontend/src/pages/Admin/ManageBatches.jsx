import { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Admin.css';

const ManageBatches = () => {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [formData, setFormData] = useState({
    courseId: '',
    batchName: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    schedule: '',
    location: 'Online',
    maxStudents: 30,
    price: '',
    status: 'upcoming'
  });

  useEffect(() => {
    fetchBatches();
    fetchCourses();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await api.get('/batches');
      setBatches(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBatch) {
        await api.put(`/batches/${editingBatch._id}`, formData);
        alert('Cập nhật đợt học thành công!');
      } else {
        await api.post('/batches', formData);
        alert('Tạo đợt học thành công!');
      }
      setShowModal(false);
      resetForm();
      fetchBatches();
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleEdit = (batch) => {
    setEditingBatch(batch);
    setFormData({
      courseId: batch.course._id,
      batchName: batch.batchName,
      startDate: batch.startDate?.split('T')[0] || '',
      endDate: batch.endDate?.split('T')[0] || '',
      registrationDeadline: batch.registrationDeadline?.split('T')[0] || '',
      schedule: batch.schedule || '',
      location: batch.location || 'Online',
      maxStudents: batch.maxStudents,
      price: batch.price || '',
      status: batch.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa đợt học này?')) {
      try {
        await api.delete(`/batches/${id}`);
        alert('Xóa thành công!');
        fetchBatches();
      } catch (error) {
        alert('Có lỗi xảy ra');
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/batches/${id}/status`, { status });
      fetchBatches();
    } catch (error) {
      alert('Có lỗi xảy ra');
    }
  };

  const resetForm = () => {
    setEditingBatch(null);
    setFormData({
      courseId: '',
      batchName: '',
      startDate: '',
      endDate: '',
      registrationDeadline: '',
      schedule: '',
      location: 'Online',
      maxStudents: 30,
      price: '',
      status: 'upcoming'
    });
  };

  const getStatusLabel = (status) => {
    const labels = {
      upcoming: 'Sắp mở',
      open: 'Đang mở ĐK',
      ongoing: 'Đang diễn ra',
      completed: 'Đã kết thúc',
      cancelled: 'Đã hủy'
    };
    return labels[status] || status;
  };

  const getStatusClass = (status) => {
    const classes = {
      upcoming: 'status-pending',
      open: 'status-approved',
      ongoing: 'status-approved',
      completed: 'status-rejected',
      cancelled: 'status-rejected'
    };
    return classes[status] || '';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading) return <div className="admin-page"><p>Đang tải...</p></div>;

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Quản lý đợt học</h1>
        <button className="btn-add" onClick={() => { resetForm(); setShowModal(true); }}>
          + Thêm đợt học
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Khóa học</th>
              <th>Tên đợt</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Lịch học</th>
              <th>Sĩ số</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {batches.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: 'center' }}>Chưa có đợt học nào</td></tr>
            ) : (
              batches.map(batch => (
                <tr key={batch._id}>
                  <td>{batch.course?.title || 'N/A'}</td>
                  <td>{batch.batchName}</td>
                  <td>{formatDate(batch.startDate)}</td>
                  <td>{formatDate(batch.endDate)}</td>
                  <td>{batch.schedule || 'N/A'}</td>
                  <td>{batch.currentStudents}/{batch.maxStudents}</td>
                  <td>
                    <select 
                      value={batch.status} 
                      onChange={(e) => handleStatusChange(batch._id, e.target.value)}
                      className={getStatusClass(batch.status)}
                      style={{ padding: '5px', borderRadius: '4px' }}
                    >
                      <option value="upcoming">Sắp mở</option>
                      <option value="open">Đang mở ĐK</option>
                      <option value="ongoing">Đang diễn ra</option>
                      <option value="completed">Đã kết thúc</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(batch)}>Sửa</button>
                    <button className="btn-delete" onClick={() => handleDelete(batch._id)} style={{ marginLeft: '5px' }}>Xóa</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{editingBatch ? 'Sửa đợt học' : 'Thêm đợt học mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Khóa học *</label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                  required
                >
                  <option value="">-- Chọn khóa học --</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Tên đợt *</label>
                <input
                  type="text"
                  value={formData.batchName}
                  onChange={(e) => setFormData({...formData, batchName: e.target.value})}
                  placeholder="VD: Đợt 1 - Tháng 3/2025"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ngày bắt đầu *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ngày kết thúc *</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Hạn đăng ký</label>
                <input
                  type="date"
                  value={formData.registrationDeadline}
                  onChange={(e) => setFormData({...formData, registrationDeadline: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Lịch học</label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                  placeholder="VD: Thứ 2, 4, 6 - 19:00-21:00"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Địa điểm</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Online hoặc địa chỉ"
                  />
                </div>
                <div className="form-group">
                  <label>Sĩ số tối đa</label>
                  <input
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) => setFormData({...formData, maxStudents: e.target.value})}
                    min="1"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Giá (nếu khác giá gốc)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Để trống nếu dùng giá gốc"
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="upcoming">Sắp mở</option>
                    <option value="open">Đang mở đăng ký</option>
                    <option value="ongoing">Đang diễn ra</option>
                    <option value="completed">Đã kết thúc</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="btn-save">{editingBatch ? 'Cập nhật' : 'Tạo mới'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBatches;
