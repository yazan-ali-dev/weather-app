import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useWeather } from "../contexts/WeatherContext";

export default function AirQuality() {
  const { state } = useWeather();
  const { weatherData } = state;

  if (!weatherData || !weatherData.airQuality) {
    return (
      <div
        className="p-4 text-white h-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          minHeight: "340px",
        }}
      >
        <span className="text-white-50">Loading Air Quality...</span>
      </div>
    );
  }

  const aqiLevel = weatherData.airQuality.main.aqi;

  const getAqiConfig = (level) => {
    switch (level) {
      case 1:
        return { text: "Good", color: "#28a745", value: 30 }; 
      case 2:
        return { text: "Fair", color: "#17a2b8", value: 45 }; 
      case 3:
        return { text: "Moderate", color: "#ffc107", value: 65 };
      case 4:
        return { text: "Poor", color: "#fd7e14", value: 85 }; 
      case 5:
        return { text: "Very Poor", color: "#dc3545", value: 100 }; 
      default:
        return { text: "Good", color: "#28a745", value: 30 };
    }
  };

  const aqiConfig = getAqiConfig(aqiLevel);

  const chartData = [
    { name: "AQI", value: aqiConfig.value },
    { name: "Remaining", value: 100 - aqiConfig.value },
  ];

  const COLORS = [aqiConfig.color, "rgba(255, 255, 255, 0.05)"];

  return (
    <div
      className="p-4 text-white h-100 d-flex flex-column justify-content-between"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        minHeight: "340px",
      }}
    >
      <div>
        <h5 className="fw-bold mb-0">Air Quality</h5>
      </div>

      <div className="text-center">
        <h3
          className="fw-bold mb-0"
          style={{ fontSize: "1.8rem", color: aqiConfig.color }}
        >
          {aqiConfig.text}
        </h3>
        <span className="small text-white-50">Index {aqiLevel}</span>
      </div>

      {/* rechart */}
      <div
        style={{ width: "100%", height: "140px" }}
        className="position-relative"
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={60}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div
          className="position-absolute top-50 start-50 translate-middle text-center"
          style={{ marginTop: "-10px" }}
        >
          <span className="fw-bold fs-3">{aqiLevel}</span>
        </div>
      </div>

      {/* تذييل الكرت */}
      <div className="text-center text-white-50 small">
        <span>Real-time air purity index</span>
      </div>
    </div>
  );
}
