import { useWeather } from "../contexts/WeatherContext";
import { useMemo, useState } from "react";

export default function CurrentWeather() {
  const { state, dispatch } = useWeather();
  const { weatherData } = state;

  if (!weatherData) return null;

  const { current, daily, cityName, country } = weatherData;

  const currentTemp = Math.round(current.temp);
  const feelsLike = Math.round(current.feels_like);
  const weatherDescription = current.weather[0].description;
  const iconCode = current.weather[0].icon;

  const isAlreadyFavorite = useMemo(() => {
    return state.favorites?.some((fav) => fav === weatherData.cityName);
  });

  const handleToggleFavorite = () => {
    const isAlreadyFavorite = state.favorites?.some(
      (fav) => fav === weatherData.cityName,
    );

    if (isAlreadyFavorite) {
      // إزالة من المفضلة
      dispatch({
        type: "REMOVE_FROM_FAVORITE",
        payload: cityName,
      });
    } else {
      // إضافة إلى المفضلة
      dispatch({
        type: "ADD_TO_FAVORITE",
        payload: cityName,
      });
    }
  };

  return (
    <div
      className="px-4 py-4 text-white mb-3 shadow-lg"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
      }}
    >
      {/* أيقونة المفضلة */}
      <i
        className={`bi ${isAlreadyFavorite ? "bi-star-fill text-warning" : "bi-star text-white-50"}`}
        style={{
          position: "absolute",
          top: "25px",
          right: "25px",
          fontSize: "25px",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
        onClick={handleToggleFavorite}
      ></i>

      {/* اسم المدينة */}
      <h2 className="fw-bold mb-3">
        {cityName}, {country}
      </h2>

      <div className="d-flex align-items-center gap-4 my-3">
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt="Weather Icon"
          style={{ width: "150px", height: "150px" }}
        />
        <div className="d-flex flex-column">
          <h1 className="fw-bold display-4 mb-1">{currentTemp}°C</h1>
          <span className="text-white-50 text-capitalize">
            {weatherDescription}
          </span>
          <span className="text-white-50">Feels Like {feelsLike}°C</span>
        </div>
      </div>

      <hr
        style={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
        className="my-4"
      />

      {/* توقعات الأيام القادمة */}
      <div className="d-flex justify-content-between text-center overflow-auto">
        {daily.map((item, index) => {
          const dateObj = new Date(item.dt * 1000);
          const dayName = dateObj.toLocaleDateString("en-US", {
            weekday: "short",
          });

          const maxTemp = Math.round(item.main.temp_max);
          const minTemp = Math.round(item.main.temp_min);
          const dayIcon = item.weather[0].icon;

          return (
            <div key={index} className="py-1 px-2">
              <p className="mb-1 fw-semibold">{dayName}</p>
              <p className="mb-2 small text-white-50">
                {maxTemp}°/{minTemp}°
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${dayIcon}.png`}
                alt="forecast icon"
                style={{ width: "55px", height: "55px" }}
              />
              <p className="fw-bold mb-0">{maxTemp}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
