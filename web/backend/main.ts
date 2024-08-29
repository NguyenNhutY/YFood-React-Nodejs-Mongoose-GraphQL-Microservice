// types/main.ts

import { BlockchainClass } from "./types/structure/blockchain";
import * as fs from "fs";

// Khởi tạo blockchain
const blockchain = new BlockchainClass();

// Đọc dữ liệu nguyên liệu từ file JSON và thêm vào blockchain
const rawData = fs.readFileSync("types/materials.json", "utf-8");
const materials = JSON.parse(rawData);

// Thêm nguyên liệu vào blockchain
materials.forEach((material: any, index: number) => {
  const newBlock = {
    index: blockchain.getBlockchain().length + 1,
    timestamp: new Date().toISOString(),
    previousHash:
      blockchain.getBlockchain().length > 0
        ? blockchain.getBlockchain()[blockchain.getBlockchain().length - 1].hash
        : "0",
    hash: "", // Sẽ được tính sau
    data: material,
    nonce: 0, // Sẽ được tính sau
  };

  blockchain.addBlock(newBlock);
});

// In ra blockchain
console.log(JSON.stringify(blockchain.getBlockchain(), null, 2));
