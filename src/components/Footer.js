import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4">Stay Connected</h2>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-3">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfTV04L_AbF-Rcw7xpZ6OWua0qg4yJlJ4a7j9gGquXX7nt4ZA/viewform"
              className="btn btn-outline-light d-flex align-items-center justify-content-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              📝 Register Now
            </a>
          </Col>
          <Col md={4} className="mb-3">
            <a
              href="https://www.instagram.com/english_through_acting/profilecard/?igsh=eDB6eXlmbjBkd24="
              className="btn btn-outline-light d-flex align-items-center justify-content-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              📸 Follow us on Instagram
            </a>
          </Col>
          <Col md={4} className="mb-3">
            <a
              href="https://www.somoim.co.kr/52a2da5c-b49c-11ef-b21e-0a7bc75226211"
              className="btn btn-outline-light d-flex align-items-center justify-content-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              🌐 Visit Our 소모임
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
