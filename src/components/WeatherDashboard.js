import React, { useState, useEffect } from "react";
import WeatherSidebar from "./WeatherSidebar";
import WeatherMain from "./WeatherMain";
import { motion } from "framer-motion";
import {
  getCityCoords,
  getCurrentWeather,
  getForecast,
} from "../services/weatherService";

const defaultCity = "Srinagar";

export default function WeatherDashboard() {
  const [city, setCity] = useState(defaultCity);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const geo = await getCityCoords(cityName);
      const { lat, lon, name, country } = geo;
      const weatherData = await getCurrentWeather(lat, lon);
      const forecastData = await getForecast(lat, lon);
      setWeather({ ...weatherData, name, country });
      setForecast(forecastData.list.slice(0, 6));
      setCity(`${name}, ${country}`);
    } catch (err) {
      setError(err.message || "خطا در دریافت اطلاعات!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(defaultCity);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query.trim());
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl shadow-2xl p-6 md:p-10 bg-white/30 backdrop-blur-lg border border-gray-200 max-w-4xl w-full mx-4"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <WeatherSidebar
            city={city}
            query={query}
            setQuery={setQuery}
            weather={weather}
            forecast={forecast}
            loading={loading}
            error={error}
            handleSearch={handleSearch}
          />
          <WeatherMain weather={weather} forecast={forecast} />
        </div>
      </motion.div>
    </div>
  );
}
