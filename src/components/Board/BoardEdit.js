import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/BoardForm.css";

const BoardEdit = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", content: "", category: "general" }); // ✅ category 포함
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/board/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token"); // 🔑 토큰 가져오기
  
    try {
      const res = await fetch(`/api/board/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ 인증 헤더 추가
        },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          category: post.category,
          isNotice: post.isNotice || false, // ✅ 공지 여부도 함께 전송
        }),
      });
  
      if (!res.ok) {
        const err = await res.json();
        alert(`오류: ${err.message}`);
        return;
      }
  
      navigate(`/board/${id}`);
    } catch (error) {
      console.error("게시글 수정 중 에러:", error);
    }
  };

  return (
    <div className="board-form-container">
      <h2 className="board-form-title">글 수정</h2>
      <input
        className="board-form-input"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <textarea
        className="board-form-textarea"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      />
      
      {/* ✅ 카테고리 선택 박스 */}
      <select
        className="board-form-select"
        value={post.category}
        onChange={(e) => setPost({ ...post, category: e.target.value })}
      >
        <option value="general">일반</option>
        <option value="notice">공지</option>
        <option value="qna">Q&A</option>
      </select>
  
      {/* ✅ 공지글 여부 체크박스 추가 */}
      <label style={{ marginTop: "10px" }}>
        <input
          type="checkbox"
          checked={post.isNotice || false}
          onChange={(e) => setPost({ ...post, isNotice: e.target.checked })}
        />
        &nbsp;공지글로 설정
      </label>
  
      <div className="board-form-actions">
        <div></div>
        <button className="board-form-button" onClick={handleUpdate}>
          수정
        </button>
      </div>
    </div>
  );  
};

export default BoardEdit;
