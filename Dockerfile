# ===== Base: install deps =====
FROM node:18-bullseye AS base
WORKDIR /app

# pakai lockfile kalau ada
COPY package*.json app.json ./
RUN npm ci || npm install
COPY . .

# ===== Dev =====
FROM node:18-bullseye AS dev
WORKDIR /app
COPY --from=base /app /app
RUN npm i -g expo-cli
EXPOSE 19000 19001 19002
CMD ["npx", "expo", "start", "--tunnel", "--clear"]

# ===== Web build =====
FROM node:18-bullseye AS web-builder
WORKDIR /app
COPY --from=base /app /app

# pastikan dep web terpasang sesuai versi SDK (expo akan memilih versi yang cocok)
ENV CI=1 EXPO_NO_TELEMETRY=1
RUN npx --yes expo install react-dom react-native-web && \
    npx expo export -p web --output-dir dist

FROM nginx:alpine AS web
COPY --from=web-builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
