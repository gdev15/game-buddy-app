import React, { useState, useEffect } from 'react';
import './LfgPage.css';
import Header from './Header';
import Footer from './Footer';

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

  // 🔁 Fetch existing posts on component mount
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
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to post LFG.');
      }

      const newPost = await response.json();
      console.log('LFG post successful:', newPost);

      alert('Post created successfully!');

      setFormData({
        game: '',
        platform: '',
        skillLevel: '',
        region: '',
        availability: '',
        description: '',
      });

      // ⬇️ Add new post to the top of the list
      setLfgPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="lfg-page">
      <Header />
      <main className="lfg-content">
        <h2>Looking For Group (LFG)</h2>
        <p>Create a listing to find teammates or browse existing posts!</p>

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

        {/* ✅ Render the posts here */}
        <section className="lfg-listings">
          <h3>Group Listings</h3>
          {lfgPosts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            lfgPosts.map((post, index) => (
              <div className="lfg-card" key={index}>
                <h4>{post.game} ({post.platform})</h4>
                <p><strong>Skill:</strong> {post.skillLevel}</p>
                <p><strong>Region:</strong> {post.region}</p>
                <p><strong>Availability:</strong> {post.availability}</p>
                <p><em>{post.description}</em></p>
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
