import axios from 'axios';
import { api } from './config';

const API_URL = api;

// Set the base URL for the Django backend
const API = axios.create({
  baseURL: api,
});

// Medicines API
export const fetchMedicines = async () => {
  const response = await API.get('/medicines/');
  const data = response.data;

  // Sort the medicines by date in descending order (newest first)
  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  return response;
};
export const createMedicine = (data) => API.post('/medicines/', data);
export const updateMedicine = (id, data) => API.put(`/medicines/${id}/`, data);
export const deleteMedicine = (id) => API.delete(`/medicines/${id}/`);

// Medicine Distribution API
export const fetchDistributions = async() => {
  const response = await API.get('/distributions/');
  const data = response.data;

  // Sort the medicines by date in descending order (newest first)
  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  return response;
};

export const createDistribution = (data) => API.post('/distributions/', data);
export const updateDistribution = (id, data) => API.put(`/distributions/${id}/`, data);

// Filtered Distributions API
export const filterDistributions = async (filters) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_URL}distributions/filtered_distributions/?${queryParams}`);
    return response;
  } catch (error) {
    console.error('Error fetching filtered distributions:', error);
    throw error;
  }
};

// Students API
export const fetchStudents = () => API.get('/students/');

// Search API for Students
export const searchStudents = (query) => API.get(`/students/search/?query=${query}`);

// Search API for Medicines
export const searchMedicines = (query) => API.get(`/medicines/search/?query=${query}`);
