import styled from "styled-components";
import { PostType } from "./posts";

const Post = ({ diaryTitle, diaryDate, diaryWeather, photo }: PostType) => {
  return (
    <Diary>
      <td className="date">
        {diaryDate.year}-{diaryDate.month}-{diaryDate.day}
      </td>
      <td className="title">{diaryTitle}</td>
    </Diary>
  );
};

const Diary = styled.tr`
  width: 100%;
  height: 70px;
  td {
    vertical-align: center;
  }
  .date {
    width: 30%;
  }
  .title {
    width: 70%;
  }
  /* border: 1px solid black; */
`;

export default Post;
