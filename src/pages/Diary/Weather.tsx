import { useState } from "react";

const Weather = () => {
  const [view, setView] = useState(false);
  const [weather, setWeather] = useState("맑음");

  const weatherList = ["맑음", "흐림", "비"];

  //   const settingWeather = (weather) => {
  //     set

  //   };

  return (
    <div onClick={() => setView(!view)}>
      <label>{weather}</label>
      {view ? "^" : "⌄"}
      {view && (
        <>
          {weatherList.map((weathers, index) => (
            <li onClick={() => setWeather(weathers)} key={index}>
              {weathers}
            </li>
          ))}
        </>
      )}
    </div>
  );
};

export default Weather;
