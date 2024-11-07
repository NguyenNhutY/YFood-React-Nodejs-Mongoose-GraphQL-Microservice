import mongoose, { Decimal128 } from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    phone: { type: String, default: null },
    age: { type: Number, min: 18, default: null },
    salary: { type: Decimal128, default: 0 },
    hire_date: { type: Date, default: new Date() },
    avatar: { type: String, default: null },
    gender: { type: String, default: null },
    birth_date: {
      type: Date,
      default: null,
    },
    face_video: { type: String, default: null },
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    }, // Khóa ngoại để liên kết với Account
    name: { type: "String", required: "true", default: null },
  },
  { minimize: false }
);

const Employee = mongoose.model("Employee", employeeSchema);

const getEmployeeDetails = async (employeeId) => {
  try {
    const employee = await Employee.findById(employeeId).populate("account_id"); // Lấy dữ liệu từ Account

    console.log(employee);
    return employee;
  } catch (error) {
    console.error("Error fetching employee details:", error);
  }
};

export default Employee;
export { getEmployeeDetails };
