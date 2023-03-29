import { WeatherData } from "@/types/weather";

export const fetchWeatherData = async (
  city: string | { lat: number; lng: number }
) => {
  let url = `${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL}/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;

  if (typeof city === "object") {
    url = `${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL}/weather/?lat=${city.lat}&lon=${city.lng}&units=metric&APPID=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;
  }
  return transformWeatherData(await (await fetch(url)).json());
};

const transformWeatherData = (res: any): WeatherData => {
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
