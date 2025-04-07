// src/pages/NaverSuccess.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NaverSuccess = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setIsLoading(false);
      alert("네이버 로그인 성공!");
      navigate("/"); // 홈 또는 원하는 페이지로 이동
    } else {
      alert("로그인 실패");
      navigate("/login");
    }
  }, [navigate]);

  return <div>{isLoading ? "로그인 처리 중..." : "완료!"}</div>;
};

export default NaverSuccess;
