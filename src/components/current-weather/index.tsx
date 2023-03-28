import { Card } from "antd";

import WeatherIcon from "../WeatherIcon";
import Temperature from "../Temperature";
import HighIcon from "@/assets/high-icon.svg";
import LowIcon from "@/assets/low-icon.svg";
import HumidityIcon from "@/assets/humidity-icon.svg";
import PressureIcon from "@/assets/pressure-icon.svg";
import WindIcon from "@/assets/wind-icon.svg";

import styles from "./CurrentWeather.module.css";

interface ICurrentWeatherProps {
  weather: any;
  loading: boolean;
}

const CurrentWeather: React.FC<ICurrentWeatherProps> = ({
  weather,
  loading,
}) => {
  return (
    <Card title="Current Weather" loading={loading}>
      {weather && (
        <div className={styles.currentWeatherContainer}>
          <div className={styles.currentWeatherStatus}>
            <div className={styles.cityName}>{weather.name}</div>
            <div style={{ display: "flex" }}>
              <WeatherIcon code={weather.weather[0].id} big />
              <div className={styles.mainTemp}>
                <Temperature value={weather.main.temp} />
              </div>
            </div>
            <h6 className={styles.description}>
              {weather.weather[0].description}
            </h6>
          </div>
          <div className={styles.currentWeatherInfo}>
            <p className={styles.feelsLike}>
              Feels like <Temperature value={weather.main.feels_like} />
            </p>
            <div className={styles.highLowContainer}>
              <div className={styles.weatherDegree}>
                <HighIcon fill="#A1B9CE" className={styles.weatherDegreeIcon} />
                <Temperature value={weather.main.temp_max} />
              </div>
              <div className={styles.weatherDegree}>
                <LowIcon fill="#A1B9CE" className={styles.weatherDegreeIcon} />
                <Temperature value={weather.main.temp_min} />
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.info}>
                <HumidityIcon className={styles.infoIcon} /> Humidity
              </div>
              <span className={styles.infoValue}>{weather.main.humidity}%</span>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.info}>
                <WindIcon className={styles.infoIcon} />
                Wind
              </div>
              <span className={styles.infoValue}>{weather.wind.speed}kph</span>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.info}>
                <PressureIcon className={styles.infoIcon} />
                Pressure
              </div>
              <span className={styles.infoValue}>
                {weather.main.pressure}hPa
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CurrentWeather;
