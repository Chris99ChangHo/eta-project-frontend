import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BoardEdit = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: post.title, content: post.content }),
    });
    navigate(`/board/${id}`);
  };

  return (
    <div>
      <h2>글 수정</h2>
      <input value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
      <textarea value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} />
      <button onClick={handleUpdate}>수정</button>
    </div>
  );
};

export default BoardEdit;
