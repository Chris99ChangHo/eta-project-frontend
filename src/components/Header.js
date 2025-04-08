import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { scroller } from "react-scroll"; // 🔥 react-scroll의 scroll 함수

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 토큰이 있으면 로그인 상태 유지
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // 모든 저장 데이터 삭제
    setIsLoggedIn(false); // 상태 업데이트
    navigate("/");
    window.location.reload(); // 새로고침으로 강제 로그아웃 처리
  };

  // 🔥 SPA 내에서 스크롤 이동 처리 함수
  const scrollToSection = (section) => {
    if (location.pathname !== "/") {
      // 홈이 아닐 경우 홈으로 먼저 이동 후 스크롤
      navigate("/", { replace: false });
      // 약간의 딜레이 후 스크롤 (홈 이동 후 DOM 렌더링 시간 확보)
      setTimeout(() => {
        scroller.scrollTo(section, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
        });
      }, 100);
    } else {
      // 홈인 경우 바로 스크롤
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* 홈으로 이동 */}
        <Navbar.Brand as={Link} to="/">ETA Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* 각 섹션으로 부드럽게 이동 */}
            <Nav.Link onClick={() => scrollToSection("about")}>About</Nav.Link>
            <Nav.Link onClick={() => scrollToSection("reviews")}>Reviews</Nav.Link>
            <Nav.Link as={Link} to="/board">Board</Nav.Link>
            <Nav.Link onClick={() => scrollToSection("footer")}>Contact</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <Button variant="outline-light" onClick={handleLogout}>
                로그아웃
              </Button>
            ) : (
              <>
                <Button variant="outline-light" onClick={() => navigate("/login")} className="me-2">
                  로그인
                </Button>
                <Button variant="primary" onClick={() => navigate("/register")}>
                  회원가입
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
