import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MedicineList from './components/MedicineList';
import StudentList from './components/StudentList';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Medicines</a>
            </li>
            <li>
              <a href="/students">Students</a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<MedicineList />} />
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
