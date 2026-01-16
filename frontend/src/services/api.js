import axios from "axios";

// Replace with your backend URL
const API_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Add a new task
export const addTask = async (task) => {
  try {
    const response = await axiosInstance.post("/tasks", { title: task });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Delete task by id
export const deleteTask = async (id) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default axiosInstance;
