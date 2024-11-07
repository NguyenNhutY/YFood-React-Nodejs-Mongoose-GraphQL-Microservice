import fs from "fs";
import path from "path";
// Số lượng thư mục cần tạo
const numFolders = 35;
// Danh sách các thư mục con và tên file trong mỗi thư mục con
const subFolders = ["model", "controller", "route", "util", "service"];

// Hàm tạo thư mục và file
const createFolderStructure = () => {
  for (let i = 1; i <= numFolders; i++) {
    // Tạo thư mục chính, ví dụ: Folder1, Folder2, ..., Folder35
    const mainFolder = `Folder${i}`;

    // Kiểm tra và tạo thư mục chính nếu chưa tồn tại
    if (!fs.existsSync(mainFolder)) {
      fs.mkdirSync(mainFolder);
    }

    // Tạo các thư mục con và file
    subFolders.forEach((subFolder) => {
      const subFolderPath = path.join(mainFolder, subFolder);

      // Tạo thư mục con nếu chưa tồn tại
      if (!fs.existsSync(subFolderPath)) {
        fs.mkdirSync(subFolderPath);
      }

      // Tạo file có cùng tên với thư mục con trong thư mục con
      const filePath = path.join(subFolderPath, `${subFolder}.js`);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `// ${subFolder} logic for ${mainFolder}`);
      }
    });
  }
};

createFolderStructure();
console.log("Folders and files created successfully!");
