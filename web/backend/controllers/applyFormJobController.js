import ApplyFormJobModel from "../data/models/applyFormModel";

// Tạo đơn ứng tuyển công việc mới
export const createApplyFormJob = async (req, res) => {
  try {
    const newApplyFormJob = new ApplyFormJobModel(req.body);
    await newApplyFormJob.save();
    res.status(201).json(newApplyFormJob);
  } catch (error) {
    res.status(500).json({ message: "Error creating apply form job", error });
  }
};

// Lấy tất cả các đơn ứng tuyển công việc
export const getAllApplyFormJobs = async (req, res) => {
  try {
    const applyFormJobs = await ApplyFormJobModel.find( );
    res.status(200).json(applyFormJobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching apply form jobs", error });
  }
};

// Lấy đơn ứng tuyển công việc theo ID
export const getApplyFormJobById = async (req, res) => {
  try {
    const applyFormJob = await ApplyFormJobModel.findById(req.params.id);
    if (!applyFormJob) {
      return res.status(404).json({ message: "Apply form job not found" });
    }
    res.status(200).json(applyFormJob);
  } catch (error) {
    res.status(500).json({ message: "Error fetching apply form job", error });
  }
};

// Cập nhật đơn ứng tuyển công việc
export const updateApplyFormJob = async (req, res) => {
  try {
    const updatedApplyFormJob = await ApplyFormJobModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedApplyFormJob) {
      return res.status(404).json({ message: "Apply form job not found" });
    }
    res.status(200).json(updatedApplyFormJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating apply form job", error });
  }
};

// Xóa đơn ứng tuyển công việc
export const deleteApplyFormJob = async (req, res) => {
  try {
    const deletedApplyFormJob = await ApplyFormJobModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedApplyFormJob) {
      return res.status(404).json({ message: "Apply form job not found" });
    }
    res.status(200).json({ message: "Apply form job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting apply form job", error });
  }
};

// Lấy số lượng đơn ứng tuyển công việc theo User ID
export const getApplyFormJobCountByUserId = async (req, res) => {
  try {
    const count = await ApplyFormJobModel.countDocuments({
      userId: req.params.userId,
    });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error counting apply form jobs", error });
  }
};

// Lấy các đơn ứng tuyển công việc theo tiêu đề công việc
export const getApplyFormJobsByJobTitle = async (req, res) => {
  try {
    const jobs = await ApplyFormJobModel.find({
      jobTitle: req.params.jobTitle,
    });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching apply form jobs by job title", error });
  }
};

// Lấy các đơn ứng tuyển công việc theo địa điểm
export const getApplyFormJobsByLocation = async (req, res) => {
  try {
    const jobs = await ApplyFormJobModel.find({
      location: req.params.location,
    });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching apply form jobs by location", error });
  }
};

// Lấy các đơn ứng tuyển công việc theo khoảng lương
export const getApplyFormJobsBySalaryRange = async (req, res) => {
  try {
    const jobs = await ApplyFormJobModel.find({
      salary: { $gte: req.params.minSalary, $lte: req.params.maxSalary },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching apply form jobs by salary range",
        error,
      });
  }
};

// Lấy các đơn ứng tuyển công việc theo ngày đăng
export const getApplyFormJobsByDatePosted = async (req, res) => {
  try {
    const jobs = await ApplyFormJobModel.find({
      datePosted: {
        $gte: new Date(req.params.startDate),
        $lte: new Date(req.params.endDate),
      },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching apply form jobs by date posted",
        error,
      });
  }
};

// Lấy các đơn ứng tuyển công việc theo trạng thái
export const getApplyFormJobsByStatus = async (req, res) => {
  try {
    const jobs = await ApplyFormJobModel.find({ status: req.params.status });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching apply form jobs by status", error });
  }
};
