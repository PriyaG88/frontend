import React from "react";

const seasonConfig = {
  winter: {
    text: "Brr, it is chilly!",
    iconName: "snowflake",
  },
  summer: {
    text: "Lets hit the beach!",
    iconName: "sun",
  },
};

const getSeason = (lat, month) => {
  if (month > 2 && month < 9) return lat > 0 ? "summer" : "winter";
  else return lat > 0 ? "winter" : "summer";
};

const SeasonDisplay = (props) => {
  const season = getSeason(props.latitutde, new Date().getMonth());
  const { text, iconName } = seasonConfig[season];

  return (
    <div>
      <i className={`${iconName} icon`} />
      <h1>{text}</h1>
      <i className={`${iconName} icon`} />
    </div>
  );
};

export default SeasonDisplay;
