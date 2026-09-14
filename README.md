<p align="center">
  <img src="docs/images/logo.png" width="200" alt="NovelVids VN Logo">
</p>

<h1 align="center">NovelVids VN - Xưởng Phim Ngắn AI</h1>

<p align="center">
  <strong>「 Nền tảng sản xuất phim ngắn (AI Short Drama) từ tiểu thuyết trọn gói 」</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-00584c?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Vue_3-42B883?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/Python_3.12-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.12">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=for-the-badge" alt="License: CC BY-NC 4.0">
</p>

<p align="center">
  <a href="#video-thành-phẩm-mẫu">Video Thành Phẩm Mẫu</a> &bull;
  <a href="#demo-trực-tuyến">Demo Trực Tuyến</a> &bull;
  <a href="#tính-năng-cốt-lõi">Tính Năng Cốt Lõi</a> &bull;
  <a href="#xem-trước-giao-diện">Xem Trước Giao Diện</a> &bull;
  <a href="#bắt-đầu-nhanh">Bắt Đầu Nhanh</a> &bull;
  <a href="#cấu-hình-mô-hình-ai">Cấu Hình Mô Hình AI</a> &bull;
  <a href="#cơ-sở-dữ-liệu--lưu-trữ-media">Cơ Sở Dữ Liệu & Lưu Trữ</a> &bull;
  <a href="#cấu-trúc-dự-án">Cấu Trúc Dự Án</a> &bull;
  <a href="#tech-stack">Tech Stack</a> &bull;
  <a href="#kiểm-thử">Kiểm Thử</a> &bull;
  <a href="#giấy-phép-bản-quyền">Giấy Phép Bản Quyền</a>
</p>

---

## Giới thiệu

**NovelVids VN** là nền tảng sản xuất phim ngắn (AI Short Drama) mã nguồn mở toàn diện. Chỉ cần nhập một tác phẩm tiểu thuyết, hoặc tải lên video tham chiếu có sẵn để làm lại (remake), hệ thống sẽ tự động thực hiện toàn bộ quy trình:
**Tách chương / Hiểu video → Trích xuất thực thể → Tạo tài sản thiết lập (Nhân vật, Bối cảnh, Đạo cụ) → Tạo phân cảnh kịch bản → Sinh video đa phương thức → Ghép nối thành phẩm hoàn chỉnh theo tập**, biến tác phẩm chữ hoặc phim mẫu thành chuỗi sản xuất phim ngắn nhất quán và bền vững.

Nền tảng hỗ trợ cả 2 chế độ sáng tạo: **Agent AI tự động** và **Biên tập thủ công (Manual)**, hỗ trợ nhiều chiến lược phân cảnh, biến thể nhân vật (trang phục, độ tuổi), giọng đọc nhân vật/thuyết minh độc lập, sinh chuỗi video liền mạch từ khung hình cuối (First-Last Frame Continuity), sinh hàng loạt không cần giám sát, cùng bộ điều hợp (adapter) thống nhất cho các mô hình video hàng đầu như Seedance (Doubao), MiniMax H3, Wan3 (Aliyun Bailian).

Dự án không phải là bản demo hay proof-of-concept đơn giản, mà sở hữu kiến trúc kỹ thuật hoàn chỉnh, phân tầng rõ ràng, kiểm thử toàn diện và sẵn sàng triển khai thực tế bằng Docker.

## Demo Trực Tuyến

- Địa chỉ: <https://demo.xiazq.com>
- Tài khoản: `demo`
- Mật khẩu: `NovelVids-Demo-2026`
- Quyền hạn: Người xem (Viewer) của đội ngũ demo; có thể duyệt dự án, thiết lập, kịch bản phân cảnh, hình ảnh và video có sẵn. Mọi thao tác ghi/sửa sẽ bị RBAC từ chối.
- Dữ liệu: Số dư cá nhân và đội nhóm là 0, không cấu hình API Key thật, không sử dụng OSS bên ngoài; tự động khôi phục bản sao chuẩn vào lúc `00:00` hàng ngày.
- Tài liệu API: <https://demo.xiazq.com/docs> (Chỉ mở trên bản demo; môi trường thương mại khuyến nghị tắt).

## Video Thành Phẩm Mẫu

