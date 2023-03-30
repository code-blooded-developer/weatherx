import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExtendedForecastData, WeatherData } from "@/types/weather";
import {
  fetchExtendedForecastData,
  fetchWeatherData,
} from "@/services/weather";
import { getNextSevenDays } from "../utils/dateUtils";
import { setIsLoading, setIsInitial } from "./reducers/appReducer";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (
    city: string | { lat: number; lng: number },
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    dispatch(setIsLoading(true));

    try {
      const res = await Promise.all([
        fetchWeatherData(city),
        // fetchExtendedForecastData(city),
        { list: [] },
      ]);
      dispatch(setIsLoading(false));

      if (res[0].cod === 200) {
        dispatch(setIsInitial(false));
        return res;
      }
      return rejectWithValue(res[0].message);
    } catch {
      return rejectWithValue("Error");
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const transformWeatherData = (
  res: any
): {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
} => {
  const weather = res[0] as WeatherData;
  const forecast: ExtendedForecastData[] = [];

  weather.weather = res[0].weather[0];
  weather.main = {
    ...weather.main,
    temp: Math.round(weather.main.temp),
    feels_like: Math.round(weather.main.feels_like),
    temp_max: Math.round(weather.main.temp_max),
    temp_min: Math.round(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  const next7Days = getNextSevenDays();

  res[1].list.forEach((i: any, index: number) => {
    forecast.push({
      day: next7Days[index],
      temp: {
        temp_max: i.temp.max,
        temp_min: i.temp.min,
      },
      weather: {
        id: i.weather[0].id,
        main: i.weather[0].main,
      },
    });
  });

  return {
    weather,
    forecast,
  };
};
