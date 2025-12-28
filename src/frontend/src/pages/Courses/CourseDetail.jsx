import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showBatchModal, setShowBatchModal] = useState(false);

  const instructorData = {
    'TS. Nguyễn Văn An': { image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', degree: 'Tiến sĩ Khoa học Máy tính - Stanford', experience: '15+ năm kinh nghiệm trong lĩnh vực AI và Machine Learning' },
    'ThS. Trần Thị Bình': { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face', degree: 'Thạc sĩ AI - MIT', experience: 'Chuyên gia về Deep Learning và Computer Vision' },
    'ThS. Lê Minh Cường': { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', degree: 'Thạc sĩ Khoa học Dữ liệu', experience: '10+ năm kinh nghiệm giảng dạy và phát triển chương trình đào tạo AI' },
    'KS. Phạm Thị Dung': { image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', degree: 'Kỹ sư AI - Google', experience: 'Chuyên gia về NLP và các mô hình ngôn ngữ lớn' },
    'KS. Hoàng Văn Em': { image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', degree: 'Kỹ sư AI - Microsoft', experience: 'Chuyên gia về Neural Networks và Reinforcement Learning' },
    'ThS. Vũ Thị Phương': { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face', degree: 'Thạc sĩ Thống kê ứng dụng', experience: 'Chuyên gia phân tích dữ liệu với kinh nghiệm làm việc tại các tập đoàn lớn' }
  };

  const getInstructorImage = (name) => instructorData[name]?.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face';
  const getInstructorDegree = (name) => instructorData[name]?.degree || 'Chuyên gia AI';
  const getInstructorExperience = (name) => instructorData[name]?.experience || 'Nhiều năm kinh nghiệm trong lĩnh vực AI';

  useEffect(() => {
    api.get(`/courses/${id}`).then(res => setCourse(res.data));
    // Lấy các đợt học của khóa học này
    api.get(`/batches/course/${id}`).then(res => {
      const openBatches = res.data.filter(b => b.status === 'open' || b.status === 'upcoming');
      setBatches(openBatches);
    }).catch(() => setBatches([]));
  }, [id]);

  const handleRegisterClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập để đăng ký khóa học');
      navigate('/login');
      return;
    }
    
    // Nếu có đợt học, hiển thị modal chọn đợt
    if (batches.length > 0) {
      setShowBatchModal(true);
    } else {
      // Nếu không có đợt, đăng ký trực tiếp
      handleRegister(null);
    }
  };

  const handleRegister = async (batchId) => {
    try {
      await api.post('/registrations', { 
        courseId: id,
        batchId: batchId 
      });
      alert('Đăng ký khóa học thành công! Vui lòng chờ phê duyệt.');
      setShowBatchModal(false);
      navigate('/my-courses');
    } catch (error) {
      alert(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusLabel = (status) => {
    const labels = {
      upcoming: 'Sắp mở',
      open: 'Đang mở đăng ký',
      ongoing: 'Đang diễn ra',
      completed: 'Đã kết thúc'
    };
    return labels[status] || status;
  };

  if (!course) return <div className="loading">Đang tải...</div>;

  const levelText = { beginner: 'Cơ bản', intermediate: 'Trung cấp', advanced: 'Nâng cao' };

  // Default data nếu chưa có trong database
  const objectives = course.objectives?.length ? course.objectives : [
    'Hiểu rõ các khái niệm cơ bản về AI và Machine Learning',
    'Thành thạo các thuật toán ML phổ biến',
    'Có khả năng xây dựng và triển khai mô hình AI',
    'Áp dụng AI vào giải quyết bài toán thực tế'
  ];

  const targetAudience = course.targetAudience?.length ? course.targetAudience : [
    'Sinh viên ngành CNTT, Toán, Khoa học dữ liệu',
    'Lập trình viên muốn chuyển sang AI/ML',
    'Data Analyst muốn nâng cao kỹ năng',
    'Người có kiến thức lập trình cơ bản'
  ];

  const curriculum = course.curriculum?.length ? course.curriculum : [
    { week: 1, title: 'Giới thiệu về AI và Machine Learning', topics: ['Khái niệm cơ bản', 'Lịch sử phát triển', 'Ứng dụng thực tế'] },
    { week: 2, title: 'Python cho AI', topics: ['NumPy', 'Pandas', 'Matplotlib'] },
    { week: 3, title: 'Supervised Learning', topics: ['Linear Regression', 'Logistic Regression', 'Decision Trees'] },
    { week: 4, title: 'Deep Learning cơ bản', topics: ['Neural Networks', 'Backpropagation', 'Optimization'] }
  ];

  const includes = course.includes?.length ? course.includes : [
    '36 giờ học trực tiếp', 'Tài liệu học tập đầy đủ', 'Bài tập thực hành',
    'Dự án cuối khóa', 'Chứng chỉ hoàn thành', 'Hỗ trợ sau khóa học'
  ];

  const discounts = course.discounts?.length ? course.discounts : [
    'Giảm 20% cho nhóm từ 3 người', 'Giảm 10% cho sinh viên', 'Tặng tài liệu học tập'
  ];

  const schedule = course.schedule || { startDate: '15/01/2024', time: 'Thứ 3, 5, 7 (19:00 - 21:00)', location: 'AI Center - 126 Nguyễn Huệ, Phường 1, TP. Vĩnh Long' };

  return (
    <div className="course-detail-page">
      <div className="course-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link> / <Link to="/courses">Khóa học</Link> / {course.title}
          </div>
          <h1>{course.title}</h1>
          <p className="course-subtitle">{course.description}</p>
          <div className="course-meta">
            <span>👨‍🏫 {course.instructor || 'Đang cập nhật'}</span>
            <span>⏱️ {course.duration || '12 tuần'}</span>
            <span>📊 {levelText[course.level] || 'Trung cấp'}</span>
            <span>👥 Tối đa {course.maxStudents || 30} học viên</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="course-content-wrapper">
          <div className="course-main-content">
            <section className="course-section">
              <h2>Mục tiêu khóa học</h2>
              <ul>
                {objectives.map((obj, i) => <li key={i}>{obj}</li>)}
              </ul>
            </section>

            <section className="course-section">
              <h2>Đối tượng học viên</h2>
              <ul>
                {targetAudience.map((target, i) => <li key={i}>{target}</li>)}
              </ul>
            </section>

            <section className="course-section">
              <h2>Nội dung chi tiết</h2>
              <div className="curriculum">
                {curriculum.map((item, index) => (
                  <div key={index} className="curriculum-item">
                    <h3>Tuần {item.week}: {item.title}</h3>
                    <ul>
                      {item.topics.map((topic, idx) => <li key={idx}>{topic}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Hiển thị các đợt học */}
            {batches.length > 0 && (
              <section className="course-section">
                <h2>📅 Các đợt học sắp tới</h2>
                <div className="batches-list">
                  {batches.map(batch => (
                    <div key={batch._id} className={`batch-card ${batch.status === 'open' ? 'batch-open' : 'batch-upcoming'}`}>
                      <div className="batch-header">
                        <h3>{batch.batchName}</h3>
                        <span className={`batch-status ${batch.status}`}>
                          {getStatusLabel(batch.status)}
                        </span>
                      </div>
                      <div className="batch-info">
                        <p>📅 <strong>Thời gian:</strong> {formatDate(batch.startDate)} - {formatDate(batch.endDate)}</p>
                        <p>🕐 <strong>Lịch học:</strong> {batch.schedule || 'Đang cập nhật'}</p>
                        <p>📍 <strong>Địa điểm:</strong> {batch.location || 'Online'}</p>
                        <p>👥 <strong>Sĩ số:</strong> {batch.currentStudents}/{batch.maxStudents} học viên</p>
                        {batch.registrationDeadline && (
                          <p>⏰ <strong>Hạn đăng ký:</strong> {formatDate(batch.registrationDeadline)}</p>
                        )}
                        {batch.price && batch.price !== course.price && (
                          <p>💰 <strong>Học phí:</strong> {batch.price.toLocaleString()} VNĐ</p>
                        )}
                      </div>
                      {batch.status === 'open' && batch.currentStudents < batch.maxStudents && (
                        <button 
                          className="btn btn-primary btn-register-batch"
                          onClick={() => {
                            const token = localStorage.getItem('token');
                            if (!token) {
                              alert('Vui lòng đăng nhập để đăng ký');
                              navigate('/login');
                              return;
                            }
                            handleRegister(batch._id);
                          }}
                        >
                          Đăng ký đợt này
                        </button>
                      )}
                      {batch.currentStudents >= batch.maxStudents && (
                        <span className="batch-full">Đã đủ học viên</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="course-section">
              <h2>Lịch học mặc định</h2>
              <p>📅 Khai giảng: {schedule.startDate}</p>
              <p>🕐 Thời gian: {schedule.time}</p>
              <p>📍 Địa điểm: {schedule.location}</p>
            </section>

            <section className="course-section instructor-section">
              <h2>Giảng viên phụ trách</h2>
              <div className="instructor-card">
                <div className="instructor-card-image">
                  <img 
                    src={getInstructorImage(course.instructor)} 
                    alt={course.instructor} 
                    onError={(e) => { 
                      e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'; 
                    }} 
                  />
                </div>
                <div className="instructor-card-content">
                  <h3>{course.instructor || 'TS. Nguyễn Văn An'}</h3>
                  <p className="instructor-title">{getInstructorDegree(course.instructor)}</p>
                  <p className="instructor-experience">{getInstructorExperience(course.instructor)}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="course-sidebar">
            <div className="price-card">
              <div className="price">
                <span className="current-price">{course.price?.toLocaleString()} VNĐ</span>
                {course.originalPrice > 0 && <span className="original-price">{course.originalPrice?.toLocaleString()} VNĐ</span>}
              </div>
              <div className="discount-info">
                <p>🎁 Ưu đãi đặc biệt:</p>
                <ul>
                  {discounts.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
              
              {batches.length > 0 ? (
                <div className="batch-select-info">
                  <p>📅 Có <strong>{batches.filter(b => b.status === 'open').length}</strong> đợt đang mở đăng ký</p>
                  <button className="btn btn-primary btn-block" onClick={handleRegisterClick}>
                    Chọn đợt học & Đăng ký
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary btn-block" onClick={handleRegisterClick}>
                  Đăng ký khóa học
                </button>
              )}
              
              <div className="course-includes">
                <h4>Khóa học bao gồm:</h4>
                <ul>
                  {includes.map((inc, i) => <li key={i}>✓ {inc}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal chọn đợt học */}
      {showBatchModal && (
        <div className="modal-overlay" onClick={() => setShowBatchModal(false)}>
          <div className="modal-content batch-modal" onClick={e => e.stopPropagation()}>
            <h2>Chọn đợt học</h2>
            <p>Vui lòng chọn đợt học phù hợp với bạn:</p>
            
            <div className="batch-options">
              {batches.filter(b => b.status === 'open').map(batch => (
                <div 
                  key={batch._id} 
                  className={`batch-option ${selectedBatch === batch._id ? 'selected' : ''}`}
                  onClick={() => setSelectedBatch(batch._id)}
                >
                  <div className="batch-option-header">
                    <input 
                      type="radio" 
                      name="batch" 
                      checked={selectedBatch === batch._id}
                      onChange={() => setSelectedBatch(batch._id)}
                    />
                    <h4>{batch.batchName}</h4>
                  </div>
                  <div className="batch-option-details">
                    <p>📅 {formatDate(batch.startDate)} - {formatDate(batch.endDate)}</p>
                    <p>🕐 {batch.schedule || 'Đang cập nhật'}</p>
                    <p>📍 {batch.location}</p>
                    <p>👥 Còn {batch.maxStudents - batch.currentStudents} chỗ</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn btn-cancel" onClick={() => setShowBatchModal(false)}>Hủy</button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleRegister(selectedBatch)}
                disabled={!selectedBatch}
              >
                Xác nhận đăng ký
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
