import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Grid, Button, Form, TextArea } from "semantic-ui-react";

//import "./style/commentForm.css";

class CommentForm extends React.Component {
  handleOnSubmit(event) {
    event.preventDefault();
    axios
      .post("/videos/addComments", {
        data: {
          videoId: this.props.videoId,
          username: this.props.username,
          comment: this.props.comment,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.props.commentOnChange("");
      });
  }

  render() {
    if (this.props.enableComment) {
      return (
        <Form reply onSubmit={(e) => this.handleOnSubmit(e)}>
          <Grid.Row
            centered
            columns={1}
            style={{
              display: "inline",
            }}
          >
            <Grid.Column>
              <Form.Field
                name="description"
                control={TextArea}
                width={20}
                position="center"
                value={this.props.comment}
                onChange={(e) => this.props.commentOnChange(e.target.value)}
                defaultValue="Default text..."
                type="text"
                placeholder="Leave your comments!"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row
            centered
            columns={6}
            style={{
              display: "inline",
            }}
          >
            <Grid.Column>
              <Button
                position="right"
                content="Add Reply"
                labelPosition="right"
                icon="edit"
                primary
                type="submit"
              />
            </Grid.Column>
          </Grid.Row>
        </Form>
      );
    } else {
      return (
        <Row>
          <Col className={"text-center"} lg={"12"}>
            <h3 style={{ color: "black", fontFamily: "Chalkduster, fantasy" }}>
              If you want to leave comments, please <a href="/login">login</a>{" "}
              first.{" "}
            </h3>
          </Col>
        </Row>
      );
    }
  }
}

CommentForm.propTypes = {
  videoId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  enableComment: PropTypes.bool.isRequired,
  comment: PropTypes.string.isRequired,
  commentOnChange: PropTypes.func.isRequired,
};

export default CommentForm;
