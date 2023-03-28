import styled from "styled-components";

export const CurrentWeatherContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const CurrentWeatherStatus = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 1.5rem;

  h4 {
    font-weight: 600;
    font-size: 1.25rem;
    color: #396bae;
    margin-bottom: 1rem;
  }

  span {
    font-weight: 200;
    font-size: 7rem;
    color: #4a6fa1;
    line-height: 1;
  }

  h6 {
    font-size: 1.375rem;
    text-align: left;
    color: #7b98b2;
  }
`;

export const CurrentWeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 1.5rem;
`;

export const FeelsLike = styled.p`
  font-size: 1.25rem;
  color: #4a6fa1;
`;

export const HighLowContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  width: 2rem;
`;

export const WeatherDegree = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.25rem;
  color: #3a86ca;
  margin-right: 2.5rem;
  svg {
    fill: #a1b9ce;
    margin-right: 1rem;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
  div {
    display: flex;
    color: #a1b9ce;
    align-items: center;
    font-size: 1rem;
    width: 8rem;
  }
  svg {
    fill: #a1b9ce;
    margin-right: 1rem;
    width: 1.6rem;
    margin-left: -0.3rem;
  }
  span {
    color: #3080c8;
    font-weight: 500;
    font-size: 1rem;
  }
`;
