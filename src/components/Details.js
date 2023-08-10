import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faTemperatureHigh,
  faWind,
  faArrowUp,
  faCompressArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
const Details = ({ data }) => {
  console.log(data);
  return (
    <div className="details-container">
      {data && (
        <>
          <div className="temp-card">
            <div className="weather-detail">
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="Weather Icon"
              />
              <p>{data.weather[0].description}</p>
            </div>
          </div>
          <div className="temp-card">
            <h4>
              <FontAwesomeIcon icon={faTemperatureHigh} /> Feels like
            </h4>
            <div className="temp-detail">
              <p>{Math.floor(data.main.feels_like)} °C</p>
            </div>
          </div>
          <div className="temp-card">
            <h4>
              <FontAwesomeIcon icon={faTint} /> Humidity
            </h4>

            <div className="temp-detail">
              <p>{Math.floor(data.main.temp)} °</p>
            </div>
          </div>
          <div className="temp-card">
            <h4>
              <FontAwesomeIcon icon={faWind} /> Wind Speed
            </h4>
            <div className="temp-detail">
              <p>{data.wind.speed} km/hr</p>
            </div>
          </div>
          <div className="temp-card">
            <h4>
              <FontAwesomeIcon icon={faArrowUp} /> Wind Direction
            </h4>
            <div className="temp-detail">
              <p>{data.wind.deg} °</p>
            </div>
          </div>
          <div className="temp-card">
            <h4>
              <FontAwesomeIcon
                icon={faCompressArrowsAlt} // Choose an appropriate pressure-related icon
                className="pressure-icon"
              />
              {" "}
               pressure
            </h4>
            <div className="temp-detail">
              <p>{data.main.pressure} Pa</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
