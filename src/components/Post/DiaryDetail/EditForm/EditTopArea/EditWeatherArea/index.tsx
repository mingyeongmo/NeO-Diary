import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { editDiaryWeatherState } from "recoil/atoms/editDiaryState";
import styled from "styled-components";

interface EditWeatherAreaProps {
  diaryWeather: string;
}

const EditWeatherArea = ({ diaryWeather }: EditWeatherAreaProps) => {
  const [editWeather, setEditWeather] = useRecoilState(editDiaryWeatherState);

  useEffect(() => {
    setEditWeather(diaryWeather);
  }, [diaryWeather, setEditWeather]);

  const weatherList = ["맑음", "흐림", "비"];

  const handleSelectWeather = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditWeather(e.target.value);
  };

  return (
    <WeatherContainer>
      <WeatherList onChange={handleSelectWeather} value={editWeather}>
        {weatherList.map((weathers, index) => (
          <option value={weathers} key={index}>
            {weathers}
          </option>
        ))}
      </WeatherList>
    </WeatherContainer>
  );
};

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

export default EditWeatherArea;
