import * as S from "./style";
import useDiary from "hooks/useDiary";

const Diary = () => {
  const {
    isLoading,
    diaryTitle,
    onDiaryTitleChange,
    diary,
    onDiaryContentChange,
    file,
    imgFile,
    setImgFile,
    onFileChange,
    onSubmit,
  } = useDiary();

  return (
    <S.Section>
      <h1>2024/05/08</h1>
      <S.Form onSubmit={onSubmit}>
        <S.Content>
          <S.LeftContent>
            <S.TitleInput
              value={diaryTitle}
              onChange={onDiaryTitleChange}
              type="text"
              placeholder="일기 제목"
              maxLength={50}
            />
            <S.PhotoArea>
              <div
                style={{
                  flex: 9.5,
                  padding: "10px",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                {imgFile && <S.PreviewImage src={imgFile} alt="preview" />}
              </div>
              <div style={{ flex: 0.5 }}>
                <S.AttachFileBtn htmlFor="file">
                  {file ? "사진 수정" : "사진 넣기"}
                </S.AttachFileBtn>
                {file && (
                  <S.RemoveFileBtn onClick={() => setImgFile("")}>
                    사진 삭제
                  </S.RemoveFileBtn>
                )}
                <S.AttachFileInput
                  onChange={onFileChange}
                  required
                  type="file"
                  id="file"
                  accept="image/*"
                />
              </div>
            </S.PhotoArea>
          </S.LeftContent>
          <S.RightContent>
            <S.Weather>날씨</S.Weather>
            <S.TextArea>
              <textarea
                value={diary}
                maxLength={1500}
                onChange={onDiaryContentChange}
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "15px",
                  fontSize: "16px",
                  resize: "none",
                  boxSizing: "border-box",
                  outline: "none",
                  border: "none",
                }}
              />
            </S.TextArea>
          </S.RightContent>
        </S.Content>
        <S.Button type="submit">{isLoading ? "생성중" : "일기 생성"}</S.Button>
      </S.Form>
    </S.Section>
  );
};

export default Diary;
