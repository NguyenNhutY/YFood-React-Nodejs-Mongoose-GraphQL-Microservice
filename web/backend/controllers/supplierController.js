import { Request, Response } from "express";
import Supplier from "../data/models/supplierModel.js";

// Get All Suppliers
export const getSuppliers = async () => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by ID
export const getSupplierById = async () => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Create Supplier
export const createSupplier = async () => {
  const newSupplier = new Supplier(req.body);
  try {
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (err) {
    res.status(400).json({ message: error });
  }
};

// Update Supplier
export const updateSupplier = async () => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSupplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: error });
  }
};

// Delete Supplier
export const deleteSupplier = async () => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Search Suppliers
export const searchSuppliers = async () => {
  const { query } = req.query;
  try {
    const suppliers = await Supplier.find({ $text: { $search: query } });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier Orders
export const getSupplierOrders = async () => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate("orders");
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier.orders);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier Inventory
export const getSupplierInventory = async () => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate(
      "inventory"
    );
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier.inventory);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier Reviews
export const getSupplierReviews = async () => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate("reviews");
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier.reviews);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier Ratings
export const getSupplierRatings = async () => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate("ratings");
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier.ratings);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier Stats
export const getSupplierStats = async () => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    const stats = {
      ordersCount: supplier.orders.length,
      inventoryCount: supplier.inventory.length,
      reviewsCount: supplier.reviews.length,
      ratingsCount: supplier.ratings.length,
    };
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier Recommendations
export const getSupplierRecommendations = async () => {
  try {
    const suppliers = await Supplier.find({ recommended: true });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by Email
export const getSupplierByEmail = async () => {
  try {
    const supplier = await Supplier.findOne({ email: req.params.email });
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by Phone
export const getSupplierByPhone = async () => {
  try {
    const supplier = await Supplier.findOne({ phone: req.params.phone });
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by Address
export const getSupplierByAddress = async () => {
  try {
    const supplier = await Supplier.findOne({ address: req.params.address });
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by Status
export const getSupplierByStatus = async () => {
  try {
    const suppliers = await Supplier.find({ status: req.params.status });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by CreatedAt
export const getSupplierByCreatedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      createdAt: { $gte: new Date(req.params.createdAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by UpdatedAt
export const getSupplierByUpdatedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      updatedAt: { $gte: new Date(req.params.updatedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by DeletedAt
export const getSupplierByDeletedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      deletedAt: { $gte: new Date(req.params.deletedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by EmailVerifiedAt
export const getSupplierByEmailVerifiedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      emailVerifiedAt: { $gte: new Date(req.params.emailVerifiedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by PhoneVerifiedAt
export const getSupplierByPhoneVerifiedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      phoneVerifiedAt: { $gte: new Date(req.params.phoneVerifiedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by AddressVerifiedAt
export const getSupplierByAddressVerifiedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      addressVerifiedAt: { $gte: new Date(req.params.addressVerifiedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by CategoryVerifiedAt
export const getSupplierByCategoryVerifiedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      categoryVerifiedAt: { $gte: new Date(req.params.categoryVerifiedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by TagsVerifiedAt
export const getSupplierByTagsVerifiedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      tagsVerifiedAt: { $gte: new Date(req.params.tagsVerifiedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by StatusVerifiedAt
export const getSupplierByStatusVerifiedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      statusVerifiedAt: { $gte: new Date(req.params.statusVerifiedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by CreatedAtVerifiedAt
export const getSupplierByCreatedAtVerifiedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      createdAtVerifiedAt: { $gte: new Date(req.params.createdAtVerifiedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by UpdatedAtVerifiedAt
export const getSupplierByUpdatedAtVerifiedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      updatedAtVerifiedAt: { $gte: new Date(req.params.updatedAtVerifiedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by DeletedAtVerifiedAt
export const getSupplierByDeletedAtVerifiedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      deletedAtVerifiedAt: { $gte: new Date(req.params.deletedAtVerifiedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};

// Get Supplier by EmailUnverifiedAt
export const getSupplierByEmailUnverifiedAt = async () => {
  try {
    const suppliers = await Supplier.find({
      emailUnverifiedAt: { $gte: new Date(req.params.emailUnverifiedAt) },
    });
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: error });
  }
};
