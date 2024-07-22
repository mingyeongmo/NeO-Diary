import { useState } from "react";
import DateSet from "./DateSet";
import Posts from "components/Post/posts";
import styled from "styled-components";

const Home = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  return (
    <HomeContainer>
      <DateSet
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <Posts selectedYear={selectedYear} selectedMonth={selectedMonth} />
    </HomeContainer>
  );
};
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
`;

export default Home;
