import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudShowersHeavy,
  faCloud,
  faSun,
  faSnowflake,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

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

export default function WeatherMain({ weather, forecast }) {
  return (
    <div className="flex-[2] flex flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4">
          {weather?.weather[0]?.description || "..."}
        </h1>
        <div className="flex gap-2 md:gap-4">
          {forecast.map((item, i) => (
            <motion.div
              key={item.dt}
              whileHover={{
                scale: 1.08,
                rotate: 2,
                transition: { type: "spring" },
              }}
              className="bg-gray-900/70 rounded-xl px-4 py-3 flex flex-col items-center text-white shadow-md backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
            >
              <span className="text-xs mb-1">
                {new Date(item.dt * 1000).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
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
                className="mb-1"
              >
                <FontAwesomeIcon
                  icon={getWeatherIcon(item)}
                  className="text-2xl"
                />
              </motion.span>
              <span className="text-lg font-semibold">
                {Math.round(item.main.temp)}°C
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="flex-1 bg-gray-900/60 rounded-xl p-4 shadow-md backdrop-blur-md">
          <div className="font-bold text-gray-200 mb-2">نکات برجسته امروز</div>
          <div className="text-gray-200 text-sm space-y-1">
            <div>شاخص UV - {weather?.uvi ?? 0} (کم)</div>
            <div>سرعت باد - {weather?.wind?.speed ?? "-"} کیلومتر/ساعت</div>
            <div>
              طلوع آفتاب -
              {weather?.sys?.sunrise
                ? " " +
                  new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                    "fa-IR",
                    { hour: "2-digit", minute: "2-digit" }
                  )
                : " - "}
            </div>
            <div>
              غروب آفتاب -
              {weather?.sys?.sunset
                ? " " +
                  new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                    "fa-IR",
                    { hour: "2-digit", minute: "2-digit" }
                  )
                : " - "}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-900/60 rounded-xl p-4 shadow-md flex flex-col justify-between backdrop-blur-md">
          <div className="text-gray-200 text-sm space-y-1">
            <div>رطوبت - {weather?.main?.humidity ?? "-"}%</div>
            <div>
              دید -{" "}
              {weather?.visibility
                ? (weather.visibility / 1000).toFixed(1) + " کیلومتر"
                : "-"}
            </div>
            <div>کیفیت هوا - {weather?.aqi ?? 90}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
