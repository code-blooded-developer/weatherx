import React from "react";
import { useSelector } from "react-redux";

import Temperature from "../Temperature";
import WeatherIcon from "../WeatherIcon";

import { AppStore } from "@/store/store";
import {
  ForecastContainer,
  ForecastItems,
  SectionTitle,
  ForecastItemContainer,
} from "./styled";

const Forecast: React.FC = () => {
  const { forecast, isInitial } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
    isInitial: state.app.isInitial,
    forecast: state.weather.extendedWeatherData,
  }));

  if (isInitial) return <></>;

  const renderForecastItem = () => {
    return forecast.map((item, i) => {
      return (
        <ForecastItemContainer key={i}>
          <h6>{item.day}</h6>
          <WeatherIcon code={item.weather.id} />
          <p>{item.weather.main}</p>
          <span>
            <Temperature value={item.temp.temp_max} />
            <small>/</small>
            <Temperature value={item.temp.temp_min} />
          </span>
        </ForecastItemContainer>
      );
    });
  };

  return (
    <ForecastContainer>
      <SectionTitle>New Week Weather</SectionTitle>
      <ForecastItems></ForecastItems>
    </ForecastContainer>
  );
};

export default Forecast;
