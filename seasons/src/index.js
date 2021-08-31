import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      errorMessage: undefined,
    };
  }

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
        <div>Latitutde: {this.state.latitude}</div>
      );
    }
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
