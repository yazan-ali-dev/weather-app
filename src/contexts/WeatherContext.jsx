import { createContext, useContext, useReducer, useEffect } from "react";
import {
  weatherReducer,
  initialWeatherState,
} from "../reducers/weatherReducer";
import { fetchWeatherData } from "../services/weatherService";

const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);

  useEffect(() => {
    const controller = new AbortController();
    async function loadWeather() {
      dispatch({ type: "FETCH_WEATHER_START" });
      try {
        const data = await fetchWeatherData(
          state.currentCity,
          controller.signal,
        );
        dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: data });
      } catch (err) {
        if (err.name === "AbortError") return;
        dispatch({ type: "FETCH_WEATHER_FAILURE", payload: err.message });
      }
    }

    loadWeather();

    return () => {
      controller.abort();
    };
  }, [state.currentCity]);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
