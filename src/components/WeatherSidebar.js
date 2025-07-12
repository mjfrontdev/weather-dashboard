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
  const [forecastRange, setForecastRange] = React.useState(2);
  return (
    <div className="flex-1 rounded-2xl p-6 flex flex-col items-center shadow-md backdrop-blur-md bg-darkCard/80 text-darkText">
      <form className="w-full flex items-center mb-4" onSubmit={handleSearch}>
        <div className="relative w-full flex items-center">
          <input
            type="text"
            placeholder="جستجوی شهر..."
            className="w-full rounded-xl pl-12 pr-4 py-3 bg-darkCard/60 text-darkText focus:outline-none focus:ring-2 focus:ring-darkAccent shadow-xl backdrop-blur-2xl transition-all duration-300 border border-white/10 hover:border-darkAccent focus:border-darkAccent placeholder:text-darkAccent/60 text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            dir="rtl"
            autoFocus
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg bg-gradient-to-tr from-darkAccent via-pink-500 to-blue-500 text-white hover:scale-110 hover:rotate-6 transition-all duration-300 border-2 border-white/20 focus:ring-2 focus:ring-darkAccent"
            aria-label="جستجو"
          >
            <span className="animate-pulse">
              <FontAwesomeIcon icon={faSearch} className="text-xl" />
            </span>
          </button>
        </div>
      </form>
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center mt-8"
          >
            <div className="flex flex-col gap-4 w-full items-center justify-center">
              <div className="w-20 h-20 border-4 border-transparent text-4xl animate-spin flex items-center justify-center rounded-full border-t-darkAccent bg-darkCard/40 text-darkAccent" />
            </div>
            <span className="mt-4 animate-pulse text-darkAccent">در حال دریافت اطلاعات...</span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-400 mt-8 animate-shake"
          >
            {error}
          </motion.div>
        ) : weather ? (
          <motion.div
            key="weather"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center mt-4"
          >
            <motion.span
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.25, 1],
                filter: [
                  "drop-shadow(0 0 12px #fff6)",
                  "drop-shadow(0 0 24px #fff9)",
                  "drop-shadow(0 0 12px #fff6)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-2"
            >
              <FontAwesomeIcon
                icon={getWeatherIcon(weather)}
                className="text-8xl text-darkAccent drop-shadow-lg animate-bounce-slow"
              />
            </motion.span>
            <span className="font-semibold text-lg drop-shadow text-darkAccent">{city}</span>
            <span className="text-5xl font-bold mt-2 drop-shadow-lg animate-fade-in text-darkAccent">
              {weather.main.temp}°C
            </span>
            <span className="mt-1 animate-fade-in text-darkText">
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
        <div className="font-semibold mb-2 text-center text-lg drop-shadow text-darkAccent">پیش‌بینی روزهای آینده</div>
        <div className="flex gap-2 text-sm justify-center mb-2">
          {[2, 5, 7].map((range) => (
            <button
              key={range}
              className={`px-2 py-1 rounded bg-darkAccent text-darkText shadow-md transition-all duration-200 ${forecastRange === range ? 'ring-2 ring-white' : ''}`}
              onClick={() => setForecastRange(range)}
            >
              {range} روز
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {forecast.slice(0, forecastRange).map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 shadow text-darkText"
            >
              <FontAwesomeIcon
                icon={faCloudShowersHeavy}
                className="text-lg text-darkAccent animate-bounce"
              />
              {new Date(item.dt * 1000).toLocaleDateString("fa-IR", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              <span className="ml-auto">{item.weather[0].description}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
