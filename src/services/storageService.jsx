const CURRENT_CITY_KEY = "weather_current_city";
const RECENT_SEARCHES_KEY = "weather_recent_searches";
const FAVORITES_KEY = "weather_favorites";

// --- دوال القراءة (Getters) ---
export const getStoredCurrentCity = () => {
  return localStorage.getItem(CURRENT_CITY_KEY) || "Baniyas";
};

export const getStoredRecentSearches = () => {
  const data = localStorage.getItem(RECENT_SEARCHES_KEY);
  return data ? JSON.parse(data) : [];
};

export const getStoredFavorites = () => {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

// --- دوال الكتابة والتخزين (Setters) ---
export const setStoredCurrentCity = (city) => {
  localStorage.setItem(CURRENT_CITY_KEY, city);
};

export const setStoredRecentSearches = (searchesArray) => {
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searchesArray));
};

export const setStoredFavorites = (favoritesArray) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesArray));
};
