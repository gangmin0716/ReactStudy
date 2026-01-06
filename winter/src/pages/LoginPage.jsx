export default function LoginPage({ setIsLogin }) {
  return (
    <div>
      <h2>로그인 페이지</h2>
      <button onClick={() => setIsLogin(true)}>로그인</button>
    </div>
  );
}