import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from "../assets/weather-banner.png";
import WeatherCard from "./WeatherCard";
import {
  clearWeatherData,
  fetchWeatherData,
} from "../redux/features/weatherSlice";

const Weather = () => {
  const { weatherData } = useSelector((state) => state.weather);
  console.log(weatherData);
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleWeather = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    dispatch(fetchWeatherData(city));
    setCity("");
  };
  return (
    <div className="bg-blue-300">
      <div className="min-h-screen text-center pt-10">
        <h2 className="text-2xl font-bold">Weather Dashboard</h2>
        <p className="text-md bg-red-600 max-w-lg text-white mx-auto ">
          Fetch weather from different city using redux toolkit and redux thunk
        </p>
        <div className="text-center items-center flex justify-center pt-8">
          {" "}
          <img src={banner} alt="" />
        </div>
        <form onSubmit={handleWeather} className="space-x-2 py-8">
          <input
            value={city}
            type="text"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            className="border w-1/2 border-gray-200 py-1 px-4 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 cursor-pointer"
          >
            Search City
          </button>
          <button
            type="button"
            onClick={() => dispatch(clearWeatherData())}
            className="bg-red-600 px-4 py-1 text-white cursor-pointer"
          >
            Clear
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl  mx-auto">
          {weatherData.map((weather, index) => (
            <WeatherCard weather={weather} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
