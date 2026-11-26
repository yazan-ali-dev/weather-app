import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeatherData } from "../../services/weatherService";
import {
  getStoredCurrentCity,
  getStoredRecentSearches,
  getStoredFavorites,
  setStoredCurrentCity,
  setStoredRecentSearches,
  setStoredFavorites,
} from "../../services/storageService";

export const getWeatherByCity = createAsyncThunk(
  "weather/getWeatherByCity",
  async (cityName, thunkAPI) => {
    try {
      const data = await fetchWeatherData(cityName, thunkAPI.signal);
      return data;
    } catch (error) {
      if (
        thunkAPI.signal.aborted ||
        error?.name === "CanceledError" ||
        error?.name === "AbortError" ||
        error?.message === "canceled" ||
        error?.message?.toLowerCase().includes("abort")
      ) {
        return thunkAPI.rejectWithValue({ isCancelled: true });
      }
      return thunkAPI.rejectWithValue({
        isCancelled: false,
        message: error.message || "Failed to fetch weather data.",
      });
    }
  },
);

const initialState = {
  currentCity: getStoredCurrentCity(),
  weatherData: null,
  favorites: getStoredFavorites(),
  recentSearches: getStoredRecentSearches(),
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentCity: (state, action) => {
      const newCity = action.payload;

      const filteredSearches = state.recentSearches.filter(
        (city) => city.toLowerCase() !== newCity.toLowerCase(),
      );

      const updatedSearches = [newCity, ...filteredSearches].slice(0, 5);

      setStoredCurrentCity(newCity);
      setStoredRecentSearches(updatedSearches);

      state.currentCity = newCity;
      state.recentSearches = updatedSearches;
    },

    addToFavorite: (state, action) => {
      const updatedFavorites = [action.payload, ...state.favorites];
      setStoredFavorites(updatedFavorites);
      state.favorites = updatedFavorites;
    },

    removeFromFavorite: (state, action) => {
      const updatedFavorites = state.favorites.filter(
        (fav) => fav !== action.payload,
      );
      setStoredFavorites(updatedFavorites);
      state.favorites = updatedFavorites;
    },

    removeFromRecent: (state, action) => {
      const updatedRecent = state.recentSearches.filter(
        (re) => re !== action.payload,
      );
      setStoredRecentSearches(updatedRecent);
      state.recentSearches = updatedRecent;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.weatherData = action.payload;
      })
      .addCase(getWeatherByCity.rejected, (state, action) => {
        state.loading = false;

        if (action.meta?.aborted || action.payload?.isCancelled) {
          return;
        }

        state.weatherData = null;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to fetch weather data.";
      });
  },
});

export const {
  setCurrentCity,
  addToFavorite,
  removeFromFavorite,
  removeFromRecent,
} = weatherSlice.actions;

export default weatherSlice.reducer;
