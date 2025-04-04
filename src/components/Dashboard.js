import React, { useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
       <div className="dashboard">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="dashboard-content">
        <section>
          <h2>Welcome to Gaming Buddy!</h2>
          <p>Find players and join games easily.</p>
        </section>
  
        <section className="dashboard-cards">
          <div className="card">
            <h3>Active Players</h3>
            <p>Currently online: 32</p>
          </div>
          <div className="card">
            <h3>Open LFG Posts</h3>
            <p>Available teams: 5</p>
          </div>
          <div className="card">
            <h3>Messages</h3>
            <p>New messages: 2</p>
          </div>
        </section>
      </main>

        {/* Footer Navigation */}
      <Footer />
      </div>
    
    </>

   
  );
};

export default Dashboard;