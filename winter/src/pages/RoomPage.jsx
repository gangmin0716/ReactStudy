import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
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
import MessageItem from '../components/MessageItem';

export default function RoomPage() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const myUid = user?.uid;
  const navigate = useNavigate(); // 네비게이션 훅 추가

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  const messagesRef = useMemo(() => {
    if (!roomId) return null;
    return collection(db, 'rooms', roomId, 'messages');
  }, [roomId]);

  // 메시지 가져오기 (실시간)
  useEffect(() => {
    if (!messagesRef) return;
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [messagesRef]);

  // 새 메시지 오면 스크롤 하단 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // 읽음 처리
  useEffect(() => {
    if (!roomId || !myUid) return;
    (async () => {
      try {
        await setDoc(
          doc(db, 'rooms', roomId, 'members', myUid),
          { unreadCount: 0, lastReadAt: serverTimestamp() },
          { merge: true }
        );
      } catch (e) {
        console.error('members setDoc 실패', e);
      }
    })();
  }, [roomId, myUid]);

  // ✅ 입력창 높이 자동 조절 함수 (기존 유지)
  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const currentHeight = textarea.scrollHeight;
    const maxHeight = 160;

    if (currentHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.height = `${currentHeight}px`;
      textarea.style.overflowY = 'hidden';
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    handleResizeHeight();
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();

    if (!messagesRef || !myUid || !text.trim()) return;
    const clean = text.trim();

    setText('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflowY = 'hidden';
    }

    await addDoc(messagesRef, {
      text: clean,
      senderId: myUid,
      createdAt: serverTimestamp(),
    });

    await updateDoc(doc(db, 'rooms', roomId), {
      lastMessage: clean,
      lastMessageAt: serverTimestamp(),
    });

    const membersSnap = await getDocs(
      collection(db, 'rooms', roomId, 'members')
    );

    for (const m of membersSnap.docs) {
      if (m.id === myUid) continue;
      await updateDoc(m.ref, { unreadCount: increment(1) });
    }
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // ✅ test 파일의 배경 스타일(min-h-screen bg-gray-50) 적용
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto p-4 flex flex-col h-screen">
        <style>{`
          /* 채팅 리스트 스크롤바 숨김 */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          /* 입력창 커스텀 스크롤바 */
          .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: rgba(0,0,0,0.2);
              border-radius: 3px;
          }
        `}</style>

        {/* ✅ RoomPage_test.jsx의 헤더 UI로 교체 */}
        <div className="bg-white border rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm mb-3">
          <div>
            <h2 className="text-lg font-bold">DM Room</h2>
            <p className="text-xs text-gray-500 font-mono">{roomId}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/users')}
              className="text-sm underline text-blue-600 hover:text-blue-700"
            >
              유저 목록
            </button>
            <Link
              to="/rooms"
              className="text-sm underline text-gray-600 hover:text-gray-800"
            >
              방 목록
            </Link>
          </div>
        </div>

        {/* 채팅 영역 (MessageItem 컴포넌트 및 기존 스크롤바 로직 유지) */}
        <div className="flex-1 overflow-y-auto border rounded-xl p-3 hide-scrollbar bg-white">
          {messages.map((m) => (
            <MessageItem
              key={m.id}
              text={m.text}
              mine={m.senderId === myUid}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* 입력 폼 (기존의 textarea 자동 조절 로직 유지) */}
        <form onSubmit={handleSend} className="mt-3 flex gap-2 items-end bg-white border rounded-2xl p-2 shadow-sm">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            rows={1}
            className="flex-1 border rounded-xl px-3 py-2 resize-none custom-scrollbar focus:outline-none focus:border-blue-500 leading-normal"
            placeholder="메시지 입력"
            style={{
              minHeight: '40px',
              maxHeight: '160px',
              overflowY: 'hidden'
            }}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 h-10 rounded-xl mb-px shrink-0 hover:bg-blue-700 active:scale-[0.98]">
            전송
          </button>
        </form>
      </div>
    </div>
  );
}