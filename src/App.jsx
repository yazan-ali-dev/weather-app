import "./App.css";
import WeatherDashboard from "./components/WeatherDashboard";
import { useEffect } from "react";
import { getWeatherByCity } from "./features/weather/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const cityName = useSelector((state) => state.weather.currentCity);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cityName) return;

    const promis = dispatch(getWeatherByCity(cityName));

    return () => {
      promis.abort();
    };
  }, [dispatch, cityName]);

  return <WeatherDashboard />;
}

export default App;
