#!/bin/bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

mkdir -p data media
chmod -R 775 data media 2>/dev/null || true

echo "🚀 Đang khởi động HenryVids Studio (Docker)..."
docker compose up -d "$@"

echo ""
echo "======================================================="
echo " 🎉 HenryVids Studio đã sẵn sàng hoạt động!"
echo " 🌐 Địa chỉ web: http://localhost:8080"
echo " 📚 Tài liệu API: http://localhost:8080/docs"
echo "======================================================="
echo ""

if command -v xdg-open > /dev/null 2>&1; then
    xdg-open http://localhost:8080 > /dev/null 2>&1 &
fi
