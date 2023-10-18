import { useState, useEffect } from "react";
import "./Weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    const apiKey = "3ba340eb358c48d08ae154329231810";
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=New York`;

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
    </div>
  );
}

export default Weather;
