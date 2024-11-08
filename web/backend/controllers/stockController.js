import { Request, Response } from 'express';
import StockModel from '../data/models/StockModel.js';

// Define the Stock type based on your model schema


// Lấy tất cả các kho hàng
export const getStocks = async () => {
  try {
    const stocks = await StockModel.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks", error });
  }
};

// Lấy kho hàng theo ID
export const getStockById = async () => {
  try {
    const stock  = await StockModel.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock", error });
  }
};

// Thêm kho hàng mới
export const createStock = async () => {
  try {
    const newStock = new StockModel(req.body);
    await newStock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ message: "Error creating stock", error });
  }
};

// Cập nhật kho hàng
export const updateStock = async ()=> {
  try {
    const updatedStock= await StockModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: "Error updating stock", error });
  }
};

// Xóa kho hàng
export const deleteStock = async () => {
  try {
    const stock= await StockModel.findByIdAndDelete(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting stock", error });
  }
};

// Tìm kho hàng theo từ khóa
export const searchStock = async () => {
  try {
    const { keyword } = req.query ;
    const stocks = await StockModel.find({
      $or: [
        { title: new RegExp(keyword ?? '', "i") },
        { barcode: new RegExp(keyword ?? '', "i") }
      ]
    });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error searching stocks", error });
  }
};

// Lấy kho hàng theo danh mục
export const getStockByCategory = async () => {
  try {
    const { category } = req.query ;
    const stocks = await StockModel.find({ category });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks by category", error });
  }
};

// Lấy kho hàng theo địa điểm
export const getStockByLocation = async () => {
  try {
    const { location } = req.query ;
    const stocks = await StockModel.find({ location });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks by location", error });
  }
};

// Lấy kho hàng theo nhà cung cấp
export const getStockBySupplier = async () => {
  try {
    const { supplier } = req.query ;
    const stocks = await StockModel.find({ supplier });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks by supplier", error });
  }
};

// Lấy kho hàng còn ít
export const getLowStock = async () => {
  try {
    const stocks = await StockModel.find({ quantity: { $lt: 10 } });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching low stocks", error });
  }
};

// Lấy top bán chạy
export const getTopSelling = async () => {
  try {
    const stocks= await StockModel.find().sort({ sales: -1 }).limit(10);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top selling stocks", error });
  }
};

// Lấy sản phẩm bán chạy nhất
export const getBestSeller = async () => {
  try {
    const stock = await StockModel.find().sort({ sales: -1 }).limit(1);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Error fetching best seller", error });
  }
};

// Lấy kho hàng mới cập nhật
export const getRecentlyUpdated = async () => {
  try {
    const stocks = await StockModel.find().sort({ updatedAt: -1 }).limit(10);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recently updated stocks", error });
  }
};

// Lấy kho hàng theo ngày
export const getStockByDate = async () => {
  try {
    const { date } = req.query ;
    const stocks = await StockModel.find({ date: new Date(date ?? '') });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks by date", error });
  }
};

// Lấy kho hàng theo mã vạch
export const getStockByBarcode = async () => {
  try {
    const { barcode } = req.query  ;
    const stocks  = await StockModel.find({ barcode });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks by barcode", error });
  }
};

// Lấy kho hàng ít hàng theo ngày
export const getLowStockByDate = async () => {
  try {
    const { date } = req.query ;
    const stocks = await StockModel.find({
      quantity: { $lt: 10 },
      date: new Date(date ?? '')
    });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching low stocks by date", error });
  }
};

// Lấy top bán chạy theo ngày
export const getTopSellingByDate = async ()=> {
  try {
    const { date } = req.query ;
    const stocks = await StockModel.find({ date: new Date(date ?? '') })
      .sort({ sales: -1 })
      .limit(10);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top selling stocks by date", error });
  }
};

// Lấy sản phẩm bán chạy nhất theo ngày
export const getBestSellerByDate = async () => {
  try {
    const { date } = req.query ;
    const stock= await StockModel.find({ date: new Date(date ?? '') })
      .sort({ sales: -1 })
      .limit(1);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Error fetching best seller by date", error });
  }
};

export const getRecentlyUpdatedByDate = async ()  => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Date parameter is required" });
    }
    const stocks= await StockModel.find({ date: new Date(date) })
      .sort({ updatedAt: -1 })
      .limit(10);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recently updated stocks by date", error });
  }
};

