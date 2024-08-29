# Sử dụng hình ảnh Node.js chính thức từ Docker Hub
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Cung cấp cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Chạy ứng dụng khi container khởi động
CMD ["npm", "start"]
