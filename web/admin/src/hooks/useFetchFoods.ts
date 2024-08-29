import axios from "axios";

const API_URL = "http://localhost:4000/api/food/list";

// Lấy danh sách Food
export const getFoodList = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch food list", error);
    throw error;
  }
};

// Tạo mới Food
export const createFood = async (foodData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, foodData);
    return response.data;
  } catch (error) {
    console.error("Failed to create food", error);
    throw error;
  }
};

// Xóa Food
export const deleteFood = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/remove/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete food", error);
    throw error;
  }
};

export const updateFood = async (foodData) => {
  try {
    const response = await axios.post(`${API_URL}/update`, foodData);
    return response.data;
  } catch (error) {
    console.error("Failed to update food", error);
    throw error;
  }
};
