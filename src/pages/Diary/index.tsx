import useDiary from "hooks/useDiary";
import TopArea from "./TopArea";
import PhotoArea from "./PhotoArea";
import TextArea from "./TextArea";
import * as S from "./style";
import { ChangeEvent, useCallback } from "react";

const Diary = () => {
  const {
    isLoading,
    onSubmit,
    setDiaryDate,
    diaryTitle,
    onDiaryTitleChange,
    setDiaryWeather,
    handleFileRemove,
    onFileChange,
    fileInputRef,
    file,
    imgFile,
    diaryContent,
    onDiaryContentChange,
  } = useDiary();

  const memoizedSetDiaryDate = useCallback(
    (date: {
      year: number | undefined;
      month: number | undefined;
      day: number | undefined;
    }) => {
      setDiaryDate(date);
    },
    [setDiaryDate]
  );

  const memoizedOnDiaryTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onDiaryTitleChange(e);
    },
    [onDiaryTitleChange]
  );

  const memoizedSetDiaryWeather = useCallback(
    (weather: string) => {
      setDiaryWeather(weather);
    },
    [setDiaryWeather]
  );

  return (
    <S.DiaryContainer>
      <S.Form onSubmit={onSubmit}>
        <S.Content>
          <TopArea
            setDiaryDate={memoizedSetDiaryDate}
            diaryTitle={diaryTitle}
            onDiaryTitleChange={memoizedOnDiaryTitleChange}
            setDiaryWeather={memoizedSetDiaryWeather}
          />
          <PhotoArea
            handleFileRemove={handleFileRemove}
            onFileChange={onFileChange}
            fileInputRef={fileInputRef}
            file={file}
            imgFile={imgFile}
          />
          <TextArea
            diaryContent={diaryContent}
            onDiaryContentChange={onDiaryContentChange}
          />
          <S.BtnArea>
            <S.Button type="submit">
              {isLoading ? "생성중" : "일기 생성"}
            </S.Button>
          </S.BtnArea>
        </S.Content>
      </S.Form>
    </S.DiaryContainer>
  );
};

export default Diary;
