# 📰 Hệ Thống Website Đăng Tải và Quản Lý Tin Tức

Hệ thống cổng thông tin điện tử hỗ trợ đăng tải, phân loại và quản lý tin tức đa chuyên mục — xây dựng bằng **Next.js**, **React**, **Node.js/Express** và **MongoDB**.

---

## 📌 Giới thiệu

Dự án mô phỏng mô hình hoạt động của một tờ báo điện tử, cho phép:
- Độc giả đọc tin tức, tìm kiếm và bình luận bài viết
- Biên tập viên soạn thảo, đăng tải và quản lý nội dung
- Quản trị viên quản lý tài khoản người dùng và phân quyền hệ thống, duyệt nội dung bài viết

---

## ✨ Tính năng chính

**Phía độc giả:**
- Xem tin tức theo danh mục, trang chủ tổng hợp
- Tìm kiếm bài viết theo từ khóa
- Đọc bài viết chi tiết, bình luận
- Giao diện responsive, tương thích đa thiết bị

**Phía biên tập viên:**
- Soạn thảo và đăng tải bài viết (rich text editor)
- Quản lý bài viết đã đăng: chỉnh sửa, xóa, phân loại
- Upload hình ảnh minh họa

**Phía quản trị viên:**
- Quản lý tài khoản và phân quyền người dùng (admin / biên tập viên / độc giả)
- Duyệt nội dung bài viết
- Quản lý danh mục tin tức
- Thống kê tổng quan hệ thống

---

## 🛠️ Công nghệ sử dụng

| Tầng | Công nghệ |
|---|---|
| Front-end | Next.js 14, React, Tailwind CSS |
| Back-end | Node.js, Express.js |
| Cơ sở dữ liệu | MongoDB, Mongoose |
| Xác thực | JWT (JSON Web Token) |

---

## 🚀 Hướng dẫn cài đặt và chạy

### Yêu cầu môi trường
- Node.js >= 18
- MongoDB Atlas hoặc MongoDB local
- npm hoặc yarn

### 1. Clone repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Cài đặt dependencies

```bash
# Front-end
cd client
npm install

# Back-end
cd ../server
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` trong thư mục `server/`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Tạo file `.env.local` trong thư mục `client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Chạy ứng dụng

```bash
# Chạy back-end
cd server
npm run dev

# Chạy front-end (terminal khác)
cd client
npm run dev
```

Truy cập: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Tài khoản demo

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Quản trị viên | admin@gmail.com | `123456` |
| Biên tập viên | tuan@gmail.com | `123123` |

> ⚠️ Đây là tài khoản demo — vui lòng không thay đổi mật khẩu hoặc xóa dữ liệu mẫu.

---

## 📁 Cấu trúc thư mục

```
├── client/                  # Next.js front-end
│   ├── app/                 # App Router (pages, layouts)
│   ├── components/          # React components
│   ├── lib/                 # Utilities, API calls
│   └── public/              # Static assets
│
├── server/                  # Node.js/Express back-end
│   ├── controllers/         # Xử lý logic nghiệp vụ
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Định nghĩa API routes
│   └── middleware/          # Auth, error handling
│
└── README.md
```

---

## 👨‍💻 Tác giả

**[Nguyễn Trường Sơn]**
- GitHub: [@SonNguyen892002](https://github.com/SonNguyen892002)
- Email: sondaimaou@gmail.com
---

## 📄 Giấy phép

Dự án được phát triển phục vụ mục đích học thuật (đồ án tốt nghiệp).
