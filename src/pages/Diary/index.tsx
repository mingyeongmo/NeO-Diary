import useDiary from "hooks/useDiary";
import TopArea from "./TopArea";
import PhotoArea from "./PhotoArea";
import TextArea from "./TextArea";
import * as S from "./style";

const Diary = () => {
  const { isLoading, onSubmit } = useDiary();

  return (
    <S.Section>
      <S.Form onSubmit={onSubmit}>
        <S.Content>
          <TopArea />
          <PhotoArea />
          <TextArea />
        </S.Content>
        <S.Button type="submit">{isLoading ? "생성중" : "일기 생성"}</S.Button>
      </S.Form>
    </S.Section>
  );
};

export default Diary;
