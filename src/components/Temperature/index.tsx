import { useSelector } from "react-redux";
import { AppStore } from "@/store/store";
import { celciusToFahrenheit, TempUnit } from "@/utils/unitConversion";

interface ITemperatureProps {
  value: number;
}

const Temperature: React.FC<ITemperatureProps> = (props) => {
  const { degreeType } = useSelector((state: AppStore) => ({
    degreeType: state.app.tempUnit,
  }));

  if (degreeType === TempUnit.FAHRENHEIT) {
    return (
      <>
        {celciusToFahrenheit(props.value)}
        <sup>&deg;</sup>
      </>
    );
  }

  return (
    <>
      {props.value}
      <sup>&deg;</sup>
    </>
  );
};

export default Temperature;
