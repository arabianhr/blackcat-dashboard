#!/bin/bash
set -e

DASH_DIR="/home/profilio/blackcat/dashboard"
REPO="https://github.com/arabianhr/blackcat-dashboard.git"
CADDYFILE="/home/profilio/n8n/Caddyfile"

echo "=== Black Cat Dashboard Deploy ==="

# Clone or pull
if [ -d "$DASH_DIR" ]; then
  echo "[1/5] Pulling latest..."
  cd "$DASH_DIR" && git pull origin main
else
  echo "[1/5] Cloning repo..."
  git clone "$REPO" "$DASH_DIR"
  cd "$DASH_DIR"
fi

# Create .env.local if missing
if [ ! -f "$DASH_DIR/.env.local" ]; then
  echo "[2/5] Creating .env.local from example..."
  cp "$DASH_DIR/.env.example" "$DASH_DIR/.env.local"
else
  echo "[2/5] .env.local exists"
fi

# Build and start
echo "[3/5] Building Docker image..."
cd "$DASH_DIR" && docker compose up -d --build

# Add Caddy route if not exists
if ! grep -q 'blackcat.arabianhr.com' "$CADDYFILE"; then
  echo "[4/5] Adding Caddy route..."
  printf '\nblackcat.arabianhr.com {\n    reverse_proxy blackcat_dashboard:3000\n}\n' >> "$CADDYFILE"
else
  echo "[4/5] Caddy route exists"
fi

# Connect to DMZ network
docker network connect blackcat_dmz blackcat_dashboard 2>/dev/null || echo "Already on blackcat_dmz"

# Reload Caddy
echo "[5/5] Reloading Caddy..."
docker exec n8n-caddy-1 caddy reload --config /etc/caddy/Caddyfile

echo ""
echo "=== Deploy complete ==="
echo "URL: https://blackcat.arabianhr.com"
sleep 3
curl -s -o /dev/null -w "HTTP %{http_code}" https://blackcat.arabianhr.com/ && echo " OK" || echo " PENDING"
