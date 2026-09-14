#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "🛑 Đang dừng NovelVids Studio..."
docker compose down

echo "✅ Đã dừng ứng dụng an toàn. Toàn bộ dữ liệu đã được bảo lưu."
