import fs from "fs";
import path from "path";

// Sử dụng dấu gạch chéo xuôi hoặc dấu gạch chéo ngược đúng cách trong đường dẫn
const directory = "D:/bt_html/Project_Part3/Food Delivery/web/backend/routes";
const oldExt = ".ts";
const newExt = ".js";

fs.readdir(directory, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (path.extname(file) === oldExt) {
      const oldPath = path.join(directory, file);
      const newPath = path.join(
        directory,
        path.basename(file, oldExt) + newExt
      );
      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log(`Renamed: ${oldPath} -> ${newPath}`);
      });
    }
  });
});
