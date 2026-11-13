import {
  getStoredCurrentCity,
  getStoredRecentSearches,
  getStoredFavorites,
  setStoredCurrentCity,
  setStoredRecentSearches,
  setStoredFavorites,
} from "../services/storageService";

export const initialWeatherState = {
  currentCity: getStoredCurrentCity(),
  weatherData: null,
  favorites: getStoredFavorites(),
  recentSearches: getStoredRecentSearches(),
  loading: false,
  error: null,
};

export function weatherReducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_CITY": {
      const newCity = action.payload;

      const filteredSearches = state.recentSearches.filter(
        (city) => city.toLowerCase() !== newCity.toLowerCase(),
      );

      const updatedSearches = [newCity, ...filteredSearches].slice(0, 5);

      setStoredCurrentCity(newCity);
      setStoredRecentSearches(updatedSearches);

      return {
        ...state,
        currentCity: newCity,
        recentSearches: updatedSearches,
      };
    }

    // بدء طلب الـ API
    case "FETCH_WEATHER_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    // نجاح الجلب وحفظ البيانات
    case "FETCH_WEATHER_SUCCESS":
      return {
        ...state,
        loading: false,
        weatherData: action.payload,
        error: null,
      };

    // فشل الجلب وحفظ الخطأ
    case "FETCH_WEATHER_FAILURE":
      return {
        ...state,
        loading: false,
        weatherData: null,
        error: action.payload,
      };

    // إضافة الى المفضلة
    case "ADD_TO_FAVORITE": {
      setStoredFavorites([action.payload, ...state.favorites]);

      return {
        ...state,
        favorites: [action.payload, ...state.favorites],
      };
    }

    // إزالة من المفضلة
    case "REMOVE_FROM_FAVORITE": {
      setStoredFavorites(
        state.favorites.filter((fav) => fav !== action.payload),
      );
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav !== action.payload),
      };
    }
    case "REMOVE_FROM_RECENT": {
      setStoredRecentSearches(
        state.recentSearches.filter((re) => re !== action.payload),
      );
      return {
        ...state,
        recentSearches: state.recentSearches.filter(
          (re) => re !== action.payload,
        ),
      };
    }
  }
}
