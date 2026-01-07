import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function FeedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  /* -------------------------
    상단바: 프로필 읽기
  -------------------------- */
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

  /* -------------------------
    게시글 목록(Read)
  -------------------------- */
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const reloadPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const list = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    setPosts(list);
  };

  useEffect(() => {
    if (!user?.uid) return;

    const loadPosts = async () => {
      setLoading(true);
      try {
        await reloadPosts();
      } finally {
        setLoading(false);
      }
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
      await reloadPosts();
    } catch (err) {
      console.log('게시글 등록 실패:', err);
      alert('게시글 등록 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------------
    게시글 수정(Update)
  -------------------------- */
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [updating, setUpdating] = useState(false);

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditingText(post.text ?? '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleUpdatePost = async (post) => {
    if (!user?.uid) return;

    if (post.uid !== user.uid) {
      alert('작성자만 수정할 수 있어요.');
      return;
    }

    const trimmed = editingText.trim();
    if (!trimmed) {
      alert('내용을 입력해 주세요.');
      return;
    }

    try {
      setUpdating(true);

      await updateDoc(doc(db, 'posts', post.id), {
        text: trimmed,
        updatedAt: serverTimestamp(),
      });

      cancelEdit();
      await reloadPosts();
    } catch (err) {
      console.log('게시글 수정 실패:', err);
      alert('게시글 수정 중 오류가 발생했습니다.');
    } finally {
      setUpdating(false);
    }
  };

  /* -------------------------
    게시글 삭제(Delete)
  -------------------------- */
  const handleDeletePost = async (post) => {
    if (!user?.uid) return;

    if (post.uid !== user.uid) {
      alert('작성자만 삭제할 수 있어요.');
      return;
    }

    const ok = confirm('정말 삭제할까요?');
    if (!ok) return;

    try {
      await deleteDoc(doc(db, 'posts', post.id));
      await reloadPosts();
    } catch (err) {
      console.log('게시글 삭제 실패:', err);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  /* -------------------------
    렌더링
  -------------------------- */
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <header className="max-w-md mx-auto mb-4 flex items-center justify-between gap-3">
        <h1 className="text-lg font-bold shrink-0">Mini SNS</h1>

        <div className="flex items-center gap-2 flex-nowrap">
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

            <span className="text-sm text-gray-700 truncate max-w-22.5">
              {displayName}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-nowrap">
            <Button
              onClick={handleGoProfile}
              variant="primary"
              className="whitespace-nowrap w-auto px-3 py-1 bg bg-black text-white"
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
          posts.map((post) => {
            const isMine = post.uid === user?.uid;
            const isEditing = editingId === post.id;

            return (
              <Card key={post.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm truncate">
                    {post.authorName ?? 'unknown'}
                  </p>

                  {isMine && !isEditing && (
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        className="whitespace-nowrap w-auto px-3 py-1"
                        onClick={() => startEdit(post)}
                        Text='수정'
                      >
                      </Button>

                      <Button
                        type="button"
                        className="whitespace-nowrap w-auto px-3 py-1 bg bg-[#FF3F3F] text-white border-gray-200"
                        onClick={() => handleDeletePost(post)}
                        Text='삭제'
                      >
                      </Button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full border rounded p-2 text-sm resize-none"
                      rows={3}
                    />

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        className="flex-1 py-2"
                        onClick={cancelEdit}
                        disabled={updating}
                        Text='취소'
                      >
                      </Button>

                      <Button
                        type="button"
                        variant="primary"
                        className="flex-1 py-2 bg bg-black text-white"
                        onClick={() => handleUpdatePost(post)}
                        disabled={updating}
                        Text={updating ? '저장 중...' : '저장'}
                      >
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {post.text}
                  </p>
                )}
              </Card>
            );
          })
        )}
      </main>
    </div>
  );
}