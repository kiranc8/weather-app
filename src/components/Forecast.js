import React from "react";
import { useState, useEffect, useContext } from "react";
import { WeatherContext } from "./WeatherContext";
import { API_KEY } from "../App";

const Forecast = ({data}) => {
//   const [forecast, setForecast] = useState([]);
//   const { place } = useContext(WeatherContext);
//   const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}&units=metric`;
//   useEffect(() => {
//     fetch(API_URL)
//       .then((response) => response.json())
//       .then((data) => {
//         const fiveDayForecast = data.list.filter((item) =>
//           item.dt_txt.includes("12:00")
//         );
//         setForecast(fiveDayForecast);
//       });
//   }, [API_URL]);
  function formatDate(timestamp) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div className="forecast-container">
      <h3>The Next day forecast</h3>
      <div className="forecast-wrapper">
        {data &&
          data.map((item) => {
            return (
              <div className="forecast-card">
                <p>{formatDate(item.dt)}</p>
                <div className="forecast-icon">
                  <img
                    src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                </div>
                <h4>{item.weather[0].description}</h4>
                <div className="forecast-details">
                  <h1>{Math.floor(item.main.temp)}°C</h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Forecast;
