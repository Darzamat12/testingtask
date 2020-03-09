import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Canvas from "./components/canvas";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>This is my solution to the task</h1>
        </header>
        <Canvas className="canvas" />
        <h2>
          Change input information in respective file in the root of the project
          to change this drawing
        </h2>
      </div>
    );
  }
}

export default App;
