import { useCallback, useEffect, useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined, AimOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd/es/select';
import Head from 'next/head'

import useDebounce from '../hooks/use-debounce';

import PlaceType from '../types/place';

import styles from '@/styles/Home.module.css'

import 'antd/dist/reset.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState();
  const[places, setPlaces] = useState<SelectProps<object>['options']>([]);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  const fetchCities = useCallback(async (term: string) => {
    await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${term}&type=locality&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setPlaces(massageGeoData(result));
      });
  }, []);

  useEffect(
    () => {
      if(debouncedSearchTerm.length) {
        fetchCities(debouncedSearchTerm);
      }
    },
    [debouncedSearchTerm, fetchCities]
  );

  const massageGeoData = (data: any) => {
    const cities: SelectProps<object>['options'] = [];
    data.features.forEach((feature: any) => {
      if(feature.properties && feature.properties.city) {
        const {city, state, country} = feature.properties;
        cities.push({
          label: `${city}, ${state}, ${country}`,
          value: `${city}`,
          key: `${city}-${state}`
        });
      }
    });
    return cities;
  }

  const fetchWeatherData = async (lat: number, lng:number) => {
    await fetch(`${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL}/weather/?lat=${lat}&lon=${lng}&units=metric&APPID=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result)
      });
  }

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherData(position.coords.latitude, position.coords.longitude);
    }, (err) => {
      console.log(err);
    });
  }

  const onCityChange = (city: string) => {
    setSearchTerm(city);
  };

  return (
    <>
      <Head>
        <title>WeatherX</title>
        <meta name="description" content="Get weather information of you location" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: '80%' }}
        options={places}
        onSearch={onCityChange}
      >
        <Input
          placeholder="Search location"
          size='large'
          prefix={<SearchOutlined />}
          suffix={ <AimOutlined style={{cursor: 'pointer'}} onClick={fetchLocation} />}
          value={searchTerm}
        />
      </AutoComplete>
      </main>
    </>
  )
}

