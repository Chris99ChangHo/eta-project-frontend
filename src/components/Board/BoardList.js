import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/BoardList.css";

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/posts?search=${search}`);
      const data = await res.json();

      // 최신순 정렬 후 상위 3개를 공지로 분리
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const top3 = sorted.slice(0, 3);
      const rest = sorted.slice(3);

      setNotices(top3);
      setPosts(rest);
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = () => {
    fetchPosts();
  };

  return (
    <div className="board-container">
      <h2 className="board-title">📌 게시판</h2>

      <div className="board-search">
        <input
          type="text"
          placeholder="검색어 입력"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <div className="board-actions">
        <Link to="/board/write" className="write-button">✏️ 글쓰기</Link>
      </div>

      {/* 🔔 공지사항 영역 */}
      {notices.length > 0 && (
        <ul className="notice-list">
          {notices.map((post) => (
            <li key={post._id} className="notice-item">
              <Link to={`/board/${post._id}`}>
                <strong>[공지]</strong> {post.title} - {post.author} (
                {new Date(post.createdAt).toLocaleDateString()}) 조회 {post.views}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id} className="post-item">
            <Link to={`/board/${post._id}`}>
              {post.title} - {post.author} (
              {new Date(post.createdAt).toLocaleDateString()}) 조회 {post.views}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
