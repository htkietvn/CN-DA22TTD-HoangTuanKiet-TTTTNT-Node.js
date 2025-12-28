import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import '../../styles/Admin.css';

const ManagePartners = () => {
  const [partners, setPartners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    description: '',
    isActive: true
  });

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = () => {
    api.get('/partners').then(res => setPartners(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPartner) {
        await api.put(`/partners/${editingPartner._id}`, formData);
      } else {
        await api.post('/partners', formData);
      }
      loadPartners();
      closeModal();
    } catch (error) {
      alert('Có lỗi xảy ra');
    }
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
      const res = await api.post('/upload/image?type=partners', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, logo: res.data.imageUrl });
    } catch (error) {
      alert('Upload thất bại: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingPartner(item);
    setFormData({
      name: item.name,
      logo: item.logo || '',
      website: item.website || '',
      description: item.description || '',
      isActive: item.isActive
    });
    setPreviewImage(item.logo || '');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa đối tác này?')) {
      await api.delete(`/partners/${id}`);
      loadPartners();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPartner(null);
    setPreviewImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormData({
      name: '',
      logo: '',
      website: '',
      description: '',
      isActive: true
    });
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Quản lý đối tác</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Thêm đối tác
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Tên đối tác</th>
              <th>Website</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {partners.map(item => (
              <tr key={item._id}>
                <td>
                  {item.logo && (
                    <img 
                      src={item.logo.startsWith('/') ? `http://localhost:5000${item.logo}` : item.logo} 
                      alt={item.name}
                      style={{ width: '60px', height: '40px', objectFit: 'contain' }}
                    />
                  )}
                </td>
                <td>{item.name}</td>
                <td>
                  {item.website && (
                    <a href={item.website} target="_blank" rel="noopener noreferrer">
                      {item.website}
                    </a>
                  )}
                </td>
                <td>
                  <span className={`status ${item.isActive ? 'active' : 'inactive'}`}>
                    {item.isActive ? 'Hiển thị' : 'Ẩn'}
                  </span>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(item)}>Sửa</button>
                  <button className="btn-delete" onClick={() => handleDelete(item._id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingPartner ? 'Sửa đối tác' : 'Thêm đối tác mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên đối tác *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Logo</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? 'Đang tải...' : 'Chọn logo từ thiết bị'}
                  </button>
                  {(previewImage || formData.logo) && (
                    <div className="image-preview">
                      <img 
                        src={previewImage || (formData.logo.startsWith('/') ? `http://localhost:5000${formData.logo}` : formData.logo)} 
                        alt="Preview" 
                        style={{ maxWidth: '200px', maxHeight: '100px', marginTop: '10px', objectFit: 'contain' }}
                      />
                      <button
                        type="button"
                        className="btn-delete"
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                          setFormData({ ...formData, logo: '' });
                          setPreviewImage('');
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        Xóa logo
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  {' '}Hiển thị trên trang web
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingPartner ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePartners;
