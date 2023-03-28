import { useCallback, useEffect, useState } from "react";
import { Input, AutoComplete } from "antd";
import { SearchOutlined, AimOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd/es/select";
import Head from "next/head";
import uniqWith from "lodash/uniqWith";

import useDebounce from "@/hooks/use-debounce";

import { fetchWeatherData } from "@/services/weather";
import { fetchCities } from "@/services/cities";

import CurrentWeather from "@/components/current-weather";
import Header from "@/components/Header";

import { SearchBarContainer } from "@/styles/styled";

import "antd/dist/reset.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [places, setPlaces] = useState<SelectProps<object>["options"]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  const fetchPlaces = useCallback(async () => {
    const cities = await fetchCities(debouncedSearchTerm);
    setPlaces(massageGeoData(cities));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length) {
      fetchPlaces();
    }
  }, [debouncedSearchTerm, fetchPlaces]);

  const massageGeoData = (data: any) => {
    const cities: SelectProps<object>["options"] = [];
    data.features.forEach((feature: any) => {
      if (feature.properties && feature.properties.city) {
        const { city, state, country } = feature.properties;
        cities.push({
          label: `${city}, ${state}, ${country}`,
          value: `${city}`,
          key: `${city}-${state}`,
        });
      }
    });
    return uniqWith(cities, (cityA, cityB) => cityA.label === cityB.label);
  };

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
      <Header />
      <SearchBarContainer>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: "100%" }}
          options={places}
          onSearch={onCityChange}
          onSelect={onCitySelect}
        >
          <Input
            placeholder="Search location"
            size="large"
            prefix={<SearchOutlined />}
            suffix={
              <AimOutlined
                style={{ cursor: "pointer" }}
                onClick={fetchLocation}
              />
            }
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
}
