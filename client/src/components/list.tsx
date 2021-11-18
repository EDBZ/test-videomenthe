import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

interface ListProps {
  handleGetVideo: (video: string) => void;
}

export default function List(props: ListProps) {
  const [list, setList] = useState<string[]>([]);
  const [active, setactive] = useState<number | null>(null);
  useEffect(() => {
    axios
      .get("//localhost:8000/files")
      .then((response) => setList(response.data))
      .catch((error) => console.log("Error"));
  });

  const handleClick = (item: string, index: number) => {
    setactive(index);
    props.handleGetVideo(item);
  };

  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>Videos Availables</Card.Title>
        <ListGroup as="ol" numbered>
          {list.map((item, index) => (
            <ListGroup.Item
              action
              as="li"
              onClick={() => handleClick(item, index)}
              variant={index === active ? "primary" : ""}
              key={index}
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
