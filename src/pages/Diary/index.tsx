import { useRef } from "react";
import useDiary from "hooks/useDiary";
import Calendar from "./Calendar";
import * as S from "./style";

const Diary = () => {
  const {
    isLoading,
    diaryTitle,
    onDiaryTitleChange,
    diary,
    onDiaryContentChange,
    file,
    setFile,
    imgFile,
    setImgFile,
    onFileChange,
    onSubmit,
  } = useDiary();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileRemove = () => {
    setImgFile("");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <S.Section>
      <S.Form onSubmit={onSubmit}>
        <S.Content>
          <S.TopArea>
            <Calendar />
            <S.TitleInput
              value={diaryTitle}
              onChange={onDiaryTitleChange}
              type="text"
              placeholder="일기 제목"
              maxLength={50}
            />
            <S.Weather>☀️</S.Weather>
          </S.TopArea>
          <S.BarContainer>
            <S.Bar />
          </S.BarContainer>
          <S.PhotoArea>
            <div
              style={{
                width: "100%",
                height: "100%",
                flex: 9,
                overflow: "hidden",
              }}
            >
              {imgFile ? (
                <S.PreviewImage src={imgFile} alt="preview" />
              ) : (
                <S.NoneImage />
              )}
            </div>
            <div
              style={{
                width: "auto",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                position: "absolute",
              }}
            >
              <S.AttachFileBtn as="label" htmlFor="file">
                {!file && "사진 넣기"}
              </S.AttachFileBtn>
              {/* <S.ButtonContainer className="hover-buttons"> */}
              {file && (
                <>
                  <S.AttachFileBtn htmlFor="file">사진 수정</S.AttachFileBtn>
                  <S.RemoveFileBtn onClick={handleFileRemove}>
                    사진 삭제
                  </S.RemoveFileBtn>
                </>
              )}
              {/* </S.ButtonContainer> */}
              <S.AttachFileInput
                onChange={onFileChange}
                ref={fileInputRef}
                required
                type="file"
                id="file"
                accept="image/*"
              />
            </div>
          </S.PhotoArea>
          <S.TextArea>
            <textarea
              value={diary}
              maxLength={1500}
              onChange={onDiaryContentChange}
              placeholder="내용을 입력해주세요"
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
            />
          </S.TextArea>
        </S.Content>
        <S.Button type="submit">{isLoading ? "생성중" : "일기 생성"}</S.Button>
      </S.Form>
    </S.Section>
  );
};

export default Diary;
