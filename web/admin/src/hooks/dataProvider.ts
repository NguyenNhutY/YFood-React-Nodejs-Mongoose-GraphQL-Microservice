import axios from "axios";

// API base URL
const API_URL = "http://localhost:4000/api/foods";

// Custom data provider
const dataProvider = {
  getList: async (resource) => {
    const { data } = await axios.get(`${API_URL}/list`);
    return { data: data.data, total: data.data.length };
  },
  getOne: async (resource, params) => {
    const { data } = await axios.get(`${API_URL}/${resource}/${params._id}`);
    return { data: data.data };
  },
  create: async (resource, params) => {
    const { data } = await axios.post(
      `${API_URL}/${resource}/add`,
      params.data
    );
    return { data: data.data };
  },
  update: async (resource, params) => {
    const { data } = await axios.post(`${API_URL}/${resource}/update`, {
      id: params._id,
      ...params.data,
    });
    return { data: data.data };
  },
  deleteOne: async (resource) => {
    const { data } = await axios.post(`${API_URL}/${resource}/remove`, {
      id: params._id,
    });
    return { data: data.data };
  },
  // Implement other methods if needed
};

export default dataProvider;
