import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { auth } from '../firebase';
// URL Config
import {API_BASE_URL} from '../config';

import lfg_image from '../assets/images/lfg_image.png';
import message_icon from '../assets/images/message_icon.png';



const Dashboard = () => {

  // const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [userId, setUserId] = useState('');
  window.scrollTo(0, 0);

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
    // Total users from MongoDB

    // fetch(`${API_BASE_URL}/api/profile/count/all`)
    //   .then(res => res.json())
    //   .then(data => setTotalUsers(data.count))
    //   .catch(err => console.error('Error fetching users:', err));

    // Total LFG posts

    fetch(`${API_BASE_URL}/api/lfg`)
      .then(res => res.json())
      .then(data => setTotalPosts(data.length))
      .catch(err => console.error('Error fetching posts:', err));

    // Total messages for this user
    if (userId) {
      fetch(`${API_BASE_URL}/api/messages/conversations/${userId}`)
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
          {/* <div className="card">
            <h3>Active Players</h3>
            <p>{totalUsers}</p>
          </div> */}
          <Link to="/lfg" className="card-links">
          <div className="card">
           
            <h3>Check Open LFG Posts <span><p className="bubble-text">{totalPosts}</p></span></h3>
            <img className="icon-lfg" src={lfg_image} alt="icon" />
          </div>
          </Link>
          <Link to="/messages" className="card-links">
          <div className="card">
            <h3>Check Messages<span><p className="bubble-text">{messageCount}</p></span></h3>
            <img className="icon-message" src={message_icon} alt="icon" />       
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
