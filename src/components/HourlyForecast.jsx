import { useSelector } from "react-redux";

export default function HourlyForecast() {
  const weatherData = useSelector((state) => state.weather.weatherData);

  if (!weatherData || !weatherData.hourly)
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
        <span className="text-white-50">Loading HourlyForeccast...</span>
      </div>
    );

  return (
    <div
      className="px-4 py-4 text-white"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderRadius: "16px",
        border: "2px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Hourly Forecast</h5>
        <span className="small text-white-50">Next 24 Hours</span>
      </div>

      <div
        className="d-flex gap-3 overflow-auto pb-2 custom-scrollbar"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              height: 6px;
            }
            div::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.02);
              border-radius: 10px;
            }
            div::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.2);
              border-radius: 10px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 193, 7, 0.5);
            }
          `}
        </style>

        {/* 1. بطاقة "الآن" (Now) */}
        <div
          className="d-flex flex-column align-items-center justify-content-between p-3 rounded-4 flex-shrink-0 text-center"
          style={{
            minWidth: "100px",
            backgroundColor: "rgba(255, 193, 7, 0.12)",
            border: "1px solid rgba(255, 193, 7, 0.4)",
          }}
        >
          <span className="small text-warning fw-bold mb-1">Now</span>

          {weatherData.current?.weather?.[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
              alt="weather icon"
              style={{ width: "40px", height: "40px" }}
            />
          )}

          <span
            className="small text-white-50 text-capitalize my-1"
            style={{ fontSize: "11px" }}
          >
            {weatherData.current?.weather?.[0]?.description || ""}
          </span>

          <span className="fw-bold fs-5">
            {Math.round(weatherData.current.temp)}°
          </span>
        </div>

        {/* 2. باقي الساعات القادمة */}
        {weatherData.hourly.slice(0, 7).map((item, index) => {
          const dateObj = new Date(item.dt * 1000);
          const formattedTime = dateObj.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          });

          const iconCode = item.weather?.[0]?.icon;
          const description = item.weather?.[0]?.description;
          const temp = Math.round(item.main.temp);

          return (
            <div
              key={index}
              className="d-flex flex-column align-items-center justify-content-between p-3 rounded-4 flex-shrink-0 text-center"
              style={{
                minWidth: "100px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <span className="small text-white-50 fw-semibold mb-1">
                {formattedTime}
              </span>

              {iconCode && (
                <img
                  src={`https://openweathermap.org/img/wn/${iconCode}.png`}
                  alt="weather icon"
                  style={{ width: "40px", height: "40px" }}
                />
              )}

              <span
                className="small text-white-50 text-capitalize my-1"
                style={{ fontSize: "11px" }}
              >
                {description}
              </span>

              <span className="fw-bold fs-5">{temp}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
