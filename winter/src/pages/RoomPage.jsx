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

// ✅ 1. 긴 메시지를 처리하기 위한 서브 컴포넌트 (파일 내부에 정의)
const MessageItem = ({ text, mine }) => {
  const [expanded, setExpanded] = useState(false);
  
  // 글자 수가 300자를 넘거나, 줄바꿈이 매우 많은 경우를 '긴 글'로 간주
  const isLongText = text.length > 300 || text.split('\n').length > 10;

  return (
    <div className={`mb-2 flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col ${mine ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div
          className={`px-3 py-2 rounded-xl text-sm whitespace-pre-wrap-break-words transition-all duration-200 ${
            mine ? 'bg-blue-100' : 'bg-gray-100'
          } ${
            // 접혀있고 긴 글일 경우 높이 제한 및 내용 숨김
            !expanded && isLongText ? 'max-h-50 overflow-hidden relative' : ''
          }`}
        >
          {text}

          {/* 접힌 상태일 때 하단 흐릿한 효과 */}
          {!expanded && isLongText && (
            <div className={`absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t ${mine ? 'from-blue-100' : 'from-gray-100'} to-transparent`} />
          )}
        </div>

        {/* 더보기 / 접기 버튼 */}
        {isLongText && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-gray-500 mt-1 hover:text-blue-600 font-medium"
          >
            {expanded ? '접기 ▲' : '전체 보기 ▼'}
          </button>
        )}
      </div>
    </div>
  );
};

// ✅ 2. 메인 페이지 컴포넌트
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

  // ✅ 입력창 높이 자동 조절 함수 (핵심)
  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 1. 높이 초기화 (줄어듦 감지용)
    textarea.style.height = 'auto';

    // 2. 현재 내용 높이 측정
    const currentHeight = textarea.scrollHeight;
    const maxHeight = 160; // 약 6줄 높이

    if (currentHeight > maxHeight) {
      // 6줄 넘어가면 -> 높이 고정 & 스크롤 생성
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = 'auto'; 
    } else {
      // 6줄 이하 -> 내용만큼 늘어남 & 스크롤 숨김
      textarea.style.height = `${currentHeight}px`;
      textarea.style.overflowY = 'hidden';
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    handleResizeHeight(); // 입력 시마다 높이 체크
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    
    if (!messagesRef || !myUid || !text.trim()) return;
    const clean = text.trim();

    setText('');
    
    // 전송 후 높이 초기화
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
    // 한글 입력 중(IME 조합 중) 엔터 방지
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSend();       // 전송
    }
  };

  return (
    <div className="max-w-full mx-auto p-4 flex flex-col h-screen">
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

      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-bold">Room</h2>
        <Link to="/rooms-test" className="text-blue-600 text-sm">
          ← 방 목록
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto border rounded-xl p-3 hide-scrollbar">
        {messages.map((m) => (
          // ✅ 분리한 MessageItem 컴포넌트 사용
          <MessageItem 
            key={m.id} 
            text={m.text} 
            mine={m.senderId === myUid} 
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="mt-3 flex gap-2 items-end">
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
            maxHeight: '160px', // 약 6줄 제한
            overflowY: 'hidden' // 초기 스크롤 숨김
          }} 
        />
        <button type="submit" className="bg-blue-600 text-white px-4 h-10 rounded-xl mb-px shrink-0">
          전송
        </button>
      </form>
    </div>
  );
}