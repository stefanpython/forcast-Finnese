import { useState, useEffect } from "react";
import "./Weather.css";
import PropTypes from "prop-types";

function Weather({ city }) {
  const [weatherData, setWeatherData] = useState("");
  const [isMetric, setIsMetric] = useState(true);

  function formatDate(dateString) {
    const options = {
      weekday: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Change from kmh/C to mph/F
  const handleTempChange = () => {
    setIsMetric(!isMetric);
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = () => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error("Network response failed");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
      });
  };

  console.log(weatherData);

  return (
    <div className="weather-container">
      {weatherData && (
        <div className="weather-content">
          <br />
          <button className="toggle-btn" onClick={handleTempChange}>
            {isMetric ? `Mph - °F` : `Km/h - °C`}
          </button>

          <h2 className="location">
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <h4>
            {new Date(weatherData.location.localtime).toLocaleDateString(
              undefined,
              {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </h4>

          <div className="temp-box">
            <img
              className="condition-icon"
              src={`https:${weatherData.current.condition.icon}`}
              alt={weatherData.current.condition.text}
            />
            <h3 className="current-temp">
              {" "}
              {isMetric
                ? `${weatherData.current.temp_c}°C`
                : `${weatherData.current.temp_f}°F`}
            </h3>
          </div>

          <h3>{weatherData.current.condition.text}</h3>
          <h4>
            Feels Like:{" "}
            {isMetric
              ? `${weatherData.current.feelslike_c}°C`
              : `${weatherData.current.feelslike_f}°F`}
          </h4>

          <hr />

          <div className="info-container">
            <div className="info-box">
              <div className="box">
                <span>Humidity:</span>
                <h3>{weatherData.current.humidity}%</h3>
              </div>

              <div className="box">
                <span>UV Index:</span>
                <h3>{weatherData.current.uv}</h3>
              </div>

              <div className="box">
                <span>Visibility:</span>
                <h3>
                  {isMetric
                    ? `${weatherData.current.vis_km} km`
                    : `${weatherData.current.vis_miles} miles`}
                </h3>
              </div>

              <div className="box">
                <span>Chance of Rain: </span>
                <h3>
                  {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}
                  %
                </h3>
              </div>

              <div className="box">
                <span>Sunrise: </span>
                <h3>{weatherData.forecast.forecastday[0].astro.sunrise}</h3>
              </div>

              <div className="box">
                <span>Sunset:</span>{" "}
                <h3>{weatherData.forecast.forecastday[0].astro.sunset}</h3>
              </div>

              <div className="box">
                <span>Wind:</span>
                <h3>
                  {weatherData.current.wind_dir} at{" "}
                  {isMetric
                    ? `${weatherData.current.wind_kph} km/h`
                    : `${weatherData.current.wind_mph} mph`}
                </h3>
              </div>

              <div className="box">
                <span>Moonrise: </span>
                <h3>{weatherData.forecast.forecastday[0].astro.moonrise}</h3>
              </div>

              <div className="box">
                <span>Moonset:</span>{" "}
                <h3>{weatherData.forecast.forecastday[0].astro.moonset}</h3>
              </div>
            </div>
          </div>

          <h2>Weekly Forecast</h2>
          <div className="forecast-days">
            {weatherData.forecast.forecastday.slice(1).map((day, index) => (
              <div key={index} className="forecast-day">
                <div className="day-icon">
                  <h3>{formatDate(day.date)}</h3>
                  <img
                    className="forecast-icon"
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                  />
                </div>
                <h4 className="max-temp">
                  {isMetric
                    ? `${day.day.maxtemp_c}°C`
                    : `${day.day.maxtemp_f}°F`}
                </h4>
                <h4 className="min-temp">
                  {isMetric
                    ? `${day.day.mintemp_c}°C`
                    : `${day.day.mintemp_f}°F`}
                </h4>
                <h4>
                  Wind:{" "}
                  {isMetric
                    ? `${day.day.maxwind_kph} km/h`
                    : `${day.day.maxwind_mph} mph`}
                </h4>
                <h4>Rain: {day.day.daily_chance_of_rain}%</h4>

                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;

Weather.propTypes = {
  city: PropTypes.string.isRequired,
};

// Change temps color in weekly forecast
