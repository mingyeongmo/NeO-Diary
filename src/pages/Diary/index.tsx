import useDiary from "hooks/useDiary";
import TopArea from "./TopArea";
import PhotoArea from "./PhotoArea";
import TextArea from "./TextArea";
import * as S from "./style";

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

  return (
    <S.DiaryContainer>
      <S.Form onSubmit={onSubmit}>
        <S.Content>
          <TopArea
            setDiaryDate={setDiaryDate}
            diaryTitle={diaryTitle}
            onDiaryTitleChange={onDiaryTitleChange}
            setDiaryWeather={setDiaryWeather}
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
