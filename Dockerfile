# Stage Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng Next.js
RUN npm run build

# Stage Runner
FROM node:18-alpine AS runner

WORKDIR /app

# Sao chép package.json và package-lock.json từ builder
COPY package*.json ./

# Cài đặt chỉ production dependencies
RUN npm install --only=production

# Sao chép các tệp build từ builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./  
COPY --from=builder /app/package.json ./

# Thiết lập biến môi trường
ENV NODE_ENV=production

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Khởi động ứng dụng
CMD ["npm", "start"]

