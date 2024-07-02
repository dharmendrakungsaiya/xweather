
import { useEffect, useState } from 'react';
import './App.css';
import AlertBox from './alertbox';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
        setLoading(true);
        const apiKey = "ee7866e3be95433e83781907240205";
        try {
          const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
          const data = await res.json();
          
          if (res.ok) {
            setLoading(false);
            setWeather(data.current);
            setAlert("");
          } else {
            setWeather(null);
            setAlert(data.error.message || "Failed to fetch weather data.");
          }
        } catch (error) {
          setLoading(false);
          setWeather(null);
          setAlert("Failed to fetch weather data.");
        }
      }
    }
    fetchWeather();
  }, [location]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(searchQuery);
  }

  const handleCloseAlert = () => {
    setAlert("");
  }

  return (
    <div className="App">
      
        <input type="text" placeholder="Enter city" value={searchQuery} onChange={handleChange} />
        <button type="button" onClick={handleSubmit}>Search</button>
      
      {alert && <AlertBox message={alert} onClose={handleCloseAlert} />}

      {loading ? <p>Loading data…</p>
      
      
      :weather && (
        <div className="weather-cards">
          <div className="weather-card">Temperature: {weather.temp_c}°C</div>
          <div className="weather-card">Humidity: {weather.humidity}%</div>
          <div className="weather-card">Condition: {weather.condition.text}</div>
          <div className="weather-card">Wind Speed: {weather.wind_kph} kph</div>
        </div>
      )}
    </div>
  );
}

export default App;

