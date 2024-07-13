import { Link } from "react-router-dom";
import Header from "components/Header";
import Month from "components/Month/Month";
import styled from "styled-components";

const Home = () => {
  return (
    <HomeContainer>
      <h1>나의 일기</h1>
      <Link to="/diary/write">일기 쓰러가기</Link>
      <h1>2024</h1>
      <Month />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
`;

export default Home;
