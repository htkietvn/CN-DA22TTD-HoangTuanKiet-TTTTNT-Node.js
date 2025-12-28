import { useState, useEffect } from 'react';
import api from '../../services/api';
import NewsCard from '../../components/common/NewsCard';
import Pagination from '../../components/common/Pagination';
import SloganMarquee from '../../components/common/SloganMarquee';
import '../../styles/News.css';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const newsPerPage = 12;

  const categories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'AI', label: 'Trí tuệ nhân tạo' },
    { value: 'Machine Learning', label: 'Machine Learning' },
    { value: 'Deep Learning', label: 'Deep Learning' },
    { value: 'Events', label: 'Sự kiện' },
    { value: 'Research', label: 'Nghiên cứu' }
  ];

  useEffect(() => {
    api.get('/news').then(res => {
      setNews(res.data);
      setFilteredNews(res.data);
    });
  }, []);

  useEffect(() => {
    let filtered = news;

    // Lọc theo danh mục
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, news]);

  // Phân trang
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  return (
    <div className="news-page">
      <div className="page-header">
        <h1>Tin tức & Sự kiện</h1>
        <p>Cập nhật những tin tức mới nhất về AI và công nghệ</p>
        <SloganMarquee slogans={[
          '📰 Tin tức AI mới nhất',
          '🔬 Nghiên cứu đột phá',
          '🎉 Sự kiện hấp dẫn',
          '💡 Xu hướng công nghệ'
        ]} />
      </div>

      <div className="container">
        {/* Bộ lọc và tìm kiếm */}
        <div className="news-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={selectedCategory === cat.value ? 'active' : ''}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kết quả */}
        <div className="news-results">
          <p>{filteredNews.length} bài viết được tìm thấy</p>
        </div>

        {/* Danh sách tin tức */}
        {currentNews.length > 0 ? (
          <>
            <div className="news-grid">
              {currentNews.map(item => (
                <NewsCard key={item._id} news={item} />
              ))}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="no-results">
            <p>Không tìm thấy tin tức nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
