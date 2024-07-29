import { useState } from "react";
import styled from "styled-components";
import EditWeatherArea from "./EditWeatherArea";
import EditDateArea from "./EditDateArea";

interface EditTopAreaProps {
  diaryTitle: string;
  onDiaryTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  diaryDate: {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
  };
  diaryWeather: string;
}

const EditTopArea = ({
  diaryTitle,
  onDiaryTitleChange,
  diaryDate,
  diaryWeather,
}: EditTopAreaProps) => {
  // const [editTitle, setEditTitle] = useState(diaryTitle);

  return (
    <TopAreaContainer>
      <div className="top">
        <EditDateArea diaryDate={diaryDate} />
        <TitleInput
          value={diaryTitle}
          // value={editTitle}
          // onChange={(e) => setEditTitle(e.target.value)}
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
    border-bottom: 1px solid black;
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
