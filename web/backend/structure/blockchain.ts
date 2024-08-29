// blockchain.ts

import { Block, Blockchain, BlockData } from "../blockchainTypes";
import crypto from "crypto";
import fs from "fs";

class BlockchainClass implements Blockchain {
  public blocks: Block[] = [];

  constructor() {
    this.createGenesisBlock();
    this.loadMaterials();
  }

  private createGenesisBlock(): void {
    const genesisBlock: Block = {
      index: 1,
      timestamp: new Date().toISOString(),
      previousHash: "0",
      hash: this.calculateHash(1, new Date().toISOString(), "0", "", 0),
      data: {
        supplierId: "",
        materialId: "",
        materialName: "",
        quantity: 0,
        unit: "",
        location: "",
      },
      nonce: 0,
    };
    this.blocks.push(genesisBlock);
  }

  private calculateHash(
    index: number,
    timestamp: string,
    previousHash: string,
    data: BlockData,
    nonce: number
  ): string {
    return crypto
      .createHash("sha256")
      .update(index + timestamp + previousHash + JSON.stringify(data) + nonce)
      .digest("hex");
  }

  public addBlock(newBlock: Block): void {
    newBlock.previousHash = this.blocks[this.blocks.length - 1]?.hash || "0";
    newBlock.hash = this.calculateHash(
      newBlock.index,
      newBlock.timestamp,
      newBlock.previousHash,
      newBlock.data,
      newBlock.nonce
    );
    this.blocks.push(newBlock);
  }

  public getBlockchain(): Block[] {
    return this.blocks;
  }

  private loadMaterials(): void {
    const rawData = fs.readFileSync("materials.json", "utf-8");
    const materials: BlockData[] = JSON.parse(rawData);

    materials.forEach((material: BlockData, index: number) => {
      const newBlock: Block = {
        index: this.blocks.length + 1,
        timestamp: new Date().toISOString(),
        previousHash: this.blocks[this.blocks.length - 1]?.hash || "0",
        hash: "",
        data: material,
        nonce: Math.floor(Math.random() * 100000),
      };
      this.addBlock(newBlock);
    });
  }
}

export default BlockchainClass;
