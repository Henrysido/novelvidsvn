# NovelVids Studio - Xưởng Phim Ngắn AI

<p align="center">
  <strong>Nền tảng sản xuất phim ngắn / video tự động từ tiểu thuyết & kịch bản ứng dụng AI toàn diện</strong>
</p>

---

## 🌟 Giới thiệu

**NovelVids Studio** là một nền tảng mã nguồn mở chuyên nghiệp giúp tự động hóa toàn bộ quy trình sản xuất phim ngắn từ tiểu thuyết hoặc kịch bản chữ:

**Tách chương / Phân tích kịch bản ➔ Trích xuất thực thể & nhân vật ➔ Tạo tạo hình nhân vật & bối cảnh ➔ Tạo bảng phân cảnh (Storyboard) ➔ Tạo video đa phương thức ➔ Ghép video và phụ đề thành phim hoàn chỉnh**.

Hệ thống hỗ trợ 2 chế độ sáng tạo:
1. **Agent Mode (Tự động hóa hoàn toàn):** Tải lên file tiểu thuyết/kịch bản (TXT, DOCX, PDF, MD), AI Agent sẽ tự động phân tích cốt truyện, tạo nhân vật, phân cảnh và lên kế hoạch tạo video.
2. **Manual Mode (Đạo diễn thủ công):** Kiểm soát chi tiết từng góc máy, bối cảnh, chọn giọng đọc (TTS/Voice), prompt tạo ảnh/video, tinh chỉnh từng frame.

---

## 🚀 Tính năng nổi bật

- **Đa ngôn ngữ chuẩn chỉnh:** Tích hợp sẵn bộ ngôn ngữ **Tiếng Việt** (mặc định) và **简体中文** với nút chuyển đổi ngôn ngữ nhanh tiện lợi ở thanh bên.
- **Visual Styles đa dạng:** Hỗ trợ 14+ phong cách thị giác (Điện ảnh tả thực, 2D Anime Nhật Bản, Webtoon Hàn Quốc, 3D Cổ phong, 3D Tiên hiệp, Cyberpunk CG, Hoạt hình 3D, v.v.).
- **Tương thích nhiều mô hình AI:**
  - **LLM:** OpenAI, Claude, Google Gemini, DeepSeek, Qwen (OpenAI-compatible).
  - **Image:** Midjourney, Stable Diffusion, Flux, ComfyUI, DALL-E 3.
  - **Video:** Seedance (ByteDance), MiniMax H3, Wan3.0 (DashScope), Kling, Luma, Pika.
  - **Voice / Audio:** CosyVoice, ChatTTS, Edge-TTS, ElevenLabs.
- **Liên tục nhất quán nhân vật:** Tạo ảnh tham chiếu và inject hình ảnh nhân vật vào prompt video giúp giữ diện mạo nhân vật ổn định qua các phân cảnh.
- **Nối khung hình (Last-frame continuity):** Sử dụng frame cuối của cảnh trước làm frame đầu cho cảnh tiếp theo để chuyển cảnh mượt mà.
- **Quy trình Remake Video:** Tải video có sẵn lên để AI bóc tách cấu trúc phân cảnh và tái tạo lại với phong cách mới.

---

## 🛠️ Yêu cầu hệ thống

- **Node.js:** >= 20 (Khuyên dùng Node 22 hoặc Node 24)
- **Python:** >= 3.11 (Khuyên dùng Python 3.12)
- **uv** (trình quản lý gói Python tốc độ cao) hoặc **pip**
- **FFmpeg:** Cần thiết cho quá trình ghép video và xử lý âm thanh

---

## 📦 Hướng dẫn cài đặt & Khởi chạy

### 🚀 Cách nhanh nhất: Chạy trọn gói bằng Docker (Khuyên dùng)

Ứng dụng đã được đóng gói sẵn toàn bộ Backend, Frontend Nginx và FFmpeg:

```bash
# Khởi chạy ứng dụng (truy cập tại http://localhost:8080)
./start.sh
# Hoặc: docker compose up -d

# Dừng ứng dụng
./stop.sh
# Hoặc: docker compose down
```

---

### 🛠️ Cách thủ công (Dành cho nhà phát triển mã nguồn)

#### 1. Cài đặt & Khởi chạy Backend (FastAPI)

Mở terminal trong thư mục gốc `novelvids`:

```bash
# Tạo môi trường ảo và cài đặt dependencies bằng uv (hoặc venv thông thường)
uv venv
source .venv/bin/activate  # Trên Linux/macOS
# Hoặc trên Windows PowerShell:
# .venv\Scripts\Activate.ps1

# Cài đặt thư viện
uv pip install -e .

# Thiết lập file môi trường
cp .env.example .env

# Chạy migration / khởi tạo cơ sở dữ liệu và dữ liệu mẫu
python scripts/init_db.py

# Khởi chạy server FastAPI (mặc định chạy tại port 9000)
python main.py
```

### 2. Cài đặt & Khởi chạy Frontend (Vue 3 + Vite)

Mở terminal thứ hai vào thư mục `web`:

```bash
cd web

# Cài đặt dependencies
npm install

# Khởi chạy máy chủ phát triển (mặc định chạy tại http://localhost:3000)
npm run dev

# Kiểm tra typecheck và build production
npm run build
```

---

## 🌐 Chuyển đổi ngôn ngữ

- Giao diện mặc định chạy bằng **Tiếng Việt**.
- Bạn có thể nhấp vào biểu tượng **Địa cầu (Ngôn ngữ)** ở góc dưới thanh bên trái (Sidebar) để chuyển đổi qua lại giữa **Tiếng Việt** và **中文 (Tiếng Trung)** bất cứ lúc nào. Lựa chọn sẽ được tự động lưu vào trình duyệt.

---

## ⚙️ Cấu hình API Key mô hình AI

Truy cập vào mục **Cài đặt** (`/settings`):
1. **Mô hình LLM:** Điền Base URL và API Key của nhà cung cấp (OpenAI, DeepSeek, Gemini, v.v.).
2. **Mô hình Tạo Ảnh:** Cấu hình thông số tạo ảnh hoặc kết nối ComfyUI.
3. **Mô hình Tạo Video:** Nhập API Key cho MiniMax, Volcengine (Seedance), hoặc Alibaba Wan.
4. **Kiểm tra kết nối:** Nhấn nút kiểm tra kết nối để đảm bảo thông số đã hợp lệ trước khi bấm lưu.
