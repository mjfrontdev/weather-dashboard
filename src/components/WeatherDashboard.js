import React, { useState, useEffect } from "react";
import WeatherSidebar from "./WeatherSidebar";
import WeatherMain from "./WeatherMain";
import { motion } from "framer-motion";
import {
  getCityCoords,
  getCurrentWeather,
  getForecast,
} from "../services/weatherService";
import { useRef } from "react";

const defaultCity = "Srinagar";

export default function WeatherDashboard() {
  const [city, setCity] = useState(defaultCity);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const deferredPrompt = useRef(null);

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
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setShowInstallPrompt(true);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query.trim());
    }
  };

  const handleInstallClick = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      if (outcome === "accepted") setShowInstallPrompt(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-fixed relative overflow-hidden bg-dark-gradient"
    >
      {/* افکت‌های گرادینت و حباب‌های متحرک */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-300/30 rounded-full blur-2xl animate-bounce" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl w-full mx-4 relative z-10 bg-darkCard/80 border-darkAccent"
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
      {/* پاپ‌آپ نصب PWA */}
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/40"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 max-w-xs w-full">
            <span className="text-2xl font-bold text-blue-600">Weather App</span>
            <span className="text-gray-700 text-center">برای نصب اپلیکیشن روی دستگاه خود، روی دکمه زیر کلیک کنید.</span>
            <button
              onClick={handleInstallClick}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-pink-400 text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              نصب اپلیکیشن
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="text-gray-400 text-xs mt-2 hover:underline"
            >
              بستن
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
