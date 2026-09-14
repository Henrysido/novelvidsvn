# 🚀 Hướng Dẫn Khởi Chạy Nhanh NovelVids Studio

Ứng dụng đã được đóng gói hoàn chỉnh bằng Docker. Bạn có thể sử dụng các cách sau để bật/tắt nhanh mà không cần nhớ câu lệnh phức tạp.

---

## ⚡ Cách 1: Chạy bằng Script 1-Click (Dễ nhất)

Mở terminal trong thư mục này và gõ:

```bash
./start.sh
```
- Tự động bật ứng dụng trong 0.5 giây.
- Tự động mở trình duyệt đến: **http://localhost:8080**

Khi muốn dừng:
```bash
./stop.sh
```

---

## 🐳 Cách 2: Chạy trực tiếp bằng Docker Compose

- **Bật ứng dụng:**
  ```bash
  docker compose up -d
  ```
- **Tắt ứng dụng:**
  ```bash
  docker compose down
  ```
- **Xem log hệ thống (nếu cần kiểm tra):**
  ```bash
  docker compose logs -f
  ```

---

## 🌐 Địa chỉ truy cập

- **Giao diện Web:** [http://localhost:8080](http://localhost:8080)
- **Tài liệu API:** [http://localhost:8080/docs](http://localhost:8080/docs)

---

## 💾 Lưu ý về dữ liệu
- Cơ sở dữ liệu lưu tại: thư mục `data/`
- Video, ảnh và âm thanh lưu tại: thư mục `media/`
- Dữ liệu được lưu trực tiếp trên máy của bạn và không bị mất khi tắt/bật container.
