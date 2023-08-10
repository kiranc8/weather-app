import React from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faThermometerHalf,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";
import { WeatherContext } from "./WeatherContext";
import "./style.css";


const Sidebar = ({data, fetchData}) => {
  const {place,setPlace} = useContext(WeatherContext)
  function formatDate(timestamp) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(timestamp * 1000); 
    return date.toLocaleDateString("en-US", options);
  }
  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const handleChange = (e) =>{
    setPlace(e.target.value);
  }
  const handleClick = () =>{
    console.log("12");
    fetchData();
  }
  return (
    <div>
      <div className="search-bar-container">
        <div className="search-bar">
          <input type="text" className="search-input" placeholder="Search..."  onChange={handleChange}/>
          <button className="search-button" onClick={handleClick}>
            <i className="fa fa-search"></i> {/* Font Awesome search icon */}
          </button>
        </div>
      </div>
      <div className="weather-card-container">
        {data && (
          <div className="weather-card">
            <div className="weather-icon">
              {data.weather && data.weather.length > 0 && (
                <img
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              )}
            </div>
            <div className="weather-details">
              <p>
                <i className="fa fa-map-marker"></i> {data.name} ,{" "}
                {data.sys.country}
              </p>
              <h1>{Math.floor(data.main.temp)} °C</h1>
              <p>{formatDate(data.dt)}</p>
            </div>
            <hr className="horizontal-line" />
            <div>
                <p><FontAwesomeIcon icon={faTemperatureHigh} /> Min Temp : {data.main.temp_min} °C</p>
                <p><FontAwesomeIcon icon={faThermometerHalf} /> Max Temp : {data.main.temp_max} °C</p>
                <p><FontAwesomeIcon icon={faSun} /> Sunrise : {convertTimestampToTime(data.sys.sunrise)} </p>
                <p><FontAwesomeIcon icon={faMoon} /> Sunset : {convertTimestampToTime(data.sys.sunset)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
