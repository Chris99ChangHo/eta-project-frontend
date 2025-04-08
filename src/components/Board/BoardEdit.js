import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/BoardEdit.css";

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
        placeholder="제목"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />

      <textarea
        className="board-form-textarea"
        placeholder="내용"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      />

      {/* ✅ 카테고리 선택 */}
      <div className="board-form-category">
        <label>
          카테고리:
          <select
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
          >
            <option value="general">일반</option>
            <option value="notice">공지</option>
            <option value="qna">Q&A</option>
          </select>
        </label>
      </div>

      {/* ✅ 공지 여부 및 버튼 정렬 */}
      <div className="board-form-actions">
        <label>
          <input
            type="checkbox"
            checked={post.isNotice || false}
            onChange={(e) =>
              setPost({ ...post, isNotice: e.target.checked })
            }
          />
          공지글로 설정
        </label>

        <div className="board-form-buttons">
          <button className="board-form-button" onClick={handleUpdate}>
            수정하기
          </button>
          <button
            className="board-form-button board-form-cancel"
            onClick={() => navigate("/board")}
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardEdit;
