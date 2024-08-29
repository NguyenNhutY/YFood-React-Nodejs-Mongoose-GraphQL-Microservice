export interface BlockData {
  supplierId: string;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  location: string;
}

export interface Block {
  index: number;
  timestamp: string;
  previousHash: string;
  hash: string;
  data: BlockData;
  nonce: number;
}

export interface Blockchain {
  blocks: Block[];
}
