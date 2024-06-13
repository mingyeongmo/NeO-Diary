const Calendar = () => {
  let today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  return (
    <>
      <h1 style={{ flex: 1 }}>{`${year} / ${month} / ${date}`}</h1>
    </>
  );
};

export default Calendar;
