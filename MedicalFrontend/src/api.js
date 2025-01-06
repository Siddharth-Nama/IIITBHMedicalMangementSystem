import axios from 'axios';
import { api } from './config';

// Set the base URL for the Django backend
const API = axios.create({
  baseURL: api,
});

// Medicines API
export const fetchMedicines = () => API.get('/medicines/');
export const createMedicine = (data) => API.post('/medicines/', data);
export const updateMedicine = (id, data) => API.put(`/medicines/${id}/`, data);
export const deleteMedicine = (id) => API.delete(`/medicines/${id}/`);

// Medicine Distribution API
export const fetchDistributions = () => API.get('/distributions/');
export const createDistribution = (data) => API.post('/distributions/', data);
export const updateDistribution = (id, data) => API.put(`/distributions/${id}/`, data);

// Filtered Distributions API
export const filterDistributions = (filters) => {
  const { start_date, end_date, roll_number } = filters;
  const params = new URLSearchParams({ start_date, end_date });
  if (roll_number) params.append('roll_number', roll_number);

  return API.get(`/distributions/filtered_distributions/?${params.toString()}`);
};

// Students API
export const fetchStudents = () => API.get('/students/');
