import { useLocation } from "react-router-dom";
import * as WriteStyle from "../../../pages/Diary/style";
import styled from "styled-components";

const DiaryDetail = () => {
  const { state } = useLocation();
  const { diaryTitle, diaryDate, diaryWeather, photo, diaryContent } = state;
  return (
    <WriteStyle.DiaryContainer>
      <FormContainer>
        <WriteStyle.Content>
          <TopAreaContainer>
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
          </TopAreaContainer>
          <PhotoAreaContainer>
            <PreviewImage src={photo} alt="preview" />
          </PhotoAreaContainer>
          <TextAreaContainer>
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
          </TextAreaContainer>
        </WriteStyle.Content>
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

const TopAreaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .top {
    width: 90%;
    display: flex;
    padding: 30px 0 20px;
    border-bottom: 1px solid black;
    .date {
      display: flex;
      justify-content: flex-start;
      flex: 1;
      p {
        display: flex;
        justify-content: center;
        width: 165px;
        padding: 10px;
        border: 1px solid black;
        box-sizing: border-box;
        border-radius: 15px;
      }
    }
    .title {
      font-size: 2rem;
      flex: 1;
      text-align: center;
    }
    .weather {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        border: 1px solid black;
        box-sizing: border-box;
        border-radius: 5px;
      }
    }
  }
`;

const PhotoAreaContainer = styled.div`
  width: auto;
  height: 350px;
  min-height: 350px;
  margin: 35px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

const TextAreaContainer = styled.div`
  width: auto;
  height: 100%;
  margin: 0px 35px 35px;
`;

export default DiaryDetail;
