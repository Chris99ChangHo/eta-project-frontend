import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../../styles/BoardDetail.css";

const BoardDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 게시글 가져오기
    fetch(`/api/board/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));

    // 로그인한 유저 정보 가져오기
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setCurrentUserId(data._id))
        .catch((err) => console.error("유저 정보 가져오기 실패:", err));
    }
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmed) return;

    await fetch(`/api/board/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    navigate("/board");
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="board-detail-container">
      <h2 className="board-detail-title">
        {post.isNotice && <strong>[공지] </strong>}
        {post.title}
      </h2>
      <div className="board-detail-meta">
        <span>🗂 카테고리: {post.category}</span> |{" "}
        <span>✍ 작성자: {post.author?.name}</span> |{" "}
        <span>👁 조회수: {post.views}</span> |{" "}
        <span>🕒 작성일: {new Date(post.createdAt).toLocaleString()}</span>
      </div>
      <div className="board-detail-content">{post.content}</div>

      {/* ✏️ 로그인 유저와 작성자가 일치할 경우만 보여줌 */}
      {currentUserId === post.author?._id && (
        <div className="board-detail-actions">
          <Link to={`/board/edit/${post._id}`}>✏️ 수정</Link>
          <button onClick={handleDelete}>🗑 삭제</button>
          <button onClick={() => navigate("/board")}>📋 목록으로</button>
        </div>
      )}
    </div>
  );
};

export default BoardDetail;
