// src/components/MessageItem.jsx (경로는 프로젝트 구조에 맞게 수정하세요)
import { useState } from 'react';

const MessageItem = ({ text, mine }) => {
  const [expanded, setExpanded] = useState(false);
  
  // 글자 수가 300자를 넘거나, 줄바꿈이 10줄 이상인 경우 '긴 글'로 간주
  const isLongText = text.length > 300 || text.split('\n').length > 10;

  return (
    <div className={`mb-2 flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col ${mine ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div
          className={`px-3 py-2 rounded-xl text-sm transition-all duration-200 
            whitespace-pre-wrap break-words 
            ${mine ? 'bg-blue-100' : 'bg-gray-100'} 
            ${!expanded && isLongText ? 'max-h-50 overflow-hidden relative' : ''}
          `}
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

export default MessageItem;