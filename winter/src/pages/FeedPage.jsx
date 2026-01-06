export default function FeedPage({ isLogin }) {
  return (
    <div>
      <h2>피드</h2>
      {isLogin && <button>글쓰기</button>}
    </div>
  );
}