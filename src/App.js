import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Details from "./components/Details";
import Forecast from "./components/Forecast";
import ErrorPage from "./components/ErrorPage"
import { WeatherContext } from "./components/WeatherContext";
import "./App.css";
export const API_KEY = process.env.REACT_APP_API_KEY;


function App() {
  const [weatherData, setWeatherData] = useState();
  const [forecast, setForecast] = useState([]);
  const [place, setPlace] = useState("New York");
  const [cityFound,setCityFound] = useState(true);

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`;
  const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}&units=metric`

  const dataFetch = () => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setCityFound(true)
        setWeatherData(data);
      })
      .catch((error) => {
        console.error(error);
        setCityFound(false)
        // setPlace("New York");
        // dataFetch();
        
      });
  };

  const fetchForecastData = ()=>{
    fetch(FORECAST_API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const fiveDayForecast = data.list.filter((item) =>
          item.dt_txt.includes("12:00")
        );
        setForecast(fiveDayForecast);
      });
  }
  
  useEffect(() => {
    dataFetch();
    fetchForecastData();
  }, []);
  
  return (
    <WeatherContext.Provider value={{ place, setPlace }}>
      {cityFound?(<div className="wrapper">
        <div className="sidebar">
          <Sidebar data={weatherData} fetchData={dataFetch} />
        </div>
        <div className="description-container">
          <div className="details">
            <Details data={weatherData} />
          </div>
          <div className="forecast">
            <Forecast data ={forecast}/>
          </div>
        </div>
      </div>):(<ErrorPage/>)}
    </WeatherContext.Provider>
  );
}

export default App;
