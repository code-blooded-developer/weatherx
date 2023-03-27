import { useEffect, useState } from 'react';
import { SearchOutlined, AimOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import Head from 'next/head'
import { Inter } from 'next/font/google'


import styles from '@/styles/Home.module.css'

import 'antd/dist/reset.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    }, (err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    async function fetchWeatherData() {
      await fetch(`${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_URL}/weather/?lat=${lat}&lon=${lng}&units=metric&APPID=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          console.log(result);
          setWeatherData(result)
        });
    }
    fetchWeatherData();
  }, [lat, lng]);

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
          suffix={
            <Tooltip title="Get current location">
              <AimOutlined />
            </Tooltip>
          }
        />
      </main>
    </>
  )
}
