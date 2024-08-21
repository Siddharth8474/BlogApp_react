// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import Registraion from './Components/Registraion';
import Login from './Components/Login';
import CreatePost from './Components/CreatePost';
import PostList from './Components/PostList';
//import Navbar from './Components/Navbar';

const App = () => {
  const [userId, setUserId] = useState(null);

  const handleLogin = (id) => {
    setUserId(id);
  };

  return (
    
    <Router>
       {/* {userId && <Navbar />} */}
      <Routes>
        <Route path="/" element={<Registraion />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Registraion />} />
        <Route path="/create-post" element={userId ? <CreatePost userId={userId} /> : <Login onLogin={handleLogin} />} />
        <Route path="/posts" element={<PostList userId={userId} />} />

        {/* <Route path="/" element={<Login onLogin={handleLogin} />} /> */}
      </Routes>
    </Router>
  
  );
};


export default App;
