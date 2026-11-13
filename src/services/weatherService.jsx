import axios from "axios";

const API_KEY = "e1d493412db6daee04c14a81e28366aa";

function formatCityName(city) {
  if (!city) return "";
  const trimmed = city.trim().toLowerCase();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export async function fetchWeatherData(cityName) {
  const formattedCity = formatCityName(cityName);

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: { q: formattedCity, units: "metric", appid: API_KEY },
      }),
      axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: { q: formattedCity, units: "metric", appid: API_KEY },
      }),
    ]);

    const { lat, lon } = currentResponse.data.coord;

    const airQualityResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution`,
      {
        params: { lat, lon, appid: API_KEY },
      },
    );

    return {
      cityName: currentResponse.data.name,
      coord: {
        lat: currentResponse.data.coord.lat,
        lon: currentResponse.data.coord.lon,
      },
      country: currentResponse.data.sys.country,
      timezone: currentResponse.data.timezone,
      current: {
        temp: currentResponse.data.main.temp,
        feels_like: currentResponse.data.main.feels_like,
        humidity: currentResponse.data.main.humidity,
        pressure: currentResponse.data.main.pressure,
        wind_speed: currentResponse.data.wind.speed,
        uvi: 3,
        weather: currentResponse.data.weather,
      },
      airQuality: airQualityResponse.data.list[0],
      //كل عنصر يمثل توقع لثلاث ساعات
      hourly: forecastResponse.data.list.slice(0, 8),
      daily: forecastResponse.data.list.filter((_, index) => index % 8 === 0),
    };
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error(
        "Network timeout: Connection took too long. Please check your network.",
      );
    }
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch weather data.",
    );
  }
}
