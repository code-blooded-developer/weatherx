import { createAsyncThunk } from "@reduxjs/toolkit";
import { WeatherData } from "@/types/weather";
import { fetchWeatherData } from "@/services/weather";
import { setIsLoading, setIsInitial } from "./reducers/appReducer";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (
    city: string | { lat: number; lng: number },
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    dispatch(setIsLoading(true));

    try {
      const res = await fetchWeatherData(city);
      if (res.cod === 200) {
        dispatch(setIsInitial(false));
        return res;
      }
      return rejectWithValue(res.message);
    } catch {
      return rejectWithValue("Error");
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const transformWeatherData = (res: any): WeatherData => {
  const weather = res as WeatherData;

  weather.weather = res.weather[0];
  weather.main = {
    ...weather.main,
    temp: Math.round(weather.main.temp),
    feels_like: Math.round(weather.main.feels_like),
    temp_max: Math.round(weather.main.temp_max),
    temp_min: Math.round(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  return weather;
};
