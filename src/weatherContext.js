import React, { createContext, useState, useContext } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [place, setPlace] = useState("New York");
  const [isCelsius, setIsCelsius] = useState(true); // true for Celsius, false for Fahrenheit

  return (
    <WeatherContext.Provider value={{ place, setPlace, isCelsius, setIsCelsius }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  return useContext(WeatherContext);
}
