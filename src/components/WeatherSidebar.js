import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCloudShowersHeavy,
  faCloud,
  faSun,
  faSnowflake,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

function getWeatherIcon(weather) {
  if (!weather) return faCloud;
  const main = weather.weather[0]?.main;
  switch (main) {
    case "Rain":
    case "Drizzle":
      return faCloudShowersHeavy;
    case "Clouds":
      return faCloud;
    case "Clear":
      return faSun;
    case "Snow":
      return faSnowflake;
    case "Thunderstorm":
      return faBolt;
    default:
      return faCloud;
  }
}

export default function WeatherSidebar({
  city,
  query,
  setQuery,
  weather,
  forecast,
  loading,
  error,
  handleSearch,
}) {
  return (
    <div className="flex-1 bg-gray-900/70 rounded-2xl p-6 flex flex-col items-center shadow-md backdrop-blur-md">
      <form className="w-full flex items-center mb-4" onSubmit={handleSearch}>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="جستجوی شهر..."
            className="w-full rounded-lg pl-10 pr-4 py-2 bg-gray-800/80 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            dir="rtl"
          />
          <button type="submit">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </button>
        </div>
      </form>
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center mt-8"
          >
            <div className="flex flex-col gap-4 w-full items-center justify-center">
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
              </div>
            </div>
            <span className="text-gray-200 mt-4">در حال دریافت اطلاعات...</span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-400 mt-8"
          >
            {error}
          </motion.div>
        ) : weather ? (
          <motion.div
            key="weather"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center mt-4"
          >
            <motion.span
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.15, 1],
                filter: [
                  "drop-shadow(0 0 8px #fff3)",
                  "drop-shadow(0 0 16px #fff6)",
                  "drop-shadow(0 0 8px #fff3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-2"
            >
              <FontAwesomeIcon
                icon={getWeatherIcon(weather)}
                className="text-7xl text-orange-400"
              />
            </motion.span>
            <span className="text-gray-200 font-semibold">{city}</span>
            <span className="text-4xl font-bold text-gray-100 mt-2">
              {weather.main.temp}°C
            </span>
            <span className="text-gray-400 mt-1">
              {new Date(weather.dt * 1000).toLocaleString("fa-IR", {
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="w-full mt-6">
        <div className="text-gray-200 font-semibold mb-2">
          پیش‌بینی روزهای آینده
        </div>
        <div className="flex gap-2 text-sm">
          <button
            className="px-2 py-1 rounded bg-orange-400 text-white"
            disabled
          >
            2 روز
          </button>
          <button
            className="px-2 py-1 rounded bg-gray-800 text-gray-200"
            disabled
          >
            7 روز
          </button>
          <button
            className="px-2 py-1 rounded bg-gray-800 text-gray-200"
            disabled
          >
            15 روز
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {forecast.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-gray-200">
              <FontAwesomeIcon
                icon={faCloudShowersHeavy}
                className="text-lg text-blue-400"
              />
              {new Date(item.dt * 1000).toLocaleDateString("fa-IR", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              <span className="ml-auto">{item.weather[0].description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