// Lấy kho hàng theo danh mục và ngày
export const getStockByCategoryAndDate = async() => {
  try {
    const { category, date } = req.query;
    if (!category || !date) {
      return res.status(400).json({ message: "Category and date parameters are required" });
    }
    const stocks = await StockModel.find({
      category,
      date: new Date(date)
    });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks by category and date", error });
  }
};

// Lấy kho hàng theo địa điểm và ngày
export const getStockByLocationAndDate = async ()=> {
  try {
    const { location, date } = req.query;
    if (!location || !date) {
      return res.status(400).json({ message: "Location and date parameters are required" });
    }
    const stocks = await StockModel.find({
      location,
      date: new Date(date)
    });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks by location and date", error });
  }
};

// Lấy kho hàng theo nhà cung cấp và ngày
export const getStockBySupplierAndDate = async () => {
  try {
    const { supplier, date } = req.query;
    if (!supplier || !date) {
      return res.status(400).json({ message: "Supplier and date parameters are required" });
    }
    const stocks = await StockModel.find({
      supplier,
      date: new Date(date)
    });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks by supplier and date", error });
  }
};

// Lấy kho hàng ít hàng theo danh mục và ngày
export const getLowStockByCategoryAndDate = async () => {
  try {
    const { category, date } = req.query;
    if (!category || !date) {
      return res.status(400).json({ message: "Category and date parameters are required" });
    }
    const stocks = await StockModel.find({
      category,
      quantity: { $lt: 10 },
      date: new Date(date)
    });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching low stocks by category and date", error });
  }
};

// Lấy top bán chạy theo danh mục và ngày
export const getTopSellingByCategoryAndDate = async () => {
  try {
    const { category, date } = req.query;
    if (!category || !date) {
      return res.status(400).json({ message: "Category and date parameters are required" });
    }
    const stocks= await StockModel.find({
      category,
      date: new Date(date)
    })
      .sort({ sales: -1 })
      .limit(10);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top selling stocks by category and date", error });
  }
};

// Lấy sản phẩm bán chạy nhất theo danh mục và ngày
export const getBestSellerByCategoryAndDate = async () => {
  try {
    const { category, date } = req.query;
    if (!category || !date) {
      return res.status(400).json({ message: "Category and date parameters are required" });
    }
    const stock= await StockModel.find({
      category,
      date: new Date(date)
    })
      .sort({ sales: -1 })
      .limit(1);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: "Error fetching best seller by category and date", error });
  }
};

// Lấy kho hàng mới cập nhật theo danh mục và ngày
export const getRecentlyUpdatedByCategoryAndDate = async () => {
  try {
    const { category, date } = req.query;
    if (!category || !date) {
      return res.status(400).json({ message: "Category and date parameters are required" });
    }
    const stocks= await StockModel.find({
      category,
      date: new Date(date)
    })
      .sort({ updatedAt: -1 })
      .limit(10);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recently updated stocks by category and date", error });
  }
};

// Lấy kho hàng theo địa điểm và danh mục
export const getStockByLocationAndCategory = async () => {
  try {
    const { location, category } = req.query;
    if (!location || !category) {
      return res.status(400).json({ message: "Location and category parameters are required" });
    }
    const stocks = await StockModel.find({ location, category });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks by location and category", error });
  }
};

// Lấy kho hàng theo nhà cung cấp và danh mục
export const getStockBySupplierAndCategory = async ()=> {
  try {
    const { supplier, category } = req.query;
    if (!supplier || !category) {
      return res.status(400).json({ message: "Supplier and category parameters are required" });
    }
    const stocks = await StockModel.find({ supplier, category });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks by supplier and category", error });
  }
};

// Lấy kho hàng ít hàng theo địa điểm và ngày
export const getLowStockByLocationAndDate = async () => {
  try {
    const { location, date } = req.query;
    if (!location || !date) {
      return res.status(400).json({ message: "Location and date parameters are required" });
    }
    const stocks= await StockModel.find({
      location,
      quantity: { $lt: 10 },
      date: new Date(date)
    });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching low stocks by location and date", error });
  }
};