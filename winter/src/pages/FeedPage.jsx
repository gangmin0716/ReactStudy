import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';
import { Button } from '../components/Button';
import { Card } from '../components/Card'

export default function FeedPage() {
  const { user } = useAuth();
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
      <header className="max-w-md mx-auto mb-4 flex items-center justify-between">

        <h1 className="text-lg font-bold">Mini SNS</h1>
        <div className="flex items-center gap-3">
          {/* 프로필 이미지(있으면) */}
          <div className="w-8 h-8 rounded-full border bg-white overflow-hidden flex items-center justify-center">

            {photoURL ? (
              <img
                src={photoURL}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-500">🤔</span>
            )}
          </div>
          {/* displayName 우선 표시 */}

          <span className="text-sm text-gray-700">{displayName}</span>
          <Button className="border px-3 py-1 rounded"
            onClick={handleLogout} Text={"로그아웃"}>
            
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto space-y-3">
        {posts.map((p) => (
          <Card key={p.id} className="border rounded bg-white shadow p-4">

            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-700">{p.text}</p>
          </Card>
        ))}
      </main>
    </div>
  );
}