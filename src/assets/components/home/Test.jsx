import React, { Component } from "react";

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseMoving: false,
    };

    this.setMouseMove = this.setMouseMove.bind(this);
  }

  setMouseMove(e) {
    e.preventDefault();
    this.setState({ mouseMoving: true });
  }

  render() {
    const scrollButtonStyle = {
      visibility: this.state.mouseMoving ? "visible" : "hidden",
    };

    return (
      <div onMouseMove={(e) => this.setMouseMove(e)}>
        <button style={scrollButtonStyle}>Back to top</button>
        <h1>Lorem Ipsum</h1>
      </div>
    );
  }
}
