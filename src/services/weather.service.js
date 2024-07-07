import axios from "axios";

export const weatherService = {
  async getWeather(cityName) {
    try {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            appid: "3a1f4514c24ab191b26f378bdbf6406a",
            q: cityName,
            lang: "ru",
            units: "metric",
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Ошибка при получении погоды по городу:", error);
      throw error;
    }
  },

  async getWeatherByCoords(latitude, longitude) {
    try {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            appid: "3a1f4514c24ab191b26f378bdbf6406a",
            lat: latitude,
            lon: longitude,
            lang: "ru",
            units: "metric",
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Ошибка при получении погоды по координатам:", error);
      throw error;
    }
  },
};
