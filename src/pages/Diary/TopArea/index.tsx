import React from "react";
import styled from "styled-components";
import Calendar from "./Calendar/Calendar";
import Weather from "./Weather/Weather";
import useDiary from "hooks/useDiary";

const TopArea = () => {
  const { setDiaryDate, diaryTitle, onDiaryTitleChange, setDiaryWeather } =
    useDiary();

  return (
    <TopAreaContainer>
      <Top>
        <Calendar setDiaryDate={setDiaryDate} />
        <TitleInput
          value={diaryTitle}
          onChange={onDiaryTitleChange}
          type="text"
          placeholder="일기 제목"
          maxLength={50}
        />
        <Weather setDiaryWeather={setDiaryWeather} />
      </Top>
    </TopAreaContainer>
  );
};

const TopAreaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Top = styled.div`
  width: 90%;
  display: flex;
  padding: 30px 0 20px;
  border-bottom: 1px solid black;
`;

const TitleInput = styled.input`
  width: 100%;
  border-width: 0;
  font-size: 2rem;
  padding: 0;
  outline: none;
  text-align: center;
  flex: 1;
  &::placeholder {
    text-align: center;
  }
`;

export default TopArea;
