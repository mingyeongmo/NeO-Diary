import React from "react";
import EditTextArea from "./EditTextArea";
import EditPhotoArea from "./EditPhotoArea";
import EditTopArea from "./EditTopArea";
import * as WriteStyle from "../../../../pages/Diary/style";
import styled from "styled-components";

interface EditFormProps {
  diaryTitle: string;
  onDiaryTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    <Form>
      <WriteStyle.Content>
        <EditTopArea
          diaryTitle={diaryTitle}
          diaryDate={diaryDate}
          diaryWeather={diaryWeather}
        />
        <EditPhotoArea photo={photo} />
        <EditTextArea diaryContent={diaryContent} />
        <WriteStyle.BtnArea>
          <WriteStyle.Button onClick={onCancel}>취소</WriteStyle.Button>
          <WriteStyle.Button onClick={onSave}>저장</WriteStyle.Button>
        </WriteStyle.BtnArea>
      </WriteStyle.Content>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

export default EditForm;
