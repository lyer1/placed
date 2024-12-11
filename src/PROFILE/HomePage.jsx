import React from 'react';
import AppDrawer from './AppDrawer';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const style = {
    marginTop: 100,
    marginLeft: 30,
    color: 'white',
    fontSize: '20px',
    textAlign: 'left'
};
    
  return (
    
    <div>
      <h1 style={style}>Welcome to the Home Page</h1>

      {/* Add AppDrawer with custom menu items */}
      <AppDrawer>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      </AppDrawer>

      <p style={style}>Content of the page goes here.</p>
    </div>
  );
};

export default HomePage;
