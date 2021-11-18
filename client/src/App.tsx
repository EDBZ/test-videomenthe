import { useState } from "react";
import "./App.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import Uploader from "./components/uploader";
import List from "./components/list";
import VideoPlayer from "./components/videoPlayer";

function App() {
  const [selectedVideo, setSelectedVideo] = useState<string>("");

  const handleGetVideo = (video: string) => setSelectedVideo(video);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src="logo_videomenthe.png" alt="logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <h1>Test Emmanuel Debuire</h1>
          </Nav>
        </Container>
      </Navbar>
      <Container className="App">
        <Uploader/>
        <List handleGetVideo={handleGetVideo} />
        <VideoPlayer video={selectedVideo} />
      </Container>
    </>
  );
}

export default App;
