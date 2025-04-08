import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const About = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("/api/instagram/media/instructors")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.posts) {
          setInstructors(data.posts);
        }
      })
      .catch((err) => console.error("Failed to fetch instructor posts", err));
  }, []);

  const getHighlightLink = (caption) => {
    if (caption.includes("실비아")) {
      return "https://www.instagram.com/stories/highlights/18336850966144273/";
    } else if (caption.includes("지니")) {
      return "https://www.instagram.com/stories/highlights/18128618899384330/";
    }
    return "#";
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">👩‍🏫 선생님 소개</h2>

      <Row className="justify-content-center">
        {instructors.map((post) => (
          <Col md={6} lg={5} key={post.id} className="mb-4">
            <Card className="h-100 shadow-sm text-center">
              <div style={{ width: "100%", padding: "10px" }}>
                <img
                  src={post.media_url || post.thumbnail_url}
                  alt={post.caption || "Instructor Introduction"}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "500px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Text style={{ whiteSpace: "pre-wrap", flexGrow: 1 }}>
                  {post.caption}
                </Card.Text>
                <div className="mt-3">
                  <Button
                    variant="outline-primary"
                    href={getHighlightLink(post.caption)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📹 영상 보기
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default About;
