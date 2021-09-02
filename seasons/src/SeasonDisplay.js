import React from "react";

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) return lat > 0 ? "Summer" : "Winter";
  else return lat > 0 ? "Winter" : "Summer";
};

const SeasonDisplay = (props) => {
  const season = getSeason(props.latitutde, new Date().getMonth());
  const text =
    season === "Winter" ? "Brr, it is chilly!" : "Lets hit the beach!";

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

export default SeasonDisplay;
