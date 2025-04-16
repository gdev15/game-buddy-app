import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Header.css'; // optional if you split styling
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate('/signin');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

  return (
    <>
      <header className="dashboard-header">
        <Link to="/Dashboard">
          <img className="logo-img" src={logo} alt="logo" />
        </Link>
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
            {/* <li><Link to="/friends" onClick={toggleMenu}>Friends</Link></li> */}
            {/* <li><Link to="/chat/:receiverId" onClick={toggleMenu}>Messages</Link></li> */}
            <li><Link to="/lfg" onClick={toggleMenu}>LFG</Link></li>
            <li><Link to="/myposts" onClick={toggleMenu}>My Posts</Link></li>
            <li><Link to="/messages" onClick={toggleMenu}>Conversations</Link></li>
            <li> <button className="logout-button" onClick={handleLogout}>Logout</button></li>
            
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
