import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css"; // 스타일 분리 (선택)

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(`${res.data.user.name}님, 환영합니다!`);
      window.location.href = "/";
    } catch (err) {
      const message =
        err.response?.data?.message || "로그인 중 오류가 발생했습니다.";
      setErrorMsg(message);
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      {errorMsg && <div className="error-message">{errorMsg}</div>}

      <button className="login-button" onClick={handleLogin}>
        로그인
      </button>

      <div className="sns-login-wrapper">
        <a href="http://localhost:3001/api/auth/naver">
          <button className="naver-button">Naver 로그인</button>
        </a>
      </div>
    </div>
  );
}

export default Login;
