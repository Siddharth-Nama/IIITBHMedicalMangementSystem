import axios from 'axios';

// Set the base URL of your Django backend
const API = axios.create({
  baseURL: 'http://localhost:8000/api/', // Update this URL if needed
});

// API calls for CRUD operations on medicines
export const fetchMedicines = () => API.get('/medicines/');
export const createMedicine = (data) => API.post('/medicines/', data);
export const updateMedicine = (id, data) => API.put(`/medicines/${id}/`, data);
export const deleteMedicine = (id) => API.delete(`/medicines/${id}/`);

// API calls for CRUD operations on students
export const fetchStudents = () => API.get('/students/');
