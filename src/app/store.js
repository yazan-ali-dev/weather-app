import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import weatherReducer from "../features/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    weather: weatherReducer,
  },
});
