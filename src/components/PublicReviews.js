import React, { useEffect, useState } from 'react';
import '../styles/PublicReviews.css';
import { Modal, Button } from 'react-bootstrap';

const PublicReviews = () => {
  const [media, setMedia] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/media')
      .then((res) => res.json())
      .then((data) => setMedia(data))
      .catch((err) => console.error("Failed to fetch media:", err));

    // Elfsight script
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const gangnamPhotos = media.filter((m) => m.category === 'gangnam' && m.type === 'photo');
  const uijeongbuPhotos = media.filter((m) => m.category === 'uijeongbu' && m.type === 'photo');
  const reviewTexts = media.filter((m) => m.category === 'review' && m.type === 'text');

  const handleOpenModal = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + reviewTexts.length) % reviewTexts.length);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % reviewTexts.length);

  const renderCarousel = (title, id, items) => (
    <div className="review-carousel">
      <h3 className="text-center">{title}</h3>
      <div id={id} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {items.map((item, index) => (
            <div key={item._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="review-content">
                <img
                  src={`/images/${item.filename.split('/images/')[1]}`}
                  alt={title}
                  className="review-photo"
                />
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="public-reviews-container">
      {renderCarousel("📍 강남 활동 사진", "gangnamCarousel", gangnamPhotos)}
      {renderCarousel("📍 의정부 활동 사진", "uijeongbuCarousel", uijeongbuPhotos)}

      {/* 수강 후기 */}
      <div className="review-section">
        <h3 className="text-center">📝 수강 후기</h3>
        <div className="row">
          {reviewTexts.map((item, index) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div
                className="review-text-card"
                onClick={() => handleOpenModal(index)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`/images/${item.filename.split('/images/')[1]}`}
                  alt="Review"
                  className="review-text-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 모달 */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="text-center">
          <img
            src={`/images/${reviewTexts[currentIndex]?.filename.split('/images/')[1]}`}
            alt="Review Enlarged"
            className="img-fluid"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePrev}>이전</Button>
          <Button variant="secondary" onClick={handleNext}>다음</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PublicReviews;
