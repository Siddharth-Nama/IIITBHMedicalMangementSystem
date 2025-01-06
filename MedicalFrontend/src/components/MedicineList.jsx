import React, { useState, useEffect } from 'react';
import { fetchMedicines, createMedicine, updateMedicine } from '../api';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    rate_per_unit: '',
    total_units: '',
  });
  const [editMedicineId, setEditMedicineId] = useState(null); // ID of the medicine being edited

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

  // Populate the form for updating a medicine
  const handleEdit = (medicine) => {
    setEditMedicineId(medicine.id);
    setNewMedicine({
      name: medicine.name,
      rate_per_unit: medicine.rate_per_unit,
      total_units: medicine.total_units,
    });
  };

  // Update an existing medicine
  const handleUpdate = async () => {
    if (!editMedicineId) {
      alert('No medicine selected for update!');
      return;
    }
    try {
      await updateMedicine(editMedicineId, newMedicine);
      setNewMedicine({ name: '', rate_per_unit: '', total_units: '' });
      setEditMedicineId(null); // Reset edit mode
      loadMedicines();
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  return (
    <div>
      <h1>Medicine Management</h1>

      {/* Add or Update Medicine Form */}
      <h2>{editMedicineId ? 'Update Medicine' : 'Add New Medicine'}</h2>
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
        {editMedicineId ? (
          <button onClick={handleUpdate}>Update Medicine</button>
        ) : (
          <button onClick={handleCreate}>Add Medicine</button>
        )}
      </div>

      {/* Medicine List Table */}
      <h2>Medicine List</h2>
      <div className="table-responsive">
        <table className="border-collapse border border-slate-500 table-fixed table-bordered">
          <thead>
            <tr>
            <th className="text-center bg-blue-500 text-white">S. No.</th>
            <th className="text-center">Medicine Name</th>
              <th className="text-center">Rate per Unit</th>
              <th className="text-center">Total Units</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length > 0 ? (
              medicines.map((medicine, index) => (
                <tr key={medicine.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{medicine.name}</td>
                  <td className="text-center">{medicine.rate_per_unit}</td>
                  <td className="text-center">{medicine.total_units}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(medicine)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineList;
