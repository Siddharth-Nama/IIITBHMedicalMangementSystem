import React, { useState, useEffect } from 'react';
import { fetchStudents } from '../api';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetchStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div>
      <h1>Student List</h1>
      
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.roll_number}
            <p>hi</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
