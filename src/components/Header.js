import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Header.css'; // optional if you split styling

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className="dashboard-header">
        <img className="logo-img" src={logo} alt="logo" />
        <div className="logo">Gaming Buddy</div>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </header>

      {menuOpen && (
        <div className="menu-overlay">
          <div className="close-icon" onClick={toggleMenu}>✕</div>
          <ul className="menu-links">
            <li><Link to="/Dashboard" onClick={toggleMenu}>Dashboard</Link></li>
            <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
            <li><Link to="/friends" onClick={toggleMenu}>Friends</Link></li>
            <li><Link to="/messages" onClick={toggleMenu}>Messages</Link></li>
            <li><Link to="/lfg" onClick={toggleMenu}>LFG</Link></li>
            <li><Link to="/myposts" onClick={toggleMenu}>My Posts</Link></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
