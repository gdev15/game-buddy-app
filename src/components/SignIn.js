// SignIn.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';  // <-- Import here
import './Auth.css';


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // <-- Instantiate the hook

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      // Navigate to the dashboard on success
      navigate("/dashboard");  // <-- Redirect user here
    } catch (error) {
      console.error("Error signing in:", error.message);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome to Gaming Buddy!</h2>
        <h3>Sign Up / Log In</h3>
        <p>To access all the features</p>
        <form onSubmit={handleSignIn}>
          <input 
            type="email" 
            placeholder="Email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        <p>
  <a href="/reset-password">Forgot Password?</a>
</p>
      </div>
    </div>
  );
};

export default SignIn;
