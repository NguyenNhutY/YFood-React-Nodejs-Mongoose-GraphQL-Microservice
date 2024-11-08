import { Request, Response } from "express";
import MaterialModel from "../data/models/MaterialModel";

// types.ts

// Định nghĩa kiểu dữ liệu cho các thông tin tài liệu

// Lấy tất cả tài liệu
export const getAllMaterials = async () => 
 {
  try {
    const materials = await MaterialModel.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching materials", error });
  }
};

// Lấy tài liệu theo ID
export const getMaterialById = async ()=>
{
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
export const addMaterial = async () => {
  try {
    const newMaterial = new MaterialModel(req.body);
    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ message: "Error adding material", error });
  }
};

// Cập nhật tài liệu
export const updateMaterial = async ()=> {
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
export const deleteMaterial = async ()=> {
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
export const getMaterialsByCategory = async ()=> {
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
export const getMaterialsBySupplier = async () => {
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
export const searchMaterialsByTitle = async () => {
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
export const getRecentlyAddedMaterials = async () => {
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
export const getMaterialsInStock = async ()=> {
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
export const getMaterialsOutofStock = async ()=> {
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
export const getMaterialsByPriceRange = async () => {
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
export const getMaterialsByQuantityRange = async ()=> {
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
