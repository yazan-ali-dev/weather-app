import "./App.css";
import WeatherDashboard from "./components/WeatherDashboard";
import SidebarProvider from "./contexts/SideBarContext";
import WeatherProvider from "./contexts/WeatherContext";

function App() {
  return (
    <SidebarProvider>
      <WeatherProvider>
        <WeatherDashboard />
      </WeatherProvider>
    </SidebarProvider>
  );
}

export default App;
