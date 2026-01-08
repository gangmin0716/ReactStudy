//4단계
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../auth/useAuth';

export default function RoomPage() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const myUid = user?.uid;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  const messagesRef = useMemo(() => {
    if (!roomId) return null;
    return collection(db, 'rooms', roomId, 'messages');
  }, [roomId]);

  /* -------------------------
     1️⃣ 메시지 실시간 수신
  -------------------------- */
  useEffect(() => {
    if (!messagesRef) return;

    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [messagesRef]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  /* -------------------------
     2️⃣ 방 입장 시 unreadCount 초기화
  -------------------------- */
  // useEffect(() => {
  //   if (!roomId || !myUid) return;

  //   const myMemberRef = doc(db, 'rooms', roomId, 'members', myUid);

  //   setDoc(
  //     myMemberRef,
  //     {
  //       unreadCount: 0,
  //       lastReadAt: serverTimestamp(),
  //     },
  //     { merge: true }
  //   );
  // }, [roomId, myUid]);
  useEffect(() => {
    console.log('RoomPage 진입');
    console.log('roomId:', roomId);
    console.log('myUid:', myUid);

    if (!roomId || !myUid) return;

    (async () => {
      try {
        console.log('members setDoc 시도');

        await setDoc(
          doc(db, 'rooms', roomId, 'members', myUid),
          {
            unreadCount: 0,
            lastReadAt: serverTimestamp(),
          },
          { merge: true }
        );

        console.log('members setDoc 성공');
      } catch (e) {
        console.error('members setDoc 실패', e);
      }
    })();
  }, [roomId, myUid]);

  /* -------------------------
     3️⃣ 메시지 전송 + 상대 unreadCount 증가
  -------------------------- */
  const handleSend = async (e) => {
    e.preventDefault();
    if (!messagesRef || !myUid || !text.trim()) return;

    const clean = text.trim();

    // (1) 메시지 저장
    await addDoc(messagesRef, {
      text: clean,
      senderId: myUid,
      createdAt: serverTimestamp(),
    });

    // (2) 방 메타 업데이트
    await updateDoc(doc(db, 'rooms', roomId), {
      lastMessage: clean,
      lastMessageAt: serverTimestamp(),
    });

    // (3) 멤버 조회
    const membersSnap = await getDocs(
      collection(db, 'rooms', roomId, 'members')
    );

    // (4) 나 제외하고 unreadCount +1
    for (const m of membersSnap.docs) {
      if (m.id === myUid) continue;

      await updateDoc(m.ref, {
        unreadCount: increment(1),
      });
    }

    setText('');
  };

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col h-screen">
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-bold">Room</h2>
        <Link to="/rooms-test" className="text-blue-600 text-sm">
          ← 방 목록
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-xl p-3">
        {messages.map((m) => {
          const mine = m.senderId === myUid;
          return (
            <div
              key={m.id}
              className={`mb-2 flex ${mine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-3 py-2 rounded-xl text-sm ${
                  mine ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-xl px-3 py-2"
          placeholder="메시지 입력"
        />
        <button className="bg-blue-600 text-white px-4 rounded-xl">전송</button>
      </form>
    </div>
  );
}
