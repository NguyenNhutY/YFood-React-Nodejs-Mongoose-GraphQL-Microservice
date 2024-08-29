import fs from "fs";
import path from "path";

const processScssFiles = (dir) => {
  // Đọc tất cả các tệp trong thư mục
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Unable to scan directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      // Kiểm tra nếu là thư mục thì gọi lại hàm processScssFiles
      if (fs.lstatSync(filePath).isDirectory()) {
        processScssFiles(filePath);
      } else if (path.extname(file) === ".scss") {
        // Đọc nội dung tệp SCSS
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.error(`Error reading file: ${err}`);
            return;
          }

          let scssContent = data;

          // Ví dụ chuyển đổi @import từ CSS sang SCSS
          scssContent = scssContent.replace(
            /@import\s+['"](.+)\.css['"];/g,
            "@import '$1';"
          );

          // Thực hiện các thay đổi khác nếu cần

          // Ghi nội dung mới vào lại tệp .scss
          fs.writeFile(filePath, scssContent, (err) => {
            if (err) {
              console.error(`Error writing file: ${err}`);
              return;
            }
            console.log(`Processed ${file}`);
          });
        });
      } else if (path.extname(file) === ".tsx") {
        // Đọc và chỉnh sửa nội dung của các tệp .tsx
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.error(`Error reading file: ${err}`);
            return;
          }

          let tsxContent = data;

          // Đảm bảo rằng tất cả các đường dẫn import .scss là đúng
          tsxContent = tsxContent.replace(
            /import\s+['"](.+)\.css['"];/g,
            "import '$1.scss';"
          );

          // Ghi nội dung mới vào lại tệp .tsx
          fs.writeFile(filePath, tsxContent, (err) => {
            if (err) {
              console.error(`Error writing file: ${err}`);
              return;
            }
            console.log(`Processed ${file}`);
          });
        });
      }
    });
  });
};

// Đường dẫn tới thư mục chứa các tệp .scss và .tsx
const scssDirectory = "D:/bt_html/Project_Part3/Food Delivery/frontend";
processScssFiles(scssDirectory);
