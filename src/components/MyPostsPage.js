import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { auth } from '../firebase';
import "./MyPostsPage.css"
import { Link } from 'react-router-dom';

const MyPostsPage = () => {
  const [userId, setUserId] = useState('');
  const [myPosts, setMyPosts] = useState([]);

  // Get current user ID from Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  // Fetch posts for this user
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/lfg/user/${userId}`)
        .then(res => res.json())
        .then(data => setMyPosts(data))
        .catch(err => console.error('Error loading posts:', err));
    }
  }, [userId]);

  // Accept or reject join request
  const handleResponse = async (postId, requestUserId, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/lfg/${postId}/request/${requestUserId}/response`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        }
      );

      if (!res.ok) throw new Error('Failed to update request status');

      // Refresh posts
      const updatedRes = await fetch(`http://localhost:5000/api/lfg/user/${userId}`);
      const newData = await updatedRes.json();
      setMyPosts(newData);
    } catch (err) {
      console.error(err);
      alert('Error updating request');
    }
  };

  return (
    <div className="my-posts-page">
      <Header />
      <main className="content">
        <h2>My LFG Posts</h2>
        {myPosts.length === 0 ? (
          <p>You haven’t created any LFG posts yet.</p>
        ) : (
          myPosts.map((post) => {
            const pendingRequests = post.requests?.filter(req => req.status === 'pending') || [];
            const acceptedRequests = post.requests?.filter(req => req.status === 'accepted') || [];

            return (
              <div key={post._id} className="lfg-card">
                <h3>{post.game} ({post.platform})</h3>
                <p><strong>Skill:</strong> {post.skillLevel}</p>
                <p><strong>Region:</strong> {post.region}</p>
                <p><strong>Availability:</strong> {post.availability}</p>
                <p><em>{post.description}</em></p>

                {/* ✅ Accepted Users */}
                {acceptedRequests.length > 0 && (
                  <div className="accepted-users">
                    <strong>Accepted Members:</strong>
                    <ul>
                      {acceptedRequests.map((acc, idx) => (
                        <li key={idx}>
                          {acc.username}{' '}
                          <Link to={`/messages/${acc.userId}`}>
                            <button>Message</button>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 🔁 Join Requests Section */}
                {pendingRequests.length > 0 ? (
                  <div className="requests-section">
                    <h4>Pending Join Requests</h4>
                    {pendingRequests.map((req, index) => (
                      <div key={index} className="request">
                        <p><strong>{req.username}</strong></p>
                        <button onClick={() => handleResponse(post._id, req.userId, 'accepted')}>Accept</button>
                        <button onClick={() => handleResponse(post._id, req.userId, 'rejected')}>Reject</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No pending requests.</p>
                )}
              </div>
            );
          })
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyPostsPage;
