// src/components/ErrorCard.jsx
import React from "react";

export default function ErrorCard({ message }) {
  return (
    <div className="d-flex justify-content-center align-items-center py-5 my-3">
      <div
        className="card bg-dark border-danger border-opacity-50 text-light shadow-lg p-4 text-center"
        style={{ maxWidth: "460px", width: "100%", borderRadius: "16px" }}
      >
        <div className="card-body">
          {/* Warning Icon */}
          <div className="mb-3 text-danger">
            <i
              className="bi bi-exclamation-triangle-fill"
              style={{ fontSize: "2.8rem" }}
            ></i>
          </div>

          <h5 className="card-title text-danger fw-bold mb-2">
            Something Went Wrong
          </h5>

          {/* Dynamic Error Message */}
          <p className="card-text text-secondary mb-0">
            {message || "Unable to fetch weather data. Please try again."}
          </p>
        </div>
      </div>
    </div>
  );
}
