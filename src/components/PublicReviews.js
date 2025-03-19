import React from 'react';
import reviewsData from './reviewsData';
import '../styles/PublicReviews.css';

const PublicReviews = ({ location }) => {
  const filteredReviews = reviewsData.filter((review) => review.location === location);

  const renderCarousel = (title, reviews) => (
    <div className="review-carousel">
      <h3 className="text-center">{title}</h3>
      <div id={`${location}Carousel`} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {reviews.map((review, index) => (
            <div key={review.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="review-content">
                <img src={review.photo} alt={`${location} Activity`} className="review-photo" />
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target={`#${location}Carousel`} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={`#${location}Carousel`} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="public-reviews-container">
      {/* 활동사진 슬라이드 */}
      {renderCarousel(`${location} Activity Photos`, filteredReviews)}

      {/* 텍스트 리뷰 섹션 */}
      <div className="review-section">
        <h3 className="text-center">{location} Student Testimonials</h3>
        <div className="row">
          {filteredReviews.map((review) => (
            <div key={review.id} className="col-md-4 mb-4">
              <div className="review-text-card">
                <img src={review.text} alt={`${location} Review`} className="review-text-image" />
                <p className="review-location">Location: {review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicReviews;
