import React, { useState } from "react";
import styled from "styled-components";

const Weather = () => {
  const [weather, setWeather] = useState("날씨");

  const weatherList = ["맑음", "흐림", "비"];

  const handleSelectWeather = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeather(e.target.value);
  };
  return (
    <>
      <WeatherList onChange={handleSelectWeather} value={weather}>
        {weatherList.map((weathers, index) => (
          <option value={weathers} key={index}>
            {weathers}
          </option>
        ))}
      </WeatherList>
    </>
  );
};

const WeatherList = styled.select`
  width: 80px;
  height: 100%;
  border: 1.5px solid black;
  font-size: 1rem;
  text-align: center;
  box-sizing: border-box;
`;

export default Weather;
