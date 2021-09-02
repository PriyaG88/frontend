import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";

class App extends React.Component {
  state = {
    latitude: null,
    errorMessage: undefined,
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ latitude: position.coords.latitude }),
      (error) => this.setState({ errorMessage: error.message })
    );
  }

  render() {
    if (!this.state.latitude && !this.state.errorMessage) {
      return <div>Loading...</div>;
    } else {
      return this.state.errorMessage ? (
        <div>{this.state.errorMessage}</div>
      ) : (
        <SeasonDisplay latitude={this.state.latitude} />
      );
    }
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
