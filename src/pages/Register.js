import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        name,
        email,
        password,
      });
      alert("회원가입 성공!");
      window.location.href = "/login"; // 가입 후 로그인 페이지로
    } catch (err) {
      alert("회원가입 실패!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "250px" }}
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "250px" }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "250px" }}
      />
      <button
        onClick={handleRegister}
        style={{ padding: "10px 20px", margin: "10px", cursor: "pointer" }}
      >
        회원가입
      </button>
    </div>
  );
}

export default Register;
