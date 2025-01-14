import React, { useState, useEffect } from 'react';
import { fetchMedicines, createMedicine, updateMedicine } from '../api';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);
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

  useEffect(() => {
    // Filter medicines based on search query
    const filtered = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMedicines(filtered);
  }, [searchQuery, medicines]);

  const loadMedicines = async () => {
    try {
      const response = await fetchMedicines();
      setMedicines(response.data);
      setFilteredMedicines(response.data);
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
      date:medicine.date,
    });
  };

  // Update an existing medicine
  const handleUpdate = async () => {
    if (!editMedicineId) {
      alert("No medicine selected for update!");
      return;
    }
  
    // Get the current date in "YYYY-MM-DD" format
    const today = new Date().toISOString().split("T")[0];
    console.log('---------today---------',today);
    try {
      await updateMedicine(editMedicineId, { ...newMedicine, date: today });
      setNewMedicine({ name: "", rate_per_unit: "", total_units: "", date: "" });
      setEditMedicineId(null); // Reset edit mode
      loadMedicines(); // Reload medicines without refreshing the page
    } catch (error) {
      console.error("Error updating medicine:", error);
      alert("Failed to update medicine. Please try again.");
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
<br /><br />
      {/* Search Field */}
      <div>
        <input
          type="text"
          placeholder="Search by Medicine Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Medicine List Table */}
      <h2>Medicine List</h2>
      <div className="table-responsive">
        <table className="table-fixed border-collapse w-full">
          <thead>
            <tr className="bg-blue-200 text-white">
              <th className="text-center border-2 border-black p-2">S. No.</th>
              <th className="text-center border-2 border-black p-2">Medicine Name</th>
              <th className="text-center border-2 border-black p-2">Rate per Unit</th>
              <th className="text-center border-2 border-black p-2">Total Units</th>
              <th className="text-center border-2 border-black p-2">Last Updated</th>
              <th className="text-center border-2 border-black p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine, index) => (
                <tr key={medicine.id}>
                  <td className="text-center border-2 border-black p-2">{index + 1}</td>
                  <td className="text-center border-2 border-black p-2">{medicine.name}</td>
                  <td className="text-center border-2 border-black p-2">{medicine.rate_per_unit}</td>
                  <td className="text-center border-2 border-black p-2">{medicine.total_units}</td>
                  <td className="text-center border-2 border-black p-2">{medicine.date}</td>
                  <td className="text-center border-2 border-black p-2">
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
                <td colSpan="5" className="text-center border-2 border-black p-2">
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
