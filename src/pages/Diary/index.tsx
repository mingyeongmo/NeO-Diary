import * as S from "./style";
import useDiary from "hooks/useDiary";

const Diary = () => {
  const { isLoading, diary, file, onChange, onFileChange, onSubmit } =
    useDiary();

  return (
    <S.Form onSubmit={onSubmit}>
      <div>제목 & 날씨</div>
      <S.AttachFileBtn htmlFor="file">
        {file ? "사진 넣음" : "사진 넣기"}
      </S.AttachFileBtn>
      <S.AttachFileInput
        onChange={onFileChange}
        required
        type="file"
        id="file"
        accept="image/*"
      ></S.AttachFileInput>
      <S.TextArea value={diary} onChange={onChange} />
      <S.Button type="submit">{isLoading ? "생성중" : "일기 생성"}</S.Button>
    </S.Form>
  );
};

export default Diary;
