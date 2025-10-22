import React, { useState } from 'react';
import { X, List, RefreshCw, ChevronDown, Send } from 'lucide-react';

const Chattingpage = () => {
  const [showChatEnd, setShowChatEnd] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [messages, setMessages] = useState([
    { text: '인당하세요! 세로운 시작이네요 힘찬 실패했어요', sender: 'ai', time: '14:23' },
    { text: '네, 맞아요! 오늘부터 새 직장에 다니게 됐거든요', sender: 'user', time: '14:24' },
    { text: '와 축하드려요! 첫날은 어떠신가요? 많이 떨리셨을 것 같은데', sender: 'ai', time: '14:25' },
    { text: '생각보다 동료분들이 따뜻하게 맞아주셔서 다행이었어요. 그래도 아직 적응이 조금 있긴 해요', sender: 'user', time: '14:26' }
  ]);
  const [turnCount, setTurnCount] = useState(2);
  //const [maxTurns, setMaxTurns] = useState(5);
   const [maxTurns] = useState(5);
  const [inputText, setInputText] = useState('');

  const emotions = [
    { text: '바쁘셨어요', emoji: '😊' },
    { text: '재미없었어요', emoji: '😐' },
    { text: '행복했어요', emoji: '😊' },
    { text: '아쉬웠어요', emoji: '😔' },
    { text: '불편했어요', emoji: '😣' }
  ];

  const toggleEmotion = (emotion) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

//   const handleContinueChat = () => {
//     setShowChatEnd(false);
//     setSelectedEmotions([]);
//     setMaxTurns(turnCount + 5);
//   };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'user', time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) }]);
      setInputText('');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: '감사합니다. 그런 감정을 느끼시는 게 자연스러워요.', 
          sender: 'ai', 
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);

      const newTurnCount = turnCount + 1;
      setTurnCount(newTurnCount);
      
      if (newTurnCount >= maxTurns) {
        setTimeout(() => {
          setShowChatEnd(true);
        }, 2000);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center relative">
      <div className={`w-full h-full max-w-4xl mx-auto bg-white flex flex-col transition-all duration-300 ${showChatEnd ? 'blur-sm' : ''}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-white">
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg">
                <List className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold">
                  의
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800">의명의 대화상대</div>
                  <div className="text-xs text-green-500">온라인</div>
                </div>
              </div>
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors">
                게시
              </button>
              <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 sm:w-64 border-r bg-gray-50 p-3 sm:p-4 overflow-y-auto hidden md:block">
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">의명 대화방</h3>
                <p className="text-xs sm:text-sm text-gray-500">감정 베타 버전</p>
                <div className="mt-3 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium inline-block">
                  5/10회
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🎯</span>
                    <h4 className="font-bold text-sm sm:text-base text-gray-800">오늘의 미션</h4>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs sm:text-sm font-medium text-green-700 mb-1">새로운 시작</p>
                    <p className="text-xs text-gray-600">반복니 노선째 관찰한 이야기를 나눠보세요</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">💝</span>
                    <h4 className="font-bold text-sm sm:text-base text-gray-800">카드도 달성</h4>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs sm:text-sm font-medium">✓ 실천</button>
                    <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs sm:text-sm font-medium">✓ 격려</button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">기타별</p>
                </div>

                <div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-800 mb-2">현재 감정</h4>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs sm:text-sm font-medium text-blue-700 mb-1">야근 생각에 😣</p>
                    <p className="text-xs text-gray-600">바쁘온 감정의 상식적 백분짐</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
                <div className="text-center">
                  <div className="inline-block bg-blue-50 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm text-blue-600 mb-4">
                    대화가 시작되었습니다. 서로를 존중해며 즐거운 대화 나눠보세요! 👍
                  </div>
                </div>

                {messages.map((msg, idx) => (
                  <div key={idx}>
                    {msg.sender === 'ai' && (
                      <div className="flex gap-2 sm:gap-3 mb-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
                        </div>
                        <div>
                          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2 sm:py-3 max-w-md">
                            <p className="text-sm sm:text-base text-gray-800">{msg.text}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 ml-2">{msg.time}</p>
                        </div>
                      </div>
                    )}
                    {msg.sender === 'user' && (
                      <div className="flex justify-end mb-4">
                        <div>
                          <div className="bg-green-400 rounded-2xl rounded-tr-sm px-3 sm:px-4 py-2 sm:py-3 max-w-md">
                            <p className="text-sm sm:text-base text-white">{msg.text}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 mr-2 text-right">{msg.time}</p>
                        </div>
                      </div>
                    )}
                    {idx === 1 && (
                      <div className="text-center my-3">
                        <div className="inline-block bg-blue-50 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm text-blue-600">
                          💡 '실패' 카드드를 성공적으로 사용하셨어요!
                        </div>
                      </div>
                    )}
                    {idx === 3 && (
                      <div className="text-center my-3">
                        <div className="inline-block bg-blue-50 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm text-blue-600">
                          💡 '격려' 카드드도 명쾌 솔직한 감정 표현이 좋아요! 😊
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-red-500">📌</span>
                    <p className="text-xs sm:text-sm font-medium text-gray-700">15시간 업압</p>
                    <button className="ml-auto text-xs sm:text-sm text-blue-500 font-medium">카드드: 거려</button>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs sm:text-sm text-gray-600">진솔한 마음을 담아 대화해보세요... (15시간 이상)</p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t p-3 sm:p-4 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="추석 새로운 일상에서 가장 기억드는 부분은 뭘까요?"
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors"
                  >
                    <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      {showChatEnd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 text-gray-800">
              대화가 끝났어요!
            </h2>
            <p className="text-center text-gray-600 mb-2 text-sm sm:text-base">
              상대방과의 대화는 어떠셨나요?
            </p>
            <p className="text-center text-gray-500 mb-6 text-xs sm:text-sm">
              솔직한 감정을 선택해주세요.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
              {emotions.map((emotion, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleEmotion(emotion.text)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    selectedEmotions.includes(emotion.text)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {emotion.text} {emotion.emoji}
                </button>
              ))}
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setShowChatEnd(false)}
                className="flex-1 px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                계속 대화하기
              </button>
              <button
                onClick={() => alert('대화가 백업되었습니다!')}
                className="flex-1 px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
              >
                대화 백업하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chattingpage;