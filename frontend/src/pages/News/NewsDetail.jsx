import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    api.get(`/news/${id}`).then(res => {
      setNews(res.data);
      api.get('/news?limit=6').then(related => {
        setRelatedNews(related.data.filter(item => item._id !== id).slice(0, 4));
      });
    });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content) => {
    if (!content) return '';
    if (/<[a-z][\s\S]*>/i.test(content)) {
      return content;
    }
    return content
      .split(/\n\n+/)
      .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
      .join('');
  };

  if (!news) return <div className="loading">Đang tải...</div>;

  return (
    <div className="news-detail-page">
      {/* Header giống CourseDetail */}
      <div className="news-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link> / <Link to="/news">Tin tức</Link> / {news.title}
          </div>
          {news.category && <span className="category-badge">{news.category}</span>}
          <h1>{news.title}</h1>
          {news.summary && <p className="news-subtitle">{news.summary}</p>}
          
          <div className="news-meta">
            <span>✍️ {news.author?.name || 'Admin'}</span>
            <span>📅 {formatDate(news.createdAt)}</span>
            <span>👁️ {news.views} lượt xem</span>
          </div>

          {news.tags && news.tags.length > 0 && (
            <div className="news-tags">
              {news.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className="news-content-wrapper">
          {/* Main Content */}
          <div className="news-main-content">
            {news.image && (
              <section className="news-section">
                <div className="news-image">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    onError={(e) => {
                      e.target.src = '/images/news-default.jpg';
                    }}
                  />
                </div>
              </section>
            )}

            <section className="news-section">
              <h2>Nội dung bài viết</h2>
              <div className="news-content-body" dangerouslySetInnerHTML={{ __html: formatContent(news.detailedContent || news.content) }} />
            </section>

            {/* Share */}
            <section className="news-section">
              <h2>Chia sẻ bài viết</h2>
              <div className="share-buttons">
                <button className="share-btn facebook">Facebook</button>
                <button className="share-btn twitter">Twitter</button>
                <button className="share-btn linkedin">LinkedIn</button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="news-sidebar">
            <div className="sidebar-card">
              <h3>Tin tức liên quan</h3>
              <div className="related-list">
                {relatedNews.map(item => (
                  <Link key={item._id} to={`/news/${item._id}`} className="related-item">
                    <img src={item.image || '/images/news-default.jpg'} alt={item.title} />
                    <div className="related-info">
                      <h4>{item.title}</h4>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Thông tin</h3>
              <ul className="info-list">
                <li>📁 Danh mục: {news.category || 'Chung'}</li>
                <li>📅 Ngày đăng: {formatDate(news.createdAt)}</li>
                <li>👁️ Lượt xem: {news.views}</li>
                <li>✍️ Tác giả: {news.author?.name || 'Admin'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
