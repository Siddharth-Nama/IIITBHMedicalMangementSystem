import React, { useState, useEffect } from 'react';
import { fetchDistributions, filterDistributions } from '../api';
import './MedicineDistributionList.css';

const MedicineDistributionList = () => {
  const [distributions, setDistributions] = useState([]);
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    roll_number: '',
  });
  const [filteredResults, setFilteredResults] = useState([]);

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
