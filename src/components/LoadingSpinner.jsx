// src/components/LoadingSpinner.jsx
import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center py-5 my-5"
      style={{ minHeight: "45vh" }}
    >
      <div className="position-relative d-flex justify-content-center align-items-center mb-3">
        {/* Spinner Border */}
        <Spinner
          animation="border"
          variant="info"
          style={{ width: "4rem", height: "4rem", borderWidth: "0.25em" }}
        />
        {/* Weather Icon */}
        <i
          className="bi bi-cloud-sun-fill text-warning position-absolute"
          style={{ fontSize: "1.5rem" }}
        ></i>
      </div>

      <h5 className="text-light fw-semibold mb-1">Fetching Weather Data...</h5>
      <p className="text-secondary small">Please wait a moment</p>
    </div>
  );
}
