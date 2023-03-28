export const fetchWeatherData = async (
  city: string | { lat: number; lng: number }
) => {
  let url = `${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL}/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;

  if (typeof city === "object") {
    url = `${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL}/weather/?lat=${city.lat}&lon=${city.lng}&units=metric&APPID=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;
  }
  return await (await fetch(url)).json();
};
