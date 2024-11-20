# Sử dụng image Node.js nếu bạn cần nó, hoặc image khác như nginx cho ứng dụng tĩnh
FROM node:16

# Tạo thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép toàn bộ mã nguồn vào container (không cần package.json)
COPY package*.json ./

# Expose cổng mà ứng dụng của bạn sẽ chạy trên container
EXPOSE 4002

# Lệnh chạy ứng dụng
CMD ["node", "index.js"]  # Hoặc thay bằng lệnh phù hợp với ứng dụng của bạn
