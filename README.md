# AI Center Website

Website quản lý trung tâm AI với backend Node.js/Express và frontend React.

## 📋 Tính năng

### Frontend (React + Vite)
- ✅ **Trang chủ**: Hero section, khóa học nổi bật, tin tức, thống kê, đội ngũ giảng viên
- ✅ **Giới thiệu**: Lịch sử, sứ mệnh, tầm nhìn, cơ cấu tổ chức, đội ngũ, cơ sở vật chất
- ✅ **Khóa học**: Danh sách, chi tiết, đăng ký, lọc theo danh mục, tìm kiếm
- ✅ **Dự án**: Hiển thị các dự án nghiên cứu và ứng dụng
- ✅ **Tin tức**: Danh sách, chi tiết, lọc theo danh mục, phân trang
- ✅ **Liên hệ**: Form liên hệ, thông tin, bản đồ, social links
- ✅ **Đăng nhập**: Authentication với JWT
- ✅ **Admin Dashboard**: Quản lý khóa học, tin tức, dự án, phản hồi
- ✅ **Trang 404**: Not Found page
- ✅ **Thank You**: Trang cảm ơn sau khi gửi form
- ✅ **Chính sách**: Privacy Policy & Terms of Service

### Backend (Node.js + Express + MongoDB)
- ✅ Authentication với JWT
- ✅ CRUD operations cho tất cả models
- ✅ Upload ảnh với Cloudinary
- ✅ Gửi email với Nodemailer
- ✅ Role-based access control (User/Admin)
- ✅ RESTful API

## 🚀 Cài đặt

### Backend
```bash
cd backend
npm install

# Cấu hình file .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-center
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173

# Chạy server
npm run dev
```

### Frontend
```bash
cd frontend
npm install

# Cấu hình file .env
VITE_API_URL=http://localhost:5000/api

# Chạy development server
npm run dev
```

### Docker (Optional)
```bash
docker-compose up -d
```

## 📁 Cấu trúc dự án

```
AI-Center-Website/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, Cloudinary, JWT config
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Auth, Admin, Upload
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   └── server.js        # Entry point
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Images, icons
│   │   ├── components/      # Reusable components
│   │   │   ├── layout/      # Header, Footer, Sidebar
│   │   │   ├── ui/          # Button, Card, Loading
│   │   │   └── common/      # CourseCard, NewsCard, Pagination
│   │   ├── pages/           # Page components
│   │   │   ├── Courses/     # CourseList, CourseDetail
│   │   │   ├── News/        # NewsList, NewsDetail
│   │   │   └── Admin/       # Dashboard, Manage pages
│   │   ├── context/         # AuthContext
│   │   ├── services/        # API service
│   │   ├── styles/          # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## 🎨 Công nghệ sử dụng

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary (Image upload)
- Nodemailer (Email)
- bcryptjs (Password hashing)

**Frontend:**
- React 18
- React Router v6
- Axios
- Vite
- CSS3 (Custom styling)

## 📱 Responsive Design
- Desktop: Full layout
- Tablet: Adapted grid
- Mobile: Hamburger menu, stacked layout

## 🔐 Authentication
- JWT-based authentication
- Protected routes
- Role-based access (User/Admin)

## 📄 API Endpoints

### Auth
- POST `/api/auth/register` - Đăng ký
- POST `/api/auth/login` - Đăng nhập
- GET `/api/auth/profile` - Lấy thông tin user

### Courses
- GET `/api/courses` - Danh sách khóa học
- GET `/api/courses/:id` - Chi tiết khóa học
- POST `/api/courses` - Tạo khóa học (Admin)
- PUT `/api/courses/:id` - Cập nhật (Admin)
- DELETE `/api/courses/:id` - Xóa (Admin)

### News
- GET `/api/news` - Danh sách tin tức
- GET `/api/news/:id` - Chi tiết tin tức
- POST `/api/news` - Tạo tin tức (Admin)
- PUT `/api/news/:id` - Cập nhật (Admin)
- DELETE `/api/news/:id` - Xóa (Admin)

### Projects
- GET `/api/projects` - Danh sách dự án
- GET `/api/projects/:id` - Chi tiết dự án
- POST `/api/projects` - Tạo dự án (Admin)
- PUT `/api/projects/:id` - Cập nhật (Admin)
- DELETE `/api/projects/:id` - Xóa (Admin)

### Feedback
- POST `/api/feedback` - Gửi phản hồi
- GET `/api/feedback` - Danh sách (Admin)
- PATCH `/api/feedback/:id/status` - Cập nhật trạng thái (Admin)

### Admin
- GET `/api/admin/stats` - Thống kê dashboard
- GET `/api/admin/users` - Danh sách users
- PATCH `/api/admin/users/:id/role` - Cập nhật role

## 👥 Tác giả
AI Center Development Team

## 📝 License
MIT License
