import { createSlice } from "@reduxjs/toolkit";
import { WeatherData } from "@/types/weather";
import { fetchWeather, transformWeatherData } from "../fetchWeather";

export type WeatherState = {
  weatherData: WeatherData;
  isError: boolean;
};

const initialState: WeatherState = {
  weatherData: {
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    name: "",
    sys: {
      country: "",
      sunrise: 0,
      sunset: 0,
    },
    weather: {
      id: 200,
      main: "",
      description: "",
      icon: "",
    },
    wind: {
      deg: 0,
      speed: 0,
    },
  },
  isError: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const weather = transformWeatherData(action.payload);
        state.weatherData = weather;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export default weatherSlice.reducer;
