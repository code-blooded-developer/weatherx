import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  WeatherContainer,
  SectionTitle,
  CurrentWeatherContainer,
  CurrentWeatherStatus,
  CurrentWeatherInfo,
  FeelsLike,
  HighLowContainer,
  WeatherDegree,
  InfoRow,
} from "./styled";

import WeatherIcon from "../WeatherIcon";
import Temperature from "../Temperature";

import { AppStore } from "@/store/store";

import HighIcon from "@/assets/high-icon.svg";
import LowIcon from "@/assets/low-icon.svg";
import HumidityIcon from "@/assets/humidity-icon.svg";
import PressureIcon from "@/assets/pressure-icon.svg";
import WindIcon from "@/assets/wind-icon.svg";

const CurrentWeather: React.FC = () => {
  const { weather, isInitial, isError } = useSelector((store: AppStore) => ({
    weather: store.weather.weatherData,
    isInitial: store.app.isInitial,
    isError: store.weather.isError,
  }));

  useEffect(() => {
    if (isError) {
      console.log("Cannot load weather for this place");
    }
  }, [isError]);

  if (isInitial) return <></>;

  return (
    <WeatherContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SectionTitle>Current Weather</SectionTitle>
      </div>
      {weather && (
        <CurrentWeatherContainer>
          <CurrentWeatherStatus>
            <h4>{weather.name}</h4>
            <div style={{ display: "flex", alignItems: "center" }}>
              <WeatherIcon code={weather.weather.id} big />
              <span>
                <Temperature value={weather.main.temp} />
              </span>
            </div>
            <h6>{weather.weather.description}</h6>
          </CurrentWeatherStatus>
          <CurrentWeatherInfo>
            <FeelsLike>
              Feels like <Temperature value={weather.main.feels_like} />
            </FeelsLike>
            <HighLowContainer>
              <WeatherDegree>
                <HighIcon />
                <Temperature value={weather.main.temp_max} />
              </WeatherDegree>
              <WeatherDegree>
                <LowIcon />
                <Temperature value={weather.main.temp_min} />
              </WeatherDegree>
            </HighLowContainer>
            <InfoRow>
              <div>
                <HumidityIcon /> Humidity
              </div>
              <span>{weather.main.humidity}%</span>
            </InfoRow>
            <InfoRow>
              <div>
                <WindIcon />
                Wind
              </div>
              <span>{weather.wind.speed}kph</span>
            </InfoRow>
            <InfoRow>
              <div>
                <PressureIcon />
                Pressure
              </div>
              <span>{weather.main.pressure}hPa</span>
            </InfoRow>
          </CurrentWeatherInfo>
        </CurrentWeatherContainer>
      )}
    </WeatherContainer>
  );
};

export default CurrentWeather;
