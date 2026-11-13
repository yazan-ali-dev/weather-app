import { Form, InputGroup } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSidebar } from "../contexts/SideBarContext";
import { useState, useEffect } from "react";
import { useWeather } from "../contexts/WeatherContext";

function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const { toggleSidebar } = useSidebar();
  const { dispatch } = useWeather();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // تنسيق الوقت
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // تنسيق التاريخ
  const dateString = currentTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // function for send request
  function handleSerach() {
    const res = searchTerm.trim();
    if (!res) return;

    dispatch({ type: "SET_CURRENT_CITY", payload: res });
    setSearchTerm("");
  }

  return (
    <div
      className="d-flex align-items-center justify-content-between mb-4 px-3 py-2"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "2px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="d-flex align-items-center">
        <i
          className="bi bi-list fs-3 text-white"
          style={{ cursor: "pointer" }}
          onClick={() => {
            toggleSidebar();
          }}
        ></i>
      </div>

      <div className="flex-grow-1 mx-4" style={{ maxWidth: "500px" }}>
        <InputGroup
          className="rounded-pill overflow-hidden border-0"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <InputGroup.Text className="bg-transparent border-0 text-white-50 ps-3">
            <i
              className="bi bi-search"
              onClick={handleSerach}
              style={{ cursor: "pointer" }}
            ></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="Search City..."
            aria-label="Search City"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            className="bg-transparent border-0 text-white shadow-none ps-0"
            style={{ color: "#fff" }}
          />
        </InputGroup>
      </div>

      <div className="text-end d-none d-md-block">
        <div className="text-white fw-bold" style={{ fontSize: "0.95rem" }}>
          {timeString}
        </div>
        <div className="text-white-50" style={{ fontSize: "0.75rem" }}>
          {dateString}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
