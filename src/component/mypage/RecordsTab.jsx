// 대화 기록 리스트 및 모달
import React, { useState } from 'react';
import { MessageCircle, Clock, Smile, Frown, Meh } from 'lucide-react';

const RecordsTab = ({ conversationHistory }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'positive': return <Smile className="w-4 h-4 text-green-500" />;
      case 'negative': return <Frown className="w-4 h-4 text-red-500" />;
      default: return <Meh className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {conversationHistory.map((conv) => (
        <div key={conv.id} className={`bg-white p-4 rounded-lg shadow border-l-4 ${conv.emotion === 'positive' ? 'border-green-400' : conv.emotion === 'negative' ? 'border-red-400' : 'border-gray-400'} cursor-pointer`} onClick={() => setSelectedConversation(conv)}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {getEmotionIcon(conv.emotion)}
              <span className="font-medium">{conv.topic}</span>
            </div>
            <span className="text-gray-400 text-sm">{conv.date}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {conv.keywords.map((k) => (
              <span key={k} className="text-purple-600 text-xs bg-purple-100 px-2 py-1 rounded-full">#{k}</span>
            ))}
          </div>
          <div className="text-gray-400 text-xs mt-1">{conv.messageCount}개 메시지</div>
          <div className="text-right text-purple-600 text-sm mt-1 cursor-pointer">피드백 보기 →</div>
        </div>
      ))}

      {/* 기록 상세 모달 */}
      {selectedConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-lg p-6 relative">
            <button onClick={() => setSelectedConversation(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            <h2 className="font-bold text-lg mb-2">{selectedConversation.topic}</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {selectedConversation.messages.map((msg, idx) => (
                <div key={idx} className={`${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`${msg.from === 'user' ? 'inline-block bg-purple-600 text-white' : 'inline-block bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg max-w-xs`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <div className="flex items-center font-medium text-purple-600 mb-2">⚡ AI 피드백</div>
              <div className="text-sm mb-1">대화 스타일: <span className="font-semibold">{selectedConversation.feedback.style}</span></div>
              <div className="text-sm text-green-600 mb-1">잘한 점:
                <ul className="list-disc ml-4">
                  {selectedConversation.feedback.positive.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="text-sm text-blue-600">개선 제안:
                <ul className="list-disc ml-4">
                  {selectedConversation.feedback.improve.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>
            <div className="flex justify-between text-center text-gray-600">
              <div><div className="font-bold text-purple-600">{selectedConversation.messageCount}</div><div className="text-xs">메시지</div></div>
              <div><div className="font-bold text-purple-600">{selectedConversation.duration}</div><div className="text-xs flex items-center justify-center"><Clock className="w-3 h-3 mr-1" />대화시간</div></div>
              <div><div className="font-bold text-purple-600">{selectedConversation.keywords.length}</div><div className="text-xs">키워드</div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordsTab;