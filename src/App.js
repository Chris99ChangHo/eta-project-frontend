import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <div className="row">
        <div className="col">
          <Header />
        </div>
      </div>

      {/* About Section */}
      <div className="row mt-4">
        <div className="col">
          <About />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row mt-4">
        <div className="col">
          <Reviews />
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
