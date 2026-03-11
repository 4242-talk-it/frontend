import React, { useState, useEffect, useRef } from "react";
import { X, List, RefreshCw, ChevronDown, Send } from "lucide-react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import TopicSelectionModal from "./modal/TopicSelectionModal.jsx";
import ChattingEndModal from "./userchat/UserChattingEndModal.jsx";
import CreateChatRoom from "./modal/CreateChatRoom.jsx";
import ChattingExtendModal from "./modal/ChattingExtendModal.jsx";
import ChattingExtendWaitingModal from "./modal/ChattingExtendWaitingModal.jsx";

const Chattingpage = () => {
  const [showChatEnd, setShowChatEnd] = useState(false);
  const [messages, setMessages] = useState([]);
  const [turnCount, setTurnCount] = useState(0);

  const [maxTurns, setMaxTurns] = useState(3); //메세지 전체 개수 제한
  const [myContinuousCount, setMyContinuousCount] = useState(0); //연속 전송 회수
  const [inputText, setInputText] = useState("");
  const [showTopicModal, setShowTopicModal] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showExtendWaitingModal, setShowExtendWaitingModal] = useState(false);
  const [dbTopics, setDbTopics] = useState([]);

  const [missionKeyword, setMissionKeyword] = useState("");

  const isMounted = useRef(false);
  const userIdRef = useRef(null);

  // --- 추가된 실시간 통신 상태 ---
  const [roomId, setRoomId] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [userId, setUserId] = useState(null);
  const stompClient = useRef(null);

  //메세지 전송 시 최하단으로 자동스크롤 변수
  const messagesEndRef = useRef(null);
  // --- 토픽 목록 가져오기 함수 ---
  const fetchTopics = async () => {
    try {
      const response = await fetch("/api/user-chat/topics");
      if (response.ok) {
        const data = await response.json();
        setDbTopics(data); // ["일상", "연애상담", ...] 형태의 배열
      }
    } catch (error) {
      console.error("토픽 로딩 실패:", error);
    }
  };

  const handleRoomSelect = (room) => {
    const currentUserId = room.userId || userId;

    if (!currentUserId) {
      alert("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
      return;
    }

    console.log(
      `${room.topic} 방으로 입장합니다. ID: ${room.roomId}, UserID: ${currentUserId}`,
    );

    setUserId(currentUserId);
    setRoomId(room.roomId);
    setMaxTurns(room.maxTurns);
    setIsMatched(true);
    setShowTopicModal(false);

    disconnect();
    connect(room.roomId);
    loadHistory(room.roomId, currentUserId);
  };

  // 페이지 로드 시 및 모달이 켜질 때 호출
  useEffect(() => {
    if (showTopicModal) {
      fetchTopics();
    }
  }, [showTopicModal]);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
  console.log("🧩 현재 미션 키워드 상태:", missionKeyword);
  console.log("🤝 현재 매칭 상태:", isMatched);
}, [missionKeyword, isMatched]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // messages 배열이 바뀔 때마다 스크롤 함수 실행
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
  userIdRef.current = userId;
}, [userId]);


  const initMatch = async (selectedTopic) => {
    try {
      const response = await fetch("/api/user-chat/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "서버 매칭 중 오류가 발생했습니다.",
        );
      }

      const data = await response.json();

      if (data && data.roomId) {
        setRoomId(data.roomId);
        setMaxTurns(data.maxTurns);
        setIsMatched(data.matched);
        setUserId(data.userId);

        connect(data.roomId);
        loadHistory(data.roomId);

        if (data.missionKeyword) {
          setMissionKeyword(data.missionKeyword);
        }
      }
    } catch (error) {
      console.error("매칭 실패:", error);
    }
  };

  const loadHistory = async (id, currentUserId) => {
    if (!id) return;

    try {
      const response = await fetch(`/api/user-chat/room/${id}/messages`);
      const history = await response.json();
      console.log(history);

      const historyArray = Array.isArray(history) ? history : [];
      setMessages(historyArray);

      const activeId = currentUserId || userId;
      let count = 0;
      for (let i = historyArray.length - 1; i >= 0; i--) {
        if (historyArray[i].senderId === Number(activeId)) {
          count++;
        } else {
          break;
        }
      }
      setMyContinuousCount(count);
    } catch (error) {
      console.error("History 로드 에러:", error);
      setMessages([]); // 에러 시 빈 배열로 초기화
    }
  };

  const handleTopicSelect = (topic) => {
    setShowTopicModal(false);
    initMatch(topic); // 선택한 토픽으로 매칭 시작
  };

  const handleCreateNewRoom = () => {
    setShowTopicModal(false);
    setShowCreateModal(true);
  };

  const handleConfirmCreate = (newTopic) => {
    setShowCreateModal(false);
    initMatch(newTopic);
  };

  const connect = (id) => {
    const socket = new SockJS("/ws");

    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.current.subscribe(`/sub/room/${id}`, (frame) => {
          
          if (frame.body === "MATCH_COMPLETE") {
            console.log("매칭 완료 신호 수신 (String)");
            setIsMatched(true);

            fetchRoomInfo(id);

            return;
          } else {
            try {
              const data = JSON.parse(frame.body);

              if (
                data.status === "MATCH_COMPLETE" ||
                data.type === "MATCH_COMPLETE"
              ) {
                console.log("매칭 완료 신호 수신 (JSON)");
                setIsMatched(true);
                return;
              }

              if (data.type === "EXTEND_REJECTED") {
                setShowExtendWaitingModal(false); 
                setShowExtendModal(false); 
                setShowChatEnd(true);
                return;
              }

              if (data.type === "EXTEND_COMPLETE") {
                setShowExtendWaitingModal(false); // 1. 대기 모달 닫기
                if (data.newMaxTurns) {
                  setMaxTurns(data.newMaxTurns);
                }
                return;
              }

              if (data.type === "CHAT_END") {
                const currentMax = data.maxTurns || maxTurns;
                if (currentMax > 3) {
                  setShowExtendModal(false);
                  setShowChatEnd(true); // 바로 최종 종료(감정 선택) 모달 오픈
                } else {
                  setShowExtendModal(true); // 아직 연장 전이면 연장 제안 모달 오픈
                }
                return;
              }
              setMessages((prev) => [...prev, data]);
              setTurnCount((prev) => prev + 1);

              if (Number(data.senderId) !== Number(userIdRef.current)) {
                setMyContinuousCount(0);
              }
            } catch (e) {
              console.error(e);
            }
          }
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onWebSocketClose: (event) => {
        console.log("⚠️ 닫힘 코드:", event.code, event.reason);
      },
    });
    stompClient.current.activate();
  };

  const fetchRoomInfo = async (id) => {
    try {
      const response = await fetch(`/api/user-chat/room/${id}/info`);
      const data = await response.json();

      if (data.missionKeyword) {
        setMissionKeyword(data.missionKeyword); // 드디어 User 1에게도 '아이돌'이 세팅됨!
      }
      if (data.maxTurns) {
        setMaxTurns(data.maxTurns);
      }
    } catch (error) {
      console.error("방 정보 로드 실패:", error);
    }
  };

  const disconnect = () => {
    if (stompClient.current) stompClient.current.deactivate();
  };

  const handleSendMessage = () => {
    const trimmedText = inputText.trim();
    if (!trimmedText || !isMatched || !stompClient.current || !userId) return;
    if (myContinuousCount >= 3) {
      alert("상대방의 대답을 기다려야 합니다."); // 방어 코드
    return;
  }
    
      stompClient.current.publish({
        destination: `/pub/room/${roomId}/message`,
        body: JSON.stringify({ message: inputText }),
        headers: { userId: String(userId) },
      });
      setMyContinuousCount((prev) => {
      const newCount = prev + 1;
      return newCount;
    });
      setInputText("");
    
  };

  const handleExtendChat = () => {
    setShowExtendModal(false);
    setShowExtendWaitingModal(true);

    if (stompClient.current && roomId && userId) {
      stompClient.current.publish({
        destination: `/pub/room/${roomId}/extend`, // 컨트롤러의 주소
        headers: { userId: String(userId) },
        // 별도의 바디 데이터가 없어도 헤더의 userId로 서버에서 처리 가능합니다.
        body: JSON.stringify({ action: "EXTEND" }),
      });
      console.log(
        `서버로 연장 요청을 보냈습니다. Room: ${roomId}, User: ${userId}`,
      );
    }
  };

  const isInputDisabled = !isMatched || myContinuousCount >= 3;
  let placeholderText = "매칭 대기 중...";
  if (isMatched) {
    placeholderText =
      myContinuousCount >= 3
        ? "상대방의 대답을 기다려주세요."
        : "메시지를 입력해주세요...";
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center relative">
      <div
        className={`w-full h-full max-w-4xl mx-auto bg-white flex flex-col transition-all duration-300 
          ${showChatEnd || showExtendModal ? "blur-sm" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
              <div className="text-center">
                <div className="inline-block bg-blue-50 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm text-blue-600 mb-4">
                  대화가 시작되었습니다. 서로를 존중해며 즐거운 대화 나눠보세요!
                  👍
                </div>
              </div>

              {Array.isArray(messages) &&
                messages.map((msg) => (
                  <div key={msg.cmid}>
                    {msg.senderId === Number(userId) ? (
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
                    ) : (
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
                    )}
                  </div>
                ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-3 sm:p-4 bg-white">
              {missionKeyword && (
                <div className="flex justify-start mb-2">
                  <p className="text-[11px] sm:text-xs text-gray-400 px-3 py-1 rounded-full">
                    🎯 키워드 미션:{" "}
                    <span className="font-bold text-blue-500">
                      {missionKeyword}
                    </span>
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={placeholderText}
                  disabled={isInputDisabled}
                  className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${!isInputDisabled ? "bg-white cursor-text" : "bg-gray-100 cursor-not-allowed"}`}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isInputDisabled}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors"
                >
                  <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showTopicModal && (
        <TopicSelectionModal
          isOpen={showTopicModal}
          onSelectTopic={handleTopicSelect}
          onSelectRoom={handleRoomSelect}
          onCreateNew={handleCreateNewRoom}
          topics={dbTopics}
          onRefresh={fetchTopics}
        />
      )}

      <CreateChatRoom
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleConfirmCreate}
      />

      <ChattingExtendModal
        isOpen={showExtendModal}
        onClose={() => {
          stompClient.current.publish({
            destination: `/pub/room/${roomId}/reject`,
            headers: { userId: String(userId) },
          });
          setShowExtendModal(false);
          setShowChatEnd(true); // '종료하기' 누르면 감정 선택 모달 오픈
        }}
        onExtend={handleExtendChat}
      />

      <ChattingExtendWaitingModal
        isOpen={showExtendWaitingModal}
        onCancel={() => {
          setShowExtendWaitingModal(false);
          setShowChatEnd(true);
        }}
      />

      <ChattingEndModal
        isOpen={showChatEnd}
        onClose={() => setShowChatEnd(false)}
        roomId={roomId}
      />
    </div>
  );
};

export default Chattingpage;
