import React, { useState, useEffect } from 'react';
import './LfgPage.css';
import Header from './Header';
import Footer from './Footer';
import { auth } from '../firebase';

const LfgPage = () => {
  const [formData, setFormData] = useState({
    game: '',
    platform: '',
    skillLevel: '',
    region: '',
    availability: '',
    description: '',
  });

  const [lfgPosts, setLfgPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('Anonymous');

  // Get logged-in user's UID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch username from MongoDB after userId is set
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/profile/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data?.username) {
            setUsername(data.username);
          }
        })
        .catch(err => {
          console.error('Failed to fetch username from MongoDB:', err);
        });
    }
  }, [userId]);

  // Fetch existing LFG posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/lfg');
      const data = await res.json();
      setLfgPosts(data);
    } catch (error) {
      console.error('Failed to fetch LFG posts:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/lfg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          userId,
          username
        })
      });

      if (!response.ok) throw new Error('Failed to post LFG.');

      const newPost = await response.json();
      alert('Post created successfully!');

      setFormData({
        game: '',
        platform: '',
        skillLevel: '',
        region: '',
        availability: '',
        description: '',
      });

      setLfgPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Try again later.');
    }
  };

  const handleRequestToJoin = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/lfg/${postId}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          username
        })
      });

      console.log("Sending post:", {
        ...formData,
        userId,
        username
      });

      if (!response.ok) throw new Error('Failed to request to join');
      alert('Request sent successfully!');
    } catch (error) {
      console.error(error);
      alert('There was an error sending your request.');
    }
  };

  // Filter State
  const [filters, setFilters] = useState({
    game: '',
    platform: '',
    skillLevel: '',
    region: ''
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };
  
  const filteredPosts = lfgPosts.filter(post => {
    return (
      (filters.game === '' || post.game.toLowerCase().includes(filters.game.toLowerCase())) &&
      (filters.platform === '' || post.platform.toLowerCase().includes(filters.platform.toLowerCase())) &&
      (filters.skillLevel === '' || post.skillLevel.toLowerCase().includes(filters.skillLevel.toLowerCase())) &&
      (filters.region === '' || post.region.toLowerCase().includes(filters.region.toLowerCase()))
    );
  });

  return (
    
    <div className="lfg-page">
      <Header />
      <main className="lfg-content">
        <h2>Welcome to LFG {username}!</h2>
        <p>Create a listing to find teammates or browse existing posts!</p>
        <div className="divider"></div>
        {/* Filter Bar */}
        <h3>Filter</h3>
        <div className="filter-bar">
          <input
            type="text"
            name="game"
            placeholder="Filter by Game"
            value={filters.game}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="platform"
            placeholder="Filter by Platform"
            value={filters.platform}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="skillLevel"
            placeholder="Filter by Skill"
            value={filters.skillLevel}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="region"
            placeholder="Filter by Region"
            value={filters.region}
            onChange={handleFilterChange}
          />
        </div>
        <div className="divider"></div>
        <h3>Create LFG Post</h3>
        {/* LFG Posting Form */}
        <form className="lfg-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="game"
            placeholder="Game (e.g. Apex Legends)"
            value={formData.game}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="platform"
            placeholder="Platform (e.g. PC, PS5)"
            value={formData.platform}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="skillLevel"
            placeholder="Skill Level (e.g. Casual, Competitive)"
            value={formData.skillLevel}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="region"
            placeholder="Region (e.g. NA, EU)"
            value={formData.region}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="availability"
            placeholder="Availability (e.g. Evenings, Weekends)"
            value={formData.availability}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Brief description of what you're looking for"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Post LFG</button>
        </form>
        
        {/* Render the posts here */}
        <section className="lfg-listings">
        <div className="divider"></div>
          <h3>Group Listings</h3>
          {lfgPosts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            filteredPosts.map((post, index) => (
              <div className="lfg-card" key={index}>
                 <h4>{post.game} ({post.platform})</h4>
                <p><strong>Skill:</strong> {post.skillLevel}</p>
                <p><strong>Region:</strong> {post.region}</p>
                <p><strong>Availability:</strong> {post.availability}</p>
                <p><strong>Posted by:</strong> {post.username}</p>
                <p><em>{post.description}</em></p>
                <button onClick={() => handleRequestToJoin(post._id)}>Request to Join</button>
              </div>
            ))
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LfgPage;
