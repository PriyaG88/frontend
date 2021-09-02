import React from "react";

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) return lat > 0 ? "summer" : "winter";
  else return lat > 0 ? "winter" : "summer";
};

const SeasonDisplay = (props) => {
  const season = getSeason(props.latitutde, new Date().getMonth());
  let text;
  let icon;
  if (season === "winter") {
    text = "Brr, it is chilly!";
    icon = "snowflake";
  } else {
    text = "Lets hit the beach!";
    icon = "sun";
  }

  return (
    <div>
      <i className={`${icon} icon`} />
      <h1>{text}</h1>
      <i className={`${icon} icon`} />
    </div>
  );
};

export default SeasonDisplay;
