import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";

// مكون مساعدة داخلي لتحديث مركز الخريطة برمجياً كلما تغيرت الإحداثيات
function MapUpdater({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export default function WeatherMap() {
  const weatherData = useSelector((state) => state.weather.weatherData);

  // إحداثيات افتراضية (بانياس) في حال لم تكن البيانات قد وصلت بعد
  const defaultPosition = [35.1833, 35.95];

  // إذا كانت البيانات موجودة، نأخذ الإحداثيات منها، وإلا فنستعمل الافتراضية
  const currentPosition = weatherData?.coord
    ? [weatherData.coord.lat, weatherData.coord.lon]
    : defaultPosition;

  const locationName = weatherData
    ? `${weatherData.cityName}, ${weatherData.country}`
    : "Baniyas";

  return (
    <div
      className="p-3 text-white h-100 d-flex flex-column"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        minHeight: "350px",
      }}
    >
      {/* العنوان */}
      <h5 className="fw-bold mb-3">Weather Map</h5>

      {/* حاوية الخريطة */}
      <div
        className="flex-grow-1 position-relative"
        style={{ borderRadius: "12px", overflow: "hidden", minHeight: "280px" }}
      >
        <MapContainer
          center={currentPosition}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          {/* مكون لتحديث تمركز الخريطة عند تغيير المدينة */}
          <MapUpdater center={currentPosition} />

          {/* طبقة الخريطة بنمط ملائم */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          {/* الإبرة (Marker) فوق المدينة الحالية */}
          <Marker position={currentPosition}>
            <Popup>{locationName}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
