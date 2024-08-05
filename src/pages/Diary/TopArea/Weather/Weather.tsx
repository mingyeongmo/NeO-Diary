import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface diaryWeatherType {
  setDiaryWeather: (weather: string) => void;
}

const Weather = React.memo(({ setDiaryWeather }: diaryWeatherType) => {
  const [weather, setWeather] = useState("맑음");

  const weatherList = ["맑음", "흐림", "비"];

  const handleSelectWeather = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeather(e.target.value);
  };

  useEffect(() => {
    setDiaryWeather(weather);
  }, [weather]);

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
