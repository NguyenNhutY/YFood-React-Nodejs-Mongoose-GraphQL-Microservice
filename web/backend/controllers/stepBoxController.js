import { Request, Response } from "express";
import StepBoxModel from "../data/models/StepBoxModel";

// Lấy tất cả các hộp bước
export const getStepBoxes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stepBoxes = await StepBoxModel.find();
    res.status(200).json(stepBoxes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching step boxes", error });
  }
};

// Lấy hộp bước theo ID
export const getStepBoxById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stepBox = await StepBoxModel.findById(req.params.id);
    if (!stepBox) {
      return res.status(404).json({ message: "Step box not found" });
    }
    res.status(200).json(stepBox);
  } catch (error) {
    res.status(500).json({ message: "Error fetching step box", error });
  }
};

// Thêm hộp bước mới
export const createStepBox = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newStepBox = new StepBoxModel(req.body);
    await newStepBox.save();
    res.status(201).json(newStepBox);
  } catch (error) {
    res.status(500).json({ message: "Error creating step box", error });
  }
};

// Cập nhật hộp bước
export const updateStepBox = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedStepBox = await StepBoxModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStepBox) {
      return res.status(404).json({ message: "Step box not found" });
    }
    res.status(200).json(updatedStepBox);
  } catch (error) {
    res.status(500).json({ message: "Error updating step box", error });
  }
};

// Xóa hộp bước
export const deleteStepBox = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stepBox = await StepBoxModel.findByIdAndDelete(req.params.id);
    if (!stepBox) {
      return res.status(404).json({ message: "Step box not found" });
    }
    res.status(200).json({ message: "Step box deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting step box", error });
  }
};

// Lấy hộp bước theo trạng thái
export const getStepBoxByStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.query;
    const stepBoxes = await StepBoxModel.find({ status });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching step boxes by status", error });
  }
};

// Lấy hộp bước theo tiêu đề
export const getStepBoxByTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.query;
    const stepBoxes = await StepBoxModel.find({
      title: new RegExp(title as string, "i"),
    });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching step boxes by title", error });
  }
};

// Lấy hộp bước theo mô tả
export const getStepBoxByDescription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { description } = req.query;
    const stepBoxes = await StepBoxModel.find({
      description: new RegExp(description as string, "i"),
    });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching step boxes by description", error });
  }
};

// Tìm hộp bước theo từ khóa
export const searchStepBoxes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { keyword } = req.query;
    const stepBoxes = await StepBoxModel.find({
      $or: [
        { title: new RegExp(keyword as string, "i") },
        { description: new RegExp(keyword as string, "i") },
      ],
    });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res.status(500).json({ message: "Error searching step boxes", error });
  }
};

// Lọc hộp bước theo tiêu chí
export const filterStepBoxes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const filters = req.query; // Lọc theo các tiêu chí truyền qua query
    const stepBoxes = await StepBoxModel.find(filters);
    res.status(200).json(stepBoxes);
  } catch (error) {
    res.status(500).json({ message: "Error filtering step boxes", error });
  }
};

// Sắp xếp hộp bước
export const sortStepBoxes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { sortBy = "createdAt", order = "asc" } = req.query;
    const stepBoxes = await StepBoxModel.find().sort({
      [sortBy]: order === "asc" ? 1 : -1,
    });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res.status(500).json({ message: "Error sorting step boxes", error });
  }
};

// Lấy hộp bước theo ngày xuất bản
export const getStepBoxByPublishedDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date } = req.query;
    const stepBoxes = await StepBoxModel.find({
      publishedDate: new Date(date as string),
    });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching step boxes by published date", error });
  }
};

// Lấy hộp bước theo ngày cập nhật
export const getStepBoxByUpdatedDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date } = req.query;
    const stepBoxes = await StepBoxModel.find({
      updatedDate: new Date(date as string),
    });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching step boxes by updated date", error });
  }
};

// Lấy hộp bước theo tổng số bước
export const getStepBoxByTotalSteps = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { totalSteps } = req.query;
    const stepBoxes = await StepBoxModel.find({ totalSteps });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching step boxes by total steps", error });
  }
};

// Lấy hộp bước theo số bước đã hoàn thành
export const getStepBoxByCompletedSteps = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { completedSteps } = req.query;
    const stepBoxes = await StepBoxModel.find({ completedSteps });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching step boxes by completed steps", error });
  }
};

// Lấy hộp bước theo tỷ lệ hoàn thành
export const getStepBoxByPercentageCompleted = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { percentage } = req.query;
    const stepBoxes = await StepBoxModel.find({
      percentageCompleted: { $gte: Number(percentage) },
    });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching step boxes by percentage completed",
      error,
    });
  }
};

// Lấy hộp bước theo ngày hoàn thành cuối cùng
export const getStepBoxByLastCompletedDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date } = req.query;
    const stepBoxes = await StepBoxModel.find({
      lastCompletedDate: new Date(date as string),
    });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching step boxes by last completed date",
      error,
    });
  }
};

export const getStepBoxByNextStep = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nextStep } = req.query;
    // Kiểm tra kiểu dữ liệu và chuyển đổi nếu cần
    if (typeof nextStep !== "string") {
      res.status(400).json({ message: "Invalid 'nextStep' query parameter" });
      return;
    }
    const stepBoxes = await StepBoxModel.find({ nextStep });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching step boxes by next step", error });
  }
};

// Lấy hộp bước theo bước trước đó
export const getStepBoxByPreviousStep = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { previousStep } = req.query;
    // Kiểm tra kiểu dữ liệu và chuyển đổi nếu cần
    if (typeof previousStep !== "string") {
      res
        .status(400)
        .json({ message: "Invalid 'previousStep' query parameter" });
      return;
    }
    const stepBoxes = await StepBoxModel.find({ previousStep });
    res.status(200).json(stepBoxes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching step boxes by previous step", error });
  }
};
