import { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import Header from './Header';
import Footer from './Footer';

import { auth } from '../firebase';

const ProfilePage = () => {
  const userId = auth.currentUser?.uid

  const [profile, setProfile] = useState({
    username: '',
    favoriteGames: '',
    skillLevel: '',
    availability: '',
  });

  const [statusMsg, setStatusMsg] = useState('');

  // Fetch existing profile data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/profile/${userId}`)
      .then(res => {
        if (res.data) {
          setProfile({
            username: res.data.username || '',
            favoriteGames: res.data.favoriteGames?.join(', ') || '',
            skillLevel: res.data.skillLevel || '',
            availability: res.data.availability || ''
          });
        }
      })
      .catch(err => console.error(err));
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert favoriteGames to array
    const formattedProfile = {
      ...profile,
      favoriteGames: profile.favoriteGames.split(',').map(game => game.trim())
    };

    axios.post(`http://localhost:5000/api/profile/${userId}`, formattedProfile)
      .then(() => setStatusMsg('Profile updated!'))
      .catch(err => {
        console.error(err);
        setStatusMsg('Error updating profile');
      });
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              name="username"
              value={profile.username}
              onChange={handleChange}
              placeholder="GamerTag"
            />
          </label>

          <label>
            Favorite Games:
            <input
              name="favoriteGames"
              value={profile.favoriteGames}
              onChange={handleChange}
              placeholder="Comma separated (e.g. Halo, COD, Overwatch)"
            />
          </label>

          <label>
            Skill Level:
            <select
              name="skillLevel"
              value={profile.skillLevel}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Pro">Pro</option>
            </select>
          </label>

          <label>
            Availability:
            <input
              name="availability"
              value={profile.availability}
              onChange={handleChange}
              placeholder="e.g. Mon-Fri 6pm-10pm"
            />
          </label>

          <button type="submit">Save Profile</button>
        </form>

        {statusMsg && <p>{statusMsg}</p>}
      </div>
      <Footer />
    
    </>
    
  );
};

export default ProfilePage;
