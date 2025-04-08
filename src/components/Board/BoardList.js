import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/BoardList.css";

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); // ✅ category 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchPosts = async () => {
    try {
      let endpoint = `/api/board?`;
  
      if (search.trim()) endpoint += `search=${search}&`;
      if (category) endpoint += `category=${category}`;
  
      const res = await fetch(endpoint);
      const data = await res.json();
  
      const noticePosts = data
        .filter((post) => post.isNotice)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
  
      const normalPosts = data
        .filter((post) => !post.isNotice)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      setNotices(noticePosts);
      setPosts(normalPosts);
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };  

  useEffect(() => {
    fetchPosts();
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleSearch = () => fetchPosts();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="board-container">
      <div className="board-header">
        <Link to="/" className="home-button">🏠 홈으로</Link>
      </div>
      <h2 className="board-title">📌 게시판</h2>

      <div className="board-search">
        <input
          type="text"
          placeholder="검색어 입력"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* ✅ 카테고리 선택 */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">전체</option>
          <option value="general">일반</option>
          <option value="notice">공지</option>
          <option value="qna">Q&A</option>
        </select>

        <button onClick={handleSearch}>검색</button>
      </div>

      {isLoggedIn && (
        <div className="board-actions">
          <Link to="/board/write" className="write-button">✏️ 글쓰기</Link>
        </div>
      )}

      {notices.length > 0 && (
        <ul className="notice-list">
          {notices.map((post) => (
            <li key={post._id} className="notice-item">
              <Link to={`/board/${post._id}`}>
                <strong>[공지]</strong> {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id} className="post-item">
            <Link to={`/board/${post._id}`}>{post.title}</Link>
            <span className="post-meta"> - {post.author?.name} | {post.views} 조회</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
