import { useCallback, useEffect, useState } from 'react';
import { SearchOutlined, AimOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Head from 'next/head'
import { Inter } from 'next/font/google'

import useDebounce from '../hooks/use-debounce';

import PlaceType from '../types/place';

import styles from '@/styles/Home.module.css'

import 'antd/dist/reset.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState();
  const[places, setPlaces] = useState<PlaceType[]>([]);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  const fetchCities = useCallback(async (term: string) => {
    await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${term}&type=city&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`)
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
    const cities: PlaceType[] = [];
    data.features.forEach((feature: any) => {
      if(feature.properties && feature.properties.city) {
        const {city, state, country} = feature.properties;
        cities.push({
          city,
          state,
          country
        });
      }
    });
    return cities;
  }

  const fetchWeatherData = async (lat: number, lng:number) => {
    await fetch(`${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL}/weather/?lat=${lat}&lon=${lng}&units=metric&APPID=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
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
        <Input
          placeholder="Search location"
          size='large'
          prefix={<SearchOutlined />}
          suffix={ <AimOutlined style={{cursor: 'pointer'}} onClick={fetchLocation} />}
          value={searchTerm}
          onChange={(evt) => onCityChange(evt.target.value)}
        />
      </main>
    </>
  )
}
