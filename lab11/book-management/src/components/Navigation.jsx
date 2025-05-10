import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="app-navigation">
      <ul>
        <li><Link to="/">Book List</Link></li>
        <li><Link to="/add">Add Book</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
