import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  documentId,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';

/* -------------------------
  Helper Functions
-------------------------- */
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function getOtherUid(memberUids, myUid) {
  if (!Array.isArray(memberUids)) return '';
  return memberUids.find((u) => u && u !== myUid) ?? '';
}

function shortUid(uid) {
  if (!uid) return '';
  if (uid.length <= 10) return uid;
  return `${uid.slice(0, 5)}...`;
}

export default function RoomsPage() {
  const { user } = useAuth();
  const myUid = user?.uid ?? '';
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [unreadMap, setUnreadMap] = useState({});
  const [error, setError] = useState('');
  const [userMap, setUserMap] = useState({});
  
  const memberUnsubsRef = useRef(new Map());

  // 1. Rooms 구독
  useEffect(() => {
    if (!myUid) {
      setRooms([]);
      setUnreadMap({});
      setError('로그인 후 방 목록을 볼 수 있어요.');
      return;
    }

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
        setError('');
      },
      (err) => {
        console.log('rooms onSnapshot error:', err);
        setError(err?.message ?? 'rooms 구독 오류');
      }
    );

    return () => unsubscribe();
  }, [myUid]);

  // 2. 유저 정보 가져오기 (이름 표시용)
  useEffect(() => {
    if (!myUid || rooms.length === 0) return;

    const dmOtherUids = Array.from(
      new Set(
        rooms
          .filter((r) => r.type === 'dm')
          .map((r) => getOtherUid(r.memberUids, myUid))
          .filter(Boolean)
      )
    );

    const missing = dmOtherUids.filter((uid) => !userMap[uid]);
    if (missing.length === 0) return;

    let alive = true;

    const fetchMissingUsers = async () => {
      try {
        const batches = chunk(missing, 10);
        const newResults = {};

        for (const batchUids of batches) {
          const q = query(
            collection(db, 'users'),
            where(documentId(), 'in', batchUids)
          );
          const snap = await getDocs(q);

          snap.forEach((d) => {
            const data = d.data() || {};
            newResults[d.id] = {
              displayName: data.displayName || '',
              email: data.email || '',
            };
          });
          
          batchUids.forEach((uid) => {
            if (!newResults[uid]) newResults[uid] = { displayName: '', email: '' };
          });
        }

        if (alive) {
          setUserMap((prev) => ({ ...prev, ...newResults }));
        }
      } catch (e) {
        console.error('users fetch error:', e);
      }
    };

    fetchMissingUsers();
    return () => { alive = false; };
  }, [rooms, myUid, userMap]);

  // 3. Unread Count 구독
  useEffect(() => {
    if (!myUid) return;

    const currentSubs = memberUnsubsRef.current;
    const nextRoomIds = new Set(rooms.map((r) => r.id));

    currentSubs.forEach((unsub, roomId) => {
      if (!nextRoomIds.has(roomId)) {
        unsub();
        currentSubs.delete(roomId);
        setUnreadMap((prev) => {
          const next = { ...prev };
          delete next[roomId];
          return next;
        });
      }
    });

    rooms.forEach((room) => {
      const roomId = room.id;
      if (currentSubs.has(roomId)) return;

      const myMemberRef = doc(db, 'rooms', roomId, 'members', myUid);
      const unsub = onSnapshot(
        myMemberRef,
        (snap) => {
          const count = snap.exists() ? snap.data().unreadCount ?? 0 : 0;
          setUnreadMap((prev) => ({ ...prev, [roomId]: count }));
        },
        () => setUnreadMap((prev) => ({ ...prev, [roomId]: 0 }))
      );
      currentSubs.set(roomId, unsub);
    });
  }, [rooms, myUid]);

  useEffect(() => {
    const subs = memberUnsubsRef.current;
    return () => {
      subs.forEach((unsub) => unsub());
      subs.clear();
    };
  }, []);

  const totalUnread = useMemo(() => {
    return Object.values(unreadMap).reduce((acc, cur) => acc + (cur || 0), 0);
  }, [unreadMap]);

  const getRoomTitle = (room) => {
    if (room.type === 'dm') {
      const otherUid = getOtherUid(room.memberUids, myUid);
      const userInfo = userMap[otherUid];
      return userInfo?.displayName || userInfo?.email || shortUid(otherUid) || '알 수 없음';
    }
    return room.name || '그룹 채팅';
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Rooms</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">전체 알림</span>
          <span
            className={`inline-flex min-w-8 justify-center rounded-full px-2 py-1 text-xs font-bold ${
              totalUnread > 0
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
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
            아직 대화가 없습니다.
          </div>
        ) : (
          rooms.map((room) => {
            const time = room.lastMessageAt?.toDate?.()?.toLocaleString?.() ?? '';
            const unread = unreadMap[room.id] ?? 0;
            const title = getRoomTitle(room);

            return (
              <button
                key={room.id}
                // 기존 파일(RoomsPage.jsx)의 경로인 /rooms-test/ 로 변경했습니다.
                onClick={() => navigate(`/rooms/${room.id}`)} 
                className="relative text-left border rounded-2xl p-4 bg-white hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold flex items-center gap-2 text-lg">
                    <span>
                      {room.type === 'dm' ? 'DM' : 'GROUP'} • {title}
                    </span>
                    
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
              </button>
            );
          })
        )}
      </div>
      
      <div className="mt-6 text-xs text-gray-500">
        방을 클릭하면 <span className="font-mono">/rooms-test/:roomId</span>로 이동합니다.
      </div>
    </div>
  );
}