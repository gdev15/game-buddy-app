import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import './MessagesPage.css';

const MessagesPage = () => {
  const [userId, setUserId] = useState('');
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      //Local Run
      //fetch(`http://localhost:5000/api/messages/conversations/${userId}`)
      fetch(`https://game-buddy-app.onrender.com/api/messages/conversations/${userId}`)
        .then(res => res.json())
        .then(data => setConversations(data))
        .catch(err => console.error('Error fetching conversations:', err));
    }
  }, [userId]);

  return (
    <div className="messages-page">
      <Header />
      <main className="content">
        <h2>Messages</h2>
        {conversations.length === 0 ? (
          <p>You have no messages yet.</p>
        ) : (
          <ul className="convo-list">
            {conversations.map((convoUserId, index) => (
              <li key={index}>
                <Link to={`/messages/${convoUserId}`}>Chat with user ID: {convoUserId}</Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MessagesPage;