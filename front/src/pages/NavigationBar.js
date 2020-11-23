import React from "react";
import { Button } from "semantic-ui-react";
import Cookies from "universal-cookie";
import "./style/navigation-bar.css";

//import { NavLink } from "react-router-dom";
import { Row, Col, Menu } from "antd";
//import HomeOutlined from "@ant-design/icons";
import { Icon } from "semantic-ui-react";
//import "./style/button1.css";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("pwLoggedIn");
    if (token !== undefined && token !== null && token !== "") {
      this.setState({
        loggedIn: true,
      });
    } else {
      this.setState({
        loggedIn: false,
      });
    }
  }

  handleLogout(event) {
    event.preventDefault();
    const cookies = new Cookies();
    cookies.remove("pwLoggedIn");
    this.setState({
      loggedIn: false,
    });
  }

  render() {
    let rightCornerContent = null;
    if (this.state.loggedIn) {
      rightCornerContent = (
        <div>
          <Button
            className={"mx-1"}
            variant={"primary"}
            color={"red"}
            onClick={(e) => this.handleLogout(e)}
          >
            Logout
          </Button>
          <a href="/user-profile">
            <img
              id={"rightCornerIcon"}
              src="https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9"
              alt=""
            />
          </a>
        </div>
      );
    } else {
      rightCornerContent = (
        <div
          style={{
            fontSize: "20px",
            fontFamily: "Chalkduster, fantasy",
          }}
        >
          <Button.Group>
            <Button
              style={{
                fontSize: "18px",
                fontFamily: "Chalkduster, fantasy",
              }}
              href={"/register"}
            >
              Register
            </Button>
            <Button.Or />
            <Button
              style={{
                fontSize: "18px",
                fontFamily: "Chalkduster, fantasy",
              }}
              href={"/login"}
            >
              Login
            </Button>
          </Button.Group>
        </div>
      );
    }

    return (
      <Row>
        <Col sm={14} md={10} lg={8} xl={6}>
          <div
            className="brand"
            style={{
              color: "black",
              fontSize: "18px",
              fontFamily: "Chalkduster, fantasy",
            }}
          >
            <img
              src="https://res.cloudinary.com/masterchef/image/upload/v1599206804/icon_jzvahe.png"
              alt="icon"
              style={{ width: "4rem", marginRight: "20px" }}
            />
            Pettube
          </div>
        </Col>

        {/* Menu */}
        <Col sm={2} md={3} lg={5} xl={3}>
          {/* <Menu theme="dark" mode="horizontal"> */}
          <Menu mode="horizontal" style={{ background: "#ff8c1a" }}>
            <Menu.Item>
              <a href="/">
                <div
                  style={{
                    fontSize: "17px",
                    fontFamily: "Chalkduster, fantasy",
                    color: "white",
                  }}
                >
                  <Icon name="home" size="large" />
                  HOME
                </div>
              </a>
            </Menu.Item>

            {/* <Menu.Item key="3">
            <AboutModal />
          </Menu.Item> */}
          </Menu>
        </Col>

        <Col className="sign-in" sm={2} md={3} lg={10} xl={14}>
          {rightCornerContent}
        </Col>
      </Row>
    );
    // return (
    //   <Navbar bg="light" expand="lg">
    //     <Navbar.Brand href="/">Pet Website</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="mr-auto">
    //         <Nav.Link href="/">Homepage</Nav.Link>
    //       </Nav>
    //       {rightCornerContent}
    //     </Navbar.Collapse>
    //   </Navbar>
    // );
  }
}

export default NavigationBar;
