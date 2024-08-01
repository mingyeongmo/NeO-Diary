import { getYear } from "date-fns";
import { LeftBtn, RightBtn } from "components/Icon/Icons";
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

  const decreaseMonth = () => {
    if (selectedMonth === 1) {
      setSelectedYear((prevYear) => prevYear - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth((prevMonth) => prevMonth - 1);
    }
  };

  const increaseMonth = () => {
    if (selectedMonth === 12) {
      setSelectedYear((prevYear) => prevYear + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth((prevMonth) => prevMonth + 1);
    }
  };
  return (
    <DateSettingContainer>
      <div onClick={decreaseMonth}>
        <LeftBtn
          style={{
            width: "20px",
            height: "20px",
            strokeWidth: "1",
            cursor: "pointer",
          }}
        />
      </div>
      <div>
        <YearSet
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </YearSet>
        <MonthSet
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </MonthSet>
      </div>
      <div onClick={increaseMonth}>
        <RightBtn
          style={{
            width: "20px",
            height: "20px",
            strokeWidth: "1",
            cursor: "pointer",
          }}
        />
      </div>
    </DateSettingContainer>
  );
};

const DateSettingContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const YearSet = styled.select`
  box-sizing: border-box;
  font-size: 1.4rem;
  font-weight: 600;
  width: auto;
  height: 50px;
  text-align: center;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  margin-left: 20px;
`;

const MonthSet = styled.select`
  box-sizing: border-box;
  font-size: 1.4rem;
  font-weight: 600;
  width: auto;
  height: 50px;
  text-align: center;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  margin: 0 20px 0 10px;
`;

export default DateSet;
