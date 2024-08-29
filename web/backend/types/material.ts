export interface Material {
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  location: string;
}

export interface Supplier {
  supplierId: string;
  materials: Material[];
}
