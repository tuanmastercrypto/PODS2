# Sử dụng Node.js bản chính thức
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng Next.js
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Chạy ứng dụng Next.js
CMD ["npm", "start"]
