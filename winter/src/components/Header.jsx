export default function Header({ isLogin }) {
  return (
    <header>
      <h1>Mini SNS</h1>
      <p>{isLogin ? '로그인 상태' : '비로그인 상태'}</p>
    </header>
  );
}