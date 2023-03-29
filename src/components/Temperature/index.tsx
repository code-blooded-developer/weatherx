interface ITemperatureProps {
  value: number;
}

const Temperature: React.FC<ITemperatureProps> = (props) => {
  return (
    <>
      {props.value}
      <sup>&deg;</sup>
    </>
  );
};

export default Temperature;
