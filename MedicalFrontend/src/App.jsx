import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import MedicineList from './components/MedicineList';
import MedicineDistributionList from './components/MedicineDistributionList';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul style={navStyles}>
            <li>
              <NavLink to="/" style={linkStyles} activeStyle={activeLinkStyles} end>
                Medicines
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/MedicineDistributionList"
                style={linkStyles}
                activeStyle={activeLinkStyles}
              >
                Students Distribution
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MedicineList />} />
          <Route path="/MedicineDistributionList" element={<MedicineDistributionList />} />
        </Routes>
      </div>
    </Router>
  );
};

/* Inline styles for better customization */
const navStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  listStyleType: 'none',
  padding: '10px',
  backgroundColor: '#f4f4f4',
  margin: 0,
};

const linkStyles = {
  textDecoration: 'none',
  color: '#333',
  fontSize: '18px',
};

const activeLinkStyles = {
  fontWeight: 'bold',
  color: '#007BFF',
};

export default App;
