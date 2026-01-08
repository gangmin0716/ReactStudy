import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import RoomPage from './pages/RoomPage'
import RoomsPage from './pages/RoomsPage';
export default function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        로그인 상태 확인 중...
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* 테스트 전용 (로그인 무관) */}
        <Route path="/rooms-test" element={<RoomsPage />} />
        <Route path="/rooms-test/:roomId" element={<RoomPage />} />
        {!user ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/feed" replace />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/feed" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}