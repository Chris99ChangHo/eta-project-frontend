import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header"; // 헤더 컴포넌트 추가??
import CoverCarousel from "./components/CoverCarousel"; // 커버 캐러셀 컴포넌트 추가??
import About from "./components/About"; // 소개 컴포넌트 추가??
import PublicReviews from "./components/PublicReviews"; // 리뷰 컴포넌트 추가
import Footer from "./components/Footer"; // Footer 컴포넌트 추가 (구글폼, 인스타, 소모임 링크)
import Login from "./pages/Login"; // 로그인 페이지 추가
import Register from "./pages/Register"; // 회원가입 페이지 추가
import NaverSuccess from "./pages/NaverSuccess"; // 네이버 로그인 성공 페이지 추가

const Home = () => {
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 메인 페이지 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
        <Route path="/register" element={<Register />} /> {/* 회원가입 페이지 */}
        <Route path="/naver-success" element={<NaverSuccess />} /> {/* 네이버 로그인 성공 페이지 */}
      </Routes>
    </Router>
  );
};

export default App;
