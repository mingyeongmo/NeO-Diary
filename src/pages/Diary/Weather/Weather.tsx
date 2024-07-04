import React, { useState } from "react";
import styled from "styled-components";

interface diaryWeatherType {
  setDiaryWeather: React.Dispatch<React.SetStateAction<string>>;
}

const Weather = React.memo(({ setDiaryWeather }: diaryWeatherType) => {
  const [weather, setWeather] = useState("날씨");

  const weatherList = ["맑음", "흐림", "비"];

  const handleSelectWeather = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeather(e.target.value);
    setDiaryWeather(e.target.value);
  };
  return (
    <WeatherContainer>
      <WeatherList onChange={handleSelectWeather} value={weather}>
        {weatherList.map((weathers, index) => (
          <option value={weathers} key={index}>
            {weathers}
          </option>
        ))}
      </WeatherList>
    </WeatherContainer>
  );
});

const WeatherContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 2rem;
  text-align: center;
  flex: 1;
`;
const WeatherList = styled.select`
  width: 80px;
  height: 100%;
  border: 1.5px solid black;
  font-size: 1rem;
  text-align: center;
  box-sizing: border-box;
`;

export default Weather;
