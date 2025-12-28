import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import CourseCard from '../components/common/CourseCard';
import NewsCard from '../components/common/NewsCard';
import '../styles/Home.css';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [stats, setStats] = useState({
    students: 1500,
    projects: 50,
    instructors: 25,
    courses: 30
  });

  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // Lấy khóa học nổi bật
    api.get('/courses?limit=6').then(res => setFeaturedCourses(res.data.slice(0, 6)));
    
    // Lấy tin tức mới nhất
    api.get('/news?limit=6').then(res => setLatestNews(res.data.slice(0, 6)));
    
    // Lấy đối tác
    api.get('/partners').then(res => setPartners(res.data));
  }, []);

  const instructors = [
    { 
      name: 'TS. Nguyễn Văn An', 
      title: 'Giám đốc Trung tâm', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    },
    { 
      name: 'ThS. Trần Thị Bình', 
      title: 'Phó Giám đốc', 
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face'
    },
    { 
      name: 'ThS. Lê Minh Cường', 
      title: 'Trưởng phòng Đào tạo', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    { 
      name: 'KS. Phạm Thị Dung', 
      title: 'Giảng viên Machine Learning', 
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    },
    { 
      name: 'KS. Hoàng Văn Em', 
      title: 'Giảng viên Deep Learning', 
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
    }
  ];

  return (
    <div className="home-page">
      {/* Enhanced Grid Overlay */}
      <div className="grid-overlay" />
      
      {/* AI Visual Elements */}
      <div className="ai-visual-left" />
      <div className="ai-visual-right" />
      <div className="mesh-gradient" />
      
      {/* Animated Data Beams */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={`beam-${i}`}
          className="data-beam"
          style={{
            left: `${10 + i * 12}%`,
            animationDuration: `${3 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}
      
      {/* Glow Spots */}
      <div className="glow-spot" style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
      <div className="glow-spot" style={{ top: '60%', right: '10%', animationDelay: '2s' }} />
      <div className="glow-spot" style={{ bottom: '20%', left: '50%', animationDelay: '4s' }} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Khơi nguồn trí tuệ nhân tạo Việt Nam</h1>
          <p>Trung tâm đào tạo và nghiên cứu AI hàng đầu</p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary">Khám phá khóa học</Link>
            <Link to="/contact" className="btn btn-secondary">Liên hệ ngay</Link>
          </div>
        </div>
      </section>

      {/* Giới thiệu ngắn */}
      <section className="intro-section">
        <div className="container">
          <h2>Về AI Center</h2>
          <p>
            AI Center là trung tâm đào tạo và nghiên cứu trí tuệ nhân tạo hàng đầu Việt Nam.
            Chúng tôi cam kết mang đến những khóa học chất lượng cao, giúp học viên nắm vững
            kiến thức và kỹ năng thực tế trong lĩnh vực AI.
          </p>
          <Link to="/about" className="btn btn-outline">Tìm hiểu thêm</Link>
        </div>
      </section>

      {/* Khóa học nổi bật */}
      <section className="featured-courses">
        <div className="container">
          <h2>Khóa học nổi bật</h2>
          <div className="course-grid">
            {featuredCourses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/courses" className="btn btn-primary">Xem tất cả khóa học</Link>
          </div>
        </div>
      </section>

      {/* Tin tức mới nhất */}
      <section className="latest-news">
        <div className="container">
          <h2>Tin tức mới nhất</h2>
          <div className="news-grid">
            {latestNews.map(news => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/news" className="btn btn-primary">Xem tất cả tin tức</Link>
          </div>
        </div>
      </section>

      {/* Các con số ấn tượng */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>{stats.students}+</h3>
              <p>Học viên</p>
            </div>
            <div className="stat-item">
              <h3>{stats.courses}+</h3>
              <p>Khóa học</p>
            </div>
            <div className="stat-item">
              <h3>{stats.projects}+</h3>
              <p>Dự án</p>
            </div>
            <div className="stat-item">
              <h3>{stats.instructors}+</h3>
              <p>Giảng viên</p>
            </div>
          </div>
        </div>
      </section>

      {/* Đội ngũ giảng viên */}
      <section className="instructors-section">
        <div className="container">
          <h2>Đội ngũ giảng viên tiêu biểu</h2>
          <div className="team-grid-unified">
            {instructors.map((instructor, index) => (
              <div key={index} className="team-card-unified">
                <div className="team-card-image-unified">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face';
                    }}
                  />
                </div>
                <div className="team-card-content-unified">
                  <h3>{instructor.name}</h3>
                  <p className="team-title-unified">{instructor.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/about" className="btn btn-primary">Xem tất cả đội ngũ</Link>
          </div>
        </div>
      </section>

      {/* Đối tác */}
      <section className="partners-section">
        <div className="container">
          <h2>Đối tác & Nhà tài trợ</h2>
          <div className="partners-carousel">
            {partners.map((partner) => (
              <div key={partner._id} className="partner-logo">
                <a href={partner.website} target="_blank" rel="noopener noreferrer" title={partner.description}>
                  <img src={partner.logo} alt={partner.name} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
