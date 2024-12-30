import React, { useState, useEffect } from 'react';
import { fetchMedicines, createMedicine, updateMedicine, deleteMedicine } from '../api';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    rate_per_unit: '',
    total_units: '',
  });

  // Fetch medicines from backend when component mounts
  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const response = await fetchMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  // Create a new medicine
  const handleCreate = async () => {
    try {
      await createMedicine(newMedicine);
      setNewMedicine({ name: '', rate_per_unit: '', total_units: '' });
      loadMedicines();
    } catch (error) {
      console.error('Error creating medicine:', error);
    }
  };

  // Update an existing medicine
  const handleUpdate = async (id, updatedMedicine) => {
    try {
      await updateMedicine(id, updatedMedicine);
      loadMedicines();
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  // Delete a medicine
  const handleDelete = async (id) => {
    try {
      await deleteMedicine(id);
      loadMedicines();
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  return (
    <div>
      <h1>Medicine Management</h1>

      {/* Add New Medicine Form */}
      <div>
        <input
          type="text"
          placeholder="Medicine Name"
          value={newMedicine.name}
          onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rate per Unit"
          value={newMedicine.rate_per_unit}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, rate_per_unit: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Total Units"
          value={newMedicine.total_units}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, total_units: e.target.value })
          }
        />
        <button onClick={handleCreate}>Add Medicine</button>
      </div>

      {/* Display Medicine List */}
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine.id}>
            <div>
              <span>{medicine.name}</span> -{' '}
              <span>{medicine.rate_per_unit}</span> -{' '}
              <span>{medicine.total_units}</span>
            </div>
            <button onClick={() => handleUpdate(medicine.id, { name: 'Updated Name' })}>
              Edit
            </button>
            <button onClick={() => handleDelete(medicine.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
