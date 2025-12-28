# 📖 Hướng dẫn sử dụng Website AI Center

## 🎯 Tính năng đã hoàn thành

### 👤 Cho người dùng thường:

#### 1. Đăng ký tài khoản mới
- Truy cập: http://localhost:5173/register
- Điền thông tin:
  - Họ và tên
  - Email
  - Số điện thoại (tùy chọn)
  - Mật khẩu (tối thiểu 6 ký tự)
  - Xác nhận mật khẩu
- Click "Đăng ký"
- Sau khi đăng ký thành công, đăng nhập với tài khoản vừa tạo

#### 2. Đăng nhập
- Truy cập: http://localhost:5173/login
- Nhập email và mật khẩu
- Click "Đăng nhập"

#### 3. Xem khóa học
- Truy cập: http://localhost:5173/courses
- Lọc theo danh mục
- Tìm kiếm khóa học
- Click vào khóa học để xem chi tiết

#### 4. Đăng ký khóa học
- Vào trang chi tiết khóa học
- Click "Đăng ký ngay"
- Điền form đăng ký
- Gửi đăng ký

#### 5. Xem tin tức
- Truy cập: http://localhost:5173/news
- Lọc theo danh mục
- Click vào tin tức để đọc chi tiết

#### 6. Xem dự án
- Truy cập: http://localhost:5173/projects
- Xem các dự án đã thực hiện

#### 7. Liên hệ
- Truy cập: http://localhost:5173/contact
- Điền form liên hệ
- Gửi tin nhắn

---

### 👨‍💼 Cho Admin:

#### 1. Đăng nhập Admin
- Email: admin@aicenter.vn
- Password: admin123
- Sau khi đăng nhập, click "Quản trị" trên header

#### 2. Dashboard
- Xem thống kê tổng quan:
  - Số người dùng
  - Số khóa học
  - Số tin tức
  - Số đăng ký

#### 3. Quản lý người dùng (MỚI!)
- Truy cập: http://localhost:5173/admin/users
- Xem danh sách tất cả người dùng
- Đặt user thành admin hoặc ngược lại
- Xem thông tin: tên, email, số điện thoại, ngày đăng ký

#### 4. Quản lý khóa học
- Truy cập: http://localhost:5173/admin/courses
- Thêm khóa học mới
- Sửa thông tin khóa học
- Xóa khóa học
- Thông tin: tên, mô tả, giá, thời lượng, giảng viên, cấp độ

#### 5. Quản lý tin tức
- Truy cập: http://localhost:5173/admin/news
- Thêm tin tức mới
- Sửa tin tức
- Xóa tin tức
- Thông tin: tiêu đề, tóm tắt, nội dung, danh mục, tags, hình ảnh

#### 6. Quản lý dự án
- Truy cập: http://localhost:5173/admin/projects
- Thêm dự án mới
- Sửa dự án
- Xóa dự án
- Thông tin: tên, mô tả, công nghệ, GitHub URL, Demo URL

#### 7. Quản lý phản hồi
- Truy cập: http://localhost:5173/admin/feedbacks
- Xem danh sách phản hồi từ người dùng
- Cập nhật trạng thái: pending, read, replied
- Xem chi tiết tin nhắn
- Trả lời qua email

---

## 🔑 Tài khoản mặc định

### Admin:
- Email: admin@aicenter.vn
- Password: admin123

### User:
- Email: user@example.com
- Password: user123

---

## 📝 Quy trình thêm người dùng mới

### Cách 1: Người dùng tự đăng ký (Khuyến nghị)
1. Người dùng vào trang Register
2. Điền thông tin và đăng ký
3. Tài khoản được tạo với role "user"
4. Đăng nhập và sử dụng

### Cách 2: Admin tạo thủ công qua database
1. Vào MongoDB Compass hoặc Atlas
2. Chọn collection "users"
3. Insert document mới:
```json
{
  "name": "Tên người dùng",
  "email": "email@example.com",
  "password": "password123",
  "role": "user",
  "phone": "0901234567"
}
```
4. Password sẽ tự động được hash khi save

### Cách 3: Admin nâng cấp user thành admin
1. User đăng ký tài khoản bình thường
2. Admin đăng nhập vào admin panel
3. Vào "Quản lý người dùng"
4. Click "Đặt làm Admin" cho user đó

---

## 🎨 Các trang chính

