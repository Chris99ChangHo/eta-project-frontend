import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const BoardDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    navigate("/board");
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>작성자: {post.author}</p>
      <p>조회수: {post.views}</p>
      <p>{post.content}</p>
      <Link to={`/board/edit/${post._id}`}>수정</Link>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default BoardDetail;
