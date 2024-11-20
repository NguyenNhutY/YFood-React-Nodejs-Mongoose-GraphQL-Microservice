# Sử dụng Node.js image làm nền tảng
FROM node:16

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy package.json và package-lock.json (nếu có) vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy tất cả mã nguồn vào trong container
COPY . .

# Mở cổng 4000 trên container
EXPOSE 4000

# Chạy server.js khi container khởi động
CMD ["node", "server.js"]
