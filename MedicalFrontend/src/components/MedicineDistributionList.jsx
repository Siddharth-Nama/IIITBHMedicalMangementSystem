import React, { useState, useEffect } from 'react';
import { fetchDistributions, createDistribution, updateDistribution } from '../api';
import './MedicineDistributionList.css';

const MedicineDistributionList = () => {
  const [distributions, setDistributions] = useState([]);
  const [students, setStudents] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [newDistribution, setNewDistribution] = useState({
    student_id: '',
    medicine_id: '',
    quantity: '',
  });
  const [editDistributionId, setEditDistributionId] = useState(null);

  useEffect(() => {
    loadDistributions();
    loadStudents();
    loadMedicines();
  }, []);

  const loadDistributions = async () => {
    try {
      const response = await fetchDistributions();
      setDistributions(response.data);
    } catch (error) {
      console.error('Error fetching distributions:', error);
    }
  };

  const loadStudents = async () => {
    try {
      const response = await fetch('/api/students');
      setStudents(response.data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const loadMedicines = async () => {
    try {
      const response = await fetch('/api/medicines');
      setMedicines(response.data || []);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

const handleCreate = async () => {
  try {
    await createDistribution(newDistribution);
    setNewDistribution({ student_id: '', medicine_id: '', quantity: '' });
    loadDistributions();
  } catch (error) {
    console.error('Error creating distribution:', error);
  }
};

  const handleEdit = (distribution) => {
    setEditDistributionId(distribution.id);
    setNewDistribution({
      student_id: distribution.student_id,
      medicine_id: distribution.medicine_id,
      quantity: distribution.quantity,
    });
  };

  const handleUpdate = async () => {
    if (!editDistributionId) {
      alert('No distribution selected for update!');
      return;
    }
    try {
      await updateDistribution(editDistributionId, newDistribution);
      setNewDistribution({ student_id: '', medicine_id: '', quantity: '' });
      setEditDistributionId(null);
      loadDistributions();
    } catch (error) {
      console.error('Error updating distribution:', error);
    }
  };

  return (
    <div className="distribution-container">
      <h1>Medicine Distribution Management</h1>

      {/* Add or Update Distribution Form */}
      <h2>{editDistributionId ? 'Update Distribution' : 'Add New Distribution'}</h2>
      <div className="form-container">
        <select
          value={newDistribution.student_id}
          onChange={(e) =>
            setNewDistribution({ ...newDistribution, student_id: e.target.value })
          }
        >
          <option value="">Select Student</option>
          {students.length > 0 ? (
            students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))
          ) : (
            <option>No students available</option>
          )}
        </select>
        <select
          value={newDistribution.medicine_id}
          onChange={(e) =>
            setNewDistribution({ ...newDistribution, medicine_id: e.target.value })
          }
        >
          <option value="">Select Medicine</option>
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <option key={medicine.id} value={medicine.id}>
                {medicine.name}
              </option>
            ))
          ) : (
            <option>No medicines available</option>
          )}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={newDistribution.quantity}
          onChange={(e) =>
            setNewDistribution({ ...newDistribution, quantity: e.target.value })
          }
        />
        {editDistributionId ? (
          <button className="btn btn-update" onClick={handleUpdate}>Update Distribution</button>
        ) : (
          <button className="btn btn-create" onClick={handleCreate}>Add Distribution</button>
        )}
      </div>

      {/* Distributions List */}
      <h2>Distribution List</h2>
      <table className="distribution-table">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Student Name</th>
            <th>Roll Number</th>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {distributions.length > 0 ? (
            distributions.map((dist, index) => (
              <tr key={dist.id}>
                <td>{index + 1}</td>
                <td>{dist.student_name}</td>
                <td>{dist.student_roll_number}</td>
                <td>{dist.medicine_name}</td>
                <td>{dist.quantity}</td>
                <td>{dist.total_amount}</td>
                <td>{dist.date}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEdit(dist)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No distributions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineDistributionList;
