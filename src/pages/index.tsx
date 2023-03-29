import { useCallback, useEffect, useState } from "react";
import { AutoComplete } from "antd";
import type { SelectProps } from "antd/es/select";
import Head from "next/head";

import useDebounce from "@/hooks/use-debounce";

import { fetchWeatherData } from "@/services/weather";
import { fetchCities } from "@/services/cities";

import CurrentWeather from "@/components/CurrentWeather";
import Header from "@/components/Header";

import {
  SearchBarContainer,
  StyledSearchOutlined,
  StyledAimOutlined,
  StyledInput,
} from "@/styles/styled";

import { WeatherData } from "@/types/weather";

import "antd/dist/reset.css";

interface IHomeProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Home: React.FC<IHomeProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [places, setPlaces] = useState<SelectProps<object>["options"]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  const fetchPlaces = useCallback(async () => {
    const cities = await fetchCities(debouncedSearchTerm);
    const massagedCities = cities.map((city) => {
      return {
        label: `${city.city}, ${city.state}, ${city.country}`,
        value: `${city.city}`,
        key: `${city.city}-${city.state}`,
      };
    });
    setPlaces(massagedCities);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length) {
      fetchPlaces();
    }
  }, [debouncedSearchTerm, fetchPlaces]);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLoading(true);
        const result = await fetchWeatherData({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setWeatherData(result);
        setLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onCityChange = (city: string) => {
    setSearchTerm(city);
  };

  const onCitySelect = async (city: string) => {
    setLoading(true);
    const result = await fetchWeatherData(city);
    setWeatherData(result);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>WeatherX</title>
        <meta
          name="description"
          content="Get weather information of you location"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <SearchBarContainer>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: "100%" }}
          options={places}
          onSearch={onCityChange}
          onSelect={onCitySelect}
        >
          <StyledInput
            placeholder="Search location"
            size="large"
            prefix={<StyledSearchOutlined />}
            suffix={<StyledAimOutlined onClick={fetchLocation} />}
            value={searchTerm}
          />
        </AutoComplete>
      </SearchBarContainer>
      <div>
        {(loading || weatherData) && (
          <CurrentWeather weather={weatherData} loading={loading} />
        )}
      </div>
    </>
  );
};

export default Home;
