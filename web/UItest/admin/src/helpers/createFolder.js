import fs from "fs";
import path from "path";

// Đường dẫn tới folder pages
const pagesDir = path.join(
  "D:/bt_html/Project_Part3/Food Delivery/refine/src",
  "pages"
);

// Đọc danh sách các folder con đã có sẵn trong pages
const subFolders = fs.readdirSync(pagesDir).filter((subFolder) => {
  const subFolderPath = path.join(pagesDir, subFolder);
  return fs.statSync(subFolderPath).isDirectory();
});

// Tên của các folder cần tạo
const foldersToCreate = ["Create", "List", "Show", "Edit"];

// Tạo các folder con trong mỗi folder con
subFolders.forEach((subFolder) => {
  const subFolderPath = path.join(pagesDir, subFolder);

  foldersToCreate.forEach((folder) => {
    const folderPath = path.join(subFolderPath, folder);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Đã tạo folder: ${folderPath}`);
    }
  });
});
