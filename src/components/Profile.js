import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const userId = "123456"; // Replace with actual user ID

  useEffect(() => {
    axios.get(`http://localhost:5000/api/profile/${userId}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Favorite Games:</strong> {profile.favoriteGames?.join(', ')}</p>
          <p><strong>Skill Level:</strong> {profile.skillLevel}</p>
          <p><strong>Availability:</strong> {profile.availability}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
