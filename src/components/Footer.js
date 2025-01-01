import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <h2 className="mb-3">Stay Connected</h2>
      <div className="d-flex flex-column align-items-center">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfTV04L_AbF-Rcw7xpZ6OWua0qg4yJlJ4a7j9gGquXX7nt4ZA/viewform"
          className="btn btn-primary mb-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Register Now
        </a>
        <a
          href="https://www.instagram.com/english_through_acting/profilecard/?igsh=eDB6eXlmbjBkd24="
          className="text-white mb-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          📸 Follow us on Instagram
        </a>
        <a
          href="https://www.somoim.co.kr/52a2da5c-b49c-11ef-b21e-0a7bc75226211"
          className="text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          🌐 Visit Our 소모임
        </a>
      </div>
    </footer>
  );
};

export default Footer;
