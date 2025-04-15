import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { auth } from '../firebase';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [userId, setUserId] = useState('');

  // Get logged-in user ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // ✅ Total users from MongoDB
    fetch('http://localhost:5000/api/profile/count/all')
      .then(res => res.json())
      .then(data => setTotalUsers(data.count))
      .catch(err => console.error('Error fetching users:', err));

    // ✅ Total LFG posts
    fetch('http://localhost:5000/api/lfg')
      .then(res => res.json())
      .then(data => setTotalPosts(data.length))
      .catch(err => console.error('Error fetching posts:', err));

    // ✅ Total messages for this user
    if (userId) {
      fetch(`http://localhost:5000/api/messages/conversations/${userId}`)
        .then(res => res.json())
        .then(data => setMessageCount(data.length))
        .catch(err => console.error('Error fetching messages:', err));
    }
  }, [userId]);

  return (
    <> 
      <div className ="mobile-lock"> 
    <div className="dashboard">
      <Header />
      <main className="dashboard-content">
        <section>
          <h2>Welcome to Gaming Buddy!</h2>
          <p>Find players and join games easily.</p>
        </section>

        <section className="dashboard-cards">
          <div className="card">
            <h3>Active Players</h3>
            <p>{totalUsers}</p>
          </div>
          <Link to="/lfg" className="card-links">
          <div className="card">
           
            <h3>Open LFG Posts</h3>
            <p>{totalPosts}</p>
          </div>
          </Link>
          <Link to="/messages" className="card-links">
          <div className="card">
            <h3>Messages</h3>
            <p>{messageCount}</p>
          </div>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
    </div>
    </>
    
  );
};

export default Dashboard;
