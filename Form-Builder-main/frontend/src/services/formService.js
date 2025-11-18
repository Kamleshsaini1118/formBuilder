// import axios from "axios";

// const API_URL = "https://formbuilder-2-dlmp.onrender.com/api/forms"; // Backend URL

// // Get all forms
// export const getForms = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching forms:", error);
//     throw error;
//   }
// };

// // Get a single form by ID
// export const getFormById = async (id) => {
//   try {
//     const response = await axios.get(`${API_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching form:", error);
//     throw error;
//   }
// };

// // Create a new form
// export const createForm = async (formData) => {
//   try {
//     const response = await axios.post(API_URL, formData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating form:", error);
//     throw error;
//   }
// };

// // Update an existing form
// export const updateForm = async (id, formData) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, formData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating form:", error);
//     throw error;
//   }
// };

// // Delete a form
// export const deleteForm = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/${id}`);
//     return { message: "Form deleted successfully" };
//   } catch (error) {
//     console.error("Error deleting form:", error);
//     throw error;
//   }
// };

import axios from 'axios';

const API_URL = 'https://formbuilder-2-dlmp.onrender.com/api/forms';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Get all forms
export const getForms = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

// Get single form by ID
export const getFormById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching form ${id}:`, error);
    throw error;
  }
};

// Create new form
export const createForm = async (formData) => {
  try {
    const response = await api.post('/', formData);
    return response.data;
  } catch (error) {
    console.error('Error creating form:', error);
    throw error;
  }
};

// Update form
export const updateForm = async (id, formData) => {
  try {
    const response = await api.put(`/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error(`Error updating form ${id}:`, error);
    throw error;
  }
};

// Delete form
export const deleteForm = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting form ${id}:`, error);
    throw error;
  }
};