import React from 'react';
import { Carousel } from 'react-bootstrap';

const CoverCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/cover/cover_1.png"
          alt="First Slide"
        />
        <Carousel.Caption>
          <h3>Welcome to ETA Project</h3>
          <p>Learn English through Acting!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/cover/cover_2.png"
          alt="Second Slide"
        />
        <Carousel.Caption>
          <h3>Interactive Classes</h3>
          <p>Improve your skills while having fun!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/cover/cover_5.png"
          alt="Third Slide"
        />
        <Carousel.Caption>
          <h3>Engage and Learn</h3>
          <p>Connect with peers in a creative environment.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/cover/cover_4.png"
          alt="Fourth Slide"
        />
        <Carousel.Caption>
          <h3>Join Us Today!</h3>
          <p>Start your journey with ETA Project now!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CoverCarousel;
