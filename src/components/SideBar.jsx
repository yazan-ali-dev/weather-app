import { useWeather } from "../contexts/WeatherContext";

export default function SideBar() {
  const { state, dispatch } = useWeather();
  const { favorites, recentSearches } = state;

  return (
    <div
      className="p-3 text-white"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "2px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div>
        {/* --- قسم المفضلة Favorites --- */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0 text-white">Favorites</h6>
          </div>

          {favorites.length > 0 ? (
            <ul className="list-unstyled mb-0">
              {favorites.map((city, index) => (
                <li
                  key={index}
                  className="d-flex align-items-center py-2 px-2 gap-2 rounded hover-effect justify-content-between"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch({ type: "SET_CURRENT_CITY", payload: city });
                  }}
                >
                  <div>
                    <i className="bi bi-geo-alt-fill text-warning fs-6 pe-2"></i>
                    <span>{city}</span>
                  </div>

                  <i
                    className="bi bi-trash fs-6 text-white-50 hover-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({
                        type: "REMOVE_FROM_FAVORITE",
                        payload: city,
                      });
                    }}
                  ></i>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white-50 small fst-italic mb-0 px-2">
              No favorite cities added yet.
            </p>
          )}
        </div>

        <hr style={{ borderColor: "rgba(255, 255, 255, 0.5)" }} />

        {/* --- قسم البحوث الأخيرة Recent Searches --- */}
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0 text-white">Recent Searches</h6>
            <i
              className="bi bi-three-dots text-white"
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          {recentSearches.length > 0 ? (
            <ul className="list-unstyled mb-0">
              {recentSearches.map((city, index) => (
                <li
                  key={index}
                  className="d-flex align-items-center py-2 px-2 rounded hover-effect gap-2 justify-content-between"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch({ type: "SET_CURRENT_CITY", payload: city });
                  }}
                >
                  <div>
                    <i className="bi bi-clock-history text-white-50 fs-6 pe-2"></i>
                    <span>{city}</span>
                  </div>

                  <i
                    className="bi bi-trash fs-6 text-white-50 hover-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({
                        type: "REMOVE_FROM_RECENT",
                        payload: city,
                      });
                    }}
                  ></i>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white-50 small fst-italic mb-0 px-2">
              No recent searches found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
