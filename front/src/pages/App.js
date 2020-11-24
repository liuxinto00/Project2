//Hi, I think the structure is pretty clear, and better to include all the .pngs into one folder
import React from "react";
import "./App.css";

import Jumbo from "./Jumbotron.js";

import NavigationBar from "./NavigationBar.js";

import axios from "axios";
import { Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";

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
          <div>
            <h3 style={{ "text-align": "left" }}>
              <span className="span_color">
                <div
                  style={{ color: "black", fontFamily: "Chalkduster, fantasy" }}
                >
                  🐶{value.name}
                </div>
              </span>
            </h3>
            <div>
              <a href={"/videos/" + value.id} style={{ color: "black" }}>
                <Button
                  color="red"
                  size="big"
                  style={{
                    fontFamily: "Chalkduster, fantasy",
                  }}
                >
                  {" "}
                  👉 Click to Add/See Comments 👈
                </Button>
              </a>
            </div>
          </div>

          <iframe
            title="video"
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
