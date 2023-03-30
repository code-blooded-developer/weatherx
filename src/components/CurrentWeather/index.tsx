import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  TempSwitch,
} from "./styled";

import WeatherIcon from "../WeatherIcon";
import Temperature from "../Temperature";

import { AppStore } from "@/store/store";
import { changeTempUnit } from "@/store/reducers/appReducer";
import { kmToMile, TempUnit } from "@/utils/unitConversion";

import HighIcon from "@/assets/high-icon.svg";
import LowIcon from "@/assets/low-icon.svg";
import HumidityIcon from "@/assets/humidity-icon.svg";
import PressureIcon from "@/assets/pressure-icon.svg";
import WindIcon from "@/assets/wind-icon.svg";

const CurrentWeather: React.FC = () => {
  const { weather, isInitial, isError, degreeType } = useSelector(
    (store: AppStore) => ({
      weather: store.weather.weatherData,
      isInitial: store.app.isInitial,
      isError: store.weather.isError,
      degreeType: store.app.tempUnit,
    })
  );
  const dispatch = useDispatch();

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
        <TempSwitch
          checkedChildren="C"
          unCheckedChildren="F"
          onClick={() => dispatch(changeTempUnit())}
        />
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
              <span>
                {degreeType === TempUnit.CELCIUS
                  ? weather.wind.speed
                  : kmToMile(weather.wind.speed)}
                {degreeType === TempUnit.CELCIUS ? "kph" : "mph"}
              </span>
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
