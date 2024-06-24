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
  width: 70px;
  height: 100%;
  box-sizing: border-box;
`;

export default Weather;
