import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/create-post">Create Post</Link>
      <Link to="/posts">Posts</Link>
    </nav>
  );
};

export default Navbar;
