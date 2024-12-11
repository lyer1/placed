import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './AppDrawer.css'; // Include your CSS for the drawer
import hamburgerIcon from './Hamburger_icon.png'; // Import your PNG file for the hamburger icon
import closeIcon from './Hamburger_icon.png'; // Import your PNG file for the close icon

const AppDrawer = () => {
  const [isOpen, setIsOpen] = useState(false); // State for drawer open/close

  const toggleDrawer = () => {
    setIsOpen(!isOpen); // Toggle the drawer state
  };

  return (
    <>
      {/* Conditionally render the toggle button based on isOpen state */}
      {!isOpen && (
        <button className="drawer-toggle" onClick={toggleDrawer}>
          <img src={hamburgerIcon} alt="Open Drawer" style={{ width: '24px', height: '24px' }} /> {/* Hamburger icon */}
        </button>
      )}

      <div className={`drawer ${isOpen ? 'open' : 'closed'}`}>
        <div className="drawer-content">
          <button className="drawer-close-btn" onClick={toggleDrawer}>
            <img src={closeIcon} alt="Close Drawer" style={{ width: '24px', height: '24px' }} /> {/* Close icon */}
          </button>
          <ul>
            <li><Link to="/" onClick={toggleDrawer} style={{ textDecoration: 'none' }}>Home</Link></li>
            <li><Link to="/ques" onClick={toggleDrawer} style={{ textDecoration: 'none' }}>Questions</Link></li>
            <li><Link to="/comp" onClick={toggleDrawer} style={{ textDecoration: 'none' }}>Companies</Link></li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </div>

      <div className={`drawer-overlay ${isOpen ? 'show' : ''}`} onClick={toggleDrawer}></div>
    </>
  );
};

export default AppDrawer;
