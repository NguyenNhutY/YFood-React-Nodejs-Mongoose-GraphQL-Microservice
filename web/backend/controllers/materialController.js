import { Request, Response } from "express";
import MaterialModel from "../data/models/MaterialModel";

// types.ts

// Định nghĩa kiểu dữ liệu cho các thông tin tài liệu
export interface MaterialInput {
  title: string;
  description?: string;
  category: string;
  supplier: string;
  price: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Định nghĩa các tham số truy vấn cho việc tìm kiếm và lọc
export interface MaterialQueryParams {
  title?: string;
  category?: string;
  supplier?: string;
  minPrice?: string;
  maxPrice?: string;
  minQuantity?: string;
  maxQuantity?: string;
}

// Lấy tất cả tài liệu
export const getAllMaterials = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const materials = await MaterialModel.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching materials", error });
  }
};

// Lấy tài liệu theo ID
export const getMaterialById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const material = await MaterialModel.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: "Error fetching material", error });
  }
};

// Thêm tài liệu mới
export const addMaterial = async (
  req: Request<{}, {}, MaterialInput>,
  res: Response
): Promise<void> => {
  try {
    const newMaterial = new MaterialModel(req.body);
    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ message: "Error adding material", error });
  }
};

// Cập nhật tài liệu
export const updateMaterial = async (
  req: Request<{ id: string }, {}, MaterialInput>,
  res: Response
): Promise<void> => {
  try {
    const updatedMaterial = await MaterialModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMaterial) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ message: "Error updating material", error });
  }
};

// Xóa tài liệu
export const deleteMaterial = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const material = await MaterialModel.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting material", error });
  }
};

// Lấy tài liệu theo danh mục
export const getMaterialsByCategory = async (
  req: Request<{ category: string }>,
  res: Response
): Promise<void> => {
  try {
    const materials = await MaterialModel.find({
      category: req.params.category,
    });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching materials", error });
  }
};

// Lấy tài liệu theo nhà cung cấp
export const getMaterialsBySupplier = async (
  req: Request<{ supplier: string }>,
  res: Response
): Promise<void> => {
  try {
    const materials = await MaterialModel.find({
      supplier: req.params.supplier,
    });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching materials", error });
  }
};

// Tìm tài liệu theo tiêu đề
export const searchMaterialsByTitle = async (
  req: Request<{}, {}, {}, { title?: string }>,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.query;
    const materials = await MaterialModel.find({
      title: { $regex: title || "", $options: "i" },
    });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Error searching materials", error });
  }
};

// Lấy tài liệu được thêm gần đây
export const getRecentlyAddedMaterials = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const materials = await MaterialModel.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(materials);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recently added materials", error });
  }
};

// Lấy tài liệu còn hàng
export const getMaterialsInStock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const materials = await MaterialModel.find({ quantity: { $gt: 0 } });
    res.status(200).json(materials);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching materials in stock", error });
  }
};

// Lấy tài liệu hết hàng
export const getMaterialsOutofStock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const materials = await MaterialModel.find({ quantity: { $lte: 0 } });
    res.status(200).json(materials);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching out-of-stock materials", error });
  }
};

// Lấy tài liệu theo khoảng giá
export const getMaterialsByPriceRange = async (
  req: Request<{}, {}, {}, { minPrice?: string; maxPrice?: string }>,
  res: Response
): Promise<void> => {
  try {
    const { minPrice, maxPrice } = req.query;
    const materials = await MaterialModel.find({
      price: {
        $gte: Number(minPrice || 0),
        $lte: Number(maxPrice || Infinity),
      },
    });
    res.status(200).json(materials);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching materials by price range", error });
  }
};

// Lấy tài liệu theo khoảng số lượng
export const getMaterialsByQuantityRange = async (
  req: Request<{}, {}, {}, { minQuantity?: string; maxQuantity?: string }>,
  res: Response
): Promise<void> => {
  try {
    const { minQuantity, maxQuantity } = req.query;
    const materials = await MaterialModel.find({
      quantity: {
        $gte: Number(minQuantity || 0),
        $lte: Number(maxQuantity || Infinity),
      },
    });
    res.status(200).json(materials);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching materials by quantity range", error });
  }
};
