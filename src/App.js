import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Element } from "react-scroll"; // 🔥 react-scroll: 구역 구분용 Element

// 컴포넌트 임포트
import Header from "./components/Header";
import CoverCarousel from "./components/CoverCarousel";
import About from "./components/About";
import PublicReviews from "./components/PublicReviews";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NaverSuccess from "./pages/NaverSuccess";
import InstagramFeed from "./components/InstagramFeed";
import BoardList from "./components/Board/BoardList";
import BoardDetail from "./components/Board/BoardDetail";
import BoardWrite from "./components/Board/BoardWrite";
import BoardEdit from "./components/Board/BoardEdit";

// 홈 화면 컴포넌트
const Home = () => {
  return (
    <div className="container">
      {/* 헤더 */}
      <Header />

      {/* 캐러셀 섹션 */}
      <div className="row mt-5">
        <div className="col">
          <CoverCarousel />
        </div>
      </div>

      {/* About 섹션 (스크롤 이동 대상) */}
      <Element name="about">
        <div className="row mt-5">
          <div className="col">
            <About />
          </div>
        </div>
      </Element>

      {/* Reviews 섹션 (스크롤 이동 대상) */}
      <Element name="reviews">
        <div className="row mt-5">
          <div className="col">
            <PublicReviews />
          </div>
        </div>
      </Element>

      {/* Instagram 섹션 */}
      <div className="row mt-5">
        <div className="col">
          <InstagramFeed />
        </div>
      </div>

      {/* Footer 섹션 (스크롤 이동 대상) */}
      <Element name="footer">
        <div className="row mt-5">
          <div className="col">
            <Footer />
          </div>
        </div>
      </Element>
    </div>
  );
};

// 전체 라우터 설정
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 메인 홈 화면 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 */}
        <Route path="/register" element={<Register />} /> {/* 회원가입 */}
        <Route path="/naver-success" element={<NaverSuccess />} /> {/* 네이버 로그인 완료 */}
        <Route path="/board" element={<BoardList />} /> {/* 게시판 리스트 */}
        <Route path="/board/write" element={<BoardWrite />} /> {/* 게시판 글쓰기 */}
        <Route path="/board/:id" element={<BoardDetail />} /> {/* 게시글 상세 */}
        <Route path="/board/edit/:id" element={<BoardEdit />} /> {/* 게시글 수정 */}
      </Routes>
    </Router>
  );
};

export default App;
