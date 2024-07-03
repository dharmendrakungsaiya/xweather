import { useState } from 'react';
import './App.css';


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    setLoading(true);
    const apiKey = "ee7866e3be95433e83781907240205";
    try {
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      const data = await res.json();

      if (data.error) {
        alert("Failed to fetch weather data");
      }
      setWeather(data);

    } catch (error) {
      console.error("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div>
        <input type='text' onChange={(e) => setCity(e.target.value)} />
        <button type='button' onClick={() => fetchWeather(city)}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}

      {!loading && weather.current && Object.keys(weather).length > 0 && (
        <div className="weather-cards">
          <div className="weather-card"><h3>Temperature: </h3>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card"><h3>Humidity: </h3>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card"><h3>Condition: </h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card"><h3>Wind Speed: </h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

