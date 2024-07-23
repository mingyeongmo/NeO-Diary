import styled from "styled-components";
import { PostType } from "./posts";

const Post = ({
  diaryTitle,
  diaryDate,
  diaryWeather,
  photo,
  index,
}: PostType & { index: number }) => {
  return (
    <Diary>
      <td>{index}</td>
      <td>{diaryTitle}</td>
      <td>
        {diaryDate.year}-{diaryDate.month}-{diaryDate.day}
      </td>
    </Diary>
  );
};

const Diary = styled.tr`
  width: 100%;
  height: 70px;
  td {
    text-align: center;
    vertical-align: middle;
    border-bottom: 1px solid black;
  }
`;

export default Post;
