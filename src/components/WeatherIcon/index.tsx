import Image from "next/image";

interface IWeatherIconProps {
  code: number;
  big?: boolean;
}

const WeatherIcon: React.FC<IWeatherIconProps> = (props) => {
  let icon: string;

  switch (props.code) {
    // Clear
    case 800:
      icon = "/weather/sunny.svg";
      break;

    // Cloud
    case 801:
    case 802:
      icon = "/weather/partly-cloudy.svg";
      break;
    case 803:
    case 804:
      icon = "/weather/cloudy.svg";
      break;

    // Rain
    case 500:
    case 501:
    case 520:
    case 521:
    case 511:
      icon = "/weather/rain.svg";
      break;
    case 502:
    case 503:
    case 504:
    case 522:
    case 531:
      icon = "/weather/heavy-rain.svg";
      break;

    // Drizzle
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      icon = "/weather/rain.svg";
      break;

    // Thunderstorm
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      icon = "/weather/thunderstorm.svg";
      break;

    // Snow
    case 600:
    case 601:
    case 602:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      icon = "/weather/snow.svg";
      break;
    case 611:
      icon = "/weather/sleet.svg";
      break;

    // Atmosphere
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      icon = "/weather/haze.svg";
      break;

    default:
      icon = "/weather/sunny.svg";
  }
  return props.big ? (
    <Image alt="weather-icon" src={icon} width="100" height="100" />
  ) : (
    <Image alt="weather-icon" src={icon} />
  );
};

export default WeatherIcon;
