// src/pages/NaverSuccess.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NaverSuccess = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (!token) throw new Error("토큰이 없습니다.");

        // 로컬스토리지에 저장
        localStorage.setItem("token", token);

        // 사용자 정보도 받아오기 (백엔드에서 토큰 인증 후 유저 정보 제공해야 함)
        const res = await axios.get("http://localhost:3001/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.setItem("user", JSON.stringify(res.data.user));
        setIsLoading(false);

        alert(`${res.data.user.name}님, 환영합니다!`);
        navigate("/");
      } catch (err) {
        console.error("네이버 로그인 처리 오류:", err.message);
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/login");
      }
    };

    fetchUserFromToken();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isLoading ? "네이버 로그인 처리 중..." : error || "완료!"}
    </div>
  );
};

export default NaverSuccess;
