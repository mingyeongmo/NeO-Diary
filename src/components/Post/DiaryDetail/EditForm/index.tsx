import React, { useRef, useState } from "react";
import * as WriteStyle from "../../../../pages/Diary/style";
import * as S from "../style";
import styled from "styled-components";
import { Edit } from "components/Icon/Icons";
import EditTextArea from "./EditTextArea";

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
  const [editTitle, setEditTitle] = useState(diaryTitle);
  const [editDate, setEditDate] = useState(diaryDate);
  const [editWeather, setEditWeather] = useState(diaryWeather);
  const [editPhoto, setEditPhoto] = useState(photo);

  const weatherList = ["맑음", "흐림", "비"];

  const handleSelectWeather = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditWeather(e.target.value);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form>
      <WriteStyle.Content>
        <S.TopAreaContainer>
          <div className="top">
            <div className="date">
              <p>
                {diaryDate.year}.{diaryDate.month}.{diaryDate.day}
              </p>
            </div>
            <TitleInput
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              type="text"
              maxLength={10}
            />
            <WeatherContainer>
              <WeatherList onChange={handleSelectWeather} value={editWeather}>
                {weatherList.map((weathers, index) => (
                  <option value={weathers} key={index}>
                    {weathers}
                  </option>
                ))}
              </WeatherList>
            </WeatherContainer>
          </div>
        </S.TopAreaContainer>
        <S.PhotoAreaContainer>
          <div
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              flex: 1,
            }}
          >
            <AttachFileBtn htmlFor="file">
              <Edit />
            </AttachFileBtn>
            <AttachFileInput
              onChange={onFileChange}
              ref={fileInputRef}
              required
              type="file"
              id="file"
              accept="image/*"
            />
          </div>
          {editPhoto && <S.PreviewImage src={editPhoto} alt="preview" />}
        </S.PhotoAreaContainer>
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

const AttachFileBtn = styled.label`
  cursor: pointer;
`;

const RemoveFileBtn = styled.label`
  cursor: pointer;
  margin-left: 10px;
`;

const AttachFileInput = styled.input`
  display: none;
`;

export default EditForm;
