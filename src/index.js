import React from "react";
import { createRoot } from "react-dom/client";
import SeasonDisplay from "./SeasonDiplay";
import Spinner from "./Spinner";

class App extends React.Component {
  constructor(props) {
    super(props); // super is a reference to the parent class's constructor function

    this.state = { ĺat: null, errMsg: "" };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errMsg: err.message })
    );
  }

  renderContent() {
    if (this.state.errMsg && !this.state.lat) {
      return <div>Error: {this.state.errMsg}</div>;
    }

    if (!this.state.errMsg && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner text="Please allow location access" />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
createRoot(document.querySelector("#root")).render(<App />);
