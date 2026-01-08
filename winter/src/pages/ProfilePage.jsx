import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Storage 관련 함수 추가
import { db, storage } from '../firebase/firebase'; // storage export 확인 필요
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  // 입력 상태
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');

  // 이미지 관련 상태
  const [photoURL, setPhotoURL] = useState(''); // 현재 보여질 이미지 URL (미리보기용)
  const [avatarFile, setAvatarFile] = useState(null); // 실제 업로드할 파일 객체

  // 프로필 읽기
  useEffect(() => {
    if (!user?.uid) return;
    const fetchProfile = async () => {
      const refDoc = doc(db, 'users', user.uid);
      const snap = await getDoc(refDoc);
      if (snap.exists()) {
        const data = snap.data();
        setDisplayName(data.displayName ?? '');
        setBio(data.bio ?? '');
        setEmail(data.email ?? '');
        setPhotoURL(data.photoURL ?? ''); // 기존 프로필 사진 URL 가져오기
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user?.uid]);

  // 이미지 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // 선택한 파일을 즉시 미리보기로 보여주기 위해 임시 URL 생성
      const previewUrl = URL.createObjectURL(file);
      setPhotoURL(previewUrl);
    }
  };

  // 프로필 저장(Update)
  const handleSave = async () => {
    if (!user?.uid) return;

    try {
      let newPhotoURL = photoURL;

      // 1. 새 이미지가 선택되었다면 먼저 Storage에 업로드
      if (avatarFile) {
        // 저장 경로: avatars/유저ID/파일명
        const storageRef = ref(storage, `avatars/${user.uid}/${Date.now()}_${avatarFile.name}`);
        const uploadResult = await uploadBytes(storageRef, avatarFile);
        // 업로드된 이미지의 다운로드 URL 받기
        newPhotoURL = await getDownloadURL(uploadResult.ref);
      }

      // 2. Firestore 정보 업데이트 (이미지 URL 포함)
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        displayName,
        bio,
        photoURL: newPhotoURL, // 변경된 URL 혹은 기존 URL
        updatedAt: serverTimestamp(),
      });

      alert('프로필이 저장되었습니다.');
    } catch (error) {
      console.error("업로드 실패:", error);
      alert('프로필 저장 중 오류가 발생했습니다.');
    }
  };

  const handleGoFeed = () => {
    navigate('/feed');
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-md mx-auto border rounded bg-white p-6 shadow space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">프로필 관리</h1>
          <Button onClick={handleGoFeed} variant="secondary" className="py-1 px-3" Text='← 피드로' />
        </div>

        {/* 프로필 이미지 영역 */}
        <div className='flex flex-col items-center gap-3'>
          {/* 이미지 미리보기 */}
          <div className='size-24 rounded-full border overflow-hidden bg-gray-200'>
            {photoURL ? (
              <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
            )}
          </div>

          {/* 파일 선택 Input */}
          <label className="cursor-pointer bg-black text-white py-2 px-4 rounded hover:bg-gray-800 text-sm">
            프로필 사진 변경
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
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
            value={email}
            disabled
          />
        </div>

        {/* 소개 */}
        <div>
          <label className="block text-sm mb-1">소개</label>
          <textarea
            className="w-full border rounded px-3 py-2 resize-none"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 transition"
        >
          저장
        </button>
      </div>
    </div>
  );
}