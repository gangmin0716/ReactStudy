import { useAuth } from "../auth/useAuth";

export default function HomePage() {
  const { isLogin } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h1>Home</h1>
      <p>
        현재 로그인 상태:
        <strong style={{ marginLeft: 8 }}>
          {isLogin ? '로그인됨 ' : '비로그인 '}
        </strong>
      </p>
      {!isLogin && (
        <p style={{ marginTop: 12 }}>
          로그인을 하면 피드와 글쓰기 기능을 사용할 수 있어요.
        </p>
      )}
    </div>
  );
}