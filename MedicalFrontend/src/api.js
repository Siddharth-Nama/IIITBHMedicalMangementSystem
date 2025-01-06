import axios from 'axios';
import { api } from './config';
// Set the base URL of your Django backend
const API = axios.create({
  baseURL: api,
});

// API calls for CRUD operations on medicines
export const fetchMedicines = () => API.get('/medicines/');
export const createMedicine = (data) => API.post('/medicines/', data);
export const updateMedicine = (id, data) => API.put(`/medicines/${id}/`, data);
export const deleteMedicine = (id) => API.delete(`/medicines/${id}/`);

// API calls for CRUD operations on medicinedistribution
export const fetchMedicineDistribution = () => API.get('/distributions/');
export const createMedicineDistribution = (data) => API.post('/distributions/', data);
export const updateMedicineDistribution = (id, data) => API.put(`/distributions/${id}/`, data);
export const deleteMedicineDistribution = (id) => API.delete(`/distributions/${id}/`);


// API calls for CRUD operations on students
export const fetchStudents = () => API.get('/students/');
