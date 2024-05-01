import { Link } from "react-router-dom";
import * as S from "./style";

const Month = () => {
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const monthItems = months.map((month, index) => (
    <S.Box key={index}>
      <Link to={`/diary/list/${index + 1}`}>{month}</Link>
    </S.Box>
  ));

  return <S.GridContainer>{monthItems}</S.GridContainer>;
};

export default Month;
