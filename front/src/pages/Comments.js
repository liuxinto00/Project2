import React from "react";
import axios from "axios";
//import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Comment } from "semantic-ui-react";

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
          <div key={index}>
            <Comment.Group>
              <Comment>
                <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />

                <Comment.Author>
                  {value.userToken ? value.userToken : "Jack"}
                </Comment.Author>
                <Comment.Content>
                  <Comment.Metadata>
                    <div>{value.time}</div>
                  </Comment.Metadata>
                  <Comment.Text>{value.comment}</Comment.Text>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </div>
        );
      });
    }
    return content;
  }

  render() {
    return this.renderComments();
  }
}

Comments.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default Comments;
