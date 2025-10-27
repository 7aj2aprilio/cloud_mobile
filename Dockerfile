# ===== Base: install dependencies =====
FROM node:18-bullseye AS base
WORKDIR /app

COPY package*.json app.json ./
RUN npm install
COPY . .

# ===== Dev: Expo Dev Server =====
FROM node:18-bullseye AS dev
WORKDIR /app
COPY --from=base /app /app
RUN npm i -g expo-cli
EXPOSE 19000 19001 19002
CMD ["npx", "expo", "start", "--tunnel", "--clear"]

# ===== Web: build dan serve via Nginx =====
FROM node:18-bullseye AS web-builder
WORKDIR /app
COPY --from=base /app /app
RUN npx expo export -p web --output-dir dist

FROM nginx:alpine AS web
COPY --from=web-builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
