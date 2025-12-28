# CN-DA22TTD-HoangTuanKiet-TTTTNT-Node.js

## 📚 Đồ án chuyên ngành - Trí tuệ nhân tạo

**Sinh viên:** Hoàng Tuấn Kiệt  
**Lớp:** DA22TTD  
**Đề tài:** Website quản lý trung tâm AI với Node.js

---

## 📁 Cấu trúc thư mục

```
CN-DA22TTD-HoangTuanKiet-TTTTNT-Node.js/
├── src/                    # Mã nguồn
│   ├── backend/            # Backend Node.js/Express
│   └── frontend/           # Frontend React/Vite
├── thesis/                 # Tài liệu đồ án
│   └── doc/                # File Word báo cáo
├── README.md
└── USER_GUIDE.md
```

---

## 🚀 Công nghệ sử dụng

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary (Upload ảnh)
- Nodemailer (Gửi email)

### Frontend
- React 18 + Vite
- React Router v6
- Axios
- CSS3

---

## 📋 Tính năng chính

### Người dùng
- Đăng ký, đăng nhập tài khoản
- Xem danh sách khóa học, tin tức
- Đăng ký khóa học
- Gửi phản hồi, liên hệ

### Admin
- Quản lý khóa học (CRUD)
- Quản lý tin tức (CRUD)
- Quản lý người dùng
- Quản lý đăng ký khóa học
- Quản lý phản hồi
- Dashboard thống kê

---

## ⚙️ Cài đặt và chạy

### Backend
```bash
cd src/backend
npm install
npm run dev
```

### Frontend
```bash
cd src/frontend
npm install
npm run dev
```

---

## 📄 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/register` | Đăng ký |
| POST | `/api/auth/login` | Đăng nhập |
| GET | `/api/courses` | Danh sách khóa học |
| GET | `/api/news` | Danh sách tin tức |
| POST | `/api/feedback` | Gửi phản hồi |
| GET | `/api/admin/stats` | Thống kê (Admin) |

---

## 👤 Tác giả

**Hoàng Tuấn Kiệt**  
Lớp DA22TTD - Trường Đại học Trà Vinh

---

## 📝 License

MIT License
