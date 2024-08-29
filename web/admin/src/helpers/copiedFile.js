import fs from "fs";
import path from "path";

// Đường dẫn tới folder pages
const pagesDir = path.join(
  "D:/bt_html/Project_Part3/Food Delivery/refine/src",
  "pages"
);

// Đường dẫn tới folder categories
const categoriesDir = path.join(pagesDir, "categories");

// Đọc danh sách các folder con trong categories
const categoryFolders = fs.readdirSync(categoriesDir).filter((folder) => {
  const folderPath = path.join(categoriesDir, folder);
  return fs.statSync(folderPath).isDirectory();
});

// Đọc danh sách các folder con trong pages ngoại trừ blog-posts
const subFolders = fs.readdirSync(pagesDir).filter((subFolder) => {
  const subFolderPath = path.join(pagesDir, subFolder);
  return subFolder !== "blog-posts" && fs.statSync(subFolderPath).isDirectory();
});

// Sao chép các file từ các folder con của categories vào từng folder con khác
subFolders.forEach((subFolder) => {
  const subFolderPath = path.join(pagesDir, subFolder);

  categoryFolders.forEach((categoryFolder) => {
    const categoryFolderPath = path.join(categoriesDir, categoryFolder);

    // Sao chép từng file từ folder con của categories vào folder con hiện tại của pages
    fs.readdirSync(categoryFolderPath).forEach((file) => {
      const srcFilePath = path.join(categoryFolderPath, file);
      const destFilePath = path.join(subFolderPath, file);

      // Sao chép file chỉ khi file nguồn tồn tại
      if (fs.existsSync(srcFilePath)) {
        fs.copyFileSync(srcFilePath, destFilePath);
        console.log(
          `Đã sao chép ${file} từ ${categoryFolderPath} vào ${subFolderPath}`
        );
      } else {
        console.log(`File không tồn tại: ${srcFilePath}`);
      }
    });
  });
});
