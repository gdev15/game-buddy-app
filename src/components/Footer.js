import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

import profile_icon from '../assets/images/profile_icon.png';
import lfg_bottom_icon from '../assets/images/lfg_bottom_icon.png';
import message_bottom_icon from '../assets/images/message_bottom_icon.png';
import home_icon from '../assets/images/home_icon.png';
import lfg_image from '../assets/images/lfg_image.png';

const Footer = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <footer className="dashboard-footer">
      <div className={`footer-item ${isActive('/dashboard') ? 'active' : ''}`}>
        <Link to="/dashboard">
          <img className="home-icon" src={home_icon} alt="icon" />
          <p>Home</p>
        </Link>
      </div>

      <div className={`footer-item ${isActive('/lfg') ? 'active' : ''}`}>
        <Link to="/lfg">
          <img className="lfg-bottom-icon" src={lfg_bottom_icon} alt="icon" />
          <p>LFG</p>
        </Link>
      </div>

      <div className={`footer-item ${isActive('/myposts') ? 'active' : ''}`}>
        <Link to="/myposts">
          <img className="lfg-post-icon" src={lfg_image} alt="icon" />
          <p>My Post</p>
        </Link>
      </div>

      <div className={`footer-item ${isActive('/messages') ? 'active' : ''}`}>
        <Link to="/messages">
          <img className="message-bottom-icon" src={message_bottom_icon} alt="icon" />
          <p>Messages</p>
        </Link>
      </div>

      <div className={`footer-item ${isActive('/profile') ? 'active' : ''}`}>
        <Link to="/profile">
          <img className="icon-profile" src={profile_icon} alt="icon" />
          <p>Profile</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
