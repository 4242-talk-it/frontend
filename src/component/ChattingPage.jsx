import React, { useState, useEffect, useRef } from "react";
import { X, List, RefreshCw, ChevronDown, Send } from "lucide-react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Chattingpage = () => {
  const [showChatEnd, setShowChatEnd] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  const [maxTurns] = useState(15);
  const [inputText, setInputText] = useState("");

  // --- 추가된 실시간 통신 상태 ---
  const [roomId, setRoomId] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [userId, setUserId] = useState(null);
  const stompClient = useRef(null);

  //메세지 전송 시 최하단으로 자동스크롤 변수
  const messagesEndRef = useRef(null);

  useEffect(() => {
    initMatch();
    return () => disconnect(); // 종료 시 소켓 연결 해제
  }, []);

  const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

// messages 배열이 바뀔 때마다 스크롤 함수 실행
useEffect(() => {
  scrollToBottom();
}, [messages]);

  const initMatch = async () => {
    try {
      const selectedTopic = "새로운 시작"; // 나중에는 상태값(state)으로 변경
    
      // 1. 요청 보내기 직전 확인
      console.log("매칭 요청 시작! 선택된 토픽: ", selectedTopic);

      // 백엔드 매칭 API 호출
      const response = await fetch("/api/user-chat/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic }),
      });
      console.log("서버 응답 상태코드:", response.status);

      const data = await response.json();
      
      console.log("서버로부터 받은 매칭 데이터:", data);

      setRoomId(data.roomId);
      setIsMatched(data.matched);
      setUserId(data.userId);

      // 소켓 연결
      connect(data.roomId);

      // 기존 채팅 내역 로드
      loadHistory(data.roomId);

      if (data.matched) {
      console.log("🎉 이미 매칭된 방에 입장했습니다!");
    } else {
      console.log("⏳ 매칭 대기 중... 다른 사용자를 기다립니다.");
    }

    } catch (error) {
      console.error("매칭 실패:", error);
    }
  };

  const loadHistory = async (id) => {
    const response = await fetch(`/api/user-chat/room/${id}/messages`);
    const history = await response.json();
    setMessages(history);
  };

  const connect = (id) => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("✅ 소켓 연결 성공! 방 번호:", id);

        // 채팅방 구독
        stompClient.current.subscribe(`/sub/room/${id}`, (frame) => {

          console.log("📩 서버로부터 받은 원본 데이터:", frame.body);

          if (frame.body === "MATCH_COMPLETE") {
            setIsMatched(true); // 상대방이 들어왔을 때 상태 업데이트
          } else {
            try{
            const newMessage = JSON.parse(frame.body);
            console.log("📦 파싱된 메시지 객체:", newMessage);

            setMessages((prev) => [...prev, newMessage]);
            setTurnCount((prev) => prev + 1);
            } catch(e){
              console.error("❌ 메시지 파싱 에러:", e);
            }
          } 
        });
      },
      onStompError: (frame) => {
      console.error("STOMP 에러 발생:", frame.headers['message']);
    }
    });
    stompClient.current.activate();
  };

  const disconnect = () => {
    if (stompClient.current) stompClient.current.deactivate();
  };

  // 2. 메시지 전송 로직 수정
  const handleSendMessage = () => {
    if (inputText.trim() && isMatched && stompClient.current && userId) {

      // 백엔드의 @MessageMapping("/room/{roomId}/message")로 전송
      stompClient.current.publish({
        destination: `/pub/room/${roomId}/message`,
        body: JSON.stringify({ message: inputText }),
        headers: { userId: String(userId) }, // 백엔드 @Header와 일치
      });

      setInputText("");

      // 대화 종료 트리거 체크
      if (turnCount >= maxTurns) {
        setTimeout(() => setShowChatEnd(true), 1500);
      }
    }
  };

  const emotions = [
    { text: "정말 즐거웠어요", emoji: "🥰" },
    { text: "편안했어요", emoji: "☺️" },
    { text: "평범했어요", emoji: "😐" },
    { text: "아쉬웠어요", emoji: "😔" },
    { text: "불편했어요", emoji: "😣" },
  ];

  const toggleEmotion = (emotion) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion],
    );
  };

  //   const handleContinueChat = () => {
  //     setShowChatEnd(false);
  //     setSelectedEmotions([]);
  //     setMaxTurns(turnCount + 5);
  //   };

  // const handleSendMessage = () => {
  //   if (inputText.trim()) {
  //     setMessages([...messages, { text: inputText, sender: 'user', time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) }]);
  //     setInputText('');

  //     setTimeout(() => {
  //       setMessages(prev => [...prev, {
  //         text: '감사합니다. 그런 감정을 느끼시는 게 자연스러워요.',
  //         sender: 'ai',
  //         time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  //       }]);
  //     }, 1000);

  //     const newTurnCount = turnCount + 1;
  //     setTurnCount(newTurnCount);

  //     if (newTurnCount >= maxTurns) {
  //       setTimeout(() => {
  //         setShowChatEnd(true);
  //       }, 2000);
  //     }
  //   }
  // };

  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center relative">
      <div
        className={`w-full h-full max-w-4xl mx-auto bg-white flex flex-col transition-all duration-300 ${showChatEnd ? "blur-sm" : ""}`}
      >
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
                <div className="text-xs sm:text-sm font-bold text-gray-800">
                  익명의 대화상대
                </div>
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
              <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                익명 대화방
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">감정 베타 버전</p>
              <div className="mt-3 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium inline-block">
                5/10회
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎯</span>
                  <h4 className="font-bold text-sm sm:text-base text-gray-800">
                    오늘의 미션
                  </h4>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium text-green-700 mb-1">
                    새로운 시작
                  </p>
                  <p className="text-xs text-gray-600">
                    변화나 도전에 관한 이야기를 나눠보세요.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💝</span>
                  <h4 className="font-bold text-sm sm:text-base text-gray-800">
                    키워드 달성
                  </h4>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs sm:text-sm font-medium">
                    ✓ 실천
                  </button>
                  <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs sm:text-sm font-medium">
                    ✓ 격려
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">기타별</p>
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-gray-800 mb-2">
                  현재 감정
                </h4>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm font-medium text-blue-700 mb-1">
                    약간 설레는 ☺️
                  </p>
                  <p className="text-xs text-gray-600">
                    비슷한 감정의 상대와 매칭됨
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
              <div className="text-center">
                <div className="inline-block bg-blue-50 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm text-blue-600 mb-4">
                  대화가 시작되었습니다. 서로를 존중해며 즐거운 대화 나눠보세요!
                  👍
                </div>
              </div>

              {messages.map((msg, idx) => (
                <div key={idx}>
                  {msg.senderId !== Number(userId) ? (
                    /* 상대방 UI (왼쪽) */
                    <div className="flex gap-2 sm:gap-3 mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-[10px]">
                          {msg.senderNickname.substring(0, 1)}{" "}
                          {/* 닉네임 첫글자 표시 */}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 mb-1 ml-1">
                          {msg.senderNickname}
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 sm:px-4 py-2 sm:py-3 max-w-md">
                          <p className="text-sm sm:text-base text-gray-800">
                            {msg.message}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 ml-2">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* 내가 보낸 메시지 UI (오른쪽) */
                    <div className="flex justify-end mb-4">
                      <div className="flex flex-col items-end">
                        <div className="bg-green-400 rounded-2xl rounded-tr-sm px-3 sm:px-4 py-2 sm:py-3 max-w-md">
                          <p className="text-sm sm:text-base text-white">
                            {msg.message}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 mr-2">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                  
                </div>
              ))}
            <div ref={messagesEndRef} />
              
            </div>

            {/* Input Area */}
            <div className="border-t p-3 sm:p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  disabled={!isMatched}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={isMatched ? "메시지를 입력해주세요...":"매칭 대기 중입니다."}
                  className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${!isMatched ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {emotion.text} {emotion.emoji}
                </button>
              ))}
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => alert("대화가 종료되었습니다!")}
                className="flex-1 px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chattingpage;
