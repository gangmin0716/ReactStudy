import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  // 입력 상태
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  // 프로필 읽기
  useEffect(() => {
    if (!user?.uid) return;
    const fetchProfile = async () => {
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setProfile(data);
        setDisplayName(data.displayName ?? '');
        setBio(data.bio ?? '');
      }
      setLoading(false);
    }; fetchProfile();
  }, [user?.uid]);
  // 프로필 저장(Update)
  const handleSave = async () => {
    if (!user?.uid) return;
    const ref = doc(db, 'users', user.uid);
    await updateDoc(ref, {
      displayName,
      bio,
      updatedAt: serverTimestamp(),
    });
    alert('프로필이 저장되었습니다.');
  };
  const handleGoFeed = () => {
    navigate('/feed');
  };
  if (loading) return <p>로딩 중...</p>;
  if (!profile) return <p>프로필 정보가 없습니다.</p>;
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-md mx-auto border rounded bg-white p-6 shadow space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">프로필 관리</h1>
          <Button onClick={handleGoFeed} variant="secondary"
            className="py-1 px-3"
            Text='← 피드로'>
          </Button>
        </div>
        {/* 닉네임 */}
        <div>
          <label className="block text-sm mb-1">닉네임</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        {/* 이메일 (읽기 전용) */}
        <div>
          <label className="block text-sm mb-1">이메일</label>
          <input
            className="w-full border rounded px-3 py-2 bg-gray-100"
            value={profile.email}
            disabled />
        </div>
        {/* 소개 */}
        <div>
          <label className="block text-sm mb-1">소개</label>
          <textarea
            className="w-full border rounded px-3 py-2 resize-none"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)} />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-2 rounded"
        >
          저장
        </button>
      </div>
    </div>
  );
}