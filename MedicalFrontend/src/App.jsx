import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import MedicineList from './components/MedicineList';
import MedicineDistributionList from './components/MedicineDistributionList';
const App = () => {
  return (
    <Router>
      <div style={mainContentStyles}>
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
            <li>
              <a style={linkStyles} href="http://127.0.0.1:8000/admin/">Admin</a>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MedicineList />} />
          <Route path="/MedicineDistributionList" element={<MedicineDistributionList />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer style={footerStyles}>
        <p>
          Made by{' '}
          <a
            href="https://www.linkedin.com/in/siddharth-nama/"
            target="_blank"
            rel="noopener noreferrer"
            style={footerLinkStyles}
          >
            Siddharth Nama
          </a>
        </p>
      </footer>
    </Router>
  );
};

/* Inline styles for better customization */
const mainContentStyles = {
  minHeight: '100vh', // Ensure the content takes at least the full height of the viewport
  paddingBottom: '50px', // Add enough space to accommodate the footer at the bottom
};

const navStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  listStyleType: 'none',
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

const footerStyles = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  textAlign: 'center',
  backgroundColor: '#f4f4f4',
  fontSize: '16px',
  zIndex: '10',
};

const footerLinkStyles = {
  color: '#007BFF',
  textDecoration: 'none',
};

export default App;
