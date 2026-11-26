import { createSlice } from "@reduxjs/toolkit";

const SIDEBAR_STORAGE_KEY = "weather_app_sidebar_is_open";

function getInitialSidebarState() {
  try {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (saved === null) return false;
    return JSON.parse(saved);
  } catch {
    return false;
  }
}

function saveSidebarState(isOpen) {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isOpen));
  } catch {}
}

const initialState = {
  isOpen: getInitialSidebarState(),
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
      saveSidebarState(state.isOpen);
    },
    openSidebar: (state) => {
      state.isOpen = true;
      saveSidebarState(state.isOpen);
    },
    closeSidebar: (state) => {
      state.isOpen = false;
      saveSidebarState(state.isOpen);
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
