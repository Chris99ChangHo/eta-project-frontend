import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css"; // 추가 스타일을 위한 CSS 파일 (선택)

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    if (name.trim().length < 2) {
      setErrorMsg("이름은 2자 이상이어야 합니다.");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMsg("유효한 이메일 형식을 입력해주세요.");
      return false;
    }
    if (password.length < 6) {
      setErrorMsg("비밀번호는 6자 이상이어야 합니다.");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        name,
        email,
        password,
      });
      alert("회원가입 성공!");
      window.location.href = "/login";
    } catch (err) {
      if (err.response?.data?.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>

      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="register-input"
      />

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="register-input"
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="register-input"
      />

      {errorMsg && <div className="error-message">{errorMsg}</div>}

      <button className="register-button" onClick={handleRegister}>
        회원가입
      </button>
    </div>
  );
}

export default Register;
