import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>404</h1>
    <p>Page Not Found</p>
    <Link to="/">Go Back to Home</Link>
  </div>
);

export default NotFound;
