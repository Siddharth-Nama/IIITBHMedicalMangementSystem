import React, { useState, useEffect } from 'react';
import { fetchDistributions, filterDistributions, searchStudents, searchMedicines, createDistribution } from '../api';
import './MedicineDistributionList.css';

const MedicineDistributionList = () => {
  const [distributions, setDistributions] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    roll_number: '',
  });
  const [newEntry, setNewEntry] = useState({
    roll_number: '',
    medicine_name: '',
    quantity: '',
    date: '',
  });
  const [studentSuggestions, setStudentSuggestions] = useState([]);
  const [medicineSuggestions, setMedicineSuggestions] = useState([]);

  useEffect(() => {
    loadDistributions();
  }, []);

  const loadDistributions = async () => {
    try {
      const response = await fetchDistributions();
      setDistributions(response.data);
    } catch (error) {
      console.error('Error fetching distributions:', error);
    }
  };

  const handleFilter = async () => {
    const { start_date, end_date } = filters;
    if (!start_date || !end_date) {
      alert('Please select both start and end dates for filtering!');
      return;
    }
    try {
      const response = await filterDistributions(filters);
      setFilteredResults(response.data);
    } catch (error) {
      console.error('Error fetching filtered distributions:', error);
    }
  };

  const handleStudentInput = async (value) => {
    setNewEntry({ ...newEntry, roll_number: value });
    if (value) {
      try {
        const response = await searchStudents(value);
        setStudentSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching student suggestions:', error);
      }
    } else {
      setStudentSuggestions([]);
    }
  };

  const handleMedicineInput = async (value) => {
    setNewEntry({ ...newEntry, medicine_name: value });
    if (value) {
      try {
        const response = await searchMedicines(value);
        setMedicineSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching medicine suggestions:', error);
      }
    } else {
      setMedicineSuggestions([]);
    }
  };

  const handleSuggestionSelect = (field, value) => {
    setNewEntry({ ...newEntry, [field]: value });
    if (field === 'roll_number') setStudentSuggestions([]);
    if (field === 'medicine_name') setMedicineSuggestions([]);
  };

  const handleNewEntrySubmit = async () => {
    const { roll_number, medicine_name, quantity, date } = newEntry;

    if (!roll_number || !medicine_name || !quantity || !date) {
      alert('Please fill in all fields for the new entry.');
      return;
    }

    try {
      const response = await createDistribution(newEntry);
      alert('New distribution successfully added!');
      loadDistributions(); 
      setNewEntry({ roll_number: '', medicine_name: '', quantity: '', date: '' }); // Reset the form
    } catch (error) {
      console.error('Error adding new distribution:', error);
    }
  };

  return (
    <div className="distribution-container">
      <h1>Medicine Distribution Management</h1>

      {/* Filter Form */}
      <h2>Filter Distributions</h2>
      <div className="form-container">
        <input
          type="date"
          value={filters.start_date}
          onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
        />
        <input
          type="date"
          value={filters.end_date}
          onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter Roll Number (optional)"
          value={filters.roll_number}
          onChange={(e) => setFilters({ ...filters, roll_number: e.target.value })}
        />
        <button className="btn btn-filter" onClick={handleFilter}>Filter</button>
      </div>

      {/* Filtered Results */}
      <h2>Filtered Results</h2>
      {filteredResults.length > 0 ? (
        <table className="distribution-table">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result, index) => (
              <tr key={result.student_roll_number}>
                <td>{index + 1}</td>
                <td>{result.student_name}</td>
                <td>{result.student_roll_number}</td>
                <td>{result.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found for the selected filter.</p>
      )}

      {/* New Entry Form */}
      <h2>Add New Distribution</h2>
      <div className="form-container">
          <input
            type="text"
            placeholder="Enter Student Roll Number"
            value={newEntry.roll_number}
            onChange={(e) => handleStudentInput(e.target.value)}
          />
          {studentSuggestions.length > 0 && (
            <ul className="suggestions">
              {studentSuggestions.map((student) => (
                <li
                  key={student.id}
                  onClick={() => handleSuggestionSelect('roll_number', student.roll_number)}
                >
                  {student.name} (Roll: {student.roll_number})
                </li>
              ))}
            </ul>
          )}

          <input
            type="text"
            placeholder="Enter Medicine Name"
            value={newEntry.medicine_name}
            onChange={(e) => handleMedicineInput(e.target.value)}
          />
          {medicineSuggestions.length > 0 && (
            <ul className="suggestions">
              {medicineSuggestions.map((medicine) => (
                <li
                  key={medicine.id}
                  onClick={() => handleSuggestionSelect('medicine_name', medicine.name)}
                >
                  {medicine.name} (Rate: {medicine.rate_per_unit})
                </li>
              ))}
            </ul>
          )}

        <input
          type="number"
          placeholder="Quantity"
          value={newEntry.quantity}
          onChange={(e) => setNewEntry({ ...newEntry, quantity: e.target.value })}
        />
        <input
          type="date"
          value={newEntry.date}
          onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
        />
        <button className="btn btn-add" onClick={handleNewEntrySubmit}>
          Add Distribution
        </button>
      </div>

      {/* Distribution List */}
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No distributions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineDistributionList;
