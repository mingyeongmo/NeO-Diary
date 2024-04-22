import { PostType } from "./posts";
import * as S from "./style";

const Post = ({ weather, diary, photo }: PostType) => {
  return (
    <>
      <S.Weather></S.Weather>
      {photo ? <S.Photo src={photo} /> : null}
      <S.Content>{diary}</S.Content>
    </>
  );
};

export default Post;
