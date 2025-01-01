import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [input, setInput] = useState('');

  // GET 요청: 서버에서 리뷰를 가져오기
  useEffect(() => {
    fetch('http://localhost:3001/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);

  // POST 요청: 새로운 리뷰 추가
  const addReview = () => {
    if (!input.trim()) return;
    fetch('http://localhost:3001/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    })
      .then((res) => res.json())
      .then((newReview) => {
        setReviews([...reviews, newReview]);
        setInput('');
      })
      .catch((err) => console.error('Error adding review:', err));
  };

  return (
    <section className="my-4">
      <h2>Class Reviews</h2>
      {/* 리뷰 목록 */}
      <ul className="list-group mb-3">
        {reviews.map((review) => (
          <li key={review.id} className="list-group-item">
            {review.text}
          </li>
        ))}
      </ul>

      {/* 리뷰 입력 및 버튼 */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a review..."
        />
        <button className="btn btn-primary" onClick={addReview}>
          Add Review
        </button>
      </div>
    </section>
  );
};

export default Reviews;
