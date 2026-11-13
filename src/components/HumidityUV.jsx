import React from "react";
import { useWeather } from "../contexts/WeatherContext";

export default function HumidityUV() {
  const { state } = useWeather();
  const { weatherData } = state;

  if (!weatherData || !weatherData.current) {
    return (
      <div
        className="p-3 text-white h-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          minHeight: "130px",
        }}
      >
        <span className="small text-white-50">Loading...</span>
      </div>
    );
  }

  const humidity = weatherData.current.humidity;
  const uvi = weatherData.current.uvi || 3;

  const getHumidityStatus = (hum) => {
    if (hum < 30) return { text: "Dry", color: "text-warning" };
    if (hum >= 30 && hum <= 60)
      return { text: "Comfortable", color: "text-white-50" };
    return { text: "Humid", color: "text-info" };
  };

  const getUviStatus = (val) => {
    if (val <= 2) return { text: "Low", color: "text-success" };
    if (val <= 5) return { text: "Moderate", color: "text-warning" };
    if (val <= 7) return { text: "High", color: "text-danger" };
    return { text: "Very High", color: "text-danger fw-bold" };
  };

  const humidityStatus = getHumidityStatus(humidity);
  const uviStatus = getUviStatus(uvi);

  return (
    <div
      className="p-3 text-white h-100 d-flex flex-column justify-content-between"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "2px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* عنوان الكرت */}
      <h6 className="fw-bold mb-3">Humidity & UV</h6>

      {/* محتوى الكرت مقسم إلى قسمين */}
      <div className="row text-center g-2 align-items-center my-auto">
        {/* قسم الرطوبة */}
        <div className="col-6 border-end border-light border-opacity-10">
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center gap-1 text-white-50 small mb-1">
              <i className="bi bi-droplet fs-5"></i>
              <span>Humidity</span>
            </div>
            <span className="fw-bold fs-5">{humidity}%</span>
            <span className={`small ${humidityStatus.color}`}>
              {humidityStatus.text}
            </span>
          </div>
        </div>

        {/* قسم مؤشر الأشعة فوق البنفسجية */}
        <div className="col-6">
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center gap-1 text-white-50 small mb-1">
              <i className="bi bi-sun fs-5"></i>
              <span>UV Index</span>
            </div>
            <span className="fw-bold fs-5">{uvi}</span>
            <span className={`small fw-semibold ${uviStatus.color}`}>
              {uviStatus.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
