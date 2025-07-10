import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const API_KEY = "1561cc9a43653765e2cd74ef1a846aee"; // <-- Replace with your OpenWeatherMap API Key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
  if (!city) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();

    if (data.cod === "404") {
      setError("City not found!");
      setWeather(null);
    } else {
      setWeather(data);
      setError("");
    }
  } catch (err) {
    console.log("Fetch failed:", err);
    setError("Something went wrong!");
  }
};
useEffect(() => {
  if (weather) {
    const type = weather.weather[0].main;

    switch (type) {
      case "Clear":
        document.body.style.background = "linear-gradient(to right, #f6d365, #fda085)";
        break;
      case "Clouds":
        document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
        break;
      case "Rain":
        document.body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
        break;
      case "Snow":
        document.body.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)";
        break;
      default:
        document.body.style.background = "linear-gradient(to right, #74ebd5, #9face6)";
        break;
    }
  }
}, [weather]);
  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
         <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].main}</p>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
    
  );
}
export default App;



