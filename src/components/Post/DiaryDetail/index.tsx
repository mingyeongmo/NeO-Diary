import React from "react";
import { useLocation } from "react-router-dom";

const DiaryDetail = () => {
  const { state } = useLocation();
  const { diaryTitle, diaryDate, diaryWeather, photo, diaryContent } = state;
  return (
    <div>
      <h2>{diaryTitle}</h2>
      <p>
        날짜: {diaryDate.year}-{diaryDate.month}-{diaryDate.day}
      </p>
      <p>날씨: {diaryWeather}</p>
      {photo && <img src={photo} alt="Diary" />}
      <p>{diaryContent}</p>
    </div>
  );
};

export default DiaryDetail;
