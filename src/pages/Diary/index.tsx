import * as S from "./style";
import useDiary from "hooks/useDiary";

const Diary = () => {
  const { isLoading, diary, file, imgFile, onChange, onFileChange, onSubmit } =
    useDiary();

  return (
    <S.Section>
      <S.Form onSubmit={onSubmit}>
        <S.Container>
          <S.Content>
            <S.TitleInput type="text" placeholder="일기 제목" maxLength={50} />

            <S.Weather>날씨</S.Weather>
            <S.PhotoArea>
              {imgFile && <S.PreviewImage src={imgFile} alt="preview" />}
              <S.AttachFileBtn htmlFor="file">
                {file ? "사진 수정" : "사진 넣기"}
              </S.AttachFileBtn>
              <S.AttachFileInput
                onChange={onFileChange}
                required
                type="file"
                id="file"
                accept="image/*"
              />
            </S.PhotoArea>
            <S.TextArea value={diary} onChange={onChange} />
          </S.Content>
          <S.Button type="submit">
            {isLoading ? "생성중" : "일기 생성"}
          </S.Button>
        </S.Container>
      </S.Form>
    </S.Section>
  );
};

export default Diary;
