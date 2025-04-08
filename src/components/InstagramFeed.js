import React, { useEffect, useState } from "react";
import "../styles/InstagramFeed.css";

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 전체 피드 불러오기
    fetch("http://localhost:3001/api/instagram/media")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setPosts(data.data.slice(0, 8)); // ✅ 최근 8개만
        }
      });

    // 사용자 정보 불러오기
    fetch("http://localhost:3001/api/instagram/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div className="instagram-feed-container">
      <h2 className="text-center">📸 ETA 최근 소식</h2>

      {/* 프로필 정보 + 팔로우 버튼 */}
      {user && (
        <div className="insta-profile-bar">
          <div className="profile-left">
            <img
              src="/default-profile.png"
              alt="Profile"
              className="profile-pic-round"
            />
            <div className="profile-text">
              <div className="profile-name">
                <strong>English Through Acting</strong> | 연기로 배우는 영어
              </div>
              <div className="profile-username">@{user.username}</div>
            </div>
          </div>
          <a
            href={`https://instagram.com/${user.username}`}
            target="_blank"
            rel="noreferrer"
            className="follow-button-blue"
          >
            <i className="fa-brands fa-instagram"></i> 팔로우
          </a>
        </div>
      )}

      {/* 피드 */}
      <div className="instagram-grid">
        {posts.map((post) =>
          post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM" ? (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="insta-post"
            >
              <img src={post.media_url} alt={post.caption || "Instagram post"} />
              <div className="hover-info">
                {post.caption && <p>{post.caption.slice(0, 60)}...</p>}
                {post.like_count && <p>❤️ {post.like_count}</p>}
              </div>
            </a>
          ) : null
        )}
      </div>
    </div>
  );
};

export default InstagramFeed;
