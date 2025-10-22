import React, { useState } from "react";
import { MessageCircle, RotateCcw, HelpCircle, Send } from "lucide-react";

const AICoachChat = () => {
  const [showChat, setShowChat] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [inputText, setInputText] = useState("");
  //const [selectedSituation, setSelectedSituation] = useState(1);
  const [messages, setMessages] = useState([
    {
      type: "system",
      text: "연습 시작!",
    },
    {
      type: "notice",
      text: "안녕하세요! AI 코치와 함께 대화를 연습해보세요. 선택하신 '첫 만남 & 소개' 상황으로 시작하겠습니다. 자연스럽게 대화해보세요! 👍",
    },
    {
      type: "ai",
      text: "안녕하세요! 처음 뵙겠습니다. 혹시 여기 처음 오시는 건가요?",
      time: "15:30",
    },
  ]);

  const situations = [
    {
      id: 1,
      icon: "👋",
      title: "첫 만남 & 소개",
      description: "처음 만나는 사람과 스스로 대화",
      status: "이용",
      statusColor: "text-green-500 bg-green-50",
    },
    {
      id: 2,
      icon: "💬",
      title: "갑둥 상황 대화",
      description: "억절이 다름 때 길어지게 깨달아기",
      status: "보류",
      statusColor: "text-orange-500 bg-orange-50",
    },
    {
      id: 3,
      icon: "🤔",
      title: "위로와 공감",
      description: "상대방의 마음을 이해하고 연료하기",
      status: "보류",
      statusColor: "text-orange-500 bg-orange-50",
    },
    {
      id: 4,
      icon: "😊",
      title: "칭찬과 격려",
      description: "기분 수스러나 성취를 함께 기뻐하기",
      status: "이용",
      statusColor: "text-green-500 bg-green-50",
    },
    {
      id: 5,
      icon: "💭",
      title: "연플 털어",
      description: "직장에서의 일명한 소통 연습",
      status: "어려움",
      statusColor: "text-red-500 bg-red-50",
    },
  ];

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          type: "user",
          text: inputText,
          time: new Date().toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setInputText("");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: "좋은 대답이에요! 자연스럽게 대화를 이어가고 계시네요.",
            time: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 1000);
    }
  };

  const handleReset = () => {
    if (window.confirm("채팅을 초기화하시겠습니까?")) {
      setMessages([
        {
          type: "system",
          text: "연습 시작!",
        },
        {
          type: "ai",
          text: "안녕하세요! AI 코치와 함께 대화를 연습해보세요. 선택하신 '첫 만남 & 소개' 상황으로 시작하겠습니다. 자연스럽게 대화해보세요! 👍",
        },
        {
          type: "ai",
          text: "안녕하세요! 처음 뵙겠습니다. 혹시 여기 처음 오시는 건가요?",
          time: "15:30",
        },
      ]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        {/* Header - Fixed */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800 mb-2">AI 맞먹슬장</h2>
          <p className="text-sm text-blue-500 mb-4">부담 없이 연습해보세요</p>
          <button className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white py-2.5 rounded-lg font-medium hover:from-green-500 hover:to-blue-500 transition-all">
            무제한 연습 가능
          </button>
        </div>

        {/* Scrollable Situations */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-lg">💡</span>
              상황 선택
            </h3>
            <div className="space-y-3">
              {situations.map((situation) => (
                <div
                  key={situation.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    situation.id === 1
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200 bg-white hover:border-green-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{situation.icon}</span>
                      <h4 className="font-bold text-gray-800">
                        {situation.title}
                      </h4>
                    </div>
                    {situation.id === 1 && (
                      <span className="text-green-500 text-xl">✓</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {situation.description}
                  </p>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${situation.statusColor}`}
                  >
                    {situation.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Coach Status - Fixed */}
        <div className="p-6 border-t bg-purple-50">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🤖</span>
            <div>
              <h4 className="font-bold text-gray-800">AI 코치 상태</h4>
              <p className="text-sm text-gray-600">실시간 피드백 제공 중</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">AI</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">사이사이 AI 코치</h3>
              <p className="text-sm text-blue-500">어떤 주제이 활성화</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <div className="absolute top-full mt-2 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                채팅화면
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={handleReset}
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <div className="absolute top-full mt-2 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                초기화
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={() => setShowHelp(true)}
                className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <div className="absolute top-full mt-2 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                도움말
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        {showChat && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx}>
                  {msg.type === "system" && (
                    <div className="flex justify-center mb-6">
                      <div className="bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full flex items-center gap-2">
                        <span className="text-yellow-600">👍</span>
                        <span className="text-sm font-medium text-yellow-700">
                          {msg.text}
                        </span>
                      </div>
                    </div>
                  )}
                  {msg.type === "ai" && (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">AI</span>
                      </div>
                      <div>
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-md">
                          <p className="text-gray-800">{msg.text}</p>
                        </div>
                        {msg.time && (
                          <p className="text-xs text-gray-400 mt-1 ml-2">
                            {msg.time}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {msg.type === "user" && (
                    <div className="flex justify-end">
                      <div>
                        <div className="bg-green-400 rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-md">
                          <p className="text-white">{msg.text}</p>
                        </div>
                        {msg.time && (
                          <p className="text-xs text-gray-400 mt-1 mr-2 text-right">
                            {msg.time}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Suggestion Chips */}
            <div className="px-6 py-3 bg-gray-50 border-t">
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-1 px-3 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-all border">
                  <span className="text-green-500">✓</span>
                  지연스러운 대화 중이예요!
                </button>
                <button className="flex items-center gap-1 px-3 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-all border">
                  <span className="text-orange-500">👍</span>
                  구체적으로 표현해보세요
                </button>
                <button className="flex items-center gap-1 px-3 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-all border">
                  <span className="text-blue-500">🎯</span>
                  상대방에게 관심 보이기
                </button>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="지연스럽게 대화해보세요. 예: '맞아요! 여기 처음이라 조금 떨리네요...'"
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-all flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}

        {!showChat && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                채팅화면 버튼을 눌러 대화를 시작하세요
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">💡 도움말</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">💬 채팅화면</h3>
                <p className="text-sm text-blue-700">
                  현재 대화 화면을 표시하거나 숨깁니다.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2">🔄 초기화</h3>
                <p className="text-sm text-gray-700">
                  현재 대화를 초기화하고 새로 시작합니다.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-bold text-purple-800 mb-2">📝 상황 선택</h3>
                <p className="text-sm text-purple-700">
                  왼쪽에서 연습하고 싶은 대화 상황을 선택하세요.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">🤖 AI 코치</h3>
                <p className="text-sm text-green-700">
                  실시간으로 대화 피드백을 제공합니다.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="w-full mt-6 bg-gradient-to-r from-green-400 to-blue-400 text-white py-3 rounded-lg font-medium hover:from-green-500 hover:to-blue-500 transition-all"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICoachChat;
