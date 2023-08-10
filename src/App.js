import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Details from "./components/Details";
import Forecast from "./components/Forecast";
import { WeatherContext } from "./components/WeatherContext";
import "./App.css";
const API_KEY = "19d7ecfcef78b9ced33cb88e5641582d";

function App() {
  const [weatherData, setWeatherData] = useState();
  const [place, setPlace] = useState("New York");

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`;
  useEffect(() => {
    dataFetch();
  }, []);
  const dataFetch = () => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setPlace('New York'); 
        dataFetch(); 
      });
  };
  return (
    <WeatherContext.Provider value={{ place, setPlace }}>
      <div className="wrapper">
        <div className="sidebar">
          <Sidebar data={weatherData} fetchData={dataFetch} />
        </div>
        <div className="description-container">
          <div className="details">
            <Details data={weatherData} />
          </div>
          <div className="forecast">
            <Forecast />
          </div>
        </div>
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
