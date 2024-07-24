import styled from "styled-components";
import { PostType } from "./posts";
import { useNavigate } from "react-router-dom";

const Post = ({
  diaryTitle,
  diaryDate,
  diaryWeather,
  photo,
  diaryContent,
  index,
}: PostType & { index: number }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    const { year, month, day } = diaryDate;
    navigate(`/diary/detail/${year}-${month}-${day}`, {
      state: { diaryTitle, diaryDate, diaryWeather, photo, diaryContent },
    });
  };

  return (
    <Diary>
      <td>{index}</td>
      <td>{diaryTitle}</td>
      <td>
        {diaryDate.year}-{diaryDate.month}-{diaryDate.day}
      </td>
      <td>
        <DetailButton onClick={handleDetailClick}>내용 보기</DetailButton>
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

const DetailButton = styled.div`
  padding: 10px 5px;
  background: #9990ff;
  color: white;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
`;

export default Post;
