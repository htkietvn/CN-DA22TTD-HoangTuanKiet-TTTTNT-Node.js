import { Link } from 'react-router-dom';
import './NewsCard.css';

const NewsCard = ({ news }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handleImageError = (e) => {
    e.target.src = '/images/news-default.jpg';
  };

  return (
    <div className="news-card">
      <div className="news-image">
        <img 
          src={news.image || '/images/news-default.jpg'} 
          alt={news.title}
          onError={handleImageError}
          loading="lazy"
        />
        {news.category && <span className="news-category">{news.category}</span>}
      </div>
      <div className="news-body">
        <div className="news-meta">
          <span className="news-date">📅 {formatDate(news.createdAt)}</span>
          <span className="news-views">👁️ {news.views || 0} lượt xem</span>
        </div>
        <h3>{news.title}</h3>
        <p className="news-summary">{news.summary || news.content?.substring(0, 150) + '...'}</p>
        {news.tags && news.tags.length > 0 && (
          <div className="news-tags">
            {news.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
        <Link to={`/news/${news._id}`} className="read-more">
          Đọc thêm →
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
