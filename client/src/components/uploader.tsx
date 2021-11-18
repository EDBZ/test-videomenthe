import * as React from "react";
import { Button, Card, Form, Toast } from "react-bootstrap";
import axios from "axios";

export default class Uploaded extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedFile: null,
      disabled: true,
      isInvalid: false,
      show: false,
    };
  }
  onChangeHandler = (event: any) => {
    this.setState({
      disabled: true,
      isInvalid: false,
    });
    const videoTypeRegex = new RegExp(/^(video)/is);
    const fileType = event.target.files[0].type;
    if (videoTypeRegex.test(fileType)) {
      this.setState({
        selectedFile: event.target.files[0],
        disabled: false,
        isInvalid: false,
      });
    } else {
      this.setState({
        isInvalid: true,
      });
      console.log("This is not a video file");
    }
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    const { selectedFile } = this.state;
    formData.append("file", selectedFile);

    axios
      .post("//localhost:8000/upload", formData)
      .then((response) => this.setState({ show: true }))
      .catch((error) => console.log("Error"));
  };

  render() {
    return (
      <>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>Upload Video</Card.Title>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Control
                type="file"
                required
                isInvalid={this.state.isInvalid}
                onChange={this.onChangeHandler}
              />
            </Form.Group>
            <Button
              type="submit"
              onClick={this.handleSubmit}
              disabled={this.state.disabled}
            >
              Submit
            </Button>
          </Card.Body>
        </Card>
        <Toast
          className="d-inline-block m-1"
          bg="primary"
          onClose={() => this.setState({ show: false })}
          show={this.state.show}
          delay={3000}
          autohide
        >
          <Toast.Body className={"text-white"}>
            Video Uploaded
          </Toast.Body>
        </Toast>
      </>
    );
  }
}
