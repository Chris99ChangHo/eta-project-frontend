import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

const CoverCarousel = () => {
  const [coverImages, setCoverImages] = useState([]);

  // 고정된 캡션 데이터
  const captions = [
    {
      title: "Welcome to ETA Project",
      text: "Learn English through Acting!",
    },
    {
      title: "Interactive Classes",
      text: "Improve your skills while having fun!",
    },
    {
      title: "Engage and Learn",
      text: "Connect with peers in a creative environment.",
    },
    {
      title: "Join Us Today!",
      text: "Start your journey with ETA Project now!",
    },
  ];

  useEffect(() => {
    fetch('/api/media')
      .then((res) => res.json())
      .then((data) => {
        const covers = data
          .filter((item) => item.category === 'cover')
          .sort((a, b) => a.filename.localeCompare(b.filename));
        setCoverImages(covers);
      })
      .catch((err) => console.error("Failed to fetch cover images:", err));
  }, []);

  return (
    <Carousel>
      {coverImages.map((item, idx) => (
        <Carousel.Item key={item._id}>
          <img
            className="d-block w-100"
            src={`/images/${item.filename.split('/images/')[1]}`}
            alt={`Slide ${idx + 1}`}
          />
          <Carousel.Caption>
            <h3 style={idx === 2 ? { color: '#FF4500', fontWeight: 'bold' } : {}}>
              {captions[idx]?.title}
            </h3>
            <p style={idx === 2 ? { color: '#FF4500' } : {}}>
              {captions[idx]?.text}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CoverCarousel;
