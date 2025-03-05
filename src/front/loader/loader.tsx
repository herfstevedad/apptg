import React from 'react';
import './loader.css';

function Loader() {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;