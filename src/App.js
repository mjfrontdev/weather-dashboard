import React from "react";
import WeatherDashboard from "./components/WeatherDashboard";
import "./index.css";

function App() {
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  return <WeatherDashboard />;
}

export default App;
