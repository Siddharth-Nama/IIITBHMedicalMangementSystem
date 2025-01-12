import React, { useState, useEffect } from "react";
import {
  fetchDistributions,
  filterDistributions,
  searchStudents,
  searchMedicines,
  createDistribution,
  fetchStudents,
  fetchMedicines,
} from "../api";
import "./MedicineDistributionList.css";

const MedicineDistributionList = () => {
  const [distributions, setDistributions] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    roll_number: "",
  });
  const [newEntry, setNewEntry] = useState({
    roll_number: "",
    medicine_name: "",
    quantity: "",
    total_amount: "",
    date: "",
  });

  const [studentSuggestions, setStudentSuggestions] = useState([]);
  const [medicineSuggestions, setMedicineSuggestions] = useState([]);
  const [searchRollNumber, setSearchRollNumber] = useState("");

  useEffect(() => {
    loadDistributions();
  }, []);

  const loadDistributions = async () => {
    try {
      const response = await fetchDistributions();
      setDistributions(response.data);
    } catch (error) {
      console.error("Error fetching distributions:", error);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await filterDistributions(filters);
      setFilteredResults(response.data);
    } catch (error) {
      console.error("Error fetching filtered distributions:", error);
    }
  };

  const handleStudentInput = async (value) => {
    setNewEntry({ ...newEntry, roll_number: value });
    if (value) {
      try {
        const response = await searchStudents(value);
        setStudentSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching student suggestions:", error);
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
        console.error("Error fetching medicine suggestions:", error);
      }
    } else {
      setMedicineSuggestions([]);
    }
  };

  const handleSuggestionSelect = (field, value) => {
    setNewEntry({ ...newEntry, [field]: value });
    setMedicineSuggestions([]);
  };

  const handleStudentSuggestionSelect = (student) => {
    setNewEntry({ ...newEntry, roll_number: student.roll_number });
    setStudentSuggestions([]);
  };

  const handleNewEntrySubmit = async () => {
    const { roll_number, medicine_name, quantity, date } = newEntry;
    console.log("------------> ", newEntry);
    // Validate inputs
    if (!roll_number || !medicine_name || !quantity || !date) {
      alert("Please fill in all fields for the new entry.");
      return;
    }

    // Ensure quantity is a positive number
    if (quantity <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    try {
      // Fetch students and medicines
    const studentsResponse = await fetchStudents();
    const medicinesResponse = await fetchMedicines();

    // Extract the data array
    const students = studentsResponse.data;
    const medicines = medicinesResponse.data;

    // Debugging: Check what students and medicines contain
    console.log("Fetched students-----------------:", students);
    console.log("Fetched medicines------------:", medicines);

      // Find the student and medicine based on the provided identifiers
      const student1 = students.find(
        (student) => student.roll_number === roll_number
      );
      const medicine1 = medicines.find((med) => med.name === medicine_name);

      // Ensure student and medicine are found
      if (!student1 || !medicine1) {
        alert("Student or medicine not found!");
        return;
      }

      // Extract student_id and medicine_id
      const student = student1.id;
      const medicine = medicine1.id;

      // Prepare the newData object
      const newData = {
        student,
        medicine,
        quantity,
        total_amount: quantity * 10, // Replace 10 with the actual rate calculation logic
        date,
      };
      console.log('----------------NewData-----------------', newData);
      // Submit the new entry
      await createDistribution(newData);

      alert("New distribution successfully added!");

      // Reload distributions and reset form
      loadDistributions();
      setNewEntry({
        roll_number: "",
        medicine_name: "",
        quantity: "",
        total_amount: "",
        date: "",
      });

      // Clear suggestions
      setStudentSuggestions([]);
      setMedicineSuggestions([]);
    } catch (error) {
      console.error("Error adding new distribution:", error);
      alert(
        "An error occurred while adding the distribution. Please try again."
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchRollNumber(e.target.value);
  };
  
  // const studentsResponse =  fetchStudents();
  // const medicinesResponse =  fetchMedicines();

  //   // Extract the data array
    console.log('-------------------dist-----------------', distributions);
  // const students = studentsResponse.data;
  // const medicines = medicinesResponse.data;
  // const student = students.find((student) => student.id === distributions.student);
  // const medicine = medicines.find((medicine) => medicine.id === distributions.medicine);
  // const filteredDistributions = distributions.filter((dist) =>
  //   dist.student1_roll_number && dist.student1_roll_number.includes(searchRollNumber)
  // );

  const [students, setStudents] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Fetch distributions, students, and medicines
      const distributionsResponse = await fetchDistributions();
      const studentsResponse = await fetchStudents();
      const medicinesResponse = await fetchMedicines();

      setDistributions(distributionsResponse.data);
      setStudents(studentsResponse.data);
      setMedicines(medicinesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Helper function to get student name by student id
  const getStudentNameById = (studentId) => {
    const student = students.find((stu) => stu.id === studentId);
    console.log('-------------------student-----------------', student);
    return student ? student.name : "Unknown";
  };

  // Helper function to get medicine name by medicine id
  const getMedicineNameById = (medicineId) => {
    const medicine = medicines.find((med) => med.id === medicineId);
    return medicine ? medicine.name : "Unknown";
  };

  // Helper function to get student roll number by student id
  const getStudentRollNumberById = (studentId) => {
    const student = students.find((stu) => stu.id === studentId);
    console.log('-------------------student-----------------', student);
    return student ? student.roll_number : "Unknown";
  };

  return (
    <div className="distribution-container">
      <h1>Medicine Distribution Management</h1>

      {/* Filter Form */}
      <h2>Filter Distributions</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={filters.roll_number}
          onChange={(e) =>
            setFilters({ ...filters, roll_number: e.target.value })
          }
        />

        <input
          type="date"
          value={filters.start_date}
          onChange={(e) =>
            setFilters({ ...filters, start_date: e.target.value })
          }
        />
        <input
          type="date"
          value={filters.end_date}
          onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
        />
        <button className="btn btn-filter" onClick={handleFilter}>
          Filter
        </button>
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
          <ul className="medicine-suggestions">
            {studentSuggestions.map((student) => (
              <li
                key={student.roll_number}
                onClick={() => handleStudentSuggestionSelect(student)}
              >
                {student.name} ({student.roll_number})
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
          <ul className="medicine-suggestions">
            {medicineSuggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() =>
                  handleSuggestionSelect("medicine_name", suggestion.name)
                }
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
        <input
          type="number"
          placeholder="Quantity"
          value={newEntry.quantity}
          onChange={(e) =>
            setNewEntry({
              ...newEntry,
              quantity: e.target.value,
              total_amount: e.target.value * 10, // Replace 10 with the actual rate logic
            })
          }
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

      {/* Search Roll Number */}
      <h2>Search in List</h2>
      <input
        type="text"
        placeholder="Search by Roll Number"
        value={searchRollNumber}
        onChange={handleSearchChange}
      />
      <input
        type="text"
        placeholder="Search by date"
        value={searchDate}
        onChange={handleSearchChange}
      />

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
                <td>{getStudentNameById(dist.student)}</td>
                <td>{getStudentRollNumberById(dist.student)}</td> {/* Replace with actual roll number */}
                <td>{getMedicineNameById(dist.medicine)}</td>
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
