import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  defaultLatitude,
  defaultLongitude,
} from "../constants/commonCoordinates";
import { WeatherDescriptions as weatherDescKo } from "../constants/data/WeatherDescriptions";
import { Color } from "../constants/style/Color";

const Weather = () => {
  const API_KEY = process.env.REACT_APP_WEATHER_KEY;
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
    description: "",
    icon: "",
  });

  const getWeather = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const weatherKo = weatherDescKo[response.data.weather[0].id];
      const weatherIcon = response.data.weather[0].icon;
      const weatherIconAddress = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      const temp = Math.round(response.data.main.temp);

      setWeatherData({
        description: weatherKo,
        temp,
        temp_max: response.data.main.temp_max,
        temp_min: response.data.main.temp_min,
        humidity: response.data.main.humidity,
        icon: weatherIconAddress,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getWeather(defaultLatitude, defaultLongitude);
  }, []);

  return (
    <WeatherWrapper>
      {weatherData.icon && (
        <>
          <WeatherIcon src={weatherData.icon} alt="weather icon" />
          <WeatherDescription>{weatherData.description}</WeatherDescription>
          <Temperature>{weatherData.temp.toFixed(1)}°C</Temperature>
          <TemperatureRange>
            최고: {weatherData.temp_max.toFixed(1)}°C / 최저:{" "}
            {weatherData.temp_min.toFixed(1)}°C
          </TemperatureRange>
          <HumidityInfo>습도: {weatherData.humidity}%</HumidityInfo>
        </>
      )}
    </WeatherWrapper>
  );
};

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid ${Color.Gray30};
  border-radius: 8px;
  margin-bottom: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

const WeatherDescription = styled.div`
  font-size: 20px;
  margin-top: 5px;
  font-weight: bold;
`;

const Temperature = styled.div`
  font-size: 28px;
  margin-top: 10px;
  font-weight: bold;
`;

const TemperatureRange = styled.div`
  font-size: 18px;
  margin-top: 5px;
`;

const HumidityInfo = styled.div`
  font-size: 18px;
  margin-top: 5px;
`;

export default Weather;
