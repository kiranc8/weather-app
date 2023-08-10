// CityNotFound.js
import React from "react";
import './style.css'

const CityNotFound = () => {
  return (
    <div className="city-not-found">
      <h2>City Not Found</h2>
      <p>The requested city could not be found. Please check the spelling and try again.</p>
    </div>
  );
};

export default CityNotFound;
