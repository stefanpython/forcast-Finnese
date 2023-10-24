import { useState, useEffect } from "react";
import "./Weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    const apiKey = "3ba340eb358c48d08ae154329231810";
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Vietnam&days=7`;

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
          <h2>
            Location: {weatherData.location.name},{" "}
            {weatherData.location.country}
          </h2>
          <h4>{weatherData.location.localtime}</h4>

          <div className="temp-box">
            <img
              className="condition-icon"
              src={`https:${weatherData.current.condition.icon}`}
              alt={weatherData.current.condition.text}
            />
            <h3 className="current-temp"> {weatherData.current.temp_c}°C</h3>
          </div>

          <h3>{weatherData.current.condition.text}</h3>
          <h4>Feels Like: {weatherData.current.feelslike_c}°C</h4>

          <hr />

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
              <h3>{weatherData.current.vis_km} km</h3>
            </div>

            <div className="box">
              <span>Wind:</span>
              <h3>
                {weatherData.current.wind_dir} at {weatherData.current.wind_kph}{" "}
                km/h
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
              <span>Chance of Rain: </span>
              <h3>
                {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%
              </h3>
            </div>

            <div className="box">
              <h3>
                <span> </span>
                {weatherData.forecast.forecastday[0].astro.moon_phase}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
