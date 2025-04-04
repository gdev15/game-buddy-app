import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // optional if you separate styling

const Footer = () => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-item">
        <Link to="/Dashboard"><span role="img" aria-label="dashboard">🏠</span><p>Dashboard</p></Link>
      </div>
      <div className="footer-item">
        <Link to="/profile"><span role="img" aria-label="profile">👤</span><p>Profile</p></Link>
      </div>
      <div className="footer-item">
        <Link to="/friends"><span role="img" aria-label="friends">👥</span><p>Friends</p></Link>
      </div>
      <div className="footer-item">
        <Link to="/messages"><span role="img" aria-label="messages">💬</span><p>Messages</p></Link>
      </div>
      <div className="footer-item">
        <Link to="/lfg"><span role="img" aria-label="lfg">🎮</span><p>LFG</p></Link>
      </div>
    </footer>
  );
};

export default Footer;
