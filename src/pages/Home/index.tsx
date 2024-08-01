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
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
    0 2px 4px -2px var(--tw-shadow-color);
  width: 900px;
  height: 550px;
  margin-top: 50px;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  background-color: #ffffff;
  border-radius: 10px;
  padding: 16px;
`;

export default Home;
