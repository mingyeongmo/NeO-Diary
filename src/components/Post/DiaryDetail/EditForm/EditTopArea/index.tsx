import { useEffect, useState } from "react";
import styled from "styled-components";
import EditWeatherArea from "./EditWeatherArea";
import EditDateArea from "./EditDateArea";
import { useRecoilState } from "recoil";
import { editDiaryTitleState } from "recoil/atoms/editDiaryState";

interface EditTopAreaProps {
  diaryTitle: string;
  diaryDate: {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
  };
  diaryWeather: string;
}

const EditTopArea = ({
  diaryTitle,
  diaryDate,
  diaryWeather,
}: EditTopAreaProps) => {
  const [editTitle, setEditTitle] = useRecoilState(editDiaryTitleState);

  useEffect(() => {
    setEditTitle(diaryTitle);
  }, [diaryTitle, setEditTitle]);

  const onDiaryTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  return (
    <TopAreaContainer>
      <div className="top">
        <EditDateArea diaryDate={diaryDate} />
        <TitleInput
          value={editTitle}
          onChange={onDiaryTitleChange}
          type="text"
          maxLength={10}
        />
        <EditWeatherArea diaryWeather={diaryWeather} />
      </div>
    </TopAreaContainer>
  );
};

const TopAreaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .top {
    width: 90%;
    display: flex;
    padding: 30px 0 20px;
    border-bottom: 1px solid rgb(0, 0, 0, 0.4);
  }
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

export default EditTopArea;
