import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as WriteStyle from "../../../pages/Diary/style";
import styled from "styled-components";
import ReadOnlyForm from "./ReadOnlyForm";
import EditForm from "./EditForm";
import useDiary from "hooks/useDiary";

const DiaryDetail = () => {
  const { state } = useLocation();
  const { diaryTitle, diaryDate, diaryWeather, photo, diaryContent } = state;

  const { onSubmit, onDiaryTitleChange } = useDiary();

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    // 저장 로직
    setIsEditMode(false);
  };

  return (
    <WriteStyle.DiaryContainer>
      <FormContainer>
        {isEditMode ? (
          <EditForm
            diaryTitle={diaryTitle}
            onDiaryTitleChange={onDiaryTitleChange}
            diaryDate={diaryDate}
            diaryWeather={diaryWeather}
            photo={photo}
            diaryContent={diaryContent}
            onSave={handleSaveClick}
            onCancel={() => setIsEditMode(false)}
          />
        ) : (
          <ReadOnlyForm
            diaryTitle={diaryTitle}
            diaryDate={diaryDate}
            diaryWeather={diaryWeather}
            photo={photo}
            diaryContent={diaryContent}
            onEdit={handleEditMode}
          />
        )}
      </FormContainer>
    </WriteStyle.DiaryContainer>
  );
};

const FormContainer = styled.div`
  width: 100%;
  max-width: 750px;
  margin: 30px auto;
  gap: 10px;
`;

export default DiaryDetail;
