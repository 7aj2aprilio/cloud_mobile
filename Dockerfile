# ===== Base: install deps =====
FROM node:18-bullseye AS base
WORKDIR /app

# Lebih cepat & reproducible pakai lockfile
COPY package*.json app.json ./
RUN npm ci || npm install

# Copy source
COPY . .

# ===== Dev: Expo Dev Server =====
FROM node:18-bullseye AS dev
WORKDIR /app
# Bawa node_modules dari tahap base
COPY --from=base /app /app

# Expo CLI (pakai npx juga bisa; ini agar perintah lebih singkat)
RUN npm i -g expo-cli

# Agar DevTools & Metro bisa diakses dari host
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

EXPOSE 19000 19001 19002
# --tunnel memudahkan akses; jika tidak perlu, ganti --lan
CMD ["npx", "expo", "start", "--tunnel", "--clear"]

# ===== Web: build dan serve via Nginx =====
FROM node:18-bullseye AS web-builder
WORKDIR /app
COPY --from=base /app /app

# Build web static (Expo SDK modern: `expo export -p web`)
RUN npx expo export -p web --output-dir dist

FROM nginx:alpine AS web
COPY --from=web-builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
