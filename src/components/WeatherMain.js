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
        <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg mb-4 animate-fade-in text-darkAccent">
          {weather?.weather[0]?.description || "..."}
        </h1>
        <div className="flex gap-2 md:gap-4">
          {forecast.map((item, i) => (
            <motion.div
              key={item.dt}
              whileHover={{
                scale: 1.12,
                rotate: 2,
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                transition: { type: "spring" },
              }}
              className="rounded-xl px-4 py-3 flex flex-col items-center shadow-xl backdrop-blur-2xl border border-white/20 bg-darkCard/80 text-darkText"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
            >
              <span className="text-xs mb-1 animate-fade-in text-darkAccent">
                {new Date(item.dt * 1000).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
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
                className="mb-1"
              >
                <FontAwesomeIcon
                  icon={getWeatherIcon(item)}
                  className="text-3xl animate-bounce-slow text-darkAccent"
                />
              </motion.span>
              <span className="text-xl font-semibold animate-fade-in text-darkAccent">
                {Math.round(item.main.temp)}°C
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="flex-1 rounded-xl p-4 shadow-xl backdrop-blur-2xl border border-white/20 bg-darkCard/80 text-darkText">
          <div className="font-bold mb-2 text-darkAccent">نکات برجسته امروز</div>
          <div className="text-sm space-y-1 text-darkText">
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
        <div className="flex-1 rounded-xl p-4 shadow-xl flex flex-col justify-between backdrop-blur-2xl border border-white/20 bg-darkCard/80 text-darkText">
          <div className="text-sm space-y-1">
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
