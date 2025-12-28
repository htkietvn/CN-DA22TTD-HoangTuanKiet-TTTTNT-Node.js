import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const RegisterCourse = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await api.post('/registrations', { courseId: id });
      alert('Đăng ký thành công!');
    } catch (error) {
      alert('Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Đăng ký khóa học</h1>
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Đang xử lý...' : 'Đăng ký ngay'}
      </button>
    </div>
  );
};

export default RegisterCourse;
