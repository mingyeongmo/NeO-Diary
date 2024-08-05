import React, { SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import { ko } from "date-fns/locale";
import { LeftBtn, RightBtn } from "components/Icon/Icons";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Calendar.module.scss";

interface diaryCalendarType {
  setDiaryDate: (date: {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
  }) => void;
}

const Calendar = React.memo(({ setDiaryDate }: diaryCalendarType) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const YEARS = Array.from(
    { length: getYear(new Date()) + 1 - 2000 },
    (_, i) => getYear(new Date()) - i
  );
  const MONTHS = [
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

  useEffect(() => {
    if (selectedDate) {
      const newDateData = {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      };
      setDiaryDate(newDateData);
    } else {
      const emptyDateData = {
        year: undefined,
        month: undefined,
        day: undefined,
      };

      setDiaryDate(emptyDateData);
    }
  }, [selectedDate, setDiaryDate]);

  const handleDateChange = (date: SetStateAction<Date | null>) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.calenderContainer}>
      <DatePicker
        className={styles.datePicker}
        locale={ko}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.customHeaderContainer}>
            <div>
              <button
                type="button"
                onClick={decreaseMonth}
                className={styles.monthBtn}
                disabled={prevMonthButtonDisabled}
              >
                <LeftBtn />
              </button>
            </div>
            <div>
              <select
                value={getYear(date)}
                className={styles.year}
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className={styles.month}>{MONTHS[getMonth(date)]}</span>
            </div>
            <div>
              <button
                type="button"
                onClick={increaseMonth}
                className={styles.monthBtn}
                disabled={nextMonthButtonDisabled}
              >
                <RightBtn />
              </button>
            </div>
          </div>
        )}
        dateFormat="yyyy.MM.dd" // 날짜 형태
        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
        minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
        maxDate={new Date()} // maxDate 이후 날짜 선택 불가
        selected={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
});

export default Calendar;
