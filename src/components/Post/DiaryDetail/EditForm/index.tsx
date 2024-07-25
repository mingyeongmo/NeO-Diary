import React from "react";
import * as WriteStyle from "../../../../pages/Diary/style";
import * as S from "../style";

interface EditFormProps {
  diaryTitle: string;
  diaryDate: {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
  };
  diaryWeather: string;
  photo: string;
  diaryContent: string;
  onSave: () => void;
  onCancel: () => void;
}

const EditForm = ({
  diaryTitle,
  diaryDate,
  diaryWeather,
  photo,
  diaryContent,
  onSave,
  onCancel,
}: EditFormProps) => {
  return (
    <WriteStyle.Content>
      <S.TopAreaContainer></S.TopAreaContainer>
    </WriteStyle.Content>
  );
};

export default EditForm;
