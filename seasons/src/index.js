import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";

const App = () => {
  let latitude = undefined;

  window.navigator.geolocation.getCurrentPosition(
    (position) => (latitude = position.coords.latitude),
    (error) => console.log(error)
  );
  return <div>{latitude}</div>;
};

ReactDOM.render(<App />, document.querySelector("#root"));
