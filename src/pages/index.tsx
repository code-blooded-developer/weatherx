import Head from "next/head";
import { Spin } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";

import { AppStore } from "@/store/store";

import "antd/dist/reset.css";

const Spinner = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home: React.FC = () => {
  const { loading } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
  }));

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
      {loading ? (
        <Spinner size="large" />
      ) : (
        <>
          <Header />
          <SearchBar />
          <CurrentWeather />
          {/* <Forecast /> */}
        </>
      )}
    </>
  );
};

export default Home;
