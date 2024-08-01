import styled from "styled-components";
import { PostType } from "./posts";
import { useNavigate } from "react-router-dom";

const Post = ({
  id,
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
      state: {
        id,
        diaryTitle,
        diaryDate,
        diaryWeather,
        photo,
        diaryContent,
      },
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
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const DetailButton = styled.div`
  padding: 10px 5px;
  color: #9990ff;
  border: 1px solid #9990ff;
  border-radius: 5px;
  cursor: pointer;
`;

export default Post;
