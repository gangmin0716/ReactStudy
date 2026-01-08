// MessageItem.jsx (또는 RoomPage.js 파일 상단이나 외부에 정의)
import { useState } from 'react';

const MessageItem = ({ text, mine }) => {
  const [expanded, setExpanded] = useState(false);

  // 300자 이상이면 '긴 글'로 판단 (원하는 대로 조절 가능)
  const isLongText = text.length > 300; 

  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`flex flex-col items-${mine ? 'end' : 'start'} max-w-[70%]`}>
        <div
          className={`px-3 py-2 rounded-xl text-sm whitespace-pre-wrap-break-words ${
            mine ? 'bg-blue-100' : 'bg-gray-100'
          } ${
            // 접혀있는 상태이고, 긴 글이라면 높이 제한 및 넘치는 부분 숨김
            !expanded && isLongText ? 'max-h-5 overflow-hidden relative' : ''
          }`}
        >
          {text}
          
          {/* 글이 잘렸을 때 하단에 흐릿한 효과 (선택 사항) */}
          {!expanded && isLongText && (
             <div className="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
          )}
        </div>

        {/* 긴 글이고, 아직 펼치지 않았다면 '더보기' 버튼 표시 */}
        {isLongText && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="text-xs text-gray-500 mt-1 hover:underline"
          >
            전체 보기 ({text.length}자) ▼
          </button>
        )}
        
        {/* 펼쳐진 상태라면 '접기' 버튼 표시 (선택 사항) */}
        {isLongText && expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="text-xs text-gray-400 mt-1 hover:underline"
          >
            접기 ▲
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageItem;