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

### Auth (`/api/auth`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/register` | Đăng ký tài khoản | - |
| POST | `/login` | Đăng nhập | - |
| POST | `/forgot-password` | Quên mật khẩu | - |
| GET | `/profile` | Lấy thông tin user | ✅ |
| PUT | `/profile` | Cập nhật thông tin | ✅ |
| POST | `/upload-avatar` | Upload ảnh đại diện | ✅ |
| PUT | `/change-password` | Đổi mật khẩu | ✅ |

### Courses (`/api/courses`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/` | Danh sách khóa học | - |
| GET | `/:id` | Chi tiết khóa học | - |
| POST | `/` | Tạo khóa học | Admin |
| PUT | `/:id` | Cập nhật khóa học | Admin |
| DELETE | `/:id` | Xóa khóa học | Admin |

### Course Batches (`/api/batches`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/open` | Danh sách lớp đang mở | - |
| GET | `/course/:courseId` | Lớp theo khóa học | - |
| GET | `/:id` | Chi tiết lớp | - |
| GET | `/` | Tất cả lớp | Admin |
| POST | `/` | Tạo lớp mới | Admin |
| PUT | `/:id` | Cập nhật lớp | Admin |
| PATCH | `/:id/status` | Cập nhật trạng thái | Admin |
| DELETE | `/:id` | Xóa lớp | Admin |

### News (`/api/news`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/` | Danh sách tin tức | - |
| GET | `/:id` | Chi tiết tin tức | - |
| POST | `/` | Tạo tin tức | Admin |
| PUT | `/:id` | Cập nhật tin tức | Admin |
| DELETE | `/:id` | Xóa tin tức | Admin |

### Partners (`/api/partners`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/` | Danh sách đối tác | - |
| GET | `/:id` | Chi tiết đối tác | - |
| POST | `/` | Tạo đối tác | Admin |
| PUT | `/:id` | Cập nhật đối tác | Admin |
| DELETE | `/:id` | Xóa đối tác | Admin |

### Team (`/api/team`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/` | Danh sách thành viên | - |
| GET | `/:id` | Chi tiết thành viên | - |

### Feedback (`/api/feedback`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/` | Gửi phản hồi | - |
| GET | `/` | Danh sách phản hồi | Admin |
| PATCH | `/:id/status` | Cập nhật trạng thái | Admin |
| DELETE | `/:id` | Xóa phản hồi | Admin |

### Registrations (`/api/registrations`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/` | Đăng ký khóa học | ✅ |
| GET | `/my-registrations` | Khóa học đã đăng ký | ✅ |
| DELETE | `/cancel/:id` | Hủy đăng ký | ✅ |
| GET | `/all` | Tất cả đăng ký | Admin |
| PATCH | `/:id/status` | Cập nhật trạng thái | Admin |
| PATCH | `/:id/payment` | Cập nhật thanh toán | Admin |
| DELETE | `/:id` | Xóa đăng ký | Admin |

### Notifications (`/api/notifications`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/my` | Thông báo của tôi | ✅ |
| PUT | `/:id/read` | Đánh dấu đã đọc | ✅ |
| PUT | `/read-all` | Đánh dấu tất cả đã đọc | ✅ |
| DELETE | `/:id` | Xóa thông báo | ✅ |
| GET | `/all` | Tất cả thông báo | Admin |
| POST | `/send` | Gửi cho 1 user | Admin |
| POST | `/send-all` | Gửi cho tất cả | Admin |
| PUT | `/admin/:id` | Cập nhật thông báo | Admin |
| DELETE | `/admin/:id` | Xóa thông báo | Admin |

### Admin (`/api/admin`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/stats` | Thống kê dashboard | Admin |
| GET | `/users` | Danh sách users | Admin |
| PATCH | `/users/:id/role` | Cập nhật role | Admin |
| PATCH | `/users/:id/reset-password` | Reset mật khẩu | Admin |
| DELETE | `/users/:id` | Xóa user | Admin |

### Upload (`/api/upload`)
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/image` | Upload 1 ảnh | Admin |
| POST | `/images` | Upload nhiều ảnh | Admin |
| GET | `/list/:type` | Danh sách ảnh theo loại | Admin |
| DELETE | `/image/:type/:filename` | Xóa ảnh | Admin |

## 👥 Tác giả
AI Center Development Team

## 📝 License
MIT License
