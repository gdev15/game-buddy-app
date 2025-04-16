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
      // Local Run
      // fetch(`http://localhost:5000/api/messages/conversations/${userId}`)

      fetch(`http://game-buddy-app:10000/api/messages/conversations/${userId}`)
        .then(res => res.json())
        .then(async (uids) => {
          const convoData = await Promise.all(
            uids.map(async (otherUserId) => {
              try {
                // Local Run
                //  const usernameRes = await fetch(`http://localhost:5000/api/profile/user/${otherUserId}`);
                const usernameRes = await fetch(`http://game-buddy-app:10000/api/profile/user/${otherUserId}`);
                const usernameData = await usernameRes.json();

                // Local Run
                //const lastMsgRes = await fetch(`http://localhost:5000/api/messages/${userId}/${otherUserId}`);

                const lastMsgRes = await fetch(`http://game-buddy-app:10000/api/messages/${userId}/${otherUserId}`);
                const messages = await lastMsgRes.json();
                const latestMessage = messages.length > 0 ? messages[messages.length - 1].message : 'No messages yet.';

                return {
                  uid: otherUserId,
                  username: usernameData?.username || otherUserId,
                  lastMessage: latestMessage
                };
              } catch (error) {
                console.error(`Failed to load data for user ${otherUserId}`, error);
                return {
                  uid: otherUserId,
                  username: otherUserId,
                  lastMessage: 'Error loading message'
                };
              }
            })
          );
          setConversations(convoData);
        })
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
            {conversations.map((convo, index) => (
              <li key={index}>
                <Link to={`/messages/${convo.uid}`}>
                  <strong>{convo.username}</strong>
                </Link>
                <p className="preview">{convo.lastMessage}</p>
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
