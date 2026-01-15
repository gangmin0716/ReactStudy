/**
 * DM 방 만들기 규칙 (실무 표준)
 * roomId = [uidA, uidB].sort().join('_')
 *
 * 흐름:
 * 1) roomId 계산
 * 2) rooms/{roomId} 문서가 있으면 그대로 사용
 * 3) 없으면 rooms 문서 생성 + members 2개 문서도 "미리" 생성
 * 4) roomId 반환
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  // query,
  serverTimestamp,
  setDoc,
  // where,
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';

async function getOrCreateDmRoom(myUid, otherUid) {
  const roomId = [myUid, otherUid].sort().join('_');
  const roomRef = doc(db, 'rooms', roomId);

  const roomSnap = await getDoc(roomRef);
  if (!roomSnap.exists()) {
    // rooms 문서 생성
    await setDoc(roomRef, {
      type: 'dm',
      memberUids: [myUid, otherUid],
      lastMessage: '',
      lastMessageAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    // members 문서를 두 명 다 "미리" 만들어 둔다
    const myMemberRef = doc(db, 'rooms', roomId, 'members', myUid);
    const otherMemberRef = doc(db, 'rooms', roomId, 'members', otherUid);

    await Promise.all([
      setDoc(
        myMemberRef,
        {
          unreadCount: 0,
          lastReadAt: serverTimestamp(),
          joinedAt: serverTimestamp(),
        },
        { merge: true }
      ),
      setDoc(
        otherMemberRef,
        {
          unreadCount: 0,
          lastReadAt: serverTimestamp(),
          joinedAt: serverTimestamp(),
        },
        { merge: true }
      ),
    ]);
  }

  return roomId;
}

export default function UsersPage() {
  const { user } = useAuth();
  const myUid = user?.uid ?? '';
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [startingUid, setStartingUid] = useState(''); // 로딩 표시용

  useEffect(() => {
    if (!myUid) {
      setUsers([]);
      setError('로그인 후 이용할 수 있어요.');
      return;
    }

    // users 목록 가져오기 (내 uid 제외)
    const run = async () => {
      try {
        setError('');

        // (권장) where('uid','!=',myUid)는 인덱스/제약이 있을 수 있어
        // => 여기서는 전체 가져와서 프론트에서 필터링(수업/테스트 친화)
        const snap = await getDocs(collection(db, 'users'));
        const list = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((u) => u.id !== myUid);

        setUsers(list);
      } catch (e) {
        console.log('users load error:', e);
        setError(e?.message ?? 'users 목록 로딩 오류');
      }
    };

    run();
  }, [myUid]);

  const handleStartDm = async (otherUid) => {
    if (!myUid) return;

    try {
      setStartingUid(otherUid);
      const roomId = await getOrCreateDmRoom(myUid, otherUid);
      navigate(`/rooms/${roomId}`);
    } catch (e) {
      console.log('start dm error:', e);
      alert(e?.message ?? 'DM 시작 중 오류');
    } finally {
      setStartingUid('');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">Users</h2>
          <div className="mt-1 text-sm text-gray-600">
            내 uid:{' '}
            <span className="font-mono">{myUid || '(not logged in)'}</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/rooms')}
          className="text-sm underline text-blue-600 cursor-pointer"
        >
          ← 방 목록
        </button>
      </div>

      {error && (
        <div className="mt-3 text-sm text-red-600 font-medium">{error}</div>
      )}

      <div className="mt-5 grid gap-3">
        {users.length === 0 ? (
          <div className="border rounded-2xl p-4 bg-white text-sm text-gray-600">
            유저가 없습니다. (users 컬렉션이 비어있을 수 있어요)
            <div className="mt-2 text-xs text-gray-500">
              팁: 로그인 시 users/{'{uid}'} 문서를 저장하도록 만들면 자동으로
              채워집니다.
            </div>
          </div>
        ) : (
          users.map((u) => {
            const name = u.displayName || u.email || u.id;
            const sub = u.email ? u.email : u.id;

            return (
              <div
                key={u.id}
                className="border rounded-2xl p-4 bg-white flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold">{name}</div>
                  <div className="text-xs text-gray-500 font-mono">{sub}</div>
                </div>

                <button
                  onClick={() => handleStartDm(u.id)}
                  disabled={startingUid === u.id}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold disabled:opacity-60"
                >
                  {startingUid === u.id ? '만드는 중...' : 'DM 시작'}
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 text-xs text-gray-500">
        DM 시작 버튼을 누르면: roomId를 규칙대로 계산 → 방 존재 확인 → 없으면
        생성 → 바로 입장합니다.
      </div>
    </div>
  );
}
