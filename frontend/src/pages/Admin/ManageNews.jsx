import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import '../../styles/Admin.css';

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    detailedContent: '',
    image: '',
    category: '',
    tags: '',
    isPublished: true
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    api.get('/news').then(res => setNews(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };
      
      if (editingNews) {
        await api.put(`/news/${editingNews._id}`, data);
      } else {
        await api.post('/news', data);
      }
      loadNews();
      closeModal();
    } catch (error) {
      alert('Có lỗi xảy ra');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('image', file);
      const res = await api.post('/upload/image?type=news', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, image: res.data.imageUrl });
    } catch (error) {
      alert('Upload thất bại: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingNews(item);
    setFormData({
      ...item,
      tags: item.tags?.join(', ') || ''
    });
    setPreviewImage(item.image || '');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa tin tức này?')) {
      await api.delete(`/news/${id}`);
      loadNews();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNews(null);
    setPreviewImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormData({
      title: '',
      content: '',
      summary: '',
      detailedContent: '',
      image: '',
      category: '',
      tags: '',
      isPublished: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Quản lý tin tức</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Thêm tin tức
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Danh mục</th>
              <th>Lượt xem</th>
              <th>Ngày đăng</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {news.map(item => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.views}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  <span className={`status ${item.isPublished ? 'active' : 'inactive'}`}>
                    {item.isPublished ? 'Đã đăng' : 'Nháp'}
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
            <h2>{editingNews ? 'Sửa tin tức' : 'Thêm tin tức mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tiêu đề *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Tóm tắt</label>
                <textarea
                  rows="3"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Nội dung ngắn (hiển thị trong danh sách) *</label>
                <textarea
                  required
                  rows="3"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Nội dung ngắn gọn để hiển thị trong danh sách tin tức"
                />
              </div>
              <div className="form-group">
                <label>Nội dung chi tiết</label>
                <textarea
                  rows="10"
                  value={formData.detailedContent}
                  onChange={(e) => setFormData({ ...formData, detailedContent: e.target.value })}
                  placeholder="Nhập nội dung chi tiết của bài viết..."
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Danh mục</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Tags (phân cách bằng dấu phẩy)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="AI, Machine Learning, Deep Learning"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Hình ảnh</label>
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
                    {uploading ? 'Đang tải...' : 'Chọn ảnh từ thiết bị'}
                  </button>
                  {(previewImage || formData.image) && (
                    <div className="image-preview">
                      <img 
                        src={previewImage || (formData.image.startsWith('/') ? `http://localhost:5000${formData.image}` : formData.image)} 
                        alt="Preview" 
                        style={{ maxWidth: '200px', maxHeight: '150px', marginTop: '10px', borderRadius: '8px' }}
                      />
                      <button
                        type="button"
                        className="btn-delete"
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                          setFormData({ ...formData, image: '' });
                          setPreviewImage('');
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        Xóa ảnh
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  />
                  {' '}Xuất bản ngay
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingNews ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
