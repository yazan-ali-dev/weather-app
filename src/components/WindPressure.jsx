import { useSelector } from "react-redux";

export default function WindPressure() {
  const weatherData = useSelector((state) => state.weather.weatherData);

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
        <span className="small text-white-50">Loading Wind & Pressure...</span>
      </div>
    );
  }

  const windSpeed = Math.round(weatherData.current.wind_speed);
  const windDeg = weatherData.current.wind_deg || 0;
  const pressure = weatherData.current.pressure;

  const getWindDirection = (deg) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round((deg % 360) / 22.5);
    return directions[index % 16];
  };

  const windDirectionText = getWindDirection(windDeg);

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
      <h6 className="fw-bold mb-2">Wind & Pressure</h6>

      {/* محتوى الكرت مقسم إلى قسمين (رياح وضغط) */}
      <div className="row text-center g-2 align-items-center my-auto">
        {/* قسم الرياح */}
        <div className="col-6 border-end border-light border-opacity-10">
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center gap-1 text-white-50 small mb-1">
              <i className="bi bi-wind fs-5"></i>
              <span>Wind</span>
            </div>
            <span className="fw-bold fs-5">
              {windSpeed} <span className="fs-6 fw-normal">km/h</span>
            </span>
            <span className="text-info small fw-semibold">
              {windDirectionText}
            </span>
          </div>
        </div>

        {/* قسم الضغط الجوي */}
        <div className="col-6">
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex align-items-center gap-1 text-white-50 small mb-1">
              <i className="bi bi-speedometer2 fs-5"></i>
              <span>Pressure</span>
            </div>
            <span className="fw-bold fs-5">{pressure}</span>
            <span className="text-white-50 small">hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
