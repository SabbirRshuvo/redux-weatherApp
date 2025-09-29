import React from "react";

const WeatherCard = ({ weather }) => {
  console.log(weather);
  const {
    name,
    sys = {},
    main = {},
    weather: weatherInfo = [],
    wind = {},
  } = weather;
  const country = sys.country;
  const temp = main.temp;
  const feels_like = main.feels_like;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const weatherMain = weatherInfo[0] || {};
  const iconUrl = weatherMain.icon
    ? `https://openweathermap.org/img/wn/${weatherMain.icon}@2x.png`
    : null;

  return (
    <div className="  w-full bg-white rounded-xl shadow p-6 ">
      <h2 className="text-2xl font-bold">
        {name} {country ? `, ${country}` : ""}
      </h2>
      <p className="text-sm text-gray-500">{weatherMain.description}</p>

      {iconUrl && <img src={iconUrl} alt={weatherMain.description} />}

      <p className="text-4xl font-semibold">{Math.round(temp)}°C</p>
      <p className="text-sm">Feels like {Math.round(feels_like)}°C</p>
      <p className="text-sm">Humidity: {humidity}%</p>
      <p className="text-sm">Wind: {windSpeed} m/s</p>
    </div>
  );
};

export default WeatherCard;
