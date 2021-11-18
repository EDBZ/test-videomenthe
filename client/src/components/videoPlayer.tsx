import { useState, useEffect } from "react";
import { Card, Button, ProgressBar } from "react-bootstrap";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  video: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const [disabled, setdisabled] = useState<boolean>(true);
  const [video, setvideo] = useState<string>(props.video);
  const [isplaying, setisplaying] = useState<boolean>(false);
  const [progress, setprogress] = useState<number>(0);

  useEffect(() => {
    setvideo(props.video);
    setdisabled(props.video.length === 0);
  }, [props]);

  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>video</Card.Title>
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          url={`http://localhost:8000/files/${video}`}
          playing={isplaying}
          onProgress={(e) => setprogress(e.played * 100)}
          progressInterval={250}
        />
        <ProgressBar now={progress} />
        <Button onClick={(e) => setisplaying(!isplaying)} disabled={disabled}>
          {isplaying ? "Pause" : "Play"}
        </Button>
      </Card.Body>
    </Card>
  );
}
