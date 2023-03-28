interface ITemperatureProps {
  value: number;
}

const Temperature: React.FC<ITemperatureProps> = (props) => {
  return (
    <>
      {Math.round(props.value)}
      <sup>&deg;</sup>
    </>
  );
};

export default Temperature;
