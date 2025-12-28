import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/About.css';
import SloganMarquee from '../components/common/SloganMarquee';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${API_URL}/team`);
        setInstructors(res.data);
      } catch (error) {
        console.error('Lỗi tải đội ngũ:', error);
      } finally {
        setLoadingTeam(false);
      }
    };
    fetchTeam();
  }, []);

  const facilities = [
    { 
      name: 'Phòng Lab AI', 
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      description: 'Phòng thí nghiệm AI hiện đại với GPU cluster'
    },
    { 
      name: 'Phòng máy tính', 
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
      description: 'Phòng máy tính cấu hình cao cho học viên'
    },
    { 
      name: 'Khu vực học tập', 
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
      description: 'Không gian học tập mở, thoải mái'
    },
    { 
      name: 'Thư viện', 
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop',
      description: 'Thư viện với nguồn tài liệu phong phú'
    },
    { 
      name: 'Phòng họp & Seminar', 
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600&h=400&fit=crop',
      description: 'Phòng họp hiện đại cho workshop và seminar'
    },
    { 
      name: 'Khu vực nghỉ ngơi', 
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
      description: 'Khu vực thư giãn cho học viên'
    }
  ];

  const departments = {
    director: {
      name: 'Ban Giám đốc',
      head: 'TS. Nguyễn Văn A',
      description: 'Chịu trách nhiệm điều hành chung, xây dựng chiến lược phát triển và định hướng hoạt động của trung tâm.',
      members: 3,
      responsibilities: [
        'Xây dựng chiến lược phát triển',
        'Quản lý tài chính và nguồn lực',
        'Phát triển quan hệ đối tác',
        'Đảm bảo chất lượng đào tạo'
      ]
    },
    training: {
      name: 'Phòng Đào tạo',
      head: 'ThS. Lê Văn C',
      description: 'Quản lý và tổ chức các khóa học, chương trình đào tạo, hỗ trợ học viên trong quá trình học tập.',
      members: 8,
      responsibilities: [
        'Thiết kế chương trình đào tạo',
        'Tổ chức lớp học và khóa học',
        'Hỗ trợ học viên',
        'Đánh giá kết quả học tập',
        'Phát triển tài liệu giảng dạy'
      ]
    },
    research: {
      name: 'Phòng Nghiên cứu',
      head: 'TS. Trần Thị B',
      description: 'Thực hiện các dự án nghiên cứu, phát triển công nghệ AI mới và hợp tác với các tổ chức nghiên cứu.',
      members: 6,
      responsibilities: [
        'Nghiên cứu công nghệ AI mới',
        'Thực hiện dự án R&D',
        'Công bố khoa học',
        'Hợp tác nghiên cứu quốc tế',
        'Tư vấn giải pháp AI'
      ]
    },
    admin: {
      name: 'Phòng Hành chính',
      head: 'Ông Hoàng Văn E',
      description: 'Quản lý hành chính, nhân sự, tài chính và cơ sở vật chất của trung tâm.',
      members: 5,
      responsibilities: [
        'Quản lý nhân sự',
        'Quản lý tài chính',
        'Quản lý cơ sở vật chất',
        'Hỗ trợ hành chính',
        'Quan hệ công chúng'
      ]
    }
  };

  return (
    <div className="about-page">
      <div className="page-header">
        <h1>Giới thiệu về AI Center</h1>
        <SloganMarquee />
      </div>

      <div className="container">
        {/* Tab Navigation */}
        <div className="tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''} 
            onClick={() => setActiveTab('overview')}
          >
            Giới thiệu chung
          </button>
          <button 
            className={activeTab === 'organization' ? 'active' : ''} 
            onClick={() => setActiveTab('organization')}
          >
            Cơ cấu tổ chức
          </button>
          <button 
            className={activeTab === 'team' ? 'active' : ''} 
            onClick={() => setActiveTab('team')}
          >
            Đội ngũ giảng viên
          </button>
          <button 
            className={activeTab === 'facilities' ? 'active' : ''} 
            onClick={() => setActiveTab('facilities')}
          >
            Cơ sở vật chất
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <h2>Lịch sử thành lập</h2>
              <p>
                AI Center được thành lập năm 2020 với sứ mệnh đào tạo nguồn nhân lực 
                chất lượng cao trong lĩnh vực trí tuệ nhân tạo tại Việt Nam.
              </p>

              <h2>Sứ mệnh</h2>
              <p>
                Cung cấp các khóa học AI chất lượng cao, kết hợp lý thuyết và thực hành,
                giúp học viên có thể ứng dụng ngay vào công việc thực tế.
              </p>

              <h2>Tầm nhìn</h2>
              <p>
                Trở thành trung tâm đào tạo AI hàng đầu Đông Nam Á, góp phần phát triển
                công nghệ AI tại Việt Nam.
              </p>

              <h2>Giá trị cốt lõi</h2>
              <ul>
                <li>Chất lượng đào tạo là ưu tiên hàng đầu</li>
                <li>Thực hành và ứng dụng thực tế</li>
                <li>Đổi mới và sáng tạo liên tục</li>
                <li>Hỗ trợ học viên tận tâm</li>
              </ul>
            </div>
          )}

          {activeTab === 'organization' && (
            <div className="organization-content">
              <h2>Cơ cấu tổ chức</h2>
              <p className="org-intro">Click vào từng phòng ban để xem thông tin chi tiết</p>
              <div className="org-chart">
                <div className="org-level">
                  <div 
                    className="org-box clickable"
                    onClick={() => setSelectedDepartment(departments.director)}
                  >
                    <span className="org-icon">👔</span>
                    <span>Ban Giám đốc</span>
                  </div>
                </div>
                <div className="org-connector"></div>
                <div className="org-level">
                  <div 
                    className="org-box clickable"
                    onClick={() => setSelectedDepartment(departments.training)}
                  >
                    <span className="org-icon">📚</span>
                    <span>Phòng Đào tạo</span>
                  </div>
                  <div 
                    className="org-box clickable"
                    onClick={() => setSelectedDepartment(departments.research)}
                  >
                    <span className="org-icon">🔬</span>
                    <span>Phòng Nghiên cứu</span>
                  </div>
                  <div 
                    className="org-box clickable"
                    onClick={() => setSelectedDepartment(departments.admin)}
                  >
                    <span className="org-icon">🏢</span>
                    <span>Phòng Hành chính</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="team-content">
              <h2>Đội ngũ giảng viên & Chuyên gia</h2>
              {loadingTeam ? (
                <p style={{ textAlign: 'center', color: '#616161' }}>Đang tải...</p>
              ) : (
                <div className="team-grid-unified">
                  {instructors.map((instructor) => (
                    <div key={instructor._id} className="team-card-unified">
                      <div className="team-card-image-unified">
                        <img 
                          src={instructor.image || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face'} 
                          alt={instructor.name}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face';
                          }}
                        />
                      </div>
                      <div className="team-card-content-unified">
                        <h3>{instructor.name}</h3>
                        <p className="team-title-unified">{instructor.position}</p>
                        <p className="team-description-unified">{instructor.bio}</p>
                        <button 
                          className="team-view-btn-unified"
                          onClick={() => setSelectedInstructor(instructor)}
                        >
                          Xem hồ sơ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="facilities-content">
              <h2>Cơ sở vật chất</h2>
              <div className="facilities-grid">
                {facilities.map((facility, index) => (
                  <div key={index} className="facility-card">
                    <img src={facility.image} alt={facility.name} />
                    <div className="facility-info">
                      <h3>{facility.name}</h3>
                      <p>{facility.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="facilities-description">
                <h3>Trang thiết bị hiện đại</h3>
                <ul>
                  <li>Máy tính cấu hình cao với GPU NVIDIA RTX 3090</li>
                  <li>Hệ thống server GPU cluster cho training model</li>
                  <li>Phòng lab được trang bị đầy đủ thiết bị thực hành</li>
                  <li>Thư viện tài liệu phong phú</li>
                  <li>Không gian học tập thoải mái, hiện đại</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal hiển thị thông tin phòng ban */}
      {selectedDepartment && (
        <div className="modal-overlay" onClick={() => setSelectedDepartment(null)}>
          <div className="modal-content dept-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDepartment(null)}>×</button>
            
            <div className="modal-header dept-header">
              <h2>{selectedDepartment.name}</h2>
              <p className="dept-head">Trưởng phòng: {selectedDepartment.head}</p>
              <p className="dept-members">👥 {selectedDepartment.members} thành viên</p>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Giới thiệu</h3>
                <p>{selectedDepartment.description}</p>
              </div>

              <div className="modal-section">
                <h3>Nhiệm vụ chính</h3>
                <ul className="responsibilities-list">
                  {selectedDepartment.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedDepartment(null);
                    window.location.href = '/contact';
                  }}
                >
                  📧 Liên hệ phòng ban
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal hiển thị thông tin chi tiết giảng viên */}
      {selectedInstructor && (
        <div className="modal-overlay" onClick={() => setSelectedInstructor(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedInstructor(null)}>×</button>
            
            <div className="modal-header">
              <img 
                src={selectedInstructor.image || 'https://via.placeholder.com/200x200?text=No+Image'} 
                alt={selectedInstructor.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                }}
              />
              <div>
                <h2>{selectedInstructor.name}</h2>
                <p className="modal-title">{selectedInstructor.position}</p>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Giới thiệu</h3>
                <p>{selectedInstructor.bio || 'Chưa có thông tin'}</p>
              </div>

              <div className="modal-section">
                <h3>Liên hệ</h3>
                <div className="contact-info">
                  {selectedInstructor.email && (
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href={`mailto:${selectedInstructor.email}`}>{selectedInstructor.email}</a>
                    </p>
                  )}
                  {selectedInstructor.phone && (
                    <p>
                      <strong>Điện thoại:</strong>{' '}
                      <a href={`tel:${selectedInstructor.phone}`}>{selectedInstructor.phone}</a>
                    </p>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                {selectedInstructor.email && (
                  <a href={`mailto:${selectedInstructor.email}`} className="btn btn-primary">
                    📧 Gửi Email
                  </a>
                )}
                {selectedInstructor.phone && (
                  <a href={`tel:${selectedInstructor.phone}`} className="btn btn-secondary">
                    📞 Gọi điện
                  </a>
                )}
                {selectedInstructor.facebook && (
                  <a href={selectedInstructor.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
