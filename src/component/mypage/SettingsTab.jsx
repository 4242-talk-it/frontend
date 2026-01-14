// 닉네임 수정 및 환경 설정
import React, { useState } from 'react';
import axiosInstance from "../../api/axiosInstance";
import NicknameEditModal from '../modal/NicknameEditModal';
import PasswordEditModal from '../modal/PasswordEditModal';

const SettingsTab = ({
  user,
  showSettings,
  setShowSettings,
  handleUpdateNickname,
}) => {
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');

  const handleVerifyPassword = async () => {
    if (!currentPassword.trim()) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 1. 서버에 요청 전송
      const response = await axiosInstance.post('/api/users/verify-password', {
        currentPassword: currentPassword
      });

      console.log("서버 응답 데이터:", response.data); // 디버깅용 로그

      // 2. 서버가 200 OK를 보냈다면 (예외가 발생하지 않았다면) 성공으로 간주
      // ResponseDto 구조에 따라 response.data.data 가 true인지 확인
      if (response.status === 200 || response.data.data === true) {
        setIsPasswordModalOpen(true);
      } else {
        alert("비밀번호 확인에 실패했습니다.");
      }

    } catch (error) {
      // 3. 백엔드에서 throw new BusinessLogicException 발생 시 이쪽으로 옴
      console.error("검증 에러:", error);
      const errorMessage = error.response?.data?.message || "비밀번호가 일치하지 않습니다.";
      alert(errorMessage);
      setIsPasswordModalOpen(false); // 실패 시 확실히 닫힘 상태 유지
    }
  };

  const handleUpdatePassword = async ({ newPassword }) => {
    try {
      await axiosInstance.patch('/api/users/update-password', {
        currentPassword, // 메인 input에 입력된 값 사용
        newPassword      // 모달에서 전달받은 값 사용
      });
      alert('비밀번호가 성공적으로 변경되었습니다.');
      setIsPasswordModalOpen(false);
      setCurrentPassword(''); // 입력창 초기화
    } catch (error) {
      alert(error.response?.data?.message || '변경 실패');
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* 프로필 설정 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">프로필 설정</h2>

        <div className="space-y-4">
          {/* 닉네임 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              닉네임
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={user.nickname}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
              <button
                onClick={() => setIsNicknameModalOpen(true)}
                className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 whitespace-nowrap"
              >
                수정
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              현재 비밀번호 확인
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="현재 비밀번호를 먼저 입력하세요"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleVerifyPassword}
                className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 whitespace-nowrap"
              >
                변경
              </button>
            </div>
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* 환경 설정 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">환경 설정</h2>
        <div className="space-y-3">
          {Object.entries(showSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-700">
                {key === 'notifications'
                  ? '알림 받기'
                  : key === 'soundAlerts'
                  ? '소리 알림'
                  : '데이터 분석'}
              </span>
              <input
                type="checkbox"
                checked={value}
                onChange={() =>
                  setShowSettings((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                className="w-5 h-5 text-purple-600 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ===== 모달 호출부 ===== */}
      <NicknameEditModal
        isOpen={isNicknameModalOpen}
        onClose={() => setIsNicknameModalOpen(false)}
        currentNickname={user.nickname}
        onSubmit={(nickname) => {
          console.log('닉네임 변경:', nickname);
          handleUpdateNickname(nickname);
          setIsNicknameModalOpen(false);
        }}
      />

      <PasswordEditModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handleUpdatePassword}
      />
    </div>
  );
};

export default SettingsTab;
