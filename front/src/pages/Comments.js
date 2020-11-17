import React from "react";
import axios from "axios";
//import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Comment, Header } from "semantic-ui-react";

// const sectionStyle = {
//   width: "60%",
//   height: "100px",
// };
//import "./style/comments.css";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    axios
      .get("/videos/getComments", {
        params: {
          videoId: this.props.videoId,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          comments: response.data,
        });
      });
  }

  renderComments() {
    let content = null;
    if (this.state.comments.length <= 0) {
      content = <div></div>;
    } else {
      content = this.state.comments.map((value, index) => {
        return (
          <Comment key={index}>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <Comment.Content>
              <div
                style={{
                  display: "inline-flex",
                }}
              >
                <Comment.Author>
                  {value.userToken ? value.userToken : "Jack"}
                </Comment.Author>
                <Comment.Metadata>{value.time}</Comment.Metadata>
              </div>
              <Comment.Text
                style={{ color: "black", fontFamily: "Chalkduster, fantasy" }}
              >
                {value.comment}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        );
      });
    }
    return (
      <div>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>
          {content}
        </Comment.Group>
      </div>
    );
  }

  render() {
    return this.renderComments();
  }
}

Comments.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default Comments;
