// import axios from "axios";

// const API_URL = "https://formbuilder-2-dlmp.onrender.com/api/response"; // Backend URL

// // Get all responses
// export const getResponses = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching responses:", error);
//     throw error;
//   }
// };

// // Get responses by form ID
// export const getResponsesByFormId = async (formId) => {
//   try {
//     const response = await axios.get(`${API_URL}/${formId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching responses by form ID:", error);
//     throw error;
//   }
// };

// // Submit a response
// export const submitResponse = async (responseData) => {
//   try {
//     const response = await axios.post(API_URL, responseData);
//     return response.data;
//   } catch (error) {
//     console.error("Error submitting response:", error);
//     throw error;
//   }
// };

// // Delete a response
// export const deleteResponse = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/${id}`);
//     return { message: "Response deleted successfully" };
//   } catch (error) {
//     console.error("Error deleting response:", error);
//     throw error;
//   }
// };


import axios from 'axios';

const API_URL = 'https://formbuilder-2-dlmp.onrender.com/api/response';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Submit a new response
export const submitResponse = async (formId, responseData) => {
  try {
    const response = await api.post('/', {
      formId,
      responses: responseData
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting response:', error);
    throw error;
  }
};

// Get all responses
export const getResponses = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw error;
  }
};

// Get responses by form ID
export const getResponsesByFormId = async (formId) => {
  try {
    const response = await api.get(`/${formId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching responses for form ${formId}:`, error);
    throw error;
  }
};

// Delete a response by ID
export const deleteResponse = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting response ${id}:`, error);
    throw error;
  }
};