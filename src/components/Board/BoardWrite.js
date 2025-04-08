import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/BoardForm.css";

const BoardWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general"); // ✅ 카테고리 상태 추가
  const [isNotice, setIsNotice] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error("유저 정보 불러오기 실패:", err));
    }
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3001/api/board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          category,
          isNotice: user?.role === "admin" ? isNotice : false,
        }),
      });      

      if (!res.ok) {
        const errorData = await res.json();
        alert(`오류: ${errorData.message}`);
        return;
      }

      alert("✅ 게시글이 등록되었습니다.");
      navigate("/board");
    } catch (error) {
      console.error("글 작성 중 에러:", error);
    }
  };

  return (
    <div className="board-form-container">
      <h2 className="board-form-title">글 작성</h2>
      <input
        className="board-form-input"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="board-form-textarea"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* ✅ 카테고리 선택 */}
      <div className="board-form-category">
        <label>
          카테고리:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="general">일반</option>
            <option value="notice">공지사항</option>
            <option value="qna">질문답변</option>
          </select>
        </label>
      </div>

      <div className="board-form-actions">
        {user?.role === "admin" && (
          <label>
            <input
              type="checkbox"
              checked={isNotice}
              onChange={(e) => setIsNotice(e.target.checked)}
            />
            공지글로 설정
          </label>
        )}
        <button className="board-form-button" onClick={handleSubmit}>
          작성하기
        </button>
      </div>
    </div>
  );
};

export default BoardWrite;
