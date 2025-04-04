import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>로그인</h2>

      {errorMsg && (
        <div style={{ color: "red", marginBottom: "15px" }}>{errorMsg}</div>
      )}

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          display: "block",
          margin: "10px auto",
          padding: "10px",
          width: "250px",
        }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          display: "block",
          margin: "10px auto",
          padding: "10px",
          width: "250px",
        }}
      />
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", margin: "10px", cursor: "pointer" }}
      >
        로그인
      </button>

      <div style={{ marginTop: "20px" }}>
        <a href="http://localhost:3001/api/auth/naver">
          <button
            style={{
              padding: "10px 20px",
              margin: "5px",
              backgroundColor: "#03C75A",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Naver 로그인
          </button>
        </a>
      </div>
    </div>
  );
}

export default Login;
