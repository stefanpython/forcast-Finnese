import { useState, useEffect } from "react";
import "./Weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    const apiKey = "3ba340eb358c48d08ae154329231810";
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=London&days=7`;

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
      <h1>Wheather fetch</h1>

      {weatherData && (
        <div>
          <h2>Location: {weatherData.location.name}</h2>
          <h3>Region: {weatherData.location.region}</h3>
          <h3>Country: {weatherData.location.country}</h3>
          <h3>Local time: {weatherData.location.localtime}</h3>
          <h3>Temperature: {weatherData.current.temp_c}°C</h3>
          <h3>Feels Like: {weatherData.current.feelslike_c}°C</h3>

          <h3>Humidity: {weatherData.current.humidity}%</h3>
          <h3>UV Index: {weatherData.current.uv}</h3>
          <h3>Visibility: {weatherData.current.vis_km} km</h3>
          <h3>
            Wind: {weatherData.current.wind_dir} at{" "}
            {weatherData.current.wind_kph} km/h
          </h3>

          <h3>Sunrise: {weatherData.forecast.forecastday[0].astro.sunrise}</h3>
          <h3>Sunset: {weatherData.forecast.forecastday[0].astro.sunset}</h3>

          <div>
            <h3>
              Chance of Rain:{" "}
              {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%
            </h3>
            <h3>
              Will It Rain?{" "}
              {weatherData.forecast.forecastday[0].day.daily_will_it_rain
                ? "Yes"
                : "No"}
            </h3>
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
