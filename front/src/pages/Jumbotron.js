import React, { Component } from "react";
import "./style/jumbotron.css";
import "./App.css";

class Jumbo extends Component {
  render() {
    return (
      <div
        className="jumbotron text-center d-flex align-items-center justify-content-center"
        style={{
          "text-align": "center",
          fontFamily: "Marker Felt, fantasy",
          opacity: "0.8",
        }}
      >
        <div className="content">
          <h1
            style={{
              fontFamily: "Marker Felt, fantasy",
            }}
          >
            Pettube
          </h1>
          <p className="lead">The cuttest pettube for pets.</p>
        </div>
      </div>
    );
  }
}

export default Jumbo;
