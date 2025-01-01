import React from 'react';
import { Container, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>About the Class</Card.Title>
          <Card.Text>
            Learn English through interactive acting classes! Improve your skills while having fun.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
