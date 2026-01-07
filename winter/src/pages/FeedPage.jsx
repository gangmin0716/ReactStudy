import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
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
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) setProfile(snap.data());
    };

    fetchProfile();
  }, [user?.uid]);

  const displayName =
    profile?.displayName ?? (user?.email ? user.email.split('@')[0] : 'user');

  const photoURL = profile?.photoURL ?? null;

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleGoProfile = () => {
    navigate('/profile');
  };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const loadPosts = async () => {
      setLoading(true);

      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(list);
      setLoading(false);
    };

    loadPosts();
  }, [user?.uid]);

  /* -------------------------
    게시글 등록(Create)
  -------------------------- */
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user?.uid) return;

    const trimmed = text.trim();
    if (!trimmed) {
      alert('내용을 입력해 주세요.');
      return;
    }

    try {
      setSubmitting(true);

      await addDoc(collection(db, 'posts'), {
        text: trimmed,
        uid: user.uid,
        authorName: displayName,
        authorPhotoURL: photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setText('');

      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(list);
    } catch (err) {
      console.log('게시글 등록 실패:', err);
      alert('게시글 등록 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* 상단바 */}
      <header className="max-w-md mx-auto mb-4 flex items-center justify-between gap-3">
        <h1 className="text-lg font-bold shrink-0">Mini SNS</h1>

        {/* 오른쪽: 프로필 + 버튼들 */}
        <div className="flex items-center gap-2 flex-nowrap">
          {/* 프로필(아이콘 + 이름) */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full border bg-white overflow-hidden flex items-center justify-center shrink-0">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-500">🙂</span>
              )}
            </div>

            {/* 이름이 길면 줄여서(...) */}
            <span className="text-sm text-gray-700 truncate max-w-22.5">
              {displayName}
            </span>
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-center gap-2 flex-nowrap">
            <Button
              onClick={handleGoProfile}
              variant="primary"
              className="whitespace-nowrap w-auto px-3 py-1"
              Text='프로필 관리'
            >
            </Button>

            <Button
              onClick={handleLogout}
              className="whitespace-nowrap w-auto px-3 py-1"
              Text='로그아웃'
            >
            </Button>
          </div>
        </div>
      </header>

      {/* 게시글 목록 */}
      <main className="max-w-md mx-auto space-y-3">
        <Card className="p-4">
          <form onSubmit={handleCreatePost} className="space-y-2">
            <p className="font-semibold">새 게시글</p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="오늘 무슨 일이 있었나요?"
              className="w-full border rounded p-2 text-sm resize-none"
              rows={3}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                className="whitespace-nowrap w-auto px-3 py-1"
                Disabled={submitting}
                Text={submitting ? '등록 중...' : '등록'}
              >
              </Button>
            </div>
          </form>
        </Card>

        {loading ? (
          <p className="text-sm text-center text-gray-500">
            게시글 불러오는 중...
          </p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-center text-gray-500">
            아직 게시글이 없습니다.
          </p>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="p-4">
              <p className="font-semibold text-sm">
                {post.authorName ?? 'unknown'}
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {post.text}
              </p>
            </Card>
          ))
        )}
      </main>
    </div>
  );
}