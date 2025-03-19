import React from 'react';
import Header from './components/Header';
import CoverCarousel from './components/CoverCarousel';
import About from './components/About';
import PublicReviews from './components/PublicReviews';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <div className="row mt-5">
        <div className="col">
          <CoverCarousel />
        </div>
      </div>

      {/* About Section */}
      <div className="row mt-5">
        <div className="col">
          <About />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row mt-5">
        <div className="col">
          <h2 className="text-center">Gangnam Reviews</h2>
          <PublicReviews location="Gangnam" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <h2 className="text-center">Uijeongbu Reviews</h2>
          <PublicReviews location="Uijeongbu" />
        </div>
      </div>

      {/* Footer Section */}
      <div className="row mt-5">
        <div className="col">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
