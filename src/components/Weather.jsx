import { useState, useEffect } from "react";
import "./Weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    const apiKey = "3ba340eb358c48d08ae154329231810";
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Berlin&days=7`;

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

          <h3>Temperature: {weatherData.current.temp_c}°C</h3>
          <h3>Feels Like: {weatherData.current.feelslike_c}°C</h3>

          <div className="info-box">
            <div className="box">
              <h3>
                <span>Humidity:</span> {weatherData.current.humidity}%
              </h3>
            </div>

            <div className="box">
              <h3>
                <span>UV Index:</span> {weatherData.current.uv}
              </h3>
            </div>

            <div className="box">
              <h3>
                <span>Visibility:</span> {weatherData.current.vis_km} km
              </h3>
            </div>

            <div className="box">
              <h3>
                <span>Wind:</span> {weatherData.current.wind_dir} at{" "}
                {weatherData.current.wind_kph} km/h
              </h3>
            </div>

            <div className="box">
              <h3>
                <span>Sunrise: </span>
                {weatherData.forecast.forecastday[0].astro.sunrise}
              </h3>
            </div>

            <div className="box">
              <h3>
                <span>Sunset:</span>{" "}
                {weatherData.forecast.forecastday[0].astro.sunset}
              </h3>
            </div>

            <div className="box">
              <h3>
                <span>Chance of Rain: </span>
                {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%
              </h3>
            </div>
          </div>

          <h3>Condition: {weatherData.current.condition.text}</h3>
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
          />
        </div>
      )}
    </div>
  );
}

export default Weather;
