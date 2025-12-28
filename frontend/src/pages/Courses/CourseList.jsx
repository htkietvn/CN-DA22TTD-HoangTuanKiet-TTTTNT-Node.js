import { useState, useEffect } from 'react';
import api from '../../services/api';
import CourseCard from '../../components/common/CourseCard';
import Pagination from '../../components/common/Pagination';
import SloganMarquee from '../../components/common/SloganMarquee';
import '../../styles/Courses.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const coursesPerPage = 12;

  const categories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'deep-learning', label: 'Deep Learning' },
    { value: 'nlp', label: 'Natural Language Processing' },
    { value: 'computer-vision', label: 'Computer Vision' },
    { value: 'ai-business', label: 'AI cho Doanh nghiệp' }
  ];

  useEffect(() => {
    api.get('/courses').then(res => {
      setCourses(res.data);
      setFilteredCourses(res.data);
    });
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Lọc theo danh mục
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, courses]);

  // Phân trang
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="courses-page">
      <div className="page-header">
        <h1>Khóa học AI</h1>
        <p>Khám phá các khóa học chất lượng cao về trí tuệ nhân tạo</p>
        <SloganMarquee slogans={[
          '📚 Học từ cơ bản đến nâng cao',
          '🎓 Chứng chỉ được công nhận',
          '💼 Hỗ trợ việc làm sau khóa học',
          '🌟 Giảng viên giàu kinh nghiệm'
        ]} />
      </div>

      <div className="container">
        {/* Bộ lọc và tìm kiếm */}
        <div className="courses-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
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
        <div className="courses-results">
          <p>{filteredCourses.length} khóa học được tìm thấy</p>
        </div>

        {/* Danh sách khóa học */}
        {currentCourses.length > 0 ? (
          <>
            <div className="course-grid">
              {currentCourses.map(course => (
                <CourseCard key={course._id} course={course} />
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
            <p>Không tìm thấy khóa học nào phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
