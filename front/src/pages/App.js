import React from "react";
import "./App.css";
import "./style/button1.css";

import Jumbo from "./Jumbotron.js";

import NavigationBar from "./NavigationBar.js";

import axios from "axios";
import { Row } from "react-bootstrap";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
    };
  }

  componentDidMount() {
    axios.get("/videos/list", {}).then((response) => {
      this.setState({
        videoList: response.data, //后端叫resul t，前端叫response.data
      });
    });
  }

  render() {
    const links = this.state.videoList.map((value, index) => {
      return (
        <li key={index} style={{ "text-align": "left" }}>
          <h2 style={{ "text-align": "left" }}>
            <span className="span_color">
              <div style={{ color: "black" }}>🐶{value.name}</div>
            </span>
          </h2>
          <div>
            <a href={"/videos/" + value.id} style={{ color: "black" }}>
              <button className="button1">
                {" "}
                👉Click to Add/See Comments👈
              </button>
            </a>
          </div>

          <iframe
            width="630"
            height="450"
            src={value.url}
            frameBorder="10"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </li>
      );
    });

    return (
      <div>
        <NavigationBar />
        <Jumbo />
        <div className="back">
          <Row>
            <ul>{links}</ul>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
