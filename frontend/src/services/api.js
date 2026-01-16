import axios from "axios";

// Backend URL from server.js configuration
const API_URL = "http://localhost:5001/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTHENTICATION
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (err) {
    throw err.response?.data || { msg: "Login failed" };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (err) {
    throw err.response?.data || { msg: "Registration failed" };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// TASKS
export const getTasks = async () => {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};

export const addTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/tasks", taskData);
    return response.data;
  } catch (err) {
    console.error("Error adding task:", err);
    throw err;
  }
};

export const updateTask = async (id, updates) => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, updates);
    return response.data;
  } catch (err) {
    console.error("Error updating task:", err);
    throw err;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error deleting task:", err);
    throw err;
  }
};

export default axiosInstance;
