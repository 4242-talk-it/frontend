import React, {useState} from "react";

const ChattingEndModal = ({ isOpen, onClose }) => {
  const [selectedEmotions, setSelectedEmotions] = useState([]);

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

  if (!isOpen) return null;

  return (
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
            onClick={() => {
              alert("감정이 저장되었습니다!");
              onClose(); // 모달 닫기
            }}
            className="flex-1 px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            종료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChattingEndModal;