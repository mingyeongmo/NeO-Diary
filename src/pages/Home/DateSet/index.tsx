import { getYear } from "date-fns";
import { useState } from "react";
import styled from "styled-components";

interface DateSetProps {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

const DateSet = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
}: DateSetProps) => {
  const years = Array.from(
    { length: getYear(new Date()) + 1 - 2000 },
    (_, i) => getYear(new Date()) - i
  );

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <DateSettingContainer>
      <YearSet
        defaultValue={selectedYear}
        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </YearSet>
      <MonthSet
        defaultValue={selectedMonth}
        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </MonthSet>
    </DateSettingContainer>
  );
};

const DateSettingContainer = styled.nav`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const YearSet = styled.select`
  box-sizing: border-box;
  font-size: 1.3rem;
  width: auto;
  height: 50px;
  color: #9990ff;
  background: #fafafa;
  text-align: center;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
`;

const MonthSet = styled.select`
  box-sizing: border-box;
  font-size: 1.3rem;
  width: auto;
  height: 50px;
  color: #9990ff;
  background: #fafafa;
  text-align: center;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  margin: 10px;
`;

export default DateSet;
