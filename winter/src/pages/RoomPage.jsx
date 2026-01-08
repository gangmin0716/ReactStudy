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
  const textareaRef = useRef(null);

  const messagesRef = useMemo(() => {
    if (!roomId) return null;
    return collection(db, 'rooms', roomId, 'messages');
  }, [roomId]);

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

  // ✅ 높이 조절 함수 수정
  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 1. 높이 초기화 (줄어듦 감지용)
    textarea.style.height = 'auto';

    // 2. 현재 입력된 내용의 높이 측정
    const currentHeight = textarea.scrollHeight;
    const maxHeight = 160; // ★ 사진 속 텍스트 양(약 6줄)에 맞춘 높이

    if (currentHeight > maxHeight) {
      // 6줄을 넘어가면 -> 높이 고정(160px) & 스크롤 생성
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = 'auto'; 
    } else {
      // 6줄 이하일 때 -> 내용만큼 늘어남 & 스크롤 숨김(깔끔하게)
      textarea.style.height = `${currentHeight}px`;
      textarea.style.overflowY = 'hidden';
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    handleResizeHeight(); // 입력할 때마다 높이 조절
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    
    if (!messagesRef || !myUid || !text.trim()) return;

    const clean = text.trim();

    setText('');
    
    // ✅ 전송 후 높이 초기화
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
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
    <div className="max-w-xl mx-auto p-4 flex flex-col h-screen">
      <style>{`
        /* 채팅방 목록/메시지 영역의 스크롤바 숨김 (유지) */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* ✅ 입력창(Textarea) 전용 스크롤바 스타일 (사진처럼 커스텀) */
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.2);
            border-radius: 3px;
        }
      `}</style>

      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-bold">Room</h2>
        <Link to="/rooms-test" className="text-blue-600 text-sm">
          ← 방 목록
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-xl p-3 hide-scrollbar">
        {messages.map((m) => {
          const mine = m.senderId === myUid;
          return (
            <div
              key={m.id}
              className={`mb-2 flex ${mine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-3 py-2 rounded-xl text-sm whitespace-pre-wrap ${
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

      {/* 하단 입력 폼 */}
      <form onSubmit={handleSend} className="mt-3 flex gap-2 items-end">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          rows={1}
          // ✅ 클래스 변경:
          // 1. hide-scrollbar 제거 -> custom-scrollbar 추가 (넘치면 스크롤 보여야 함)
          // 2. resize-none 유지
          className="flex-1 border rounded-xl px-3 py-2 resize-none custom-scrollbar focus:outline-none focus:border-blue-500 overflow-y-auto leading-normal"
          placeholder="메시지 입력"
          
          // ✅ 스타일 변경:
          // maxHeight를 72px -> 150px 정도로 늘려야 사진처럼 많이 늘어납니다.
          style={{ 
            minHeight: '40px', 
            maxHeight: '160px'  // 이 높이를 넘어가면 스크롤바가 생깁니다.
          }} 
        />
        <button type="submit" className="bg-blue-600 text-white px-4 h-10 rounded-xl mb-px shrink-0">
          전송
        </button>
      </form>
    </div>
  );
}