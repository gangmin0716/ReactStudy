import { useEffect, useRef, useState } from 'react';
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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

import { auth, db, storage } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';

import { Button } from '../components/Button';
import { Card } from '../components/Card';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_SIZE_MB = 5;

export default function FeedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) setProfile(snap.data());
      } catch (err) {
        console.log('프로필 읽기 실패:', err);
      }
    };

    fetchProfile();
  }, [user?.uid]);

  const displayName =
    profile?.displayName ?? (user?.email ? user.email.split('@')[0] : 'user');
  const photoURL = profile?.photoURL ?? null;

  const handleGoProfile = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const reloadPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    if (!user?.uid) return;

    const load = async () => {
      setLoading(true);
      try {
        await reloadPosts();
      } catch (err) {
        console.log('게시글 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.uid]);

  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const validateImageFile = (f) => {
    if (!f) return { ok: true };
    if (!ALLOWED_MIME.has(f.type)) {
      return {
        ok: false,
        message: 'JPG, PNG, WEBP 이미지 파일만 업로드할 수 있어요.',
      };
    }
    const sizeMb = f.size / (1024 * 1024);
    if (sizeMb > MAX_SIZE_MB) {
      return {
        ok: false,
        message: `이미지 용량은 ${MAX_SIZE_MB}MB 이하만 업로드할 수 있어요.`,
      };
    }
    return { ok: true };
  };

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const picked = e.target.files?.[0] ?? null;

    if (!picked) {
      setFile(null);
      return;
    }

    const v = validateImageFile(picked);
    if (!v.ok) {
      alert(v.message);
      e.target.value = '';
      setFile(null);
      return;
    }

    setFile(picked);
  };

  const handleClearImage = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user?.uid) return;

    const trimmed = text.trim();
    if (!trimmed) {
      alert('내용을 입력해 주세요.');
      return;
    }

    const v = validateImageFile(file);
    if (!v.ok) {
      alert(v.message);
      return;
    }

    try {
      setSubmitting(true);

      // 1) 게시글 먼저 생성(문서 ID 확보)
      const docRef = await addDoc(collection(db, 'posts'), {
        text: trimmed,
        uid: user.uid,
        authorName: displayName,
        authorPhotoURL: photoURL,
        imageURL: null,
        imagePath: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 2) 이미지가 있다면 Storage 업로드(경로/파일명 고정)
      if (file) {
        const ext =
          file.type === 'image/png'
            ? 'png'
            : file.type === 'image/webp'
              ? 'webp'
              : 'jpg';

        const imagePath = `posts/${user.uid}/${docRef.id}/image.${ext}`;
        const storageRef = ref(storage, imagePath);

        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        // 3) 게시글 Update로 imageURL + imagePath 저장
        await updateDoc(doc(db, 'posts', docRef.id), {
          imageURL: url,
          imagePath,
          updatedAt: serverTimestamp(),
        });
      }

      setText('');
      handleClearImage();
      await reloadPosts();
    } catch (err) {
      console.log('게시글 등록 실패:', err);
      alert('게시글 등록 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

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

  const handleDeletePost = async (post) => {
    if (!user?.uid) return;

    if (post.uid !== user.uid) {
      alert('작성자만 삭제할 수 있어요.');
      return;
    }

    const ok = confirm('정말 삭제할까요?');
    if (!ok) return;

    try {
      // 이미지가 있으면 Storage 파일도 같이 삭제 (imagePath 기준)
      if (post.imagePath) {
        await deleteObject(ref(storage, post.imagePath));
      }

      await deleteDoc(doc(db, 'posts', post.id));
      await reloadPosts();
    } catch (err) {
      console.log('게시글 삭제 실패:', err);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

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
          <form onSubmit={handleCreatePost} className="space-y-3">
            <p className="font-semibold">새 게시글</p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="오늘 무슨 일이 있었나요?"
              className="w-full border rounded p-2 text-sm resize-none"
              rows={3}
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handlePickImage}
                className="whitespace-nowrap w-auto px-2 py-1 text-xs border border-dashed"
                Text='이미지 업로드'
              >
              </Button>

              <div className="flex-1 min-w-0">
                {file ? (
                  <p className="text-[11px] text-gray-700 truncate">
                    {file.name}
                  </p>
                ) : (
                  <p className="text-[11px] text-gray-500">
                    JPG / PNG / WEBP (최대 {MAX_SIZE_MB}MB)
                  </p>
                )}
              </div>

              {file && (
                <Button
                  type="button"
                  onClick={handleClearImage}
                  className="whitespace-nowrap w-auto px-4 py-1 text-[13px]"
                  Text='제거'
                >
                </Button>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                className="whitespace-nowrap w-full px-3 py-3 text-base bg bg-black text-white"
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
                        className="whitespace-nowrap w-auto px-3 py-1"
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
                      className="w-full border rounded p-2 text-sm"
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
                        className="flex-1 py-2"
                        onClick={() => handleUpdatePost(post)}
                        Disabled={updating}
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

                {post.imageURL && (
                  <img
                    src={post.imageURL}
                    alt="post"
                    className="w-full rounded border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </Card>
            );
          })
        )}
      </main>
    </div>
  );
}