### Public Pages:
- **Trang chủ**: http://localhost:5173/
- **Giới thiệu**: http://localhost:5173/about
- **Khóa học**: http://localhost:5173/courses
- **Dự án**: http://localhost:5173/projects
- **Tin tức**: http://localhost:5173/news
- **Liên hệ**: http://localhost:5173/contact
- **Đăng nhập**: http://localhost:5173/login
- **Đăng ký**: http://localhost:5173/register (MỚI!)

### Admin Pages:
- **Dashboard**: http://localhost:5173/admin
- **Người dùng**: http://localhost:5173/admin/users (MỚI!)
- **Khóa học**: http://localhost:5173/admin/courses
- **Tin tức**: http://localhost:5173/admin/news
- **Dự án**: http://localhost:5173/admin/projects
- **Phản hồi**: http://localhost:5173/admin/feedbacks

---

## ✨ Tính năng mới

### 1. Trang đăng ký (Register)
- Form đăng ký đầy đủ
- Validation mật khẩu
- Xác nhận mật khẩu
- Hiển thị lỗi rõ ràng
- Chuyển sang trang login sau khi đăng ký thành công

### 2. Quản lý người dùng (Admin)
- Xem danh sách tất cả users
- Thông tin chi tiết: tên, email, phone, role, ngày đăng ký
- Đổi role user <-> admin
- Giao diện table đẹp

### 3. Cải thiện Login
- Hiển thị lỗi chi tiết
- Loading state
- Link đến trang Register

---

## 🚀 Chạy ứng dụng

### Backend:
```bash
cd backend
npm run dev
```
Chạy tại: http://localhost:5000

### Frontend:
```bash
cd frontend
npm run dev
```
Chạy tại: http://localhost:5173

---

## 📊 API Endpoints

### Auth:
- POST `/api/auth/register` - Đăng ký user mới
- POST `/api/auth/login` - Đăng nhập
- GET `/api/auth/profile` - Lấy thông tin user (cần token)

### Admin:
- GET `/api/admin/users` - Lấy danh sách users (admin only)
- PATCH `/api/admin/users/:id/role` - Đổi role user (admin only)
- GET `/api/admin/stats` - Thống kê dashboard (admin only)

### Courses:
- GET `/api/courses` - Danh sách khóa học
- GET `/api/courses/:id` - Chi tiết khóa học
- POST `/api/courses` - Tạo khóa học (admin only)
- PUT `/api/courses/:id` - Cập nhật (admin only)
- DELETE `/api/courses/:id` - Xóa (admin only)

### News:
- GET `/api/news` - Danh sách tin tức
- GET `/api/news/:id` - Chi tiết tin tức
- POST `/api/news` - Tạo tin tức (admin only)
- PUT `/api/news/:id` - Cập nhật (admin only)
- DELETE `/api/news/:id` - Xóa (admin only)

### Projects:
- GET `/api/projects` - Danh sách dự án
- POST `/api/projects` - Tạo dự án (admin only)
- PUT `/api/projects/:id` - Cập nhật (admin only)
- DELETE `/api/projects/:id` - Xóa (admin only)

### Feedback:
- POST `/api/feedback` - Gửi phản hồi
- GET `/api/feedback` - Danh sách (admin only)
- PATCH `/api/feedback/:id/status` - Cập nhật trạng thái (admin only)

---

## 💡 Tips

1. **Đăng ký tài khoản mới**: Dùng email thật để nhận thông báo (nếu có)
2. **Quên mật khẩu**: Liên hệ admin để reset
3. **Đổi role**: Chỉ admin mới có quyền đổi role
4. **Xóa user**: Hiện tại chưa có tính năng xóa user (để tránh mất dữ liệu)
5. **Backup**: Nên backup database định kỳ

---

## 🆘 Xử lý lỗi

### Lỗi: "Email already exists"
- Email đã được đăng ký
- Dùng email khác hoặc đăng nhập

### Lỗi: "Invalid credentials"
- Email hoặc password sai
- Kiểm tra lại thông tin đăng nhập

### Lỗi: "Password must be at least 6 characters"
- Mật khẩu quá ngắn
- Dùng mật khẩu ít nhất 6 ký tự

### Lỗi: "Passwords do not match"
- Mật khẩu xác nhận không khớp
- Nhập lại cho đúng

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. Backend đang chạy (http://localhost:5000)
2. Frontend đang chạy (http://localhost:5173)
3. MongoDB đang chạy
4. Console trong browser (F12) để xem lỗi
