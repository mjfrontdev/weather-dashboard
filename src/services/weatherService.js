const API_KEY = "0ac2a5dbfa9260a5b417ae732cd6b35f";

export async function getCityCoords(cityName) {
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      cityName
    )}&limit=1&appid=${API_KEY}`
  );
  const geoData = await geoRes.json();
  if (!geoData[0]) throw new Error("شهر پیدا نشد!");
  return geoData[0];
}

export async function getCurrentWeather(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fa`
  );
  return await res.json();
}

export async function getForecast(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fa`
  );
  return await res.json();
}
