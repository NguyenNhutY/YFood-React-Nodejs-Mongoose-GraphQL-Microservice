import { Request, Response } from "express";
import PromocodeModel from "../data/models/PromocodeModel"; // Điều chỉnh đường dẫn nếu cần

// Thêm mã giảm giá mới
export const addPromocode = async () => {
  try {
    const newPromocode = new PromocodeModel(req.body);
    await newPromocode.save();
    res.status(201).json(newPromocode);
  } catch (error) {
    res.status(500).json({ message: "Error creating promocode", error });
  }
};

// Lấy tất cả mã giảm giá
export const getPromocodes = async () => {
  try {
    const promocodes = await PromocodeModel.find();
    res.status(200).json(promocodes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching promocodes", error });
  }
};

// Lấy mã giảm giá theo ID
export const getPromocodeById = async () => {
  try {
    const promocode = await PromocodeModel.findById(req.params.id);
    if (!promocode) {
      return res.status(404).json({ message: "Promocode not found" });
    }
    res.status(200).json(promocode);
  } catch (error) {
    res.status(500).json({ message: "Error fetching promocode", error });
  }
};

// Cập nhật mã giảm giá
export const updatePromocode = async () => {
  try {
    const updatedPromocode = await PromocodeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPromocode) {
      return res.status(404).json({ message: "Promocode not found" });
    }
    res.status(200).json(updatedPromocode);
  } catch (error) {
    res.status(500).json({ message: "Error updating promocode", error });
  }
};

// Xóa mã giảm giá
export const deletePromocode = async () => {
  try {
    const promocode = await PromocodeModel.findByIdAndDelete(req.params.id);
    if (!promocode) {
      return res.status(404).json({ message: "Promocode not found" });
    }
    res.status(200).json({ message: "Promocode deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting promocode", error });
  }
};

// Áp dụng mã giảm giá
export const applyPromocode = async () => {
  try {
    const { code } = req.body;
    const promocode = await PromocodeModel.findOne({ code });
    if (!promocode) {
      return res.status(404).json({ message: "Promocode not found" });
    }
    // Thực hiện logic áp dụng mã giảm giá ở đây
    res
      .status(200)
      .json({ message: "Promocode applied successfully", promocode });
  } catch (error) {
    res.status(500).json({ message: "Error applying promocode", error });
  }
};

// Xác thực mã giảm giá
export const validatePromocode = async () => {
  try {
    const { code } = req.body;
    const promocode = await PromocodeModel.findOne({ code });
    if (!promocode) {
      return res.status(404).json({ message: "Promocode not found" });
    }
    // Thực hiện logic xác thực mã giảm giá ở đây
    res.status(200).json({ message: "Promocode is valid", promocode });
  } catch (error) {
    res.status(500).json({ message: "Error validating promocode", error });
  }
};

// Lấy các mã giảm giá đã sử dụng
export const getUsedPromocodes = async () => {
  try {
    const usedPromocodes = await PromocodeModel.find({ used: true });
    res.status(200).json(usedPromocodes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching used promocodes", error });
  }
};

// Lấy các mã giảm giá đã hết hạn
export const getExpiredPromocodes = async () => {
  try {
    const now = new Date();
    const expiredPromocodes = await PromocodeModel.find({
      expiryDate: { $lt: now },
    });
    res.status(200).json(expiredPromocodes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching expired promocodes", error });
  }
};
