import React from "react";
import { useState, useEffect } from "react";

const API_KEY = "19d7ecfcef78b9ced33cb88e5641582d";
const CITY_NAME = "New York"; // Replace with the desired city name
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;

const Forecast = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const fiveDayForecast = data.list.filter((item) =>
          item.dt_txt.includes("12:00")
        );
        setForecast(fiveDayForecast);
        console.log(fiveDayForecast);
      });
  }, []);
  function formatDate(timestamp) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div className="forecast-container">
      <h3>The Next day forecast</h3>
      <div className="forecast-wrapper">
        {forecast &&
          forecast.map((item) => {
            return (
              <div className="forecast-card">
                <p>{formatDate(item.dt)}</p>
                {/* <h4>{item.weather[0].description}</h4> */}
                <div className="forecast-icon">
                  <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                </div>
                <h4>{item.weather[0].description}</h4>
                <div className="forecast-details">
                  {/* <p>
                    <i className="fa fa-map-marker"></i> {item.name} ,{" "}
                {item.sys.country}
                  </p> */}
                  <h1>{Math.floor(item.main.temp)}°C</h1>
                </div>
              </div>
            );
          })}
        {/* <div className="forecast-card">
          <p>Monday, 10:00 AM</p>
          <div className="forecast-icon">
            <FontAwesomeIcon icon={faCloudRain} />
          </div>
          <div className="forecast-details">
            <p>
              <i className="fa fa-map-marker"></i> Bengaluru,India
            </p>
            <h1>22 °C</h1>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Forecast;
