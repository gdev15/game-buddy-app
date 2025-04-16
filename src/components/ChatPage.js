import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { auth } from '../firebase';
import './ChatPage.css';
// URL Config
import {API_BASE_URL} from '../config';

const ChatPage = () => {
  const { recipientId } = useParams();
  const [userId, setUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');

  // Get logged in user's ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages and recipient info
  useEffect(() => {
    if (userId && recipientId) {
      console.log('Fetching messages between:', userId, 'and', recipientId);
      fetchMessages();
      fetchRecipientName();
    }
  }, [userId, recipientId]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages/${userId}/${recipientId}`);
      const data = await res.json();
      setMessages(data);

      // Auto-scroll to bottom
      setTimeout(() => {
        const chatBox = document.getElementById('chat-box');
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      }, 100);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const fetchRecipientName = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile/user/${recipientId}`);
      const data = await res.json();
      setRecipientName(data.username || 'Unknown');
    } catch (err) {
      console.error('Failed to fetch recipient name:', err);
      setRecipientName('Unknown');
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: userId,
          recipientId,
          message: newMessage
        })
      });

      if (res.ok) {
        setNewMessage('');
        fetchMessages(); // refresh chat
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="chat-page">
      <Header />
      <main className="chat-content">
        <h2>Chat with {recipientName}</h2>
        <div className="chat-box" id="chat-box">
          {messages.length === 0 ? (
            <p className="empty">No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${msg.senderId === userId ? 'sent' : 'received'}`}
              >
                <div className="message-text">{msg.message}</div>
                <div className="timestamp">
                  {new Date(msg.timestamp).toLocaleString(undefined, {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage;
