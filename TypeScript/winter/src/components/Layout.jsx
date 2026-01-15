import Header from './Header';
import HomePage from '../pages/HomePage';
import FeedPage from '../pages/FeedPage';
import LoginPage from '../pages/LoginPage';
export default function Layout({ isLogin, setIsLogin }) {
  return (
    <div>
      <Header isLogin={isLogin} />
      {isLogin ? (
        <FeedPage isLogin={isLogin} />
      ) : (
        <HomePage isLogin={isLogin} />
      )}
      {!isLogin && <LoginPage setIsLogin={setIsLogin} />}
    </div>
  );
}