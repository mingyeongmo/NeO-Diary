import { useRef } from "react";
import useDiary from "hooks/useDiary";
import Calendar from "./Calendar/Calendar";
import { Delete, Edit } from "components/Icon/Icons";
import * as S from "./style";
import Weather from "./Weather";

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
          <S.TopAreaContainer>
            <S.TopArea>
              <Calendar />
              <S.TitleInput
                value={diaryTitle}
                onChange={onDiaryTitleChange}
                type="text"
                placeholder="일기 제목"
                maxLength={50}
              />
              <S.Weather>
                <Weather />
              </S.Weather>
            </S.TopArea>
          </S.TopAreaContainer>
          <S.PhotoArea>
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
              {file && (
                <>
                  <S.AttachFileBtn htmlFor="file">
                    <Edit />
                  </S.AttachFileBtn>
                  <S.RemoveFileBtn onClick={handleFileRemove}>
                    <Delete />
                  </S.RemoveFileBtn>
                </>
              )}
              <S.AttachFileInput
                onChange={onFileChange}
                ref={fileInputRef}
                required
                type="file"
                id="file"
                accept="image/*"
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                flex: 9,
                overflow: "hidden",
              }}
            >
              {file ? (
                <S.PreviewImage src={imgFile} alt="preview" />
              ) : (
                <S.AttachFileBtn as="label" htmlFor="file">
                  <S.NoneImage>사진을 넣어주세요</S.NoneImage>
                </S.AttachFileBtn>
              )}
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
