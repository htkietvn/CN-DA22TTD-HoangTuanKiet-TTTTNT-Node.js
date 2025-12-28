import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-image">
        <img src={course.image || '/images/course-default.jpg'} alt={course.title} />
        {course.level && <span className="course-level">{course.level}</span>}
      </div>
      <div className="course-body">
        <h3>{course.title}</h3>
        <p className="course-description">{course.description}</p>
        
        <div className="course-info">
          <span className="instructor">👨‍🏫 {course.instructor || 'Đang cập nhật'}</span>
          <span className="duration">⏱️ {course.duration || '12 tuần'}</span>
        </div>

        <div className="course-footer">
          <div className="price">
            <span className="current-price">{course.price?.toLocaleString() || '0'} VNĐ</span>
            {course.originalPrice && (
              <span className="original-price">{course.originalPrice?.toLocaleString()} VNĐ</span>
            )}
          </div>
          <div className="course-actions">
            <Link to={`/courses/${course._id}`} className="btn btn-primary">
              Xem chi tiết
            </Link>
            <Link to={`/courses/${course._id}`} className="btn btn-secondary">
              Đăng ký ngay
            </Link>
          </div>
        </div>

        {course.seatsLeft && (
          <div className="seats-left">
            🔥 Còn {course.seatsLeft} chỗ
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
