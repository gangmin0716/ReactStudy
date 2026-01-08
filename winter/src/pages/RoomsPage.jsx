// 쓰기 + 샘플 버튼 확인용
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId; // ✅ 라우트가 /rooms-test/:roomId 여야 함
  const { user } = useAuth();
  const myUid = user?.uid ?? '';

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  // ✅ roomId가 없으면 messagesRef 만들지 않음 (indexOf 에러 방지)
  const messagesRef = useMemo(() => {
    if (!roomId) return null;
    return collection(db, 'rooms', roomId, 'messages');
  }, [roomId]);

  // 디버그(필요 없으면 나중에 삭제)
  useEffect(() => {
    console.log('[RoomPage] params:', params);
    console.log('[RoomPage] roomId:', roomId);
    console.log('[RoomPage] myUid:', myUid);
  }, [roomId, myUid]);

  /* -------------------------
     messages 실시간 구독
  -------------------------- */
  useEffect(() => {
    if (!messagesRef) return; // ✅ null이면 구독 안 함
    setError('');

    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setMessages(list);
      },
      (err) => {
        console.log('messages onSnapshot error:', err);
        setError(err?.message ?? 'messages 구독 오류');
      }
    );

    return () => unsubscribe();
  }, [messagesRef]);

  /* 새 메시지 오면 아래로 */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  /* -------------------------
     메시지 전송
  -------------------------- */
  const handleSend = async (e) => {
    e.preventDefault();
    if (!roomId) return;
    if (!messagesRef) return;
    if (!myUid) {
      setError('로그인 정보가 없습니다. (테스트라면 로그인 후 진행)');
      return;
    }

    const clean = text.trim();
    if (!clean) return;

    setSending(true);
    setError('');

    try {
      // 1) messages에 저장
      await addDoc(messagesRef, {
        text: clean,
        senderId: myUid,
        createdAt: serverTimestamp(),
      });

      // 2) rooms 메타 업데이트 (방 목록 정렬/미리보기용)
      await updateDoc(doc(db, 'rooms', roomId), {
        lastMessage: clean,
        lastMessageAt: serverTimestamp(),
      });

      setText('');
    } catch (err) {
      console.log('send error:', err);
      setError('메시지 전송 중 오류가 발생했습니다.');
    } finally {
      setSending(false);
    }
  };

  // roomId가 없을 때 UI
  if (!roomId) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-xl font-bold">Room</h2>
        <p className="mt-3 text-red-600 font-medium">
          roomId가 없습니다. 라우트가{' '}
          <span className="font-mono">/rooms-test/:roomId</span>인지 확인하세요.
        </p>
        <Link
          to="/rooms-test"
          className="inline-block mt-4 text-blue-600 underline"
        >
          ← 방 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Room</h2>
        <Link to="/rooms-test" className="text-sm text-blue-600 underline">
          ← 방 목록
        </Link>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        roomId: <span className="font-mono">{roomId}</span>
      </div>

      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto border rounded-2xl p-3 bg-white">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">아직 메시지가 없습니다.</p>
        ) : (
          messages.map((m) => {
            const mine = m.senderId === myUid;
            const time = m.createdAt?.toDate?.()?.toLocaleTimeString?.() ?? '';

            return (
              <div
                key={m.id}
                className={`mb-2 flex ${
                  mine ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={[
                    'max-w-[75%] px-3 py-2 rounded-2xl border text-sm',
                    mine
                      ? 'bg-blue-100 border-blue-200'
                      : 'bg-gray-100 border-gray-200',
                  ].join(' ')}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <p className="text-[11px] text-gray-500 mt-1 text-right">
                    {time}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="메시지를 입력하세요"
          className="flex-1 border rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={sending || text.trim().length === 0}
          className="px-4 py-2 rounded-2xl text-sm font-medium text-white bg-blue-600 disabled:bg-gray-400"
        >
          {sending ? '전송중' : '전송'}
        </button>
      </form>
    </div>
  );
}

// 클릭해서 해당 방으로 넘어가기
// import { useEffect, useState } from 'react';
// import {
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
//   where,
// } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../firebase/firebase';
// import { useAuth } from '../auth/useAuth';

// export default function RoomsPage() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [rooms, setRooms] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!user?.uid) return;

//     const q = query(
//       collection(db, 'rooms'),
//       where('memberUids', 'array-contains', user.uid),
//       orderBy('lastMessageAt', 'desc')
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
//         setRooms(list);
//         // 성공했을 때만 여기서 초기화
//         setError('');
//       },
//       (err) => {
//         console.log('rooms onSnapshot error:', err);
//         setError(err?.message ?? 'rooms 구독 오류');
//       }
//     );

//     return () => unsubscribe();
//   }, [user?.uid]);

//   return (
//     <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
//       <h2 style={{ fontWeight: 700, fontSize: 20 }}>Rooms Test</h2>

//       <p style={{ marginTop: 8, color: '#555' }}>
//         myUid: <b>{user?.uid ?? '(not logged in)'}</b>
//       </p>

//       {error && (
//         <p style={{ marginTop: 12, color: 'crimson' }}>에러: {error}</p>
//       )}

//       <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
//         {rooms.length === 0 ? (
//           <div
//             style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}
//           >
//             아직 방이 없습니다. (memberUids에 내 uid가 들어있는 rooms 문서를
//             만들어보세요)
//           </div>
//         ) : (
//           rooms.map((room) => {
//             const time =
//               room.lastMessageAt?.toDate?.()?.toLocaleString?.() ?? '(no time)';

//             return (
//               <div
//                 key={room.id}
//                 onClick={() => navigate(`/rooms-test/${room.id}`)}
//                 style={{
//                   padding: 12,
//                   border: '1px solid #ddd',
//                   borderRadius: 8,
//                   background: 'white',
//                   cursor: 'pointer',
//                 }}
//               >
//                 <div
//                   style={{ display: 'flex', justifyContent: 'space-between' }}
//                 >
//                   <b>
//                     {room.type === 'dm'
//                       ? `DM • ${room.id}`
//                       : `GROUP • ${room.id}`}
//                   </b>
//                   <span style={{ fontSize: 12, color: '#666' }}>{time}</span>
//                 </div>

//                 <div style={{ marginTop: 6, fontSize: 14, color: '#333' }}>
//                   lastMessage: {room.lastMessage ?? '(empty)'}
//                 </div>

//                 <div style={{ marginTop: 6, fontSize: 12, color: '#666' }}>
//                   members: {(room.memberUids ?? []).join(', ')}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// 첫번째 연결 테스트 코드
// import { useEffect, useState } from 'react';
// import {
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
//   where,
//   // doc,
//   // getDoc,
// } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
// import { useAuth } from '../auth/useAuth';

// export default function RoomsPage() {
//   const { user } = useAuth();
//   const [rooms, setRooms] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!user?.uid) return;

//     const q = query(
//       collection(db, 'rooms'),
//       where('memberUids', 'array-contains', user.uid),
//       orderBy('lastMessageAt', 'desc')
//     );
//     console.log('projectId:', db.app.options.projectId);
//     console.log('auth uid:', user.uid);
//     console.log(
//       'uid length:',
//       user.uid.length,
//       'uid:',
//       JSON.stringify(user.uid)
//     );
//     console.log(
//       'uid length:',
//       user.uid.length,
//       'uid:',
//       JSON.stringify(user.uid)
//     );
//     console.log(
//       'uid length:',
//       user.uid.length,
//       'uid:',
//       JSON.stringify(user.uid)
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         console.log('rooms size:', snapshot.size);
//         snapshot.forEach((d) => console.log('room doc:', d.id, d.data()));
//         setRooms(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
//       },
//       (err) => {
//         console.log('rooms snapshot ERROR:', err.code, err.message);
//         // 화면에도 보이게
//         setError(`${err.code}: ${err.message}`);
//       }
//     );

//     return () => unsubscribe();
//   }, [user?.uid]);
//   // 공백들어갔는지 체크할려고 넣음
//   // useEffect(() => {
//   //   const run = async () => {
//   //     const snap = await getDoc(doc(db, 'rooms', 'A_B'));
//   //     console.log('getDoc A_B exists?', snap.exists(), snap.data());
//   //   };
//   //   run();
//   // }, []);

//   return (
//     <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
//       <h2 style={{ fontWeight: 700, fontSize: 20 }}>Rooms Test</h2>

//       <p style={{ marginTop: 8, color: '#555' }}>
//         myUid: <b>{user?.uid ?? '(not logged in)'}</b>
//       </p>

//       {error && (
//         <p style={{ marginTop: 12, color: 'crimson' }}>에러: {error}</p>
//       )}

//       <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
//         {rooms.length === 0 ? (
//           <div
//             style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}
//           >
//             아직 방이 없습니다. (memberUids에 내 uid가 들어있는 rooms 문서를
//             만들어보세요)
//           </div>
//         ) : (
//           rooms.map((room) => {
//             const time =
//               room.lastMessageAt?.toDate?.()?.toLocaleString?.() ?? '(no time)';

//             return (
//               <div
//                 key={room.id}
//                 style={{
//                   padding: 12,
//                   border: '1px solid #ddd',
//                   borderRadius: 8,
//                   background: 'white',
//                 }}
//               >
//                 <div
//                   style={{ display: 'flex', justifyContent: 'space-between' }}
//                 >
//                   <b>
//                     {room.type === 'dm' ? 'DM' : 'GROUP'} • {room.id}
//                   </b>
//                   <span style={{ fontSize: 12, color: '#666' }}>{time}</span>
//                 </div>

//                 <div style={{ marginTop: 6, fontSize: 14, color: '#333' }}>
//                   lastMessage: {room.lastMessage ?? '(empty)'}
//                 </div>

//                 <div style={{ marginTop: 6, fontSize: 12, color: '#666' }}>
//                   members: {(room.memberUids ?? []).join(', ')}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }
