import { useState } from 'react';
import api from '../../services/api';
import './ImageUpload.css';

const ImageUpload = ({ onImageUploaded, currentImage, type = 'general' }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post(`/upload/image?type=${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const imageUrl = `http://localhost:5000${response.data.imageUrl}`;
      onImageUploaded(imageUrl);
      alert('Upload thành công!');
    } catch (error) {
      alert('Upload thất bại: ' + (error.response?.data?.message || error.message));
      setPreview(currentImage || '');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-upload">
      <div className="image-preview">
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <div className="no-image">Chưa có hình ảnh</div>
        )}
      </div>
      
      <div className="upload-controls">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          id="image-upload-input"
        />
        <label htmlFor="image-upload-input" className="btn btn-secondary">
          {uploading ? 'Đang upload...' : 'Chọn hình ảnh'}
        </label>
        <p className="upload-hint">JPG, PNG, GIF, SVG (Max 5MB)</p>
      </div>
    </div>
  );
};

export default ImageUpload;
