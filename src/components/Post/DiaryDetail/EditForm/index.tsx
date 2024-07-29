import React, { useEffect, useState } from "react";
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
  // onSave: () => void;
  onCancel: () => void;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  updateDiary: (
    // e: React.FormEvent<HTMLFormElement>,
    docId: string,
    diaryTitle: string
  ) => Promise<void>;
  id: string;
}

const EditForm = ({
  diaryTitle,
  onDiaryTitleChange,
  diaryDate,
  diaryWeather,
  photo,
  diaryContent,
  onCancel,
  id,
  setIsEditMode,
  updateDiary,
}: EditFormProps) => {
  const [editTitle, setEditTitle] = useState(diaryTitle);

  const handleSaveClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 저장 로직
    console.log({ id });
    await updateDiary(id, editTitle);
    setIsEditMode(false);
  };

  useEffect(() => {
    setEditTitle(diaryTitle);
  }, [diaryTitle]);

  return (
    <Form onSubmit={handleSaveClick}>
      <WriteStyle.Content>
        <EditTopArea
          diaryTitle={editTitle}
          onDiaryTitleChange={(e) => setEditTitle(e.target.value)}
          // onDiaryTitleChange={onDiaryTitleChange}
          diaryDate={diaryDate}
          diaryWeather={diaryWeather}
        />
        <EditPhotoArea photo={photo} />
        <EditTextArea diaryContent={diaryContent} />
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
  background: ${(props) => (props.variant === "cancel" ? "gray" : "#9990ff")};

  border: none;
  cursor: pointer;
`;

export default EditForm;
