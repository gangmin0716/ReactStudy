import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card'

export default function FeedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Firestore 프로필 상태
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (!user?.uid) return;
    const fetchProfile = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) setProfile(snap.data());
      } catch (err) {
        console.log('프로필 읽기 실패:', err);
      }
    };
    fetchProfile();
  }, [user?.uid]);
  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleGoProfile = () => {
    return (
      navigate('/profile')
    )
  }

  const displayName =
    profile?.displayName ?? (user?.email ? user.email.split('@')[0] : 'user');
  const photoURL = profile?.photoURL ?? null;
  // 연습용 더미 피드 (데이터 연결은 아직 X)
  const posts = [
    { id: 1, name: '토끼', text: '이제 프로필을 읽어서 보여줄 수 있다 ' },
    { id: 2, name: '여우', text: '다음은 ProfilePage에서 수정(Update)이다 ' },
  ];
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <header className="max-w-md mx-auto mb-4 flex flex-wrap

items-center justify-between gap-3">

        <h1 className="text-lg font-bold shrink-0">Mini SNS</h1>
        <div className="flex flex-wrap items-center justify-end

gap-2 w-full sm:w-auto">

          {/* 프로필(아이콘 + 이름) 묶음 */}

          <div className="flex items-center gap-3 whitespace-
nowrap shrink-0">

            <div className="w-8 h-8 rounded-full border bg-white

overflow-hidden flex items-center justify-center">

              {photoURL ? (
                <img
                  src={photoURL}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-500"> </span>
              )}
            </div>

            <span className="text-sm text-gray-
700">{displayName}</span>

          </div>
          {/* 버튼 영역 */}

          <div className="flex items-center gap-2 whitespace-
nowrap">

            <Button
              onClick={handleGoProfile}
              variant="primary"
              className="w-auto px-3 py-1 bg bg-black text-white"
              Text='프로필 관리'
            >
            </Button>
            <Button onClick={handleLogout} className="py-1 px-2" Text='로그아웃'>
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-md mx-auto space-y-3">
        {posts.map((p) => (
          <Card key={p.id} className="p-4">
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-700">{p.text}</p>
          </Card>
        ))}
      </main>
    </div>
  );
}