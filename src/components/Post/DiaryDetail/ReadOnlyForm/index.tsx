import React from "react";
import * as WriteStyle from "../../../../pages/Diary/style";
import * as S from "../style";

interface ReadOnlyFormProps {
  diaryTitle: string;
  diaryDate: {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
  };
  diaryWeather: string;
  photo: string;
  diaryContent: string;
  onEdit: () => void;
}

const ReadOnlyForm = ({
  diaryTitle,
  diaryDate,
  diaryWeather,
  photo,
  diaryContent,
  onEdit,
}: ReadOnlyFormProps) => {
  return (
    <WriteStyle.Content>
      <S.TopAreaContainer>
        <div className="top">
          <div className="date">
            <p>
              {diaryDate.year}.{diaryDate.month}.{diaryDate.day}
            </p>
          </div>
          <h1 className="title">{diaryTitle}</h1>
          <div className="weather">
            <p>{diaryWeather}</p>
          </div>
        </div>
      </S.TopAreaContainer>
      <S.PhotoAreaContainer>
        <S.PreviewImage src={photo} alt="preview" />
      </S.PhotoAreaContainer>
      <S.TextAreaContainer>
        <textarea
          readOnly
          style={{
            width: "100%",
            height: "100%",
            padding: "20px",
            fontSize: "16px",
            resize: "none",
            boxSizing: "border-box",
            outline: "none",
            borderRadius: "15px",
          }}
        >
          {diaryContent}
        </textarea>
      </S.TextAreaContainer>
      <WriteStyle.BtnArea>
        <WriteStyle.Button onClick={onEdit}>일기 수정</WriteStyle.Button>
      </WriteStyle.BtnArea>
    </WriteStyle.Content>
  );
};

export default ReadOnlyForm;
