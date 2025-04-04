// SignupConfirmation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const SignupConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up Successful!</h2>
        <p>Your account has been created. You're ready to start finding your Gaming Buddies!</p>
        <button onClick={() => navigate('/signin')}>Back to Sign In</button>
      </div>
    </div>
  );
};

export default SignupConfirmation;
