import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2>Trang không tồn tại</h2>
        <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link to="/" className="btn btn-primary">Quay về trang chủ</Link>
      </div>
    </div>
  );
};

export default NotFound;
