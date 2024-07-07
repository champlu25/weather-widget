import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "../textField/TextField";
import "./widget.css";
import { weatherService } from "../../services/weather.service";
import { ClockLoader } from "react-spinners";

export const Widget = ({ darkMode }) => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationMessage, setLocationMessage] = useState("");

  useEffect(() => {
    const fetchWeatherByGeolocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setIsLoading(true);
            try {
              const weather = await weatherService.getWeatherByCoords(
                latitude,
                longitude
              );
              setWeather(weather);
              setLocationMessage("Ваше местоположение:");
            } catch (err) {
              console.error("Ошибка при получении погоды по координатам:", err);
              setError("Не удалось получить погоду по вашей геолокации.");
            } finally {
              setIsLoading(false);
            }
          },
          (error) => {
            console.error("Ошибка при получении геолокации:", error);
            setError("Не удалось получить вашу геолокацию.");
            setIsLoading(false);
          }
        );
      }
    };

    fetchWeatherByGeolocation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) {
      setWeather(null);
      return;
    }
    setIsLoading(true);
    try {
      const weather = await weatherService.getWeather(search);
      setWeather(weather);
      setLocationMessage(""); // Очищаем сообщение о местоположении при поиске по городу
    } catch (err) {
      console.error("Ошибка при получении погоды по городу:", err);
      setError("Не удалось получить погоду для этого города.");
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className={`widget ${darkMode ? "dark-mode" : ""}`}>
      <form className="widget__form" onSubmit={handleSubmit}>
        <h2 className="widget__welcome">Узнайте погоду в любом городе мира!</h2>
        <p className="widget__instructions">
          Введите название города и нажмите Отправить, чтобы узнать текущую
          погоду.
        </p>
        <TextField
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Например: Москва"
        />

        {isLoading ? (
          <ClockLoader
            className="loader"
            size={150}
            color="rgba(114, 11, 244, 1)"
          />
        ) : (
          <>
            {error && <p className="widget__error">{error}</p>}
            {weather && (
              <>
                {locationMessage && (
                  <p className="widget__location-message">{locationMessage}</p>
                )}
                <h2 className="widget__title">{weather.name}</h2>
                <img
                  className="widget__image"
                  src={getWeatherIcon(weather.weather[0].icon)}
                  alt="weather"
                />
                <div className="widget__info">
                  <div className="widget__info__feels">
                    <span>Чувствуется как</span>
                    <span>{weather.main.feels_like.toFixed()}&deg;C</span>
                  </div>
                  <div className="widget__info__temp">
                    <span>Температура</span>
                    <span>{weather.main.temp.toFixed()}&deg;C</span>
                  </div>
                  <div className="widget__info__hum">
                    <span>Влажность</span>
                    <span>{weather.main.humidity}&deg;%</span>
                  </div>
                </div>
                <p className="widget__description">
                  {weather.weather[0].description}
                </p>
              </>
            )}
          </>
        )}

        <button className="widget__submit">Отправить</button>
      </form>
    </div>
  );
};

Widget.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};
