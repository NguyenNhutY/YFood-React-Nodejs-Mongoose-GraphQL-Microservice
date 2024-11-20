# Sử dụng image Node.js chính thức
FROM node:16

# Tạo thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà ứng dụng của bạn sẽ chạy trên container
EXPOSE 4001

# Lệnh chạy ứng dụng
CMD ["npm", "start"]
