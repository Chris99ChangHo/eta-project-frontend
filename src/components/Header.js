import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
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

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">ETA Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#reviews">Reviews</Nav.Link>
            <Nav.Link href="#footer">Contact</Nav.Link>
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
