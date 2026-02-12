import React, { useState, useEffect } from "react";
import { MessageCircle, RotateCcw, HelpCircle, Send, History } from "lucide-react";
import axios from "../api/axiosInstance";

const AICoachChat = () => {
  const [showChat, setShowChat] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // API 연동을 위한 상태 관리
  const [situations, setSituations] = useState([]);
  const [myRooms, setMyRooms] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [sitRes, roomRes] = await Promise.all([
          axios.get("/api/ai-situation"),
          axios.get("/api/ai-chat/my-rooms")
        ]);
        setSituations(sitRes.data.data);
        setMyRooms(roomRes.data.data);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchInitialData();
  }, []);

  // 2. 새 채팅방 생성 (상황 선택 시)
  const handleSelectSituation = async (situationId) => {
    try {
      // 1. 새 채팅방 생성 API 호출
      const response = await axios.post("/api/ai-chat/room", { situationId });
      const newRoom = response.data.data;
      
      setCurrentRoomId(newRoom.chatRoomId);

      // 2. 전체 목록 갱신 (사이드바용)
      const roomResponse = await axios.get(`/api/ai-chat/my-rooms`);
      const updatedRooms = roomResponse.data.data;
      setMyRooms(updatedRooms);

      // 3. 🚨 [수정 포인트] 화면 초기화 방지
      // 새로 만든 방은 'newRoom'에 들어있는 초기 메시지만 보여줍니다.
      // 기존 messages를 덮어씌우지 않고, 새로운 방의 시작을 알립니다.
      setMessages([
        { type: "NOTICE", content: `새로운 연습을 시작합니다. 👍` },
        ...(newRoom.messages || []) // 생성 직후 백엔드가 넘겨준 메시지만 표시
      ]);

      setShowChat(true);
    } catch (error) {
      console.error("채팅방 생성 에러:", error);
      alert("채팅방 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleLoadPastRoom = (room) => {
    // 💡 방을 옮길 때 기존 대화가 날아가지 않도록 안전하게 로드합니다.
    setCurrentRoomId(room.chatRoomId);
    if (room.messages && room.messages.length > 0) {
      setMessages(room.messages);
    } else {
      setMessages([{ type: "NOTICE", content: "이전 대화 내용이 없습니다." }]);
    }
    setShowChat(true);
  };

  // 4. 메시지 전송 및 AI 답변 받기
  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentRoomId || isLoading) return;

    const userMsg = { type: "USER", content: inputText, createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await axios.post(`/api/ai-chat/message/${currentRoomId}`, {
        message: inputText
      });
      const aiAnswer = response.data.data;
      setMessages((prev) => [...prev, { type: "AI", content: aiAnswer, createdAt: new Date().toISOString() }]);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("현재 채팅을 초기화하시겠습니까? (방 ID는 유지됩니다)")) {
        setMessages(prev => [prev[0]]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 왼쪽 사이드바 */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800 mb-2">AI 말연습장</h2>
          <p className="text-sm text-blue-500 mb-4">부담 없이 연습해보세요</p>
          <button className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white py-2.5 rounded-lg font-medium">
            무제한 연습 가능
          </button>
        </div>

        {/* 상황 선택 & 이전 기록 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-lg">💡</span> 상황 선택
            </h3>
            <div className="space-y-3 mb-8">
              {situations.map((sit) => (
                <div
                  key={sit.id}
                  onClick={() => handleSelectSituation(sit.id)}
                  className="p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-green-300 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{sit.icon}</span>
                    <h4 className="font-bold text-gray-800">{sit.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{sit.description}</p>
                </div>
              ))}
            </div>

            {/* 이전 기록 섹션 추가 */}
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-purple-500" /> 이전 대화 기록
            </h3>
            <div className="space-y-2">
              {myRooms.map((room) => (
                <div
                  key={room.chatRoomId}
                  onClick={() => handleLoadPastRoom(room)}
                  className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-all ${
                    currentRoomId === room.chatRoomId ? "border-purple-400 bg-purple-50" : "border-gray-100 bg-white"
                  }`}
                >
                  <p className="font-bold text-xs text-purple-600 mb-1">{room.situationTitle}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {room.messages[room.messages.length - 1]?.content || "대화 내용 없음"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 채팅 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 헤더 */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">AI</div>
            <div>
              <h3 className="font-bold text-gray-800">사이사이 AI 코치</h3>
              <p className="text-sm text-blue-500">연습 도우미 활성화</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowChat(!showChat)} className="p-3 rounded-full bg-blue-100 text-blue-600"><MessageCircle className="w-5 h-5" /></button>
            <button onClick={handleReset} className="p-3 rounded-full bg-gray-100 text-gray-600"><RotateCcw className="w-5 h-5" /></button>
            <button onClick={() => setShowHelp(true)} className="p-3 rounded-full bg-red-100 text-red-600"><HelpCircle className="w-5 h-5" /></button>
          </div>
        </div>

        {/* 메시지 영역 */}
        {showChat ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === "USER" ? "justify-end" : "justify-start"}`}>
                {msg.type === "NOTICE" ? (
                  <div className="bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full text-sm mx-auto text-yellow-700">
                    👍 {msg.content}
                  </div>
                ) : (
                  <div className={`flex gap-3 max-w-[80%] ${msg.type === "USER" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === "AI" ? "bg-gradient-to-br from-purple-400 to-blue-400" : "bg-green-400"}`}>
                      <span className="text-white font-bold text-xs">{msg.type === "AI" ? "AI" : "나"}</span>
                    </div>
                    <div className="flex flex-col">
                      {/* whitespace-pre-wrap 추가: 줄바꿈이 그대로 보입니다 */}
                      <div className={`px-4 py-3 rounded-2xl shadow-sm whitespace-pre-wrap ${
                        msg.type === "USER" 
                        ? "bg-green-400 text-white rounded-tr-sm" 
                        : "bg-white text-gray-800 rounded-tl-sm border border-gray-100"
                      }`}>
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center gap-2 text-xs text-gray-400 animate-pulse">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                AI 코치가 생각 중입니다...
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 bg-gray-50">
            채팅화면 버튼을 눌러주세요
          </div>
        )}

        {/* 입력 영역 */}
        <div className="p-4 bg-white border-t sticky bottom-0">
          <div className="max-w-4xl mx-auto flex gap-3">
            <textarea
              rows="1"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={!currentRoomId || isLoading}
              placeholder={currentRoomId ? "메시지를 입력해보세요... (Shift+Enter 줄바꿈)" : "상황을 선택해주세요."}
              className="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none resize-none overflow-hidden min-h-[50px] max-h-[150px]"
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentRoomId || isLoading || !inputText.trim()}
              className="px-6 bg-green-400 text-white rounded-xl hover:bg-green-500 transition-all disabled:bg-gray-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* 도움말 모달 (showHelp 상태에 따라 렌더링 - 기존 UI 유지) */}
      {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">💡 도움말</h2>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">상황을 선택하면 대화 연습을 시작할 수 있습니다. AI 코치가 실시간으로 여러분의 대화를 도와드립니다.</p>
                  <button onClick={() => setShowHelp(false)} className="w-full bg-green-400 text-white py-3 rounded-lg font-bold">확인</button>
              </div>
          </div>
      )}
    </div>
  );
};

export default AICoachChat;