Đoạn phim ngắn hoàn chỉnh được tạo tự động từ tiểu thuyết thông qua NovelVids:

[![Xem video mẫu](docs/videos/demo-cover.jpg)](https://youtu.be/fdiw__J19uk)

![Xem trước khoảnh khắc](docs/videos/demo-preview.gif)

> Nhấp vào ảnh bìa để xem video đầy đủ. Chuỗi tạo: Tải tiểu thuyết → Phân tích chương → Trích xuất thực thể → Sinh ảnh nhân vật/bối cảnh → Sinh phân cảnh chi tiết → Hợp thành video từng cảnh → Ghép nối tập phim.

## Tính Năng Cốt Lõi

### Từ Bản Thảo Đến Dự Án Hoàn Chỉnh

- Hỗ trợ dán văn bản trực tiếp hoặc tải tệp định dạng `.doc`, `.docx`, `.txt`, `.pdf`; tự động phân tích cấu trúc văn bản và chia chương.
- **Chế độ Agent:** Tự động hoàn tất phân tích tác phẩm, chia tập/chương và lập kế hoạch tài sản.
- **Chế độ Thủ công (Manual):** Cho phép người dùng can thiệp, chỉnh sửa kịch bản và tài sản theo từng bước.
- Tỷ lệ khung hình (16:9, 9:16, 1:1, 4:3), độ phân giải (720P, 1080P, 2K), phong cách mỹ thuật và chiến lược phân cảnh được xác lập ngay khi tạo dự án và đồng bộ xuyên suốt.
- Hỗ trợ chuyển đổi giao diện Sáng / Tối (Light / Dark theme) với nền làm việc chuyên dụng, lưu trạng thái cục bộ.

### Xưởng Tái Chế Video (Remake Workshop)

- Tải lên video đơn lẻ (`.mp4`, `.mov`) hoặc cả thư mục video được đặt tên theo tập; hỗ trợ tái chế từ các dự án lịch sử có sẵn trong hệ thống.
- Hỗ trợ video dung lượng lên tới 500 MB, thời lượng tối đa 20 phút; chế độ thư mục tự động nhận diện định dạng số tập ("Tập 1", "EP01", "E01", "1話", v.v.) và sắp xếp chuẩn xác.
- Backend phân tích toàn cục nhân vật, bối cảnh, đạo cụ; sử dụng PySceneDetect để phát hiện ranh giới chuyển cảnh và sinh Prompt phân cảnh chuyên nghiệp.
- Tiến trình chạy bất đồng bộ trên máy chủ (Server-side SSE); đóng trình duyệt hoặc F5 không làm gián đoạn tác vụ, hỗ trợ khôi phục tiến độ từ bản lưu snapshot.

### Quản Lý Tài Sản & Biến Thể Nhân Vật

- Tự động trích xuất nhân vật, bối cảnh, đạo cụ; tự động gom nhóm các tên gọi khác nhau (alias) của cùng một thực thể.
- Hỗ trợ tạo đồng thời cả 3 loại tài sản (nhân vật, cảnh, đạo cụ) trong một tác vụ hàng loạt.
- Đa dạng phương thức tạo: Chữ sinh ảnh (Text-to-Image), tải ảnh lên, chọn từ kho nhân vật số / thư viện mẫu, hoặc dùng ảnh tham chiếu (Image-to-Image).
- Lưu trữ lịch sử tạo và phiên bản hiện tại; hỗ trợ phóng to xem trước, chuyển đổi phiên bản và phản hồi trạng thái tạo theo thời gian thực.
- Hỗ trợ biến thể nhân vật (đổi trang phục, thay đổi độ tuổi, trạng thái cảm xúc/vết thương); mỗi biến thể có thể cấu hình ảnh và giọng nói riêng biệt.
- Hỗ trợ gộp tài sản (merge) và liên kết tài sản cấp chương; kịch bản phân cảnh và Canvas vô cực dùng chung quan hệ tham chiếu.

### Chiến Lược Phân Cảnh & Prompt Chuyên Nghiệp

- Cơ chế phân cảnh linh hoạt: Tích hợp sẵn chiến lược **Điện ảnh (Cinematic)** và chiến lược **Thuyết minh (Narrative Voiceover)**, chuyển đổi linh hoạt bất cứ lúc nào.
- Chiến lược thuyết minh cho phép gán giọng đọc thuyết minh đồng nhất cho toàn dự án và tự động chèn thuyết minh/độc thoại nội tâm vào các phân đoạn không có thoại nhân vật.
- Mỗi Prompt video là một nhiệm vụ quay độc lập: Mô tả rõ ràng thời gian, môi trường ánh sáng, góc máy, vị trí nhân vật, khởi đầu và kết thúc của động tác cùng âm thanh.
- Prompt chuẩn sử dụng cú pháp `@{TênTàiSản}` và `@AudioN` để ràng buộc trực tiếp nhân vật, cảnh, đạo cụ và âm thanh tương ứng.
- Trình biên tập trực quan cho phép nhấp vào thẻ tài sản / âm thanh để nghe thử hoặc xem trước ảnh mẫu; tự động gợi ý gắn thẻ khi phát hiện thực thể còn thiếu.

### Storyboard & Canvas Vô Cực (Infinite Workbench)

- **Storyboard (Bảng phân cảnh):** Giao diện tập trung quản lý mô tả phân cảnh, tài sản liên kết, prompt chi tiết, tham số camera và trạng thái kết xuất video.
- **Canvas vô cực (Dựa trên Vue Flow):** Hỗ trợ kéo thả, cuộn mượt, chọn vùng, phóng to/thu nhỏ, tự động sắp xếp layout, sao chép/dán, hoàn tác/làm lại (Undo/Redo), gấp gọn node và lưu trạng thái viewport.
- Kéo thả trực tiếp ảnh tham chiếu vào Canvas; chia sẻ chung giao thức tài nguyên đa phương thức với Storyboard.
- Các thiết lập về mô hình AI, tỷ lệ khung hình và độ phân giải được lưu bền vững, không bị nhảy thông số khi tải lại trang.

### Thư Viện Giọng Nói & Tính Nhất Quán Âm Thanh

- Tích hợp sẵn hệ thống giọng đọc chất lượng cao, đồng thời cho phép tải lên tệp âm thanh mẫu (`.mp3`, `.wav`) của riêng bạn.
- Hiển thị thời lượng âm thanh thực tế; tích hợp thanh trượt kép (Audio Range Slider) giúp cắt ghép trực tuyến và nghe thử từ điểm bắt đầu cắt.
- Nhân vật gốc, từng biến thể nhân vật và giọng thuyết minh của dự án đều có thể gán giọng độc lập, lưu cấu hình ngay lập tức.
- Prompt tự động định dạng `@AudioN tương ứng nhân vật @{TênNhânVật}`, giúp các mô hình video AI nhận diện chuẩn xác chủ nhân giọng nói mà không bị nhầm lẫn.
- Tương thích đa nền tảng: Seedance hỗ trợ URI nội bộ `asset://`, URL công khai và Base64; MiniMax sử dụng URL/Base64; Wan3 tự động đưa tài nguyên cục bộ lên bộ lưu trữ tạm thời Aliyun Bailian.

### Sinh Video, Tính Liền Mạch & Hợp Thành Tập Phim

- Bộ điều hợp video (Video Factory) chuyển đổi tham số tự động dựa trên năng lực thực tế của từng mô hình, không đoán mò qua tên gọi.
- Hỗ trợ sinh video từ ảnh tham chiếu, sinh từ khung hình đầu - cuối (First & Last Frame), đồng bộ âm thanh môi trường và tiếng động.
- Sinh hàng loạt: Chọn nhiều phân cảnh cùng lúc, đồng bộ mô hình và thông số; bật chế độ nối khung hình cuối (Last-Frame Continuity) để hệ thống tự động trích xuất khung hình cuối của cảnh trước (qua FFmpeg) làm khung hình đầu cho cảnh tiếp theo, vận hành tự động không cần người trực.
- Tác vụ nền được máy chủ tự động thăm dò và chốt trạng thái (Reconciliation Loop); bạn có thể tắt máy hoặc đóng tab trình duyệt, server vẫn tiếp tục xử lý và cập nhật cơ sở dữ liệu.
- Ghép phim tự động: Ghép tất cả các phân cảnh video đã tạo theo đúng thứ tự kịch bản thành một tệp video hoàn chỉnh cho từng tập; tải về trọn vẹn tập phim chỉ với một cú nhấp chuột.

### Đa Mô Hình & Quản Lý Chi Phí Chi Tiết

- Tách biệt cấu hình mô hình cho từng tác vụ: Mô hình ngôn ngữ lớn (LLM), Mô hình sinh ảnh (Image), Mô hình sinh video (Video). Cho phép kích hoạt nhiều mô hình song song.
- Ghi nhận chi tiết từng lần gọi: Số lượng Token, số ảnh / số giây video, vật liệu đầu vào, ảnh chụp bảng giá (pricing snapshot), chiết khấu, tổng tiền và thời gian phản hồi.
- Bảng điều khiển chi phí (Billing Dashboard): Lọc theo dự án, thống kê tổng hợp và hiển thị nhật ký giao dịch theo trang; hỗ trợ chế độ đội nhóm với cơ chế kiểm tra số dư trước khi chạy và khấu trừ tự động khi hoàn thành.

## Xem Trước Giao Diện

<table>
  <tr>
    <td align="center"><b>Trang Chủ</b></td>
    <td align="center"><b>Danh Sách Dự Án</b></td>
  </tr>
  <tr>
    <td><img src="docs/images/screenshots/home.png" alt="Trang Chủ" width="480"></td>
    <td><img src="docs/images/screenshots/projects.png" alt="Danh Sách Dự Án" width="480"></td>
  </tr>
  <tr>
    <td align="center"><b>Chi Tiết Tiểu Thuyết</b></td>
    <td align="center"><b>Quản Lý Tài Sản</b></td>
  </tr>
  <tr>
    <td><img src="docs/images/screenshots/novel.png" alt="Chi Tiết Tiểu Thuyết" width="480"></td>
    <td><img src="docs/images/screenshots/asset.png" alt="Quản Lý Tài Sản" width="480"></td>
  </tr>
  <tr>
    <td align="center"><b>Biên Tập Phân Cảnh (Storyboard)</b></td>
    <td align="center"><b>Canvas Vô Cực (Infinite Workbench)</b></td>
  </tr>
  <tr>
    <td><img src="docs/images/screenshots/storyboard.png" alt="Biên Tập Phân Cảnh" width="480"></td>
    <td><img src="docs/images/screenshots/workbench.png" alt="Canvas Vô Cực" width="480"></td>
  </tr>
  <tr>
    <td align="center"><b>Kết Xuất & Ghép Video</b></td>
    <td align="center"><b>Cấu Hình Mô Hình AI</b></td>
  </tr>
  <tr>
    <td><img src="docs/images/screenshots/video.png" alt="Kết Xuất Video" width="480"></td>
    <td><img src="docs/images/screenshots/settings.png" alt="Cấu Hình Mô Hình" width="480"></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><b>Bảng Quản Lý Chi Phí</b></td>
  </tr>
  <tr>
    <td colspan="2"><img src="docs/images/screenshots/billing.png" alt="Bảng Quản Lý Chi Phí" width="960"></td>
  </tr>
</table>

## Bắt Đầu Nhanh

### Yêu Cầu Hệ Thống

- **Docker 20.10+** (kèm Docker Compose v2)
- Hoặc phát triển cục bộ: **Python 3.12+**, **Node.js 20+**, công cụ [uv](https://docs.astral.sh/uv/)
- **FFmpeg / ffprobe**: Cần thiết cho việc ghép nối video, chia tách cảnh, trích xuất khung hình cuối và xử lý âm thanh (Đã tích hợp sẵn trong Docker image).

---

### Cách 1: Triển Khai Bằng Docker (Khuyến Nghị)

Đây là cách nhanh nhất và tiện lợi nhất để chạy NovelVids trên mọi nền tảng (CachyOS / Arch Linux, Ubuntu / Debian, macOS, Windows).

#### 1. Chuẩn bị môi trường trên CachyOS / Arch Linux:
Nếu bạn đang dùng CachyOS hoặc bản phân phối hệ Arch:
```bash
# Cài đặt Docker và Docker Compose nếu chưa có
sudo pacman -S docker docker-compose

# Khởi động và kích hoạt Docker service
sudo systemctl enable --now docker

# Thêm người dùng hiện tại vào nhóm docker (để chạy không cần sudo)
sudo usermod -aG docker $USER
# Áp dụng nhóm mới (hoặc đăng xuất rồi đăng nhập lại)
newgrp docker
```

#### 2. Clone mã nguồn và khởi chạy:
```bash
# Clone repository
git clone https://github.com/Henrysido/novelvidsvn.git
cd novelvidsvn

# Tạo tệp cấu hình từ bản mẫu
cp .env.example .env

# Khởi động dịch vụ (tự động build cả Frontend và Backend)
docker compose up -d --build
```

#### 3. Truy cập và sử dụng:
- **Giao diện Web:** <http://localhost:8080>
- **Tài liệu API (Swagger UI):** <http://localhost:8080/docs>
- Mặc định toàn bộ dữ liệu sẽ được lưu trữ cục bộ tại thư mục `./data` (cơ sở dữ liệu SQLite) và `./media` (hình ảnh, video, âm thanh). Bạn không lo mất dữ liệu khi khởi động lại container.

> **Quan trọng:** Sau khi đăng nhập vào hệ thống lần đầu, hãy truy cập ngay vào mục **「Cài đặt / Cấu hình mô hình」** (`/settings`) để điền API Key cho các mô hình AI (LLM, Ảnh, Video) của bạn.

#### 4. Dừng và cập nhật hệ thống:
```bash
# Dừng container (dữ liệu tại ./data và ./media vẫn được giữ nguyên)
docker compose down

# Cập nhật code mới nhất và build lại
git pull origin main
docker compose up -d --build
```

---

### Cách 2: Phát Triển Cục Bộ (Local Development)

#### Backend (Python FastAPI)

```bash
# Cài đặt uv nếu chưa có
curl -LsSf https://astral.sh/uv/install.sh | sh

# Đồng bộ thư viện phụ thuộc (sử dụng uv.lock)
uv sync --dev

# Khởi chạy Backend (mặc định cổng 9000)
make dev PORT=9000
```

#### Frontend (Vue 3 + TypeScript + Vite)

```bash
cd web

# Cài đặt thư viện phụ thuộc (sử dụng package-lock.json)
npm ci

# Khởi chạy dev server (tự động proxy các yêu cầu /api và /media sang backend cổng 9000)
npm run dev
```

Truy cập ứng dụng tại: <http://localhost:3000>.

---

## Tính Năng Đăng Nhập & Đội Nhóm (Tùy Chọn)

Hệ thống tích hợp sẵn cơ chế xác thực và phân quyền đội nhóm theo dạng **công tắc (toggle)**, mặc định tắt (triển khai Docker dùng ngay như một ứng dụng đơn lẻ, không bắt đăng nhập):

- Khi đặt biến môi trường `AUTH_ENABLED=true` trong `.env`:
  - Bắt buộc đăng nhập để sử dụng.
  - Phân cấp 4 vai trò rõ ràng: **Super Admin (Siêu quản trị viên)** / **Team Admin (Quản trị viên đội nhóm)** / **Creator (Người sáng tạo)** / **Viewer (Người xem)**.
  - Cô lập dữ liệu giữa các đội nhóm, quản lý thành viên, nạp và quản lý số dư.
  - Cấu hình mô hình hỗ trợ cả "Cấu hình chính thức của hệ thống" (ẩn Key) và "Cấu hình riêng của đội nhóm".
  - Quản lý số dư: Kiểm tra trước khi gửi tác vụ và tự động trừ tiền sau khi hoàn tất; chặn thực hiện khi hết số dư.
  - Tài khoản Super Admin được khởi tạo qua 2 biến môi trường `SUPER_ADMIN_USERNAME` và `SUPER_ADMIN_PASSWORD`.
- Chi tiết hướng dẫn xem tại [docs/team-auth-deployment.md](docs/team-auth-deployment.md).

---

## Cấu Hình Mô Hình AI

Toàn bộ cấu hình mô hình AI được lưu trữ trực tiếp trong cơ sở dữ liệu và quản lý thông qua giao diện Web tại trang **「Cài đặt / Cấu hình mô hình」** (`/settings`). Bạn không cần phải sửa hay nhúng API Key vào mã nguồn.

### 1. Mô Hình LLM (Trích xuất thực thể / Phân cảnh / Phân tích dự án / Remake)
Hỗ trợ giao thức **chuẩn tương thích OpenAI (OpenAI-compatible)**, dễ dàng kết nối tới OpenAI (GPT-4o), DeepSeek (V3/R1), Doubao (Volcengine Ark), Moonshot (Kimi), Qwen, v.v.

| Trường thông tin | Hướng dẫn |
|---|---|
| **Tên hiển thị** | Tên cấu hình gợi nhớ, ví dụ: `deepseek-v3` hoặc `gpt-4o` |
| **API Base URL** | Địa chỉ base URL của nhà cung cấp, ví dụ: `https://api.deepseek.com/v1` |
| **API Key** | Khóa bí mật của bạn |
| **Tên mô hình** | Tên định danh gọi API, ví dụ: `deepseek-chat` |
| **Giao thức** | Chọn `openai_compatible` |
| **Hỗ trợ JSON Output** | Khuyến nghị bật đối với các tác vụ phân cảnh để nhận cấu trúc JSON chuẩn |
| **Mục đích sử dụng** | Có thể chọn nhiều: Hiểu nội dung, Lập kế hoạch phân cảnh, Phân tích dự án, Tái chế (Remake). *Lưu ý: Tác vụ "Tái chế" yêu cầu mô hình có hỗ trợ đọc video (multimodal).* |
| **Chế độ suy nghĩ (Thinking Mode)** | Cho phép bật/tắt tùy theo mô hình (với Doubao tự động gửi cờ `thinking=disabled` khi tắt) |
| **Độ trễ & Đồng thời** | Tùy chỉnh số lượng phân tích cảnh đồng thời; hỗ trợ thời gian chờ tối đa 10 phút cho mỗi yêu cầu video |

### 2. Mô Hình Sinh Ảnh (Image Generation)

| Loại mô hình | Nhà cung cấp | Giao thức |
|---|---|---|
| **Doubao Seedream 5.0 Lite / Pro** | ByteDance Volcengine Ark | `volcengine_ark` / `openrouter_compatible` |
| **GPT Image 2** | OpenAI | `openai_compatible` / `openrouter_compatible` |

### 3. Mô Hình Sinh Video (Video Generation)

| Loại mô hình | Khả năng chính | Giao thức |
|---|---|---|
| **Doubao Seedance 2.0 / Fast / Mini** | Ảnh/Video/Âm thanh tham chiếu, Nối khung hình đầu-cuối, Âm thanh đồng bộ, Tối đa 15s | `volcengine_ark` |
| **Doubao Seedance 2.5** | Đa dạng tư liệu tham chiếu hơn, Thời lượng tối đa 30s, Âm thanh hệ thống qua `asset://` | `volcengine_ark` |
| **MiniMax H3** | Độ phân giải 768P / 2K, Ảnh/Video/Âm thanh tham chiếu, Nối khung hình đầu-cuối | `minimax` |
| **Wan3 (Aliyun DashScope)** | Văn bản sinh video / Ảnh sinh video / Nối khung hình đầu-cuối / Tham chiếu toàn diện | `dashscope` |

> Bạn có thể bật đồng thời nhiều cấu hình cho mỗi loại tác vụ. Giao diện người dùng sẽ tự động phát hiện và chỉ hiển thị các tùy chọn thông số mà mô hình đã chọn thực sự hỗ trợ.

---

## Cơ Sở Dữ Liệu & Lưu Trữ Media

Tất cả cấu hình lưu trữ được điều khiển thông qua tệp `.env`, không cần sửa mã nguồn.

### SQLite & PostgreSQL

Mặc định chạy phát triển cục bộ và Docker cơ bản với **SQLite**:
```dotenv
DATABASE_URL=sqlite://./data/novelvids.db
```

Chuyển sang **PostgreSQL** cho môi trường sản xuất chịu tải lớn:
```dotenv
DATABASE_URL=postgres://novelvids:mat-khau-cua-ban@127.0.0.1:5432/novelvids
```
Khi khởi động, ứng dụng tự động kiểm tra và khởi tạo các bảng dữ liệu còn thiếu một cách an toàn mà không làm mất dữ liệu hiện có.

### Lưu Trữ Cục Bộ (Local) & Aliyun OSS

Mặc định lưu trữ tệp tin đa phương tiện trực tiếp trên ổ cứng:
```dotenv
MEDIA_PATH=./media
OSS_PROVIDER=local
```

Nếu muốn kết nối dịch vụ lưu trữ đám mây Aliyun OSS:
```dotenv
OSS_PROVIDER=aliyun
OSS_BUCKET=ten-bucket-cua-ban
OSS_ENDPOINT=oss-cn-guangzhou.aliyuncs.com
OSS_INTERNAL_ENDPOINT=oss-cn-guangzhou-internal.aliyuncs.com
OSS_PUBLIC_BASE=https://media.domaincuaban.com
OSS_ACCESS_KEY_ID=your_access_key
OSS_ACCESS_KEY_SECRET=your_secret_key
```

### Tự Động Thăm Dò & Cập Nhật Trạng Thái Video (Reconciliation Loop)

```dotenv
VIDEO_RECONCILE_INTERVAL_SECONDS=30
VIDEO_RECONCILE_BATCH_SIZE=50
```
Máy chủ định kỳ mỗi 30 giây tự động kiểm tra trạng thái các tác vụ video đang xử lý từ nhà cung cấp. Người dùng có thể yên tâm đóng trình duyệt; khi video tạo xong, hệ thống sẽ tự động tải về, trích xuất khung hình cuối và kích hoạt phân cảnh kế tiếp.

---

## Cấu Trúc Dự Án

```
novelvids/
├── api/                    # Tầng API —— Định nghĩa các endpoint RESTful (/api)
├── controllers/            # Tầng Điều khiển —— Xử lý và điều phối logic nghiệp vụ
├── models/                 # Tầng Mô hình Dữ liệu —— Tortoise ORM Models
├── schemas/                # Tầng Xác thực Dữ liệu —— Pydantic Schemas
├── services/               # Tầng Dịch vụ —— Tương tác với AI, hình ảnh, video & lưu trữ
│   ├── ai_task_executor.py # Điều phối và thực thi tác vụ AI bất đồng bộ
│   ├── extraction/         # Dịch vụ trích xuất thực thể từ tiểu thuyết
│   ├── storyboard/         # Dịch vụ tạo và quản lý kịch bản phân cảnh
│   ├── reference/          # Dịch vụ tạo ảnh tham chiếu cho nhân vật & bối cảnh
│   ├── remake/             # Dịch vụ xử lý xưởng tái chế (Remake), chia cảnh, SSE
│   ├── image_generation/   # Bộ điều hợp sinh ảnh và xử lý giao thức
│   ├── video/              # Video Factory, kiểm tra năng lực model, ghép nối & trích frame
│   ├── oss/                # Giao diện lưu trữ thống nhất (Cục bộ / Aliyun OSS)
│   └── audio_references.py # Tải lên, cắt gọn và lưu trữ âm thanh tham chiếu
├── prompts/                # Mẫu Prompt AI —— Tập trung quản lý, không viết cứng trong code
├── seeds/                  # Dữ liệu hạt giống khởi tạo (âm thanh, nhân vật số)
├── scripts/                # Kịch bản bảo trì vận hành
├── test/                   # Bộ kiểm thử Backend (Pytest)
│
├── web/                    # Ứng dụng Giao diện Người dùng (Frontend: Vue 3 + TypeScript + Vite)
│   ├── src/
│   │   ├── pages/          # Các trang giao diện chính
│   │   ├── features/workbench/  # Không gian làm việc Canvas vô cực
│   │   ├── components/     # Các component dùng chung
│   │   ├── shared/         # Tiện ích, quản lý trạng thái, theme, i18n
│   │   ├── locales/        # Tệp ngôn ngữ đa quốc gia (Tiếng Việt vi-VN, Tiếng Trung zh-CN)
│   │   ├── api.ts          # Giao thức gọi API Backend
│   │   └── router.ts       # Định tuyến Vue Router
│   ├── public/             # Tài nguyên tĩnh
│   ├── index.html
│   └── package.json
│
├── Dockerfile              # Dockerfile đóng gói Backend
├── docker-compose.yml      # Cấu hình khởi chạy toàn diện một bước
├── .env.example            # Tệp mẫu các biến môi trường
├── pyproject.toml          # Cấu hình dự án Python & Quản lý thư viện
└── README.md               # Tài liệu hướng dẫn sử dụng tiếng Việt
```

---

## Tech Stack

### Backend

| Công nghệ | Mục đích sử dụng |
|---|---|
| **FastAPI** | Framework Web bất đồng bộ hiệu năng cao |
| **Tortoise ORM** | ORM Async mạnh mẽ, hỗ trợ SQLite và PostgreSQL |
| **asyncpg / aiosqlite** | Trình điều khiển kết nối cơ sở dữ liệu bất đồng bộ |
| **Pydantic v2** | Định nghĩa cấu trúc, xác thực và chuẩn hóa dữ liệu |
| **OpenAI SDK** | Giao diện chuẩn gọi các mô hình AI tương thích |
| **HTTPX** | Xử lý yêu cầu HTTP đa luồng tới các nhà cung cấp Seedance, MiniMax, Wan3 |
| **PySceneDetect** | Phát hiện ranh giới chuyển cảnh video thông minh trong xưởng Remake |
| **FFmpeg** | Ghép nối tập phim, xử lý âm thanh và trích xuất khung hình cuối |
| **Uvicorn** | Máy chủ ASGI tiêu chuẩn công nghiệp |
| **uv** | Trình quản lý môi trường ảo và thư viện Python siêu nhanh |

### Frontend

| Công nghệ | Mục đích sử dụng |
|---|---|
| **Vue 3** | Framework giao diện người dùng hiện đại (Composition API) |
| **TypeScript** | Đảm bảo an toàn kiểu dữ liệu chặt chẽ |
| **Vite** | Công cụ build và dev server siêu tốc |
| **Pinia** | Quản lý trạng thái ứng dụng |
| **Vue Flow** | Nền tảng dựng Canvas vô cực tương tác cao |
| **Vue Router** | Điều hướng trang mượt mà (SPA) |
| **vue-i18n** | Hỗ trợ đa ngôn ngữ hoàn chỉnh (mặc định Tiếng Việt `vi-VN`) |
| **Vitest** | Bộ kiểm thử đơn vị và tích hợp giao diện (137 suites, 451 tests) |

---

## Kiểm Thử (Testing)

Dự án được bảo vệ nghiêm ngặt bởi bộ kiểm thử tự động toàn diện:

```bash
# Chạy toàn bộ kiểm thử Backend (Pytest)
uv run pytest

# Chạy kiểm thử dịch vụ phân cảnh Backend
uv run pytest test/test_services/test_storyboard_handler.py -q

# Chạy toàn bộ kiểm thử Frontend (Vitest - 137 test suites, 451 tests)
cd web && npm run test

# Kiểm tra an toàn kiểu dữ liệu TypeScript và build sản phẩm Frontend
cd web && npm run typecheck && npm run build
```

---

## Giấy Phép Bản Quyền (License)

Dự án gốc được phát hành theo giấy phép [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](LICENSE).

- ✅ **Học tập, nghiên cứu và sử dụng cá nhân**: Hoàn toàn miễn phí, không cần xin phép.
- ✅ **Trích dẫn, chia sẻ và phát triển thứ cấp (Phi thương mại)**: Được phép, nhưng bắt buộc phải ghi rõ nguồn gốc (ghi nhận tác giả gốc và liên kết dự án).
- ❌ **Sử dụng thương mại**: Bị nghiêm cấm. Bất kỳ hình thức sử dụng dự án này hoặc các sản phẩm phái sinh vào mục đích thương mại trực tiếp hoặc gián tiếp (bao gồm bán lại, triển khai dịch vụ SaaS có thu phí, tùy biến trả phí, gắn quảng cáo kiếm tiền, v.v.) đều phải có sự **đồng ý bằng văn bản** từ tác giả gốc.

---

<p align="center">
  <sub>Bản Việt hóa và tối ưu hóa vận hành bởi <a href="https://github.com/Henrysido/novelvidsvn">Henrysido</a> &bull; Phát triển từ dự án gốc của <a href="https://github.com/Anning01/novelvids">Anning</a></sub>
</p>
