import { Request, Response } from "express";
import JobModel from "../data/models/JobModel"; // Đảm bảo đường dẫn đến model là chính xác

// Tạo công việc mới
export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const newJob = new JobModel(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};

// Lấy tất cả các công việc
export const getAllJobs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const jobs = await JobModel.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

// Lấy công việc theo ID
export const getJobById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};

// Cập nhật công việc
export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedJob = await JobModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
};

// Xóa công việc
export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedJob = await JobModel.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};

// Tìm kiếm công việc
export const searchJobs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query = req.query.query as string;
    const jobs = await JobModel.find({ title: new RegExp(query, "i") });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error searching jobs", error });
  }
};

// Lấy công việc theo vị trí
export const getJobsByLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const location = req.params.location;
    const jobs = await JobModel.find({ location });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs by location", error });
  }
};

// Lấy công việc theo kinh nghiệm
export const getJobsByExperience = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const minExperience = parseInt(req.params.minExperience);
    const maxExperience = parseInt(req.params.maxExperience);
    const jobs = await JobModel.find({
      experienceRequired: { $gte: minExperience, $lte: maxExperience },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs by experience", error });
  }
};

// Lấy công việc theo trình độ học vấn
export const getJobsByDegree = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const degree = req.params.degree;
    const jobs = await JobModel.find({ degreeRequired: degree });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs by degree", error });
  }
};

// Lấy công việc theo kỹ năng
export const getJobsBySkills = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const skills = (req.query.skills as string).split(",");
    const jobs = await JobModel.find({ skills: { $in: skills } });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs by skills", error });
  }
};

// Phân trang công việc
export const paginateJobs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const jobs = await JobModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error paginating jobs", error });
  }
};

// Sắp xếp công việc
export const sortJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const order = (req.query.order as string) || "asc";
    const jobs = await JobModel.find().sort({
      [sortBy]: order === "asc" ? 1 : -1,
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error sorting jobs", error });
  }
};

// Lấy công việc theo ngày tạo
export const getJobsByCreatedAt = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);
    const jobs = await JobModel.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs by created date", error });
  }
};

// Lấy công việc theo ngày cập nhật
export const getJobsByUpdatedAt = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);
    const jobs = await JobModel.find({
      updatedAt: { $gte: startDate, $lte: endDate },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs by updated date", error });
  }
};

// Lấy công việc theo trạng thái
export const getJobsByStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const status = req.params.status;
    const jobs = await JobModel.find({ status });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs by status", error });
  }
};
