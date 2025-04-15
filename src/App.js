import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import SignupConfirmation from './components/SignupConfirmation'; 
import LfgPage from './components/LfgPage';
import MyPostsPage from './components/MyPostsPage';
import ChatPage from './components/ChatPage';
import MessagesPage from './components/MessagesPage';

import { useParams } from 'react-router-dom';
const ChatPageWrapper = () => {
  const { receiverId } = useParams();
  return <ChatPage receiverId={receiverId} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-confirmation" element={<SignupConfirmation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lfg" element={<LfgPage />} />
        <Route path="/myposts" element={<MyPostsPage />} />
        {/* <Route path="/chat/:receiverId" element={<ChatPageWrapper />} /> */}
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/:recipientId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;
