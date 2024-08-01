import React, { useState } from "react";
import EditPhotoArea from "./EditPhotoArea";
import EditTopArea from "./EditTopArea";
import * as WriteStyle from "../../../../pages/Diary/style";
import styled, { css } from "styled-components";
import { useRecoilValue } from "recoil";
import {
  editDiaryContentState,
  editDiaryDateState,
  editDiaryFileState,
  editDiaryTitleState,
  editDiaryWeatherState,
} from "recoil/atoms/editDiaryState";
import EditContentArea from "./EditContentArea";

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
  onCancel: () => void;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  updateDiary: (
    docId: string,
    diaryTitle: string,
    diaryDate: {
      year: number | undefined;
      month: number | undefined;
      day: number | undefined;
    },
    diaryWeather: string,
    diaryContent: string,
    file: File | null
  ) => Promise<void>;
  id: string;
}

const EditForm = ({
  diaryTitle,
  diaryDate,
  diaryWeather,
  photo,
  diaryContent,
  onCancel,
  id,
  setIsEditMode,
  updateDiary,
}: EditFormProps) => {
  const editTitle = useRecoilValue(editDiaryTitleState);
  const editDate = useRecoilValue(editDiaryDateState);
  const editWeather = useRecoilValue(editDiaryWeatherState);
  const file = useRecoilValue(editDiaryFileState);
  const editContent = useRecoilValue(editDiaryContentState);

  const handleSaveClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedDate = {
      year: editDate ? editDate.getFullYear() : undefined,
      month: editDate ? editDate.getMonth() + 1 : undefined,
      day: editDate ? editDate.getDate() : undefined,
    };
    await updateDiary(
      id,
      editTitle,
      formattedDate,
      editWeather,
      editContent,
      file
    );
    setIsEditMode(false);
  };

  return (
    <Form onSubmit={handleSaveClick}>
      <WriteStyle.Content>
        <EditTopArea
          diaryTitle={diaryTitle}
          diaryDate={diaryDate}
          diaryWeather={diaryWeather}
        />
        <EditPhotoArea photo={photo} />
        <EditContentArea diaryContent={diaryContent} />
        <BtnArea>
          <Button onClick={onCancel} variant="cancel">
            취소
          </Button>
          <Button type="submit" variant="save">
            저장
          </Button>
        </BtnArea>
      </WriteStyle.Content>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const BtnArea = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button<{ variant: "cancel" | "save" }>`
  width: 150px;
  height: 30px;
  font-size: 1rem;
  border-radius: 10px;
  font-weight: 600;
  color: white;
  border: none;
  cursor: pointer;

  ${(props) =>
    props.variant === "cancel" &&
    css`
      background: "gray";
    `}

  ${(props) =>
    props.variant === "save" &&
    css`
      background: "#9990ff";
    `}
`;

export default EditForm;
