import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import '../../styles/Admin.css';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const fileInputRef = useRef(null);
  
  // Batch states
  const [batches, setBatches] = useState([]);
  const [editingBatch, setEditingBatch] = useState(null);
  const [batchForm, setBatchForm] = useState({
    batchName: '', startDate: '', endDate: '', registrationDeadline: '',
    schedule: '', location: 'Online', maxStudents: 30, price: '', status: 'upcoming'
  });

  const [formData, setFormData] = useState({
    title: '', description: '', content: '', image: '', duration: '',
    level: 'beginner', price: 0, originalPrice: 0, instructor: '', category: '', isActive: true,
    objectives: [''], targetAudience: [''],
    curriculum: [{ week: 1, title: '', topics: [''] }],
    schedule: { startDate: '', time: '', location: '' },
    includes: [''], discounts: [''], maxStudents: 30
  });

  useEffect(() => { loadCourses(); }, []);

  const loadCourses = () => {
    api.get('/courses').then(res => setCourses(res.data));
  };

  const loadBatches = async (courseId) => {
    try {
      const res = await api.get(`/batches/course/${courseId}`);
      setBatches(res.data);
    } catch { setBatches([]); }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Batch handlers
  const handleAddBatch = () => {
    setBatchForm({
      batchName: '', startDate: '', endDate: '', registrationDeadline: '',
      schedule: '', location: 'Online', maxStudents: 30, price: editingCourse?.price || '', status: 'upcoming'
    });
    setEditingBatch(null);
  };

  const handleEditBatch = (batch) => {
    setEditingBatch(batch);
    setBatchForm({
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
  };

  const handleBatchSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBatch) {
        await api.put(`/batches/${editingBatch._id}`, batchForm);
        alert('Cập nhật đợt học thành công!');
      } else {
        await api.post('/batches', { ...batchForm, courseId: editingCourse._id });
        alert('Tạo đợt học thành công!');
      }
      handleAddBatch();
      loadBatches(editingCourse._id);
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleDeleteBatch = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa đợt học này?')) {
      try {
        await api.delete(`/batches/${id}`);
        loadBatches(editingCourse._id);
      } catch { alert('Có lỗi xảy ra'); }
    }
  };

  const handleBatchStatusChange = async (id, status) => {
    try {
      await api.patch(`/batches/${id}/status`, { status });
      loadBatches(editingCourse._id);
    } catch { alert('Có lỗi xảy ra'); }
  };

  // Course handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        objectives: formData.objectives.filter(o => o.trim()),
        targetAudience: formData.targetAudience.filter(t => t.trim()),
        curriculum: formData.curriculum.filter(c => c.title.trim()).map(c => ({
          ...c, topics: c.topics.filter(t => t.trim())
        })),
        includes: formData.includes.filter(i => i.trim()),
        discounts: formData.discounts.filter(d => d.trim())
      };
      if (editingCourse) {
        await api.put(`/courses/${editingCourse._id}`, data);
      } else {
        await api.post('/courses', data);
      }
      loadCourses();
      closeModal();
    } catch { alert('Có lỗi xảy ra'); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('image', file);
      const res = await api.post('/upload/image?type=courses', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, image: res.data.imageUrl });
    } catch (error) {
      alert('Upload thất bại: ' + (error.response?.data?.message || error.message));
    } finally { setUploading(false); }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      ...course,
      objectives: course.objectives?.length ? course.objectives : [''],
      targetAudience: course.targetAudience?.length ? course.targetAudience : [''],
      curriculum: course.curriculum?.length ? course.curriculum : [{ week: 1, title: '', topics: [''] }],
      schedule: course.schedule || { startDate: '', time: '', location: '' },
      includes: course.includes?.length ? course.includes : [''],
      discounts: course.discounts?.length ? course.discounts : [''],
      maxStudents: course.maxStudents || 30,
      originalPrice: course.originalPrice || 0
    });
    setPreviewImage(course.image || '');
    setActiveTab('basic');
    loadBatches(course._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa khóa học này?')) {
      await api.delete(`/courses/${id}`);
      loadCourses();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCourse(null);
    setPreviewImage('');
    setActiveTab('basic');
    setBatches([]);
    setEditingBatch(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormData({
      title: '', description: '', content: '', image: '', duration: '',
      level: 'beginner', price: 0, originalPrice: 0, instructor: '', category: '', isActive: true,
      objectives: [''], targetAudience: [''],
      curriculum: [{ week: 1, title: '', topics: [''] }],
      schedule: { startDate: '', time: '', location: '' },
      includes: [''], discounts: [''], maxStudents: 30
    });
  };

  // Array helpers
  const addArrayItem = (field) => setFormData({ ...formData, [field]: [...formData[field], ''] });
  const updateArrayItem = (field, index, value) => {
    const arr = [...formData[field]]; arr[index] = value;
    setFormData({ ...formData, [field]: arr });
  };
  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
    }
  };

  // Curriculum helpers
  const addCurriculumWeek = () => {
    const nextWeek = formData.curriculum.length + 1;
    setFormData({ ...formData, curriculum: [...formData.curriculum, { week: nextWeek, title: '', topics: [''] }] });
  };
  const updateCurriculum = (index, field, value) => {
    const arr = [...formData.curriculum]; arr[index][field] = value;
    setFormData({ ...formData, curriculum: arr });
  };
  const addCurriculumTopic = (wi) => {
    const arr = [...formData.curriculum]; arr[wi].topics.push('');
    setFormData({ ...formData, curriculum: arr });
  };
  const updateCurriculumTopic = (wi, ti, value) => {
    const arr = [...formData.curriculum]; arr[wi].topics[ti] = value;
    setFormData({ ...formData, curriculum: arr });
  };
  const removeCurriculumTopic = (wi, ti) => {
    const arr = [...formData.curriculum];
    if (arr[wi].topics.length > 1) {
      arr[wi].topics = arr[wi].topics.filter((_, i) => i !== ti);
      setFormData({ ...formData, curriculum: arr });
    }
  };
  const removeCurriculumWeek = (index) => {
    if (formData.curriculum.length > 1) {
      setFormData({ ...formData, curriculum: formData.curriculum.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Quản lý khóa học</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Thêm khóa học</button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên khóa học</th>
              <th>Giảng viên</th>
              <th>Thời lượng</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.instructor}</td>
                <td>{course.duration}</td>
                <td>{course.price?.toLocaleString()} VNĐ</td>
                <td>
                  <span className={`status ${course.isActive ? 'active' : 'inactive'}`}>
                    {course.isActive ? 'Hoạt động' : 'Tạm dừng'}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(course)}>Sửa</button>
                  <button className="btn-delete" onClick={() => handleDelete(course._id)} style={{ marginLeft: '5px' }}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content modal-large">
            <h2>{editingCourse ? 'Sửa khóa học' : 'Thêm khóa học mới'}</h2>
            
            <div className="tabs">
              <button className={activeTab === 'basic' ? 'active' : ''} onClick={() => setActiveTab('basic')}>Thông tin cơ bản</button>
              <button className={activeTab === 'detail' ? 'active' : ''} onClick={() => setActiveTab('detail')}>Chi tiết</button>
              <button className={activeTab === 'curriculum' ? 'active' : ''} onClick={() => setActiveTab('curriculum')}>Nội dung</button>
              <button className={activeTab === 'other' ? 'active' : ''} onClick={() => setActiveTab('other')}>Lịch & Ưu đãi</button>
              {editingCourse && (
                <button className={activeTab === 'batches' ? 'active' : ''} onClick={() => setActiveTab('batches')}>📅 Đợt học</button>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              {activeTab === 'basic' && (
                <>
                  <div className="form-section">
                    <div className="form-section-title">📝 Thông tin chung</div>
                    <div className="form-group">
                      <label>Tên khóa học *</label>
                      <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Mô tả *</label>
                      <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Giảng viên</label>
                        <input type="text" value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Thời lượng</label>
                        <input type="text" value={formData.duration} placeholder="VD: 12 tuần" onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="form-section-title">💰 Học phí & Cấp độ</div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Giá (VNĐ)</label>
                        <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />
                      </div>
                      <div className="form-group">
                        <label>Giá gốc (VNĐ)</label>
                        <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Cấp độ</label>
                        <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })}>
                          <option value="beginner">Cơ bản</option>
                          <option value="intermediate">Trung cấp</option>
                          <option value="advanced">Nâng cao</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Số học viên tối đa</label>
                        <input type="number" value={formData.maxStudents} onChange={(e) => setFormData({ ...formData, maxStudents: Number(e.target.value) })} />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="form-section-title">🖼️ Hình ảnh & Trạng thái</div>
                    <div className="form-group">
                      <label>Hình ảnh</label>
                      <div className="image-upload-container">
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
                        <button type="button" className="btn btn-secondary" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                          {uploading ? 'Đang tải...' : '📤 Chọn ảnh'}
                        </button>
                        {(previewImage || formData.image) && (
                          <div className="image-preview">
                            <img src={previewImage || (formData.image?.startsWith('/') ? `http://localhost:5000${formData.image}` : formData.image)} alt="Preview" style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '8px' }} />
                            <button type="button" className="btn-delete" onClick={() => { setFormData({ ...formData, image: '' }); setPreviewImage(''); }}>Xóa ảnh</button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label><input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} /> Hiển thị khóa học trên website</label>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'detail' && (
                <>
                  <div className="form-section">
                    <div className="form-section-title">🎯 Mục tiêu khóa học</div>
                    {formData.objectives.map((obj, i) => (
                      <div key={i} className="array-input">
                        <input type="text" value={obj} placeholder={`Mục tiêu ${i + 1}`} onChange={(e) => updateArrayItem('objectives', i, e.target.value)} />
                        <button type="button" className="btn-delete" onClick={() => removeArrayItem('objectives', i)}>×</button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => addArrayItem('objectives')}>+ Thêm mục tiêu</button>
                  </div>

                  <div className="form-section">
                    <div className="form-section-title">👥 Đối tượng học viên</div>
                    {formData.targetAudience.map((target, i) => (
                      <div key={i} className="array-input">
                        <input type="text" value={target} placeholder={`Đối tượng ${i + 1}`} onChange={(e) => updateArrayItem('targetAudience', i, e.target.value)} />
                        <button type="button" className="btn-delete" onClick={() => removeArrayItem('targetAudience', i)}>×</button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => addArrayItem('targetAudience')}>+ Thêm đối tượng</button>
                  </div>

                  <div className="form-section">
                    <div className="form-section-title">📦 Khóa học bao gồm</div>
                    {formData.includes.map((inc, i) => (
                      <div key={i} className="array-input">
                        <input type="text" value={inc} placeholder={`VD: 36 giờ học`} onChange={(e) => updateArrayItem('includes', i, e.target.value)} />
                        <button type="button" className="btn-delete" onClick={() => removeArrayItem('includes', i)}>×</button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => addArrayItem('includes')}>+ Thêm</button>
                  </div>
                </>
              )}

              {activeTab === 'curriculum' && (
                <div className="form-section">
                  <div className="form-section-title">📚 Nội dung giảng dạy theo tuần</div>
                  {formData.curriculum.map((week, wi) => (
                    <div key={wi} className="curriculum-week">
                      <div className="week-header">
                        <strong>📖 Tuần {week.week}</strong>
                        <button type="button" className="btn-delete" onClick={() => removeCurriculumWeek(wi)}>Xóa tuần</button>
                      </div>
                      <input type="text" value={week.title} placeholder="Tiêu đề tuần học" onChange={(e) => updateCurriculum(wi, 'title', e.target.value)} style={{ marginBottom: '10px' }} />
                      <div className="topics-list">
                        {week.topics.map((topic, ti) => (
                          <div key={ti} className="array-input">
                            <input type="text" value={topic} placeholder={`Chủ đề ${ti + 1}`} onChange={(e) => updateCurriculumTopic(wi, ti, e.target.value)} />
                            <button type="button" className="btn-delete" onClick={() => removeCurriculumTopic(wi, ti)}>×</button>
                          </div>
                        ))}
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => addCurriculumTopic(wi)}>+ Thêm chủ đề</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="btn btn-primary btn-sm" onClick={addCurriculumWeek}>+ Thêm tuần học mới</button>
                </div>
              )}

              {activeTab === 'other' && (
                <>
                  <div className="form-section">
                    <div className="form-section-title">📅 Lịch học mặc định</div>
                    <div className="form-group">
                      <label>Ngày khai giảng</label>
                      <input type="text" value={formData.schedule.startDate} placeholder="VD: 15/01/2025" onChange={(e) => setFormData({ ...formData, schedule: { ...formData.schedule, startDate: e.target.value } })} />
                    </div>
                    <div className="form-group">
                      <label>Thời gian học</label>
                      <input type="text" value={formData.schedule.time} placeholder="VD: Thứ 2, 4, 6 - 19:00-21:00" onChange={(e) => setFormData({ ...formData, schedule: { ...formData.schedule, time: e.target.value } })} />
                    </div>
                    <div className="form-group">
                      <label>Địa điểm</label>
                      <input type="text" value={formData.schedule.location} placeholder="VD: AI Center - 126 Nguyễn Huệ" onChange={(e) => setFormData({ ...formData, schedule: { ...formData.schedule, location: e.target.value } })} />
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="form-section-title">🎁 Ưu đãi khuyến mãi</div>
                    {formData.discounts.map((disc, i) => (
                      <div key={i} className="array-input">
                        <input type="text" value={disc} placeholder={`VD: Giảm 20% cho nhóm từ 3 người`} onChange={(e) => updateArrayItem('discounts', i, e.target.value)} />
                        <button type="button" className="btn-delete" onClick={() => removeArrayItem('discounts', i)}>×</button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => addArrayItem('discounts')}>+ Thêm ưu đãi</button>
                  </div>
                </>
              )}

              {activeTab === 'batches' && editingCourse && (
                <div className="batches-tab">
                  <div className="batches-list-section">
                    <h3>Danh sách đợt học ({batches.length})</h3>
                    {batches.length === 0 ? (
                      <p style={{ color: '#94a3b8' }}>Chưa có đợt học nào</p>
                    ) : (
                      <div className="batches-table-wrapper">
                        <table className="admin-table" style={{ fontSize: '0.9rem' }}>
                          <thead>
                            <tr>
                              <th>Tên đợt</th>
                              <th>Thời gian</th>
                              <th>Sĩ số</th>
                              <th>Trạng thái</th>
                              <th>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {batches.map(batch => (
                              <tr key={batch._id}>
                                <td>{batch.batchName}</td>
                                <td>{formatDate(batch.startDate)} - {formatDate(batch.endDate)}</td>
                                <td>{batch.currentStudents}/{batch.maxStudents}</td>
                                <td>
                                  <select value={batch.status} onChange={(e) => handleBatchStatusChange(batch._id, e.target.value)} style={{ padding: '4px', borderRadius: '4px', fontSize: '0.85rem' }}>
                                    <option value="upcoming">Sắp mở</option>
                                    <option value="open">Đang mở ĐK</option>
                                    <option value="ongoing">Đang diễn ra</option>
                                    <option value="completed">Đã kết thúc</option>
                                    <option value="cancelled">Đã hủy</option>
                                  </select>
                                </td>
                                <td>
                                  <button type="button" className="btn-edit" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => handleEditBatch(batch)}>Sửa</button>
                                  <button type="button" className="btn-delete" style={{ padding: '4px 8px', fontSize: '0.8rem', marginLeft: '4px' }} onClick={() => handleDeleteBatch(batch._id)}>Xóa</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="batch-form-section">
                    <h3>{editingBatch ? 'Sửa đợt học' : 'Thêm đợt học mới'}</h3>
                    <div className="form-group">
                      <label>Tên đợt *</label>
                      <input type="text" value={batchForm.batchName} onChange={(e) => setBatchForm({...batchForm, batchName: e.target.value})} placeholder="VD: Đợt 1 - Tháng 3/2025" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Ngày bắt đầu *</label>
                        <input type="date" value={batchForm.startDate} onChange={(e) => setBatchForm({...batchForm, startDate: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Ngày kết thúc *</label>
                        <input type="date" value={batchForm.endDate} onChange={(e) => setBatchForm({...batchForm, endDate: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Lịch học</label>
                      <input type="text" value={batchForm.schedule} onChange={(e) => setBatchForm({...batchForm, schedule: e.target.value})} placeholder="VD: Thứ 2, 4, 6 - 19:00-21:00" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Địa điểm</label>
                        <input type="text" value={batchForm.location} onChange={(e) => setBatchForm({...batchForm, location: e.target.value})} placeholder="Online hoặc địa chỉ" />
                      </div>
                      <div className="form-group">
                        <label>Sĩ số tối đa</label>
                        <input type="number" value={batchForm.maxStudents} onChange={(e) => setBatchForm({...batchForm, maxStudents: e.target.value})} min="1" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Trạng thái</label>
                        <select value={batchForm.status} onChange={(e) => setBatchForm({...batchForm, status: e.target.value})}>
                          <option value="upcoming">Sắp mở</option>
                          <option value="open">Đang mở đăng ký</option>
                          <option value="ongoing">Đang diễn ra</option>
                          <option value="completed">Đã kết thúc</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                        <button type="button" className="btn btn-primary" onClick={handleBatchSubmit} disabled={!batchForm.batchName || !batchForm.startDate || !batchForm.endDate}>
                          {editingBatch ? 'Cập nhật' : 'Thêm đợt'}
                        </button>
                        {editingBatch && (
                          <button type="button" className="btn btn-secondary" onClick={handleAddBatch}>Hủy sửa</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== 'batches' && (
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Hủy</button>
                  <button type="submit" className="btn btn-primary">{editingCourse ? 'Cập nhật' : 'Thêm mới'}</button>
                </div>
              )}
              {activeTab === 'batches' && (
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
