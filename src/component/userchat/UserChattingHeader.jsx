import React from "react";
import { MessageCircle, RotateCcw, HelpCircle, LogOut } from "lucide-react";

// AIChattingHeader와 동일한 구조로, USER 채팅용 헤더입니다.
// 뭔가 세부적인 스타일이 달라질 것 같아서 다른 파일로 만들어둠
// 이 주석은 읽은 후 삭제해주세요!
const UserChattingHeader = ({ showChat, setShowChat, handleReset, setShowHelp, setIsEndModalOpen }) => {
  const tooltipStyle = "absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] py-1 px-2 rounded -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10";

  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
          USER
        </div>
        <div>
          <h3 className="font-bold text-gray-800">사이사이 USER 채팅</h3>
          <p className="text-sm text-blue-500">연습 도우미 활성화</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* 채팅 화면 토글 */}
        <div className="relative group">
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <span className={tooltipStyle}>채팅 화면 전환</span>
        </div>

        {/* 초기화 버튼 */}
        <div className="relative group">
          <button
            onClick={handleReset}
            className="p-3 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <span className={tooltipStyle}>대화 초기화</span>
        </div>

        {/* 도움말 버튼 */}
        <div className="relative group">
          <button
            onClick={() => setShowHelp(true)}
            className="p-3 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <span className={tooltipStyle}>도움말 보기</span>
        </div>

        {/* 종료 버튼 */}
        <div className="relative group">
          <button
            onClick={() => setIsEndModalOpen(true)}
            className="p-3 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <span className={tooltipStyle}>대화 종료하기</span>
        </div>
      </div>
    </div>
  );
};

export default UserChattingHeader;