import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isNotice, setIsNotice] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author: "관리자", isNotice }),
    });
    navigate("/board");
  };

  return (
    <div>
      <h2>글 작성</h2>
      <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
      <label>
        <input type="checkbox" checked={isNotice} onChange={(e) => setIsNotice(e.target.checked)} />
        공지글로 설정
      </label>
      <button onClick={handleSubmit}>작성</button>
    </div>
  );
};

export default BoardWrite;
