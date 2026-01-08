// 안 읽은 메시지 배지 표시
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';

export default function RoomsPage() {
  const { user } = useAuth();
  const myUid = user?.uid ?? '';
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [unreadMap, setUnreadMap] = useState({}); // { [roomId]: number }
  const [error, setError] = useState('');

  // 1) 내 방 목록(rooms) 실시간 구독
  useEffect(() => {
    if (!myUid) {
      setRooms([]);
      setUnreadMap({});
      setError('로그인 후 방 목록을 볼 수 있어요.');
      return;
    }

    setError('');

    const q = query(
      collection(db, 'rooms'),
      where('memberUids', 'array-contains', myUid),
      orderBy('lastMessageAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRooms(list);
      },
      (err) => {
        console.log('rooms onSnapshot error:', err);
        setError(err?.message ?? 'rooms 구독 오류');
      }
    );

    return () => unsubscribe();
  }, [myUid]);

  // 2) 각 방의 내 members 문서(rooms/{roomId}/members/{myUid})를 실시간 구독 → unreadCount 배지 데이터
  useEffect(() => {
    if (!myUid) return;

    // 방 목록이 바뀔 때마다, 기존 구독을 정리하고 다시 구독한다.
    const unsubs = [];
    const nextMap = {}; // 초기값(문서 없으면 0 취급)

    rooms.forEach((room) => {
      const roomId = room.id;
      const myMemberRef = doc(db, 'rooms', roomId, 'members', myUid);

      const unsub = onSnapshot(
        myMemberRef,
        (snap) => {
          const unread = snap.exists() ? snap.data().unreadCount ?? 0 : 0;
          setUnreadMap((prev) => ({ ...prev, [roomId]: unread }));
        },
        (err) => {
          console.log('member onSnapshot error:', roomId, err);
          // 권한/없는 문서 등 에러가 나도 배지가 깨지지 않게 0 처리
          setUnreadMap((prev) => ({ ...prev, [roomId]: 0 }));
        }
      );

      unsubs.push(unsub);
      nextMap[roomId] = 0;
    });

    // 방이 줄어들었을 때 stale 값이 남지 않게 초기화(필요 최소)
    setUnreadMap((prev) => ({ ...nextMap, ...prev }));

    return () => {
      unsubs.forEach((fn) => fn());
    };
  }, [rooms, myUid]);

  // 3) 전체 배지(헤더용): 모든 방 unreadCount 합
  const totalUnread = useMemo(() => {
    return rooms.reduce((sum, r) => sum + (unreadMap[r.id] ?? 0), 0);
  }, [rooms, unreadMap]);

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">Rooms</h2>
          <div className="mt-1 text-sm text-gray-600">
            myUid:{' '}
            <span className="font-mono">{myUid || '(not logged in)'}</span>
          </div>
        </div>

        {/* 전체 알림 배지 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">전체 알림</span>
          <span
            className={`inline-flex min-w-8 justify-center rounded-full px-2 py-1 text-xs font-bold ${
              totalUnread > 0
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            title="내가 속한 모든 방의 unreadCount 합"
          >
            {totalUnread}
          </span>
        </div>
      </div>

      {error && (
        <div className="mt-3 text-sm text-red-600 font-medium">{error}</div>
      )}

      {/* Rooms list */}
      <div className="mt-5 grid gap-3">
        {rooms.length === 0 ? (
          <div className="border rounded-2xl p-4 bg-white text-sm text-gray-600">
            아직 방이 없습니다. (테스트용 rooms 문서를 먼저 만들어보세요)
          </div>
        ) : (
          rooms.map((room) => {
            const time =
              room.lastMessageAt?.toDate?.()?.toLocaleString?.() ?? '';
            const unread = unreadMap[room.id] ?? 0;

            return (
              <button
                key={room.id}
                onClick={() => navigate(`/rooms-test/${room.id}`)}
                className="relative text-left border rounded-2xl p-4 bg-white hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold flex items-center gap-2">
                    {room.type === 'dm' ? 'DM' : 'GROUP'} •{' '}
                    <span className="font-mono">{room.id}</span>
                    {/* 방 별 배지 */}
                    {unread > 0 && (
                      <span className="inline-flex min-w-6 justify-center rounded-full px-2 py-0.5 text-xs font-bold bg-red-500 text-white">
                        {unread}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{time}</div>
                </div>

                <div className="mt-2 text-sm text-gray-700">
                  lastMessage:{' '}
                  <span className="text-gray-900">
                    {room.lastMessage ?? '(empty)'}
                  </span>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  members: {(room.memberUids ?? []).join(', ')}
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="mt-6 text-xs text-gray-500">
        방을 클릭하면 <span className="font-mono">/rooms-test/:roomId</span>로
        이동합니다.
      </div>
    </div>
  );
